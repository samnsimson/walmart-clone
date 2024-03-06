import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient;
}

export class DatabaseClient {
    protected db: PrismaClient;

    constructor() {
        this.db = this.connection();
    }

    private connection() {
        if (!global.prisma) global.prisma = new PrismaClient();
        return global.prisma;
    }
}
