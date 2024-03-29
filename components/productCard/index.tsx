import { FC } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import Link from "next/link";
import AddToCartButton from "../addToCartButton";
import { FavouritesButton } from "../favouritesButton";

interface BaseProductCardProps {
    productId: string;
    image: string;
    title: string;
    slug: string;
    price: {
        retail: number;
        sale: number;
    };
}

type CompactFormat = {
    format: "compact";
};

type DetailedFormat = {
    format: "detailed";
    rating: number;
};

type ProductCardProps = BaseProductCardProps & (CompactFormat | DetailedFormat);

export const ProductCard: FC<ProductCardProps> = ({ productId, title, image, price: { retail, sale }, ...props }) => {
    return (
        <Card {...props} className="overflow-hidden border-0 p-1 shadow-none">
            <CardHeader className="relative overflow-hidden rounded-lg p-0">
                <AspectRatio ratio={1 / 1}>
                    <Image alt={title} fill src={image} sizes="(max-width: 768px) 100vw, 33vw" />
                </AspectRatio>
                <FavouritesButton productId={productId} />
            </CardHeader>
            <Link href={{ pathname: `/shop/product/${productId}` }}>
                <CardContent className="prose-base px-0 py-4">
                    <h3 className="m-0">
                        {sale && <span className="font-bold text-success">Now ${sale}</span>}{" "}
                        {retail && <span className="text-base text-zinc-500 line-through">${retail}</span>}
                    </h3>
                    <p className="m-0 line-clamp-2 leading-snug hover:underline">{title}</p>
                </CardContent>
            </Link>
            <CardFooter className="block p-0">
                <AddToCartButton productId={productId} type="simple" size="sm" />
            </CardFooter>
        </Card>
    );
};
