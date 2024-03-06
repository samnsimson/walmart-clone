import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC, HTMLAttributes } from "react";

interface CategoryLinksSectionProps extends HTMLAttributes<HTMLUListElement> {
    images: Array<string>;
}

export const CategoryLinksSection: FC<CategoryLinksSectionProps> = ({ images, ...props }) => {
    return (
        <ul {...props} className={cn("inline-grid grid-flow-row-dense grid-cols-1 gap-6 lg:grid-cols-5 ")}>
            <li className="relative min-h-64 overflow-hidden rounded-lg  bg-zinc-400 md:col-span-2 md:row-span-2">
                <Image src={images[0]} alt="cat-image" fill sizes="" style={{ objectFit: "cover" }} />
            </li>
            <li className="relative min-h-64 overflow-hidden rounded-lg bg-zinc-400  md:col-span-2 md:row-span-1 md:h-72">
                <Image src={images[1]} alt="cat-image" fill sizes="" style={{ objectFit: "cover" }} />
            </li>
            <li className="relative min-h-64 overflow-hidden rounded-lg  bg-zinc-400 md:col-span-1 md:row-span-2">
                <Image src={images[2]} alt="cat-image" fill sizes="" style={{ objectFit: "cover" }} />
            </li>
            <li className="relative min-h-64 overflow-hidden rounded-lg  bg-zinc-400 md:col-span-1 md:row-span-1 md:h-80">
                <Image src={images[3]} alt="cat-image" fill sizes="" style={{ objectFit: "cover" }} />
            </li>
            <li className="relative min-h-64 overflow-hidden rounded-lg bg-zinc-400  md:col-span-1 md:row-span-1 md:h-80">
                <Image src={images[4]} alt="cat-image" fill sizes="" style={{ objectFit: "cover" }} />
            </li>
        </ul>
    );
};
