"use client";
import { Product } from "@prisma/client";
import { FC, HTMLAttributes, useState } from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { Button } from "../ui/button";
import { HeartIcon, ZoomIn } from "lucide-react";
import { FavouritesButton } from "../favouritesButton";

interface ProductPageImageProps extends HTMLAttributes<HTMLDivElement> {
    product: Product;
}

export const ProductPageImage: FC<ProductPageImageProps> = ({ product, ...props }) => {
    const [mainImage, setMainImage] = useState(product.image[0]);
    return (
        <div className="grid grid-cols-8 gap-6" {...props}>
            <div className="col-span-1 space-y-6">
                {product.image.map((image, key) => (
                    <AspectRatio
                        ratio={1 / 1}
                        key={key}
                        className="overflow-hidden rounded-xl hover:ring-2 hover:ring-blue-500"
                        onMouseOver={() => setMainImage(image)}
                    >
                        <Image src={image} alt="product image" fill />
                    </AspectRatio>
                ))}
            </div>
            <div className="col-span-6 flex items-start justify-center">
                <Image src={mainImage} alt="product image" width={640} height={640} className="h-full rounded-xl" />
            </div>
            <div className="col-span-1 space-y-6">
                <Button className="btn-default relative flex h-10 w-10 items-center justify-center rounded-full p-0">
                    <FavouritesButton productId={product.id} className="left-1 top-1 text-black" />
                </Button>
                <Button className="btn-default flex h-10 w-10 items-center justify-center rounded-full p-0">
                    <ZoomIn size={20} />
                </Button>
            </div>
        </div>
    );
};
