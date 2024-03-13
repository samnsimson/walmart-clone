import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FC, HTMLAttributes, ReactNode, isValidElement } from "react";

interface SectionHeadersProps extends HTMLAttributes<HTMLDivElement> {
    sectionTitle?: string | null;
    sectionDescription?: string | null;
    sectionLink?: ReactNode | string | null;
    icon?: ReactNode | string;
}

const SectionTitle: FC<SectionHeadersProps> = ({ sectionTitle = null, sectionDescription = null, icon = null }) => {
    return sectionTitle || sectionDescription ? (
        <div className="prose-base flex items-center space-x-3">
            {icon && (
                <div>
                    {isValidElement(icon) ? icon : typeof icon === "string" && <Image src={icon} width={32} height={32} alt="section icon" className="my-0" />}
                </div>
            )}
            {(sectionTitle || sectionDescription) && (
                <div>
                    {sectionTitle && <h2 className="my-0 flex items-center space-x-2 font-bold text-zinc-900">{sectionTitle}</h2>}
                    {sectionDescription && <p className="my-0 text-zinc-500">{sectionDescription}</p>}
                </div>
            )}
        </div>
    ) : null;
};

export const SectionHeaders: FC<SectionHeadersProps> = ({
    sectionTitle = null,
    sectionLink = null,
    sectionDescription = null,
    icon = null,
    className,
    ...props
}) => {
    return (
        <div {...props} className={cn("", className)}>
            {(sectionTitle || sectionDescription || sectionLink) && (
                <div className="flex items-center justify-between">
                    <SectionTitle {...{ sectionTitle, sectionDescription, icon }} />
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
