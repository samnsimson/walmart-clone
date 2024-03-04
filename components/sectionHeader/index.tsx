import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC, HTMLAttributes, ReactNode, isValidElement } from "react";

interface SectionHeadersProps extends HTMLAttributes<HTMLDivElement> {
  sectionTitle?: string | null;
  sectionDescription?: string | null;
  sectionLink?: ReactNode | string | null;
}

export const SectionHeaders: FC<SectionHeadersProps> = ({ sectionTitle = null, sectionLink = null, sectionDescription = null, className, ...props }) => {
  return (
    <div {...props} className={cn("", className)}>
      {(sectionTitle || sectionDescription || sectionLink) && (
        <div className="flex items-center justify-between">
          {(sectionTitle || sectionDescription) && (
            <div className="prose-base">
              {sectionTitle && <h2 className="my-0 font-bold text-zinc-900">{sectionTitle}</h2>}
              {sectionDescription && <p className="my-0 text-zinc-500">{sectionDescription}</p>}
            </div>
          )}
          {sectionLink && isValidElement(sectionLink) ? (
            sectionLink
          ) : typeof sectionLink === "string" ? (
            <Link href={sectionLink} className="text-sm underline">
              View All
            </Link>
          ) : null}
        </div>
      )}
    </div>
  );
};
