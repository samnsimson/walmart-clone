import { FC, HTMLAttributes } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { title } from "process";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";

interface BaseProductCardProps {
  image: string[];
  title: string;
  price: {
    retail: number;
    sale: number;
  };
}

type CompactFalse = {
  compact: false;
  rating: number;
};

type CompactTrue = {
  compact: true;
};

type ProductCardProps = BaseProductCardProps & (CompactFalse | CompactTrue);

export const ProductCard: FC<ProductCardProps> = ({ title, image, price: { retail, sale }, ...props }) => {
  return (
    <Card {...props} className="overflow-hidden border-0 p-1 shadow-none">
      <CardHeader className="relative overflow-hidden rounded-lg p-0">
        <AspectRatio ratio={1 / 1}>
          <Image alt={title} fill src={image[0]} />
        </AspectRatio>
      </CardHeader>
      <CardContent className="prose px-0 py-4">
        <h5 className="m-0">
          {sale && <span className="text-success font-semibold">Now ${sale}</span>} {retail && <span className="text-base line-through">${retail}</span>}
        </h5>
        <p className="m-0 line-clamp-2 leading-snug">{title}</p>
      </CardContent>
      <CardFooter className="p-0">
        <Button variant="outline" className="btn-default" size="sm">
          <PlusIcon strokeWidth={1} color="black" size={24} /> <span>Add</span>
        </Button>
      </CardFooter>
    </Card>
  );
};
