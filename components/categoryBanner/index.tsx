import Image from "next/image";
import { FC } from "react";

interface CategoryBannerProps {
    image: string;
}

const CategoryBanner: FC<CategoryBannerProps> = ({ image }) => {
    return (
        <div className="relative min-h-[480px] overflow-hidden rounded-lg bg-zinc-200">
            <Image src={image} alt="image" fill className="object-cover" />
        </div>
    );
};
export default CategoryBanner;
