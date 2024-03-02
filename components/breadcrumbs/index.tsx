"use client";
import { cn, isUUID } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { capitalize } from "lodash";
import Link from "next/link";
import { Separator } from "../ui/separator";

interface BreadcrumbsProps extends HTMLAttributes<HTMLDivElement> {
  [x: string]: any;
}

const BreadcrumbValue: FC<{ path: string; className?: string }> = ({ path, className }) => <span className={cn("", className)}>{capitalize(path)}</span>;

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ ...props }) => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((path) => path && !isUUID(path));
  const getLinks = (key: number) => paths.slice(0, key + 1).join("/");
  const notLastItem = (key: number) => key + 1 !== paths.length;

  return (
    <div {...props} className="border-b-1 pb-4">
      <div className="flex items-center justify-start ">
        {paths.map((path, key) => (
          <Link
            href={`/${notLastItem(key) ? getLinks(key) : "#"}`}
            className={cn("flex items-center", notLastItem(key) ? "text-gray-500 hover:text-black hover:underline" : "text-black")}
            key={key}
          >
            <BreadcrumbValue path={path} />
            {notLastItem(key) && <Separator orientation="vertical" className="mx-3 h-5 bg-gray-500" />}
          </Link>
        ))}
      </div>
    </div>
  );
};
