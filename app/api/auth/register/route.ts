import { DatabaseClient } from "@/config/databaseClient";
import { SignUpSchema } from "@/lib/schema/auth.schema";
import { genSaltSync, hashSync } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

const { db } = new DatabaseClient();

export const POST = async (req: NextRequest) => {
    try {
        const formData = await req.json();
        let data = SignUpSchema.parse(formData);
        const dbData = { ...data, password: hashSync(data.password, genSaltSync(10)) };
        const existingUser = await db.user.count({ where: { OR: [{ email: data.email }, { phone: data.phone }] } });
        if (existingUser) throw new Error("User already exists");
        const userId = await db.user.create({ data: dbData }).then(({ id }) => id);
        return NextResponse.json({ status: "success", userId }, { status: 200 });
    } catch (error: any) {
        console.log("🚀 ~ POST ~ error:", error);
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
};
