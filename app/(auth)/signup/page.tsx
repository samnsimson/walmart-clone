import { SignUpForm } from "@/components/signUpForm";
import { NextPageProps } from "@/lib/types";
import { NextPage } from "next";

const SignUp: NextPage<NextPageProps> = ({}) => {
    return (
        <div className="prose-base flex flex-col items-center">
            <h3 className="my-0 font-bold">Create your account</h3>
            <SignUpForm />
        </div>
    );
};

export default SignUp;
