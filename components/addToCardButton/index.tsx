"use client";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { FC } from "react";
import useStore from "@/lib/store";

interface AddToCartButtonProps {
  productId: string;
  buttonText?: string;
}

const AddToCartButton: FC<AddToCartButtonProps> = ({ productId: id, buttonText }) => {
  const { cart, addToCart, removeFromCart } = useStore((state) => state);
  const item = cart.find((item) => item.id === id);

  if (!item) {
    return (
      <Button variant="outline" className="btn-default" size="sm" onClick={() => addToCart({ id, quantity: 1 })}>
        <PlusIcon strokeWidth={1} color="black" size={24} /> <span>{buttonText ?? "Add"}</span>
      </Button>
    );
  }

  return (
    <div className="flex items-center justify-between">
      <Button variant="outline" size="sm" className="btn-default rounded-full" onClick={() => removeFromCart(id)}>
        <MinusIcon size={24} strokeWidth={1} />
      </Button>
      <div className="font-bold">{item.quantity}</div>
      <Button variant="default" size="sm" className="rounded-full bg-gray-400 text-white" onClick={() => addToCart({ id, quantity: 1 })}>
        <PlusIcon size={24} strokeWidth={1} />
      </Button>
    </div>
  );
};
export default AddToCartButton;
