"use client";
import { fetchMultipleProducts } from "@/lib/hooks";
import useStore from "@/lib/store";
import { Brand, Product } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import AddToCartButton from "../addToCartButton";
import { StarRating } from "../starRating";
import { Button } from "../ui/button";
import { FavouritesButton } from "../favouritesButton";
import Link from "next/link";

interface FavouriteProductsListProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const FavouriteProductsList: FC<FavouriteProductsListProps> = ({ ...props }) => {
    const [products, setProducts] = useState<Array<Product & { brand: Brand }>>([]);
    const { favourites, removeFromFavourites } = useStore((state) => state);
    const mutation = useMutation({ mutationFn: fetchMultipleProducts });

    useEffect(() => {
        mutation.mutate(favourites, { onSuccess: ({ data }) => setProducts(data) });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [favourites]);

    return (
        <div {...props}>
            <ul className="space-y-3">
                {products.map((product) => (
                    <li key={product.id} className="flex items-center justify-between space-x-4 p-3 hover:bg-gray-50">
                        <div className="flex items-center space-x-6">
                            <div className="h-20 w-20">
                                <AspectRatio ratio={1 / 1} className="min-w-20">
                                    <Image src={product.image[0]} alt={product.name} fill className="rounded" />
                                </AspectRatio>
                            </div>
                            <div className="prose flex-1">
                                <Link href={`/shop/product/${product.id}`} className="group no-underline">
                                    <h4 className="m-0 group-hover:underline">{product.name}</h4>
                                    <p className="my-0 line-clamp-2 leading-snug">{product.description}</p>
                                </Link>
                                <p className="my-0 font-semibold text-gray-500">
                                    <small>Brand: {product.brand.name}</small>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between space-x-6">
                            <StarRating />
                            <div className="prose-lg text-center">
                                <h3 className="my-0 font-bold text-success">${product.salePrice.toFixed(2)}</h3>
                                <p className="my-0 text-gray-500 line-through">${product.retailPrice}</p>
                            </div>
                            <AddToCartButton productId={product.id} type="simple" size="sm" buttonText="Add to cart" />
                            <Button className="btn-default" size="sm" onClick={() => removeFromFavourites(product.id)}>
                                Remove
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
