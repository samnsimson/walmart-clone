import { FC, HTMLAttributes } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ProductCard } from "../productCard";
import { cn } from "@/lib/utils";
import { SectionHeaders } from "../sectionHeader";
import { Product } from "@prisma/client";
import productService from "@/service/product.service";

interface ProductCarouselProps extends HTMLAttributes<HTMLDivElement> {
  sectionTitle?: string | null;
  sectionDescription?: string | null;
  sectionLink?: string | null;
  products: Product[];
  columns?: 3 | 4 | 6;
}

export const ProductCarousel: FC<ProductCarouselProps> = ({
  columns = 6,
  sectionTitle = null,
  sectionDescription = null,
  sectionLink = null,
  products = [],
  ...props
}) => {
  const productIterator = productService.transformProductListForCarousel(products);
  return (
    <div {...props} className="flex flex-col space-y-6">
      <SectionHeaders {...{ sectionTitle, sectionDescription, sectionLink }} />
      <Carousel opts={{ align: "start", slidesToScroll: 3 }}>
        <CarouselContent>
          {productIterator.map((product, key) => (
            <CarouselItem key={key} className={cn({ "basis-1/6": columns === 6, "basis-1/3": columns === 3, "basis-1/4": columns === 4 })}>
              <ProductCard
                productId={product.id}
                image={product.image}
                title={`${product.name} - ${product.description}`}
                price={{ sale: product.price.sale, retail: product.price.retail }}
                slug={product.slug ?? `${product.name}-${product.description}`}
                format="compact"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-5 shadow-xl ring-1 ring-black" />
        <CarouselNext className="right-5 shadow-xl ring-1 ring-black" />
      </Carousel>
    </div>
  );
};
