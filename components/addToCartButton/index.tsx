"use client";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { FC } from "react";
import useStore from "@/lib/store";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const addToCartButtonVariants = cva("flex items-center justify-center min-h-10", {
    variants: {
        type: {
            default: "rounded-full bg-primary text-white font-bold h-auto hover:bg-blue-600 hover:text-white",
            simple: "btn-default",
        },
        display: {
            inline: "max-w-xs flex",
            fluid: "w-full",
            block: "block",
        },
        size: {
            sm: "py-2 px-4 prose-2xl h-10",
            xl: "py-3 px-4 prose-3xl h-[50px]",
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
                <p className="m-0 leading-6">{buttonText ?? "Add"}</p>
            </Button>
        );
    }

    return (
        <div className={cn(addToCartButtonVariants({ type, display, size }), { "px-2": size === "sm" })}>
            <div className="flex w-full items-center justify-between">
                <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                        "ring-none rounded-full border-none bg-blue-400 p-0 text-white outline-none hover:bg-blue-700 hover:text-white",
                        size === "sm" ? "h-6 w-6" : "h-8 w-8",
                    )}
                    onClick={() => removeFromCart(id)}
                >
                    <MinusIcon size={size === "sm" ? 16 : 24} strokeWidth={1} />
                </Button>
                <div className={cn("min-w-14 text-center font-bold", size === "sm" ? "leading-4" : "leading-8")}>{item.quantity}</div>
                <Button
                    variant="default"
                    size="icon"
                    className={cn(
                        "ring-none rounded-full border-none bg-blue-400 p-0 text-white outline-none hover:bg-blue-700 hover:text-white",
                        size === "sm" ? "h-6 w-6" : "h-8 w-8",
                    )}
                    onClick={() => addToCart({ id, quantity: 1 })}
                >
                    <PlusIcon size={size === "sm" ? 16 : 24} strokeWidth={1} />
                </Button>
            </div>
        </div>
    );
};
export default AddToCartButton;
