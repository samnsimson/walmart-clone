"use client";

import { FC } from "react";
import { Button } from "../ui/button";
import { HeartIcon } from "lucide-react";
import useStore from "@/lib/store";

export const AddToListButton: FC<{ productId: string }> = ({ productId }) => {
    const { favourites, addToFavourites, removeFromFavourites } = useStore((state) => state);
    const isFavourite = favourites.find((x) => x.id === productId);
    return (
        <Button variant="link" onClick={() => (isFavourite ? removeFromFavourites(productId) : addToFavourites(productId))}>
            <HeartIcon size={16} className="mx-2" color={isFavourite && "red"} fill={isFavourite ? "red" : "none"} />
            Add to list
        </Button>
    );
};
