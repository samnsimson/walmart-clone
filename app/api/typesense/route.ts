import { tsClient } from "@/lib/typesense";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { parsePrismaSchema } from "@loancrate/prisma-schema-parser";
import fs from "fs";

const prisma = new PrismaClient();

const getType = (type: string) => {
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
    return dataModel.map((model: any) => ({
        name: model.name.value,
        fields: model.members
            .map((member: any) => ({ name: member?.name?.value, type: getType(member?.type?.name?.value) }))
            .filter((x: any) => x.type !== null),
    }));
};

export const GET = async (req: NextRequest) => {
    try {
        console.log("Retreiving existing collections...");
        const collections = await tsClient.collections().retrieve();

        console.log("Deleting all existing collections...");
        const promises = collections.map((collection) => tsClient.collections(collection.name).delete());
        await Promise.all(promises);

        console.log("Create schemas from db...");
        const schemas = schema();
        const schemaPromises = schemas.map((schema) => tsClient.collections().create(schema));
        await Promise.all(schemaPromises);

        console.log("Sync data to collection...");
        const products = await prisma.product.findMany();
        const response = await tsClient.collections("Product").documents().import(products, { action: "create" });
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json(error);
    }
};
