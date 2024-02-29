import { cn } from "@/lib/utils";
import categoryService from "@/actions/category.action";
import { FC, HTMLAttributes } from "react";
import SectionTitle from "../sectionTitle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface CatgegorySideBarProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export const CatgegorySideBar: FC<CatgegorySideBarProps> = async ({ className, title = "Categories", ...props }) => {
  let categories = await categoryService.getCategories({ where: { parentId: null }, include: ["subCategories"] });
  categories = categories.filter((x, idx, self) => self.findIndex((t) => t["name"] === x["name"]) === idx);
  return (
    <div {...props}>
      <SectionTitle title={title} className="mt-0" />
      <Accordion type="single" collapsible>
        {categories.map((category, key) => (
          <AccordionItem value={category.id as string} key={key}>
            <AccordionTrigger>
              <Link href={category.id as string} key={key} passHref>
                <div className="flex items-center justify-start space-x-6">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span className="line-clamp-1 font-bold">{category.name}</span>
                </div>
              </Link>
            </AccordionTrigger>
            <AccordionContent>
              {category.subCategories?.map((subCat, key) => (
                <Link href={subCat.id as string} key={key} passHref className="hover:underline">
                  <div className="flex items-center justify-start space-x-6 py-3">
                    <span className="line-clamp-1 text-zinc-700">{subCat.name}</span>
                  </div>
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
