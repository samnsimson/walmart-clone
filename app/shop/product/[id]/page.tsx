import productAction from "@/actions/product.action";
import { NextPageProps } from "@/lib/types";
import { NextPage } from "next";

const SingleProductPage: NextPage<NextPageProps> = async ({ params: { id }, searchParams }) => {
  const product = await productAction.getSingleProduct(id);

  if (!product) return <></>;

  return <div>{product.id}</div>;
};
export default SingleProductPage;
