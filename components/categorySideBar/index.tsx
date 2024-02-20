import { cn } from "@/lib/utils";
import categoryService from "@/service/category.service";
import { FC, HTMLAttributes } from "react";
import SectionTitle from "../sectionTitle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

interface CatgegorySideBarProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export const CatgegorySideBar: FC<CatgegorySideBarProps> = async ({ className, title = "Categories", ...props }) => {
  let categories = await categoryService.getCategories();
  categories = categories.filter((x, idx, self) => self.findIndex((t) => t["name"] === x["name"]) === idx);
  return (
    <div {...props}>
      <SectionTitle title={title} className="mt-0" />
      <ul className={cn("", className)}>
        {categories.map((category, key) => (
          <Link href={category.id} key={key} passHref className="block border-b-1 border-gray-400 last:border-b-0">
            <li className="flex items-center justify-start space-x-6 px-4 py-6 ">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="font-bold">{category.name}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};
