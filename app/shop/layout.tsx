import { Breadcrumbs } from "@/components/breadcrumbs";
import { FC, ReactNode } from "react";

const ShopLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className="p-6">
            <Breadcrumbs />
            {children}
        </div>
    );
};
export default ShopLayout;
