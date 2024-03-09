import categoryAction from "@/actions/category.action";
import productAction from "@/actions/product.action";
import { ProductList } from "@/components/productList";
import { NextPageProps } from "@/lib/types";
import { NextPage } from "next";

//function to generate the routes for all the products
export async function generateStaticParams() {
    const categories = await categoryAction.getCategories({ limit: -1 });
    return categories.map(({ id }) => ({ id }));
}

const AllProductsPage: NextPage<NextPageProps> = async ({ params: { id }, searchParams: { page = 1 } }) => {
    const { total, current, data } = await productAction.getAllProductsUsingCategoryId({ id, skip: +page });
    return (
        <div className="">
            <ProductList title="Shop all products" products={data} pagination={{ total, current }} />
        </div>
    );
};
export default AllProductsPage;
