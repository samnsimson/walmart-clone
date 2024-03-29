import categoryService from "@/actions/category.action";
import { FC, HTMLAttributes } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { SectionHeaders } from "../sectionHeader";
import Link from "next/link";

interface CategoryCarouselProps extends HTMLAttributes<HTMLDivElement> {
    sectionTitle?: string;
    sectionDescription?: string;
    sectionLink?: string;
    columns?: 6 | 11 | 12;
}

export const CategoryCarousel: FC<CategoryCarouselProps> = async ({ sectionTitle, sectionDescription, sectionLink, className, columns = 11, ...props }) => {
    const categories = await categoryService.getCategories({ where: { parentId: null } });
    return (
        <div {...props} className={cn("space-y-6", className)}>
            <SectionHeaders {...{ sectionTitle, sectionDescription, sectionLink }} />
            <Carousel opts={{ align: "start", slidesToScroll: 6 }}>
                <CarouselContent>
                    {categories.map((category, key) => (
                        <CarouselItem key={key} className={cn({ "basis-1/11": columns === 11, "basis-1/6": columns === 6 })}>
                            <Link href={`/shop/categories/${category.id}`} passHref>
                                <div className="flex flex-col items-center justify-center space-y-4">
                                    <Image
                                        src={`https://picsum.photos/seed/picsum/120/120`}
                                        alt="category image"
                                        width={120}
                                        height={120}
                                        className="rounded-full"
                                    />
                                    <p className="line-clamp-1 text-sm">{category.name}</p>
                                </div>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-5 shadow-xl ring-1 ring-black" />
                <CarouselNext className="right-5 shadow-xl ring-1 ring-black" />
            </Carousel>
        </div>
    );
};
