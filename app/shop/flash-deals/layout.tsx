import { FC, ReactNode } from "react";

const FlashDealsLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="p-6">{children}</div>;
};

export default FlashDealsLayout;
