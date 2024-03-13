/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { fetchMultipleProducts } from "@/lib/hooks";
import useStore from "@/lib/store";
import { Brand, Product } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { FC, HTMLAttributes, useLayoutEffect, useState } from "react";
import { SectionHeaders } from "../sectionHeader";
import { DeliveryInformation } from "../deliveryInformation";
import { Card, CardContent, CardHeader } from "../ui/card";
import { CartList } from "../cartList";
import Image from "next/image";
import { CartDetails } from "../cartDetails";

interface CartContainerProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const CartContainer: FC<CartContainerProps> = ({ ...props }) => {
    const { cart } = useStore((state) => state);
    const [products, setProducts] = useState<Array<Product & { brand: Brand }>>([]);
    const mutation = useMutation({ mutationFn: fetchMultipleProducts });

    useLayoutEffect(() => {
        mutation.mutate(cart, {
            onSuccess: ({ data }) => setProducts(data),
        });
    }, [cart]);

    return (
        <div className="my-6 grid grid-cols-6 gap-6">
            <div className="col-span-4">
                <SectionHeaders
                    sectionTitle="Pickup and delivery options"
                    icon="https://i5.walmartimages.com/dfwrs/76316474-2775/k2-_3691ba8c-cbca-4439-9112-adb25c1b1803.v1.svg"
                    className="mb-6"
                />
                <DeliveryInformation bordered="none" />
                <Card>
                    <CardHeader className="bg-[#f2f8fd]">
                        <SectionHeaders
                            sectionTitle="Free shipping, arrives between tomorrow, Mar 13 - Thu, Mar 14"
                            sectionDescription="Order within 5 hr 48 min"
                            icon={
                                <Image
                                    src="https://i5.walmartimages.com/dfw/63fd9f59-1b5e/5452ae02-a31f-4ef1-9a45-62ac0b06c13b/v1/mci-shipping.svg"
                                    width={56}
                                    height={56}
                                    alt="shipping icon"
                                    className="my-0"
                                />
                            }
                        />
                    </CardHeader>
                    <CardContent>
                        <CartList cart={cart} products={products} />
                    </CardContent>
                </Card>
            </div>
            <div className="col-span-2">
                <Card className="sticky top-0">
                    <CardContent>
                        <CartDetails />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
