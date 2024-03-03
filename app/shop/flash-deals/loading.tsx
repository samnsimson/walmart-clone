import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";

const Loading: FC = () => {
  return (
    <div className="space-y-6">
      <div className="my-6 space-y-2">
        <Skeleton className="h-6 w-48 bg-zinc-200" />
        <Skeleton className="h-6 w-48 bg-zinc-200" />
      </div>
      <div className="grid grid-cols-6 gap-6">
        {[...Array(6)].map((_, key) => (
          <div className="col-span-1 space-y-6" key={key}>
            <Skeleton className="h-72 bg-zinc-200" />
            <div className="space-y-4">
              <Skeleton className="h-6 bg-zinc-200" />
              <Skeleton className="h-6 bg-zinc-200" />
              <Skeleton className="h-6 w-36 bg-zinc-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Loading;
