import { SectionHeaders } from "@/components/sectionHeader";
import { NextPageProps } from "@/lib/types";
import { NextPage } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeartIcon, RefreshCcw } from "lucide-react";
import { FavouriteProductsList } from "@/components/favouriteProductsList";

const FavouritesPage: NextPage<NextPageProps> = ({ params, searchParams }) => {
    return (
        <div className="mx-auto my-6 max-w-screen-xl">
            <SectionHeaders sectionTitle="My Items" className="mb-6" />
            <Tabs defaultValue="favourites" className="w-full">
                <TabsList className="space-x-4 bg-transparent">
                    <TabsTrigger
                        value="favourites"
                        className="mb-1 space-x-2 rounded-none border-b-4 border-transparent p-2 text-lg active:bg-transparent data-[state=active]:border-primary data-[state=active]:bg-[#e6f1fc] data-[state=active]:shadow-none"
                    >
                        <HeartIcon size={16} /> <span>Favourites</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="reorder"
                        className="mb-1 space-x-2 rounded-none border-b-4 border-transparent p-2 text-lg active:bg-transparent data-[state=active]:border-primary data-[state=active]:bg-[#e6f1fc] data-[state=active]:shadow-none"
                    >
                        <RefreshCcw size={16} /> <span>Reorder</span>
                    </TabsTrigger>
                </TabsList>
                <div className="border-t-1">
                    <TabsContent value="favourites" className="py-6">
                        <FavouriteProductsList />
                    </TabsContent>
                    <TabsContent value="reorder" className="py-6">
                        Change your password here.
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
};
export default FavouritesPage;
