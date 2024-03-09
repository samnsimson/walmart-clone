import { DatabaseClient } from "@/config/databaseClient";
import { Category, Product } from "@prisma/client";

interface GetCategoryProps {
    where?: { [key: string]: string | number | null };
    include?: Array<"subCategories" | "products">;
    limit?: number;
    order?: "ASC" | "DESC";
    skip?: number;
}

type CategoryWithAssociations = Category &
    Partial<{
        subCategories: Array<Category>;
        products: Array<Product>;
    }>;

class CategoryAction extends DatabaseClient {
    private categoryConditions = (condition: GetCategoryProps["where"] = {}) => {
        return Object.keys(condition).reduce((accumulator: any, current) => {
            accumulator["where"] = { ...accumulator.where, [current]: condition[current] };
            return accumulator;
        }, {});
    };

    private categoryAssociations = (include: GetCategoryProps["include"] = [], limit = 24, skip = 0) => {
        return include.reduce((accumulator: { [x: string]: any }, current) => {
            accumulator["include"] = {
                ...accumulator.include,
                [current]: {
                    ...(limit !== -1 && { take: limit, skip: limit * skip }),
                },
            };
            return accumulator;
        }, {});
    };

    public getCategories = async ({ include, where, limit = 24, skip = 0 }: GetCategoryProps = {}): Promise<Partial<CategoryWithAssociations>[]> => {
        try {
            return await this.db.category.findMany({
                ...this.categoryConditions(where),
                ...this.categoryAssociations(include),
                ...(limit !== -1 && { take: limit, skip: limit * skip }),
            });
        } catch (error) {
            console.log(error);
            throw new Error(error as any);
        }
    };

    public getSingleCategory = async ({ include, where, limit = 24, skip = 0 }: GetCategoryProps = {}): Promise<Partial<CategoryWithAssociations> | null> => {
        try {
            return await this.db.category.findFirst({
                ...this.categoryConditions(where),
                ...this.categoryAssociations(include),
                ...(limit !== -1 && { take: limit, ...(skip && { skip: limit * skip }) }),
            });
        } catch (error) {
            console.log(error);
            throw new Error(error as any);
        }
    };
}

const categoryAction = new CategoryAction();
export default categoryAction;
