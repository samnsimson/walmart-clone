import { NextPageProps } from "@/lib/types";
import categoryService from "@/service/category.service";
import { NextPage } from "next";

export async function generateStaticParams() {
  const categories = await categoryService.getCategories();
  return categories.map(({ id }) => ({ id }));
}

const SingleCategoryPage: NextPage<NextPageProps> = async ({ params, searchParams }) => {
  const category = await categoryService.getSingleCategory(params.id);
  return <div>SingleCategoryPage</div>;
};
export default SingleCategoryPage;
