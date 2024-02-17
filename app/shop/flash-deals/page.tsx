import { ProductCard } from "@/components/productCard";
import { ProductCarousel } from "@/components/productCarousel";
import productService from "@/service/product.service";
import { FC, HTMLAttributes } from "react";

// interface FlashDealsPageProps extends HTMLAttributes<HTMLDivElement> {
//   compact: boolean;
// }

interface IPageProps {
  params: { compact: boolean };
  searchParams: string | string[] | undefined;
}

const FlashDealsPage: FC<IPageProps> = async ({ params, ...props }) => {
  const products = await productService.getAllProducts();
  const pdts = products.map(({ retailPrice, salePrice, image, slug, ...pdt }) => ({
    ...pdt,
    slug: String(slug),
    image: image[0],
    format: "compact" as any,
    price: { sale: salePrice, retail: retailPrice },
  }));
  return (
    <div {...props} className="my-4 flex flex-col space-y-6">
      <ProductCarousel sectionTitle="Flash Deals" sectionDescription="Upto 65% Off" sectionLink="/shop/flash-deals" products={pdts} />
    </div>
  );
};

export default FlashDealsPage;
