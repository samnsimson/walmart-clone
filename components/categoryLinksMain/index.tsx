import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";
import { Button } from "../ui/button";

interface CategoryLinksProps extends HTMLAttributes<HTMLAnchorElement> {
  name: string | null;
  description: string | null;
  link: string | null;
  image: string | null;
}

export const CategoryLinks: FC<CategoryLinksProps> = ({ name, description, link, image, className, ...props }) => {
  return (
    <Link href={link || "#"} {...props} className={cn("prose relative min-h-64 max-w-full overflow-hidden rounded-md p-5", "group hover:shadow", className)}>
      {image && <Image fill src={image} alt={String(name)} className="-z-10 object-cover" sizes="(max-width: 768px) 100vw, 33vw" />}
      <div className="z-20 w-[80%]">
        {name && <p className="m-0 text-[28px] font-bold leading-tight">{name}</p>}
        {description && <h4 className="m-0 text-[64px] font-light">{description}</h4>}
        <Button variant="link" className="px-0 text-black group-hover:underline" size="sm">
          Shop now
        </Button>
      </div>
    </Link>
  );
};
