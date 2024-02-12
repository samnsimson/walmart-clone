import { NextPage } from "next";
import { FC, HTMLAttributes } from "react";

interface SignInProps extends HTMLAttributes<HTMLDivElement> {
  [x: string]: any;
}

const SignIn: NextPage<SignInProps> = ({ ...props }) => {
  return <div {...props}>SignIn</div>;
};

export default SignIn;
