import CategoryBanner from "@/components/categoryBanner";
import { FC, ReactNode } from "react";

const CategoryLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className="mx-auto max-w-screen-xl">
            <div className="grid grid-cols-3 gap-6">
                <CategoryBanner image="https://i5.walmartimages.com/asr/8d9716bc-b050-434c-b4b9-3a5a9f2dd0c5.5553d598a8dcec1472508f3fcd822882.jpeg?odnHeight=576&odnWidth=576&odnBg=FFFFFF" />
                <CategoryBanner image="https://i5.walmartimages.com/asr/502d11c1-f935-48a5-8317-68f17f7c1f2c.ea8eae6943c6c986b476df3dff6b08de.jpeg?odnHeight=576&odnWidth=576&odnBg=FFFFFF" />
                <CategoryBanner image="https://i5.walmartimages.com/seo/Novogratz-Holly-Upholstered-Wingback-Bed-Queen-Ivory-Velvet_775457a6-e7a8-4b22-bf66-447923f46ebc.13456cc514841130879fcb1dfee302b9.jpeg?odnHeight=576&odnWidth=576&odnBg=FFFFFF" />
            </div>
            {children}
        </div>
    );
};
export default CategoryLayout;
