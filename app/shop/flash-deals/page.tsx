import { ProductCard } from "@/components/productCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import productService from "@/service/db/product.service";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";

interface FlashDealsPageProps extends HTMLAttributes<HTMLDivElement> {
  compact: boolean;
}

const FlashDealsPage: FC<FlashDealsPageProps> = async ({ compact = false, ...props }) => {
  const products = await productService.getAllProducts();
  return (
    <div {...props} className="my-4 flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div className="prose-base">
          <h2 className="my-0 font-bold text-zinc-900">Flash Deals</h2>
          <p className="my-0 text-zinc-500">Up to 65% off</p>
        </div>
        <Link href="/shop/flash-deals" className="text-sm underline">
          View All
        </Link>
      </div>
      {compact && (
        <Carousel opts={{ align: "start", slidesToScroll: 3 }}>
          <CarouselContent>
            {products.map((product, key) => (
              <CarouselItem key={key} className="basis-1/6">
                <ProductCard
                  image={product.image}
                  title={`${product.name} - ${product.description}`}
                  price={{ sale: product.salePrice, retail: product.retailPrice }}
                  slug={product.slug ?? `${product.name}-${product.description}`}
                  format="compact"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-5 shadow-xl ring-1 ring-black" />
          <CarouselNext className="right-5 shadow-xl ring-1 ring-black" />
        </Carousel>
      )}
    </div>
  );
};

export default FlashDealsPage;
