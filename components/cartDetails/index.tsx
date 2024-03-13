import { FC, HTMLAttributes } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { XIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

interface CartDetailsProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

const CartBanner: FC = () => {
    return (
        <div className="prose-sm flex items-center space-x-3 rounded-xl bg-[#002d58] p-3">
            <Image
                src="https://i5.walmartimages.com/dfw/4ff9c6c9-69ed/k2-_c5fc89eb-a765-445a-846c-c88b31ebf4f2.v1.png"
                width={40}
                height={40}
                alt="icon"
                className="my-0"
            />
            <p className="my-0 leading-snug text-white">Items in your cart have reduced prices. Check out now for extra savings!</p>
            {/* <Button variant="ghost" className="rounded-full text-white hover:bg-transparent hover:text-white">
                <XIcon />
            </Button> */}
        </div>
    );
};

export const CartDetails: FC<CartDetailsProps> = ({ ...props }) => {
    return (
        <div {...props} className="flex flex-col space-y-6 py-6">
            <Button className="w-full rounded-full font-semibold text-white" size="lg">
                Continue to checkout
            </Button>
            <CartBanner />
            <div className="w-full">
                <table className="w-full">
                    <tr>
                        <td className="py-2">
                            <span className="font-semibold">Subtotal</span> <span>(4 Items)</span>
                        </td>
                        <td className="py-2 text-right">1098</td>
                    </tr>
                    <tr>
                        <td className="py-2">
                            <span className="font-semibold">Savings</span>
                        </td>
                        <td className="py-2 text-right">
                            <Badge className="rounded bg-green-500/20 text-base font-semibold text-success">$500</Badge>
                        </td>
                    </tr>
                    <tr>
                        <td />
                        <td className="py-2 text-right text-base font-semibold text-success">$500</td>
                    </tr>
                </table>
                <Separator className="my-3" />
                <table className="w-full">
                    <tr>
                        <td className="py-2">Shipping</td>
                        <td className="py-2 text-right">Free</td>
                    </tr>
                    <tr>
                        <td className="py-2 font-bold">Taxes</td>
                        <td className="py-2 text-right">Calculated at checkout</td>
                    </tr>
                </table>
                <Separator className="my-3" />
                <table className="w-full">
                    <tr>
                        <td className="py-2 font-bold">Estimated Total</td>
                        <td className="py-2 text-right font-bold text-success">$1000</td>
                    </tr>
                </table>
            </div>
        </div>
    );
};
