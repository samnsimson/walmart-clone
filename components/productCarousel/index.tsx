import Link from "next/link";
import { FC, HTMLAttributes } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ProductCard } from "../productCard";
import { cn } from "@/lib/utils";
import { SectionHeaders } from "../sectionHeader";

interface ProductCarouselProps extends HTMLAttributes<HTMLDivElement> {
  sectionTitle?: string | null;
  sectionDescription?: string | null;
  sectionLink?: string | null;
  products: Product[];
  columns?: number;
}

interface Product {
  id: string;
  sku: string;
  slug: string;
  name: string;
  description?: string;
  image: string;
  format: "compact" | "detailed";
  price: { sale: number; retail: number };
}

export const ProductCarousel: FC<ProductCarouselProps> = ({
  columns = 6,
  sectionTitle = null,
  sectionDescription = null,
  sectionLink = null,
  products = [],
  ...props
}) => {
  return (
    <div {...props} className="flex flex-col space-y-6">
      <SectionHeaders {...{ sectionTitle, sectionDescription, sectionLink }} />
      <Carousel opts={{ align: "start", slidesToScroll: 3 }}>
        <CarouselContent>
          {products.map((product, key) => (
            <CarouselItem key={key} className={cn({ "basis-1/6": columns === 6, "basis-1/3": columns === 3 })}>
              <ProductCard
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
