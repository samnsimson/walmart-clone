import { DatabaseClient } from "@/config/databaseClient";

class CategoryService extends DatabaseClient {
  public getCategories = async () => await this.db.category.findMany();
}

const categoryService = new CategoryService();
export default categoryService;
