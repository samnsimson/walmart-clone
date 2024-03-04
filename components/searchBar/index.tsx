"use client";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Search, XIcon } from "lucide-react";
import { tsClient } from "@/lib/typesense";
import Link from "next/link";
import Image from "next/image";
import { SectionHeaders } from "../sectionHeader";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { truncate } from "lodash";
import { usePathname } from "next/navigation";

interface SearchBarProps extends HTMLAttributes<HTMLDivElement> {
  [x: string]: any;
}

export const SearchBar: FC<SearchBarProps> = ({ ...props }) => {
  const [currentPath, setCurrentPath] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");
  const [queryResult, setQueryResult] = useState<Array<{ id: string; name: string; description: string; image: string }>>([]);
  const path = usePathname();

  useEffect(() => {
    if (query && query.length > 3) {
      tsClient
        .collections("Product")
        .documents()
        .search({ q: query, query_by: "name" })
        .then((result) => {
          if (result.hits && result.hits.length) {
            setQueryResult(result.hits.map(({ document: { id, name, description, image } }: any) => ({ id, name, description, image: image[0] })));
            setCurrentPath(path);
          } else {
            setQueryResult([]);
          }
        });
    } else {
      setQueryResult([]);
    }
    if (currentPath !== path) setQuery("");
  }, [query, path, currentPath]);

  return (
    <div className="relative flex w-full items-center justify-center rounded-full bg-white pl-4" {...props}>
      <Input
        className="h-10 border-none bg-transparent leading-8 text-black shadow-none focus-visible:shadow-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Search everything at Walmart online and in store"
        onChange={(e) => setQuery(e.target.value)}
      />
      <Search strokeWidth={1} size={40} color="#000" className="m-1 rounded-full bg-secondary p-2" />
      {queryResult.length > 0 && (
        <div className="absolute left-0 top-[120%] z-10 w-full space-y-4 rounded border-1 bg-white p-4 shadow">
          <SectionHeaders
            sectionTitle={`Your search results for "${truncate(query, { length: 45 })}"`}
            sectionLink={
              <Badge variant="default" className="space-x-2" onClick={() => setQueryResult([])}>
                <XIcon size={14} color="white" />
                <span>Close</span>
              </Badge>
            }
          />
          <Separator />
          <ul>
            {queryResult.map((result, key) => (
              <Link href={`/shop/product/${result.id}`} key={key} className="group">
                <li className="flex items-center space-x-3 py-2 text-black">
                  <Image src={result.image} alt={result.name} width={72} height={72} className="rounded-lg" />
                  <div>
                    <p className="font-semibold group-hover:text-sky-600 group-hover:underline">{result.name}</p>
                    <p className="line-clamp-1 text-base font-normal text-gray-500">{result.description}</p>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
