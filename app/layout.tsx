import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { Header } from "@/components/header";
import { Fotoer } from "@/components/footer";
import QueryProvider from "@/providers/queryProvider";
import { cn } from "@/lib/utils";
import AuthProvider from "@/providers/authProvider";
import { getServerSession } from "next-auth";
import "./globals.css";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Walmart | Save money. Live better",
    description: "Save Money. Live Better",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const session = await getServerSession();
    return (
        <html lang="en">
            <body className={cn("flex min-h-[100vh] flex-col", openSans.className)} suppressHydrationWarning={true}>
                <AuthProvider session={session}>
                    <QueryProvider>
                        <Header />
                        <main className="relative flex-grow">{children}</main>
                        <Fotoer />
                    </QueryProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
