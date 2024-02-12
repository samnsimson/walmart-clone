import { FC, HTMLAttributes } from "react";

interface SignUpProps extends HTMLAttributes<HTMLDivElement> {
  [x: string]: any;
}

const SignUp: FC<SignUpProps> = ({ ...props }) => {
  return <div {...props}>SignUp</div>;
};

export default SignUp;
