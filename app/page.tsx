import { CategoryLinks } from "@/components/categoryLinksMain";
import { Cta } from "@/components/cta";
import { categoryLinks } from "@/constants/links";
import { cn } from "@/lib/utils";
import ProductService from "@/actions/product.action";
import { ProductCarousel } from "@/components/productCarousel";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CategoryCarousel } from "@/components/categoryCarousel";
import { CategoryLinksSection } from "@/components/categoryLinksSection";

export default async function Home() {
    const products = await ProductService.getAllProducts();
    return (
        <main className="flex flex-col space-y-6 p-6">
            <section className="grid grid-flow-row-dense grid-cols-1 gap-6 lg:grid-cols-4">
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
            <ProductCarousel
                sectionTitle="Flash Deals"
                sectionDescription="Upto 65% Off"
                sectionLink="/shop/flash-deals"
                products={products.sort(() => Math.random() - 0.5)}
            />
            <Separator className="my-4 w-full" />
            <div className="grid grid-cols-2 gap-6">
                <ProductCarousel
                    sectionTitle="Refresh with a new hue"
                    sectionDescription="Paints, brushes & more."
                    sectionLink="/shop/popular-products"
                    products={products.sort(() => Math.random() - 0.7)}
                    columns={3}
                />
                <div className="relative overflow-hidden rounded py-6">
                    <Image
                        src="https://i5.walmartimages.com/dfw/4ff9c6c9-6a64/k2-_8d2951a5-30b4-420f-921a-665085bf27f4.v1.jpg"
                        alt="ad"
                        fill
                        className="-z-10 w-full rounded-lg object-cover"
                    />
                    <div className="prose-lg z-20 px-6">
                        <h4 className="text-2xl">Glidden&apos;s color of the year</h4>
                        <h1 className="mb-4 text-6xl">Limitless</h1>
                        <Button className="btn-default" size="lg">
                            Shop now
                        </Button>
                    </div>
                </div>
            </div>
            <Separator className="my-4 w-full" />
            <ProductCarousel
                sectionTitle="Popular in Kitchen & Dining"
                sectionDescription="Shop brands for your kitchen now"
                sectionLink="/shop/popular-products"
                products={products.sort(() => Math.random() - 0.7)}
            />
            <Separator className="my-4 w-full" />
            <CategoryCarousel sectionTitle="Get it all right here" />
            <Separator className="my-4 w-full" />
            <CategoryLinksSection
                images={[
                    "https://i5.walmartimages.com/dfw/4ff9c6c9-e621/k2-_eb430fef-eb0f-4bcd-be8b-818ad9e13e7f.v1.jpg",
                    "https://i5.walmartimages.com/dfw/4ff9c6c9-3c3f/k2-_bc552606-8393-4b00-8d66-441eee29b8b7.v1.jpg",
                    "https://i5.walmartimages.com/dfw/4ff9c6c9-ac2c/k2-_49623de7-91d2-4526-adf4-d883f273d6d0.v1.jpg",
                    "https://i5.walmartimages.com/seo/BEAUTYPEAK-64-x21-Full-Length-Mirror-Rectangle-Body-Dressing-Floor-Standing-Mirrors-Gold_eb366855-48c7-479d-a927-adb1121b933e.fd100b1dd72e3783f5765773101d5584.jpeg",
                    "https://i5.walmartimages.com/seo/4-ft-Artificial-Olive-Plants-Realistic-Leaves-Natural-Trunk-Silk-Fake-Potted-Tree-Wood-Branches-Fruits-Faux-Office-Home_64679df2-0b36-40e0-b64c-a9eee3af6cb2.92a38f749112750ece6ff934efd2f759.jpeg",
                ]}
            />
            <Separator className="my-4 w-full" />
            <ProductCarousel
                sectionTitle="Now in Season"
                sectionDescription="Home, Fashion & Beyond"
                sectionLink="/shop/popular-products"
                products={products.sort(() => Math.random() - 0.7)}
            />
        </main>
    );
}
