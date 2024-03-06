import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";

const ProductStack: FC<{ count: number }> = ({ count }) => {
    return [...Array(count)].map((_, key) => (
        <div className="col-span-1 flex flex-col space-y-6" key={key}>
            <Skeleton className="min-h-48 bg-zinc-100" />
            <div className="flex flex-col space-y-3">
                <Skeleton className="min-h-10 bg-zinc-100" />
                <Skeleton className="min-h-10 bg-zinc-100" />
                <Skeleton className="min-h-10 w-1/2 bg-zinc-100" />
            </div>
        </div>
    ));
};

const Loading: FC = () => {
    return (
        <div className="flex flex-col space-y-6 py-6">
            <Skeleton className="h-10 w-full bg-zinc-100" />
            <div className="grid grid-cols-6 gap-6">
                <ProductStack count={6} />
            </div>
            <div className="grid grid-cols-4 gap-6 py-6">
                <div className="col-span-1 flex flex-col space-y-4">
                    {[...Array(8)].map((_, key) => (
                        <Skeleton key={key} className="h-20 w-full bg-zinc-100" />
                    ))}
                </div>
                <div className="col-span-3 flex flex-col space-y-4">
                    <Skeleton className="h-96 w-full bg-zinc-100" />
                    <div className="grid grid-cols-4 gap-6">
                        <ProductStack count={4} />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Loading;
