import { DatabaseClient } from "@/config/databaseClient";

class ProductService extends DatabaseClient {
  public getAllProducts = async () => {
    return await this.db.product.findMany();
  };
}

const productService = new ProductService();
export default productService;
