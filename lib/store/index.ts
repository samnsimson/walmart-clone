import { create } from "zustand";
import { combine, devtools, persist } from "zustand/middleware";
import { Cart, Favourites } from "../types";
import { addItemToCart, addItemToFavourites, removeItemFromCart, removeItemFromFavourites } from "./actions";

interface Store {
    cart: Cart[];
    favourites: Favourites[];
}

const initialState: Store = {
    cart: [],
    favourites: [],
};

const useStore = create(
    devtools(
        persist(
            combine(initialState, (set) => ({
                addToCart: (item: Cart) => set((state) => ({ cart: addItemToCart(state.cart, item) })),
                removeFromCart: (id: string, qty?: number) => set((state) => ({ cart: removeItemFromCart(state.cart, id, qty) })),
                addToFavourites: (id: string) => set((state) => ({ favourites: addItemToFavourites(state.favourites, id) })),
                removeFromFavourites: (id: string) => set((state) => ({ favourites: removeItemFromFavourites(state.favourites, id) })),
            })),
            { name: "walmart" },
        ),
    ),
);

export default useStore;
