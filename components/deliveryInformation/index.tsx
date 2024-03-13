import { FC, HTMLAttributes } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const deliveryInformationVariants = cva("pb-6 pt-4", {
    variants: {
        bordered: { default: "border-y-1", none: "border-y-0" },
    },
    defaultVariants: {
        bordered: "default",
    },
});

interface DeliveryInformationProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof deliveryInformationVariants> {
    description?: string;
}

export const DeliveryInformation: FC<DeliveryInformationProps> = ({ bordered, description, ...props }) => {
    return (
        <div className={cn("flex flex-col space-y-6", deliveryInformationVariants({ bordered }))} {...props}>
            {description && <h3 className="my-0">{description}</h3>}
            <div className="grid grid-cols-3 gap-6">
                <div className="flex items-center justify-center rounded-lg border-[3px] border-gray-300 p-4">
                    <div className="flex flex-col items-center">
                        <Avatar className="relative h-8 w-8">
                            <AvatarImage
                                className="m-0"
                                src="https://i5.walmartimages.com/dfwrs/76316474-f13c/k2-_d4e8ebb4-9d70-46b4-8f2b-ecc4ac774e07.v1.png"
                            />
                        </Avatar>
                        <p className="m-0">Shipping</p>
                        <p className="m-0">
                            <small>Out of stock</small>
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-center rounded-lg border-[3px] border-gray-300 p-4">
                    <div className="flex flex-col items-center">
                        <Avatar className="relative h-8 w-8">
                            <AvatarImage
                                className="m-0"
                                src="https://i5.walmartimages.com/dfwrs/76316474-8720/k2-_d747b89f-5900-404d-a101-1a3452480882.v1.png"
                            />
                        </Avatar>
                        <p className="m-0">Pickup</p>
                        <p className="m-0">
                            <small>Out of stock</small>
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-center rounded-lg border-[3px] border-gray-300 p-4">
                    <div className="flex flex-col items-center">
                        <Avatar className="relative h-8 w-8">
                            <AvatarImage
                                className="m-0"
                                src="https://i5.walmartimages.com/dfwrs/76316474-39c2/k2-_8deea800-0d44-4984-b1ce-5a3f12b192b7.v1.png"
                            />
                        </Avatar>
                        <p className="m-0">Delivery</p>
                        <p className="m-0">
                            <small>Out of stock</small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
