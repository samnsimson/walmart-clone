/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import useStore from "@/lib/store";
import { Brand, Product } from "@prisma/client";
import { FC, HTMLAttributes, useState } from "react";
import Image from "next/image";
import { CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../ui/button";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Link from "next/link";
import moment from "moment";
import { Separator } from "../ui/separator";
import AddToCartButton from "../addToCartButton";
import { Cart } from "@/lib/types";

interface CartListProps extends HTMLAttributes<HTMLDivElement> {
    cart: Cart[];
    products: Array<Product & { brand: Brand }>;
}

type CartListFooterProp = {
    product: Product;
};

type CartListBodyProp = {
    product: Product & { brand: Brand };
    cart: Cart[];
};

type CartListHeaderProp = {
    product: Product & { brand: Brand };
    cart: Cart[];
};

const CartListItemFooter: FC<CartListFooterProp> = ({ product }) => {
    const { removeFromCart, addToFavourites, removeFromFavourites, favourites, cart } = useStore((state) => state);
    const isInFav = favourites.find((x) => x.id === product.id);
    const cartItem = cart.find((x) => x.id === product.id);
    return (
        <div className="flex items-center justify-end">
            <div className="flex space-x-6">
                <Button variant="link" className="text-black" onClick={() => removeFromCart(product.id, cartItem ? cartItem.quantity : 1)}>
                    Remove
                </Button>
                <Button
                    variant="link"
                    className="space-x-3 text-black"
                    onClick={() => (isInFav ? removeFromFavourites(product.id) : addToFavourites(product.id))}
                >
                    {isInFav && <CheckCircle className="text-success" size={16} strokeWidth={2} />} <span>Save for later</span>
                </Button>
                <AddToCartButton productId={product.id} type="simple" size="sm" />
            </div>
        </div>
    );
};

const CartListBody: FC<CartListBodyProp> = ({ product, cart }) => {
    const calculatePriceWithQuantity = (product: Product, cart: Cart[]) => {
        const cartQuantity = cart.find((x) => x.id === product.id)?.quantity || 1;
        return (product.salePrice * cartQuantity).toFixed(2);
    };
    return (
        <div className="flex items-start space-x-6">
            <div className="min-w-24">
                <AspectRatio ratio={1 / 1} className="overflow-hidden rounded">
                    <Image src={product.image[0]} alt={product.name} fill />
                </AspectRatio>
            </div>
            <div className="flex-1">
                <Link href={`/shop/product/${product.id}`} className="group">
                    <h4 className="line-clamp-2 group-hover:underline">
                        {product.name} - {product.description}
                    </h4>
                    <p className="text-gray-500">
                        <small>{product.brand.name}</small>
                    </p>
                </Link>
            </div>
            <div className="min-w-24 text-right">
                <span className="font-bold">${calculatePriceWithQuantity(product, cart)}</span>
            </div>
        </div>
    );
};

const CartListHeader: FC<CartListHeaderProp> = ({ cart, product }) => {
    return (
        <div className="flex items-center justify-between">
            <h4 className="font-bold">Arrives tomorrow, {moment().add("1 day").format("MMM, DD")}</h4>
            <p>{cart.find((x) => x.id === product.id)?.quantity} Item(s)</p>
        </div>
    );
};

export const CartList: FC<CartListProps> = ({ cart, products, ...props }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div {...props}>
            <div className="prose-base my-3 flex items-center justify-between">
                <h3 className="font-semibold">{products.length} Item(s)</h3>
                <Button variant="ghost" onClick={() => setIsOpen(!isOpen)} className="hover:bg-transparent">
                    {isOpen ? <ChevronUp /> : <ChevronDown />}
                </Button>
            </div>
            {!isOpen ? (
                <div className="flex items-center space-x-3">
                    {products.map((product) => (
                        <Image key={product.id} src={product.image[0]} width={48} height={48} alt={product.name} className="rounded" />
                    ))}
                </div>
            ) : (
                <div className="space-y-8">
                    {products.map((product) => (
                        <div key={product.id} className="">
                            <CartListHeader product={product} cart={cart} />
                            <Separator className="my-6" />
                            <CartListBody product={product} cart={cart} />
                            <CartListItemFooter product={product} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
