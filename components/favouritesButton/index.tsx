"use client";
import { FC, HTMLAttributes } from "react";
import { Button } from "../ui/button";
import { HeartIcon } from "lucide-react";
import useStore from "@/lib/store";
import { cn } from "@/lib/utils";

interface FavouritesButtonProps extends HTMLAttributes<HTMLButtonElement> {
    productId: string;
}

export const FavouritesButton: FC<FavouritesButtonProps> = ({ productId: id, className, ...props }) => {
    const { addToFavourites, removeFromFavourites, favourites } = useStore((state) => state);
    const itemInFavourites = favourites.find((item) => item.id === id);
    return (
        <Button
            {...props}
            className={cn("absolute right-1 top-1 h-8 w-8 rounded-full p-0", itemInFavourites ? "bg-rose-500 text-white" : "bg-white text-black", className)}
            style={{ marginTop: 0 }}
            onClick={() => (itemInFavourites ? removeFromFavourites(id) : addToFavourites(id))}
        >
            <HeartIcon strokeWidth={itemInFavourites ? 2 : 1} fill={itemInFavourites ? "#fff" : "none"} size={20} />
        </Button>
    );
};
