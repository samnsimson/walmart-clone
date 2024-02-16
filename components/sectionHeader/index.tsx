import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";

interface SectionHeadersProps extends HTMLAttributes<HTMLDivElement> {
  sectionTitle?: string | null;
  sectionDescription?: string | null;
  sectionLink?: string | null;
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
          {sectionLink && (
            <Link href={sectionLink} className="text-sm underline">
              View All
            </Link>
          )}
        </div>
      )}
    </div>
  );
};
