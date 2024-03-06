import { cn } from "@/lib/utils";
import { FC, HTMLAttributes } from "react";

interface SectionTitleProps extends HTMLAttributes<HTMLDivElement> {
    title?: string;
    description?: string;
    size?: "base" | "sm" | "lg" | "xl";
}

const SectionTitle: FC<SectionTitleProps> = ({ title = null, description = null, size = "xl", className }) => {
    return (
        <div className={cn("prose-xl my-6", className)}>
            {title && (
                <h3 className={cn("text-base font-bold text-gray-800", { "text-2xl": size === "xl", "text-xl": size === "lg", "text-lg": size === "sm" })}>
                    {title}
                </h3>
            )}
            {description && <p className={cn("text-base text-zinc-700")}>{description}</p>}
        </div>
    );
};
export default SectionTitle;
