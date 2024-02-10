"use client";
import { FC, HTMLAttributes } from "react";
import { Navigation, SubNavigation } from "../navigation";
import { Separator } from "../ui/separator";

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  [x: string]: any;
}

export const Header: FC<HeaderProps> = ({ ...props }) => {
  return (
    <div {...props}>
      <div className="bg-primary px-4 py-5">
        <Navigation />
      </div>
      <Separator className="bg-white" />
      <div>
        <SubNavigation />
      </div>
    </div>
  );
};
