import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Fotoer } from "@/components/footer";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Walmart | Save money. Live better",
  description: "Save Money. Live Better",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <Header />
        {children}
        <Fotoer />
      </body>
    </html>
  );
}
