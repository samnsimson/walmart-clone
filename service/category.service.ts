import { DatabaseClient } from "@/config/databaseClient";
import { Prisma } from "@prisma/client";

interface GetCategoryProps {
  subCategories?: boolean;
}

const categoryWithSubCategories = Prisma.validator<Prisma.CategoryDefaultArgs>()({
  include: { subCategories: true },
});

type CategoryWithSubCategories = Prisma.CategoryGetPayload<typeof categoryWithSubCategories>;

class CategoryService extends DatabaseClient {
  private categoryAssociations = (props: GetCategoryProps = {}) => {
    return Object.keys(props).reduce((accumulator: any, current) => {
      switch (current) {
        case "subCategories":
          if (props["subCategories"] === true) accumulator["include"] = { ...accumulator.include, subCategories: true };
          break;
        default:
          break;
      }
      return accumulator;
    }, {});
  };

  public getCategories = async (props: GetCategoryProps = {}): Promise<Partial<CategoryWithSubCategories>[]> => {
    try {
      return await this.db.category.findMany({ where: { parentId: null }, ...this.categoryAssociations(props) });
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
