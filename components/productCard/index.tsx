import { FC } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { HeartIcon } from "lucide-react";
import Link from "next/link";
import AddToCartButton from "../addToCardButton";

interface BaseProductCardProps {
  productId: string;
  image: string;
  title: string;
  slug: string;
  price: {
    retail: number;
    sale: number;
  };
}

type CompactFormat = {
  format: "compact";
};

type DetailedFormat = {
  format: "detailed";
  rating: number;
};

type ProductCardProps = BaseProductCardProps & (CompactFormat | DetailedFormat);

export const ProductCard: FC<ProductCardProps> = ({ productId, title, image, slug, price: { retail, sale }, ...props }) => {
  return (
    <Card {...props} className="overflow-hidden border-0 p-1 shadow-none">
      <CardHeader className="relative overflow-hidden rounded-lg p-0">
        <AspectRatio ratio={1 / 1}>
          <Image alt={title} fill src={image} sizes="(max-width: 768px) 100vw, 33vw" />
        </AspectRatio>
        <HeartIcon
          className="absolute right-1 top-1 m-0 cursor-pointer rounded-full bg-white p-1 shadow"
          strokeWidth={1}
          color="#000"
          size={32}
          style={{ marginTop: 0 }}
        />
      </CardHeader>
      <Link href={{ pathname: `/shop/product/${slug}` }}>
        <CardContent className="prose-base px-0 py-4">
          <h3 className="m-0">
            {sale && <span className="font-bold text-success">Now ${sale}</span>}{" "}
            {retail && <span className="text-base text-zinc-500 line-through">${retail}</span>}
          </h3>
          <p className="m-0 line-clamp-2 leading-snug">{title}</p>
        </CardContent>
      </Link>
      <CardFooter className="block p-0">
        <AddToCartButton productId={productId} />
      </CardFooter>
    </Card>
  );
};
