import { FC, HTMLAttributes } from "react";
import { Button } from "../ui/button";

interface FotoerProps extends HTMLAttributes<HTMLDivElement> {
  [x: string]: any;
}

const footerLinks = [
  "All Departments",
  "Store Directory",
  "Careers",
  "Our Company",
  "Sell on Walmart.com",
  "Help",
  "Product Recalls",
  "Accessibility",
  "Tax Exempt Program",
  "Get the Walmart App",
  "Sign-up for Email",
  "Safety Data Sheet",
  "Terms of Use",
  "Privacy & Security",
  "California Supply Chain Act",
  "Privacy choices iconYour Privacy Choices",
  "Notice at Collection",
  "Request My Personal Information",
  "Brand Shop Directory",
  "Pharmacy",
  "Walmart Business",
  "#IYWYK",
];

export const Fotoer: FC<FotoerProps> = ({ ...props }) => {
  return (
    <div {...props}>
      <div className="flex flex-col items-center bg-[#e6f1fc] ">
        <section className="prose py-8 text-center">
          <p className="mb-4">We&apos;d love to hear what you think!</p>
          <Button size="lg" variant="outline" className="rounded-full border-1 border-[#333] font-bold hover:border-2 hover:border-[#000] hover:bg-white">
            Give feedback
          </Button>
        </section>
      </div>
      <div>
        <section className="bg-primary-dark flex justify-center px-56 pb-6 pt-4">
          <ul className="flex list-none flex-wrap justify-center gap-x-6 text-sm leading-8 text-white">
            {footerLinks.map((links, key) => (
              <li key={key}>{links}</li>
            ))}
          </ul>
        </section>
      </div>
      <div>
        <section className="bg-primary-dark flex justify-center pb-7 pt-2 text-sm text-white">
          <p>&copy;2024 Walmart. All Rights Reserved.</p>
        </section>
      </div>
    </div>
  );
};
