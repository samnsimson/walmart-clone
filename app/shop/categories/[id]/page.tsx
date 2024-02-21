import { CategoryCarousel } from "@/components/categoryCarousel";
import { CatgegorySideBar } from "@/components/categorySideBar";
import { ProductCarousel } from "@/components/productCarousel";
import SectionTitle from "@/components/sectionTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { NextPageProps } from "@/lib/types";
import productService from "@/service/product.service";
import { NextPage } from "next";
import Image from "next/image";

const SingleCategoryPage: NextPage<NextPageProps> = async ({ params }) => {
  const products = await productService.getAllProducts({ category: params.id });

  return (
    <div>
      <SectionTitle title="Shop the look" />
      <ProductCarousel products={productService.transformProductListForCarousel(products)} />
      <Separator className="my-6" />
      <div className="grid grid-cols-4 gap-6">
        <CatgegorySideBar className="col-span-1" title="Categories" />
        <div className="col-span-3 flex flex-col space-y-6">
          <Card>
            <CardContent>
              <Image
                src={"https://i5.walmartimages.com/dfw/4ff9c6c9-b5f2/k2-_89a4fa01-19eb-444d-9395-ddd9e513130d.v1.jpg?odnHeight=680&odnWidth=1208&odnBg=FFFFFF"}
                alt="image"
                width={1232}
                height={691}
              />
              <SectionTitle title="Perk up your bedroom" description="A few new pieces will have you primed to seize the day." size="sm" />
              <ProductCarousel products={productService.transformProductListForCarousel(products)} columns={4} />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="grid h-[363px] grid-cols-3 gap-6 bg-category-ad-image bg-cover bg-no-repeat py-0">
              <div className="col-span-1 space-y-3 py-4">
                <div>
                  <p>Now trending</p>
                  <SectionTitle title="Your style at Walmart" className="my-0" />
                </div>
                <p>Spring forward with fashion, home & beauty inspired by real life.</p>
                <Button className="btn-default" size="sm">
                  Shop now
                </Button>
              </div>
            </CardContent>
          </Card>
          <div className="border-y-1 border-zinc-300 py-6">
            <SectionTitle title="Shop by category" className="mt-0" />
            <CategoryCarousel columns={6} />
          </div>
          <div className="grid grid-cols-3 gap-6">
            <Card className="overflow-hidden rounded-lg">
              <CardContent className="px-0">
                <Image
                  width={576}
                  height={1024}
                  src={"https://i5.walmartimages.com/dfw/4ff9c6c9-824a/k2-_9b8b95c3-4b0b-483b-99e5-3fe9a22c1bd9.v1.jpg"}
                  alt="image"
                />
                <div className="space-y-4 p-4">
                  <SectionTitle title="Coffee Table Remix" size="lg" className="my-0" />
                  <p className="mt-0">A rug here, a tray there - now things are looking fresh</p>
                  <Button className="btn-default">Shop now</Button>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden rounded-lg">
              <CardContent className="px-0">
                <Image
                  width={576}
                  height={1024}
                  src={"https://i5.walmartimages.com/dfw/4ff9c6c9-bdab/k2-_9094c280-3923-47b0-9833-a81e51c73bf9.v1.jpg"}
                  alt="image"
                />
                <div className="space-y-4 p-4">
                  <SectionTitle title="Your kitchen vignette" size="lg" className="my-0" />
                  <p className="mt-0">The secret to staying inspired? A few artfully arranged shelves</p>
                  <Button className="btn-default">Shop now</Button>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden rounded-lg">
              <CardContent className="px-0">
                <Image
                  width={576}
                  height={1024}
                  src={"https://i5.walmartimages.com/dfw/4ff9c6c9-4fc7/k2-_e184f5e4-a3e0-4c48-a3a2-9c3244f48134.v1.jpg"}
                  alt="image"
                />
                <div className="space-y-4 p-4">
                  <SectionTitle title="Serene bedroom" size="lg" className="my-0" />
                  <p className="mt-0">Dreamy layers, a blanket tossed just so—that&apos;s all it takes</p>
                  <Button className="btn-default">Shop now</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleCategoryPage;
