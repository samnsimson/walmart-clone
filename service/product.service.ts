import { DatabaseClient } from "@/config/databaseClient";
import { Product } from "@prisma/client";

class ProductService extends DatabaseClient {
  public getAllProducts = async () => {
    return await this.db.product.findMany();
  };

  public transformProductListForCarousel(products: Product[] = []) {
    return products.map(({ retailPrice, salePrice, image, slug, ...pdt }) => ({
      ...pdt,
      slug: String(slug),
      image: image[0],
      format: "compact" as any,
      price: { sale: salePrice, retail: retailPrice },
    }));
  }
}

const productService = new ProductService();
export default productService;
