import { Cart } from "../types";

export const addItemToCart = (currentItems: Cart[], newItem: Cart): Array<Cart> => {
  const existing = currentItems.find((item) => item.id === newItem.id);
  if (!existing) return [...currentItems, newItem];
  existing.quantity += newItem.quantity;
  return currentItems.map((item) => (item.id === newItem.id ? existing : item));
};

export const removeItemFromCart = (currentItems: Cart[], id: string): Array<Cart> => {
  const existing = currentItems.find((item) => item.id === id);
  if (!existing) return currentItems;
  else if (existing.quantity === 1) return currentItems.filter((item) => item.id !== id);
  else return currentItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item));
};
