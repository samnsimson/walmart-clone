import Image from "next/image";
import { FC, ReactNode } from "react";

const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className="mx-auto flex max-w-xl flex-col p-6">
            <div className="flex justify-center">
                <Image
                    src="https://i5.walmartimages.com/dfw/4ff9c6c9-d10e/k2-_ef2c8660-96ed-4f64-891d-329fa488c482.v1.png"
                    width={64}
                    height={64}
                    alt="logo"
                    className="my-0"
                />
            </div>
            {children}
        </div>
    );
};
export default AuthLayout;
