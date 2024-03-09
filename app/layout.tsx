import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { Header } from "@/components/header";
import { Fotoer } from "@/components/footer";
import QueryProvider from "@/providers/queryProvider";
import "./globals.css";
import { cn } from "@/lib/utils";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Walmart | Save money. Live better",
    description: "Save Money. Live Better",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={cn("flex min-h-[100vh] flex-col", openSans.className)} suppressHydrationWarning={true}>
                <QueryProvider>
                    <Header />
                    <main className="flex-1">{children}</main>
                    <Fotoer />
                </QueryProvider>
            </body>
        </html>
    );
}
