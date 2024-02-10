import { CategoryLinks } from "@/components/categoryLinks";
import { Cta } from "@/components/cta";
import { categoryLinks } from "@/constants/links";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="">
      <section className="grid grid-flow-row-dense grid-cols-1 gap-6 p-6 lg:grid-cols-4">
        {categoryLinks.map((category, key) => (
          <CategoryLinks
            key={key}
            {...category}
            className={cn({
              "col-span-2 row-span-2": [1].includes(key),
              "row-span-2": [3, 7].includes(key),
              "col-span-2": [9].includes(key),
              "h-[390px]": [5, 6].includes(key),
            })}
          />
        ))}
      </section>
      <Cta />
    </main>
  );
}
