import { DatabaseClient } from "@/config/databaseClient";
import { Product } from "@prisma/client";
import categoryAction from "./category.action";

interface WhereCond {
  [x: string]: any;
}

interface ProductFilters {
  where?: WhereCond;
  include?: Array<string>;
  limit?: number;
  [x: string]: any;
}

class ProductAction extends DatabaseClient {
  private readonly allowedFilters: Array<string> = ["id", "sku", "category"];

  private productFilters = (filters: ProductFilters = {}) => {
    const filterKeys = Object.keys(filters).filter((item) => this.allowedFilters.includes(item));
    return filterKeys.reduce((aggregate: { [x: string]: any }, prop) => {
      if (prop === "category") aggregate["categories"] = { some: { categoryId: filters[prop] } };
      if (["sku", "id"].includes(prop)) aggregate[prop] = filters[prop];
      return aggregate;
    }, {});
  };

  public getSingleProduct = async (id: string) => await this.db.product.findFirst({ where: { id } });

  public getAllProducts = async ({ where, include, limit = 24 }: ProductFilters = {}) =>
    await this.db.product.findMany({ where: this.productFilters(where), take: limit });

  public getAllProductsUsingCategoryId = async (id: string): Promise<Array<Product>> => {
    const categoryWithProduct = await categoryAction.getSingleCategory({ where: { id }, include: ["products"] });
    if (categoryWithProduct?.products?.length) return categoryWithProduct.products;
    const subCategoriesWithProduct = await categoryAction.getCategories({ where: { parentId: id }, include: ["products"] });
    const productsArr = subCategoriesWithProduct.flatMap((subcategory) => subcategory.products);
    return productsArr as Array<Product>;
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

const productAction = new ProductAction();
export default productAction;
