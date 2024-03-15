import { SignInForm } from "@/components/signInForm";
import { NextPageProps } from "@/lib/types";
import { NextPage } from "next";
import Image from "next/image";

const SignIn: NextPage<NextPageProps> = ({}) => {
    return (
        <div className="mx-auto grid max-w-xl p-6">
            <div className="prose-base col-span-1 flex flex-col items-center justify-center space-y-4">
                <Image
                    src="https://i5.walmartimages.com/dfw/4ff9c6c9-d10e/k2-_ef2c8660-96ed-4f64-891d-329fa488c482.v1.png"
                    width={64}
                    height={64}
                    alt="logo"
                    className="my-0"
                />
                <h3 className="my-0 font-bold">Sign in or create your account</h3>
                <SignInForm />
            </div>
        </div>
    );
};

export default SignIn;
