import { DatabaseClient } from "@/config/databaseClient";
import { Prisma } from "@prisma/client";

interface GetCategoryProps {
  where?: { [key: string]: string | number | null };
  include?: Array<"subCategories" | "products">;
  limit?: number;
  order?: "ASC" | "DESC";
}

const categoryWithAssociations = Prisma.validator<Prisma.CategoryDefaultArgs>()({
  include: { subCategories: true, products: true },
});

type CategoryWithAssociations = Prisma.CategoryGetPayload<typeof categoryWithAssociations>;

class CategoryAction extends DatabaseClient {
  private categoryConditions = (condition: GetCategoryProps["where"] = {}) => {
    return Object.keys(condition).reduce((accumulator: any, current) => {
      accumulator["where"] = { ...accumulator.where, [current]: condition[current] };
      return accumulator;
    }, {});
  };

  private categoryAssociations = (include: GetCategoryProps["include"] = []) => {
    return include.reduce((accumulator: { [x: string]: any }, current) => {
      accumulator["include"] = { ...accumulator.include, [current]: true };
      return accumulator;
    }, {});
  };

  public getCategories = async ({ include, where, limit = 24 }: GetCategoryProps = {}): Promise<Partial<CategoryWithAssociations>[]> => {
    try {
      return await this.db.category.findMany({
        ...this.categoryConditions(where),
        ...this.categoryAssociations(include),
        ...(limit !== -1 && { take: limit }),
      });
    } catch (error) {
      console.log(error);
      throw new Error(error as any);
    }
  };

  public getSingleCategory = async ({ include, where }: GetCategoryProps = {}): Promise<Partial<CategoryWithAssociations> | null> => {
    try {
      return await this.db.category.findFirst({ ...this.categoryConditions(where), ...this.categoryAssociations(include) });
    } catch (error) {
      console.log(error);
      throw new Error(error as any);
    }
  };
}

const categoryAction = new CategoryAction();
export default categoryAction;
