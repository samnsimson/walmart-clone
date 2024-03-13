import { CartContainer } from "@/components/cartContainer";
import { SectionHeaders } from "@/components/sectionHeader";
import { NextPageProps } from "@/lib/types";
import { NextPage } from "next";

const CartPage: NextPage<NextPageProps> = () => {
    return (
        <div className="mx-auto my-10 max-w-screen-xl">
            <SectionHeaders sectionTitle="Cart" className="prose-xl" />
            <CartContainer />
        </div>
    );
};
export default CartPage;
