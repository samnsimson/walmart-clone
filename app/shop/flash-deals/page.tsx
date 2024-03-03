import { ProductCarousel } from "@/components/productCarousel";
import productService from "@/actions/product.action";
import { NextPage } from "next";
import { NextPageProps } from "@/lib/types";

const FlashDealsPage: NextPage<NextPageProps> = async ({ params }) => {
  const products = await productService.getAllProducts();

  return (
    <div className="my-4 flex flex-col space-y-6">
      <ProductCarousel sectionTitle="Flash Deals" sectionDescription="Upto 65% Off" sectionLink="/shop/flash-deals" products={products} />
    </div>
  );
};

export default FlashDealsPage;
