import { SignInForm } from "@/components/signInForm";
import { NextPageProps } from "@/lib/types";
import { NextPage } from "next";
import Link from "next/link";

const SignIn: NextPage<NextPageProps> = ({}) => {
    return (
        <div className="prose-base flex flex-col items-center justify-center space-y-4">
            <h3 className="my-0 font-bold">Sign in or create your account</h3>
            <SignInForm />
            <Link href="/signup">Create an account</Link>
        </div>
    );
};

export default SignIn;
