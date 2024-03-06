import { DatabaseClient } from "@/config/databaseClient";
import { Brand, Cart, Category, Prisma, Product, Rating, Review } from "@prisma/client";
import categoryAction from "./category.action";

interface WhereCond {
    [x: string]: any;
}

type ProductAssociations = "relatedProducts" | "relatedToProducts" | "categories" | "review" | "rating" | "brand";

interface ProductFilters {
    where?: WhereCond;
    include?: Array<ProductAssociations>;
    limit?: number;
    [x: string]: any;
}

interface SingleProductParams {
    id: string;
    include?: Array<ProductAssociations>;
}

export type ProductWithAssociations = Product &
    Partial<{
        relatedProducts: Array<Product>;
        relatedToProducts: Array<Product>;
        review: Array<Review>;
        rating: Array<Rating>;
        categories: Array<Category>;
        carts: Array<Cart>;
        brand: Brand;
    }>;

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

    private productAssociations = (include: SingleProductParams["include"] = []) => {
        return include.reduce((accumulator: { [x: string]: any }, current) => {
            accumulator["include"] = { ...accumulator.include, [current]: true };
            return accumulator;
        }, {});
    };

    public getSingleProduct = async ({ id, include }: SingleProductParams): Promise<ProductWithAssociations | null> => {
        return await this.db.product.findFirst({ where: { id }, ...this.productAssociations(include) });
    };

    public getAllProducts = async ({ where, include, limit = 24 }: ProductFilters = {}): Promise<ProductWithAssociations[]> => {
        return await this.db.product.findMany({ where: this.productFilters(where), ...(limit !== -1 && { take: limit }) });
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
