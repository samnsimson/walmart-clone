import { DatabaseClient } from "@/config/databaseClient";

class CategoryService extends DatabaseClient {
  public getCategories = async () => await this.db.category.findMany();
  public getSingleCategory = async (id: string) => await this.db.category.findFirst({ where: { id } });
}

const categoryService = new CategoryService();
export default categoryService;
