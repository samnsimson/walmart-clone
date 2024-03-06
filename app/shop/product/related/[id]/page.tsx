import { NextPageProps } from "@/lib/types";
import { NextPage } from "next";

const RelatedProductsPage: NextPage<NextPageProps> = ({ params }) => {
    return <div>{JSON.stringify(params)}</div>;
};
export default RelatedProductsPage;
