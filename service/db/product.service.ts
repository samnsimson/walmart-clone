import { DatabaseClient } from "@/config/databaseClient";

class ProductService extends DatabaseClient {
  public getAllProducts = async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return await this.db.product.findMany();
  };
}

const productService = new ProductService();
export default productService;
