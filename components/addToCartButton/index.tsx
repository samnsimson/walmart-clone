"use client";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { FC } from "react";
import useStore from "@/lib/store";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const addToCartButtonVariants = cva("flex items-center justify-center", {
    variants: {
        type: {
            default: "rounded-full bg-blue-500 text-white font-bold h-auto hover:bg-blue-600 hover:text-white",
            simple: "btn-default",
        },
        display: {
            inline: "max-w-xs flex",
            fluid: "w-full",
            block: "block",
        },
        size: {
            sm: "py-2 px-4 prose-2xl",
            xl: "py-3 px-4 prose-3xl",
        },
    },
    defaultVariants: {
        type: "default",
        display: "inline",
        size: "xl",
    },
});

interface AddToCartButtonProps extends VariantProps<typeof addToCartButtonVariants> {
    productId: string;
    buttonText?: string;
}

const AddToCartButton: FC<AddToCartButtonProps> = ({ productId: id, buttonText, type, display, size }) => {
    const { cart, addToCart, removeFromCart } = useStore((state) => state);
    const item = cart.find((item) => item.id === id);

    if (!item) {
        return (
            <Button variant="outline" className={cn(addToCartButtonVariants({ type, display, size }))} size="sm" onClick={() => addToCart({ id, quantity: 1 })}>
                {type === "simple" && <PlusIcon strokeWidth={1} size={24} />}
                <p className="m-0 leading-8">{buttonText ?? "Add"}</p>
            </Button>
        );
    }

    return (
        <div className={cn(addToCartButtonVariants({ type, display, size }))}>
            <div className="flex w-full items-center justify-between">
                <Button
                    variant="outline"
                    size="icon"
                    className="ring-none h-8 w-8 rounded-full border-none bg-blue-400 p-0 text-white outline-none hover:bg-blue-700 hover:text-white"
                    onClick={() => removeFromCart(id)}
                >
                    <MinusIcon size={24} strokeWidth={1} />
                </Button>
                <div className="font-bold leading-8">{item.quantity}</div>
                <Button
                    variant="default"
                    size="icon"
                    className="ring-none h-8 w-8 rounded-full border-none bg-blue-400 p-0 text-white outline-none hover:bg-blue-700 hover:text-white"
                    onClick={() => addToCart({ id, quantity: 1 })}
                >
                    <PlusIcon size={24} strokeWidth={1} />
                </Button>
            </div>
        </div>
    );
};
export default AddToCartButton;
