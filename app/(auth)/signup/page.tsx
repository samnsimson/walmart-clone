import { FC } from "react";

interface IPageProps {
  params: { [x: string]: string };
  searchParams: string | string[] | undefined;
}

const SignUp: FC<IPageProps> = ({ ...props }) => {
  return <div {...props}>SignUp</div>;
};

export default SignUp;
