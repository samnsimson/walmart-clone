import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC, HTMLAttributes, ReactNode, isValidElement } from "react";
import { Button } from "../ui/button";

interface SectionTitleProps extends HTMLAttributes<HTMLDivElement> {
    title?: string;
    description?: string;
    size?: "base" | "sm" | "lg" | "xl";
    link?: ReactNode | string;
}

const SectionTitle: FC<SectionTitleProps> = ({ title = null, description = null, size = "xl", link, className }) => {
    return (
        <div className="flex items-center justify-between">
            <div className={cn("prose-xl my-6", className)}>
                {title && (
                    <h3
                        className={cn("mb-0 text-base font-bold text-gray-800", {
                            "text-2xl": size === "xl",
                            "text-xl": size === "lg",
                            "text-lg": size === "sm",
                        })}
                    >
                        {title}
                    </h3>
                )}
                {description && <p className={cn("text-base text-gray-500")}>{description}</p>}
            </div>
            {link && isValidElement(link) ? (
                link
            ) : typeof link === "string" ? (
                <Link href={link}>
                    <Button variant="link">View all</Button>{" "}
                </Link>
            ) : null}
        </div>
    );
};
export default SectionTitle;
