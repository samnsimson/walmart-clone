import { DatabaseClient } from "@/config/databaseClient";
import { Product } from "@prisma/client";
import categoryAction from "./category.action";
import fs from "fs";

interface ProductFilters {
  id?: string;
  category?: string;
  sku?: string;
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

  public getAllProducts = async (filters: ProductFilters = {}) => {
    const where = this.productFilters(filters);
    return await this.db.product.findMany({ where });
  };

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
