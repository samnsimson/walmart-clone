import { NextPage } from "next";

interface IPageProps {
  params: { [x: string]: string };
  searchParams: string | string[] | undefined;
}

const SignIn: NextPage<IPageProps> = ({ ...props }) => {
  return <div {...props}>SignIn</div>;
};

export default SignIn;
