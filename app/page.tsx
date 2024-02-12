import { CategoryLinks } from "@/components/categoryLinks";
import { Cta } from "@/components/cta";
import { ProductCard } from "@/components/productCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { categoryLinks } from "@/constants/links";
import { cn } from "@/lib/utils";
import ProductService from "@/service/db/product.service";

export default async function Home() {
  const products = await ProductService.getAllProducts();
  return (
    <main className="">
      <section className="grid grid-flow-row-dense grid-cols-1 gap-6 p-6 lg:grid-cols-4">
        {categoryLinks.map((category, key) => (
          <CategoryLinks
            key={key}
            {...category}
            className={cn({
              "col-span-2 row-span-2": [1].includes(key),
              "row-span-2": [3, 7].includes(key),
              "col-span-2": [9].includes(key),
              "h-[390px]": [5, 6].includes(key),
            })}
          />
        ))}
      </section>
      <Cta />
      <Carousel className="px-6" opts={{ align: "start", slidesToScroll: 3 }}>
        <CarouselContent>
          {products.map((product, key) => (
            <CarouselItem key={key} className="basis-1/6">
              <ProductCard title={product.name} image={product.image} price={{ sale: product.salePrice, retail: product.retailPrice }} compact={true} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-10 shadow-xl ring-1 ring-black" />
        <CarouselNext className="right-10 shadow-xl ring-1 ring-black" />
      </Carousel>
    </main>
  );
}
