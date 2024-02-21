import { DatabaseClient } from "@/config/databaseClient";

class CategoryService extends DatabaseClient {
  public getCategories = async () => {
    try {
      return await this.db.category.findMany();
    } catch (error) {
      console.log(error);
      throw new Error(error as any);
    }
  };

  public getSingleCategory = async (id: string) => {
    try {
      return await this.db.category.findFirst({ where: { id } });
    } catch (error) {
      console.log(error);
      throw new Error(error as any);
    }
  };
}

const categoryService = new CategoryService();
export default categoryService;
