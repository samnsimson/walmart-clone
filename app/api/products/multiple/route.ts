import { DatabaseClient } from "@/config/databaseClient";
import { NextResponse } from "next/server";

const prisma = new DatabaseClient();

export const POST = async (req: Request) => {
    const body = await req.json();
    const products = await prisma.db.product.findMany({ where: { id: { in: body["ids"] } }, include: { brand: true } });
    return NextResponse.json(products);
};
