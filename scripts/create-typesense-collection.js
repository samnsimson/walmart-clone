const { parsePrismaSchema } = require("@loancrate/prisma-schema-parser");
const { Client } = require("typesense");
const fs = require("fs");
const { PrismaClient } = require("@prisma/client");

const tsClient = new Client({
  nodes: [{ host: "localhost", port: 8108, protocol: "http" }],
  apiKey: "TYPESENSE",
  connectionTimeoutSeconds: 2,
});

const prismaClient = new PrismaClient();

const getType = (type) => {
  if (!type) return null;
  else if (type === "String") return "string";
  else if (type === "BigInt") return "int64";
  else if (type === "Int") return "int32";
  else if (type === "Boolean") return "bool";
  else return null;
};

const schema = () => {
  console.log("Gathering schema from prisma...");
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
  console.log("Deleting all existing collections...");
  await deleteExistingCollection(schemas);
  console.log("Creting fresh collections from schema...");
  const promises = schemas.map((schema) => tsClient.collections().create(schema));
  await Promise.all(promises);
};

const syncData = async () => {
  console.log("Sync data to collection...");
  const products = await prismaClient.product.findMany();
  await tsClient.collections("Product").documents().import(products, { action: "create" });
  // const typesenseCollections = await tsClient.collections().retrieve();
  // const collections = typesenseCollections.map((collection) => collection.name);
  // const dataSetPromises = collections.map((collection) => prismaClient[collection].findMany());
  // const dataSet = await Promise.all(dataSetPromises);
  // const tsPromises = collections.map((collection, index) => tsClient.collections(collection).documents().import(dataSet[index], { action: "create" }));
  // await Promise.all(tsPromises);
};

(async () => {
  await createCollection(schema());
  await syncData();
})();
