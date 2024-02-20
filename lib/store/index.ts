import { create } from "zustand";
import { combine, devtools, persist } from "zustand/middleware";
import { Cart } from "../types";
import { addItemToCart, removeItemFromCart } from "./actions";

interface Store {
  cart: Cart[];
}

const initialState: Store = {
  cart: [],
};

const useStore = create(
  devtools(
    persist(
      combine(initialState, (set) => ({
        addToCart: (item: Cart) => set((state) => ({ cart: addItemToCart(state.cart, item) })),
        removeFromCart: (id: string) => set((state) => ({ cart: removeItemFromCart(state.cart, id) })),
      })),
      { name: "walmart" },
    ),
  ),
);

export default useStore;
