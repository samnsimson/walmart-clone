import { PrismaClient } from "@prisma/client";

export class DatabaseClient {
  private static prisma: PrismaClient;
  protected db: PrismaClient;

  constructor() {
    this.db = this.connection();
  }

  private connection() {
    if (!DatabaseClient["prisma"]) DatabaseClient["prisma"] = new PrismaClient();
    return DatabaseClient["prisma"];
  }
}
