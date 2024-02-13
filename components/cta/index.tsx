import { FC, HTMLAttributes } from "react";
import { Button } from "../ui/button";
import Image from "next/image";

interface CtaProps extends HTMLAttributes<HTMLDivElement> {
  [x: string]: any;
}

export const Cta: FC<CtaProps> = ({ ...props }) => {
  return (
    <div {...props}>
      <div className="flex items-center justify-center space-x-5 rounded border-1 bg-white p-6 shadow-lg">
        <Image
          src="https://i5.walmartimages.com/dfw/4ff9c6c9-8d78/k2-_7adee527-6076-4277-bef0-982ffd3e9fa3.v1.png?odnHeight=48&odnWidth=61&odnBg=&odnDynImageQuality=70"
          height={48}
          width={61}
          alt="cta image"
        />
        <div className="text-primary-dark text-2xl">Sign in for personalized recommendations and more!</div>
        <Button variant="outline" className="rounded-full border-1 border-black bg-white font-bold ring-black hover:bg-white hover:ring-2" size="lg">
          Sign in or create an account
        </Button>
      </div>
    </div>
  );
};
