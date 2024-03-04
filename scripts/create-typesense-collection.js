const { parsePrismaSchema } = require("@loancrate/prisma-schema-parser");
const { Client } = require("typesense");
const fs = require("fs");

const tsClient = new Client({
  nodes: [{ host: "localhost", port: 8108, protocol: "http" }],
  apiKey: "TYPESENSE",
  connectionTimeoutSeconds: 2,
});

const getType = (type) => {
  if (!type) return null;
  else if (type === "String") return "string";
  else if (type === "BigInt") return "int64";
  else if (type === "Int") return "int32";
  else if (type === "Boolean") return "bool";
  else return null;
};

const schema = () => {
  const schemaContent = fs.readFileSync("./prisma/schema.prisma", "utf-8");
  const parsedSchema = parsePrismaSchema(schemaContent);
  const dataModel = parsedSchema.declarations.filter((d) => d.kind === "model");
  return dataModel.map((model) => ({
    name: model.name.value,
    fields: model.members.map((member) => ({ name: member?.name?.value, type: getType(member?.type?.name?.value) })).filter((x) => x.type !== null),
  }));
};

const deleteExistingCollection = async () => {
  const existingCollection = await tsClient.collections().retrieve();
  const promises = existingCollection.map((collection) => tsClient.collections(collection.name).delete());
  await Promise.all(promises);
};

const createCollection = async (schemas) => {
  //   console.log("🚀 ~ createCollection ~ schemas:", schemas);
  await deleteExistingCollection(schemas);
  const promises = schemas.map((schema) => tsClient.collections().create(schema));
  await Promise.all(promises);
};

(async () => await createCollection(schema()))();
