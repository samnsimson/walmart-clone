"use client";
import { Product } from "@prisma/client";
import { FC, HTMLAttributes, useState } from "react";
import { ProductCard } from "../productCard";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SectionTitle from "../sectionTitle";

interface ProductListProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    description?: string;
    products: Array<Product>;
    pagination?: {
        total: number;
        current: number;
    };
}

export const ProductList: FC<ProductListProps> = ({ title, description, products = [], pagination, ...props }) => {
    const router = useRouter();
    const [{ total, current }] = useState(() => ({
        total: pagination ? pagination.total : 0,
        current: pagination ? pagination.current : 0,
    }));

    const handlePageClick = ({ selected }: any) => {
        const queryParams = new URLSearchParams();
        queryParams.append("page", selected + 1);
        router.push(`?${queryParams}`);
    };

    return (
        <div {...props}>
            <SectionTitle title={title} description={description} />
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {products.map((product) => (
                    <ProductCard
                        productId={product.id}
                        image={product.image[0]}
                        title={`${product.name} - ${product.description}`}
                        key={product.id}
                        slug={product.slug as string}
                        price={{ retail: product.retailPrice, sale: product.salePrice }}
                        format="detailed"
                        rating={0}
                    />
                ))}
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel={<ArrowRight />}
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={Math.ceil(total / current)}
                previousLabel={<ArrowLeft />}
                renderOnZeroPageCount={null}
                className="my-6 flex justify-center space-x-6"
                pageClassName="rounded-full w-10 h-10 flex items-center justify-center bg-sky-100 hover:bg-sky-200"
                nextClassName="rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-200"
                previousClassName="rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-200"
                activeClassName="bg-amber-400 font-bold hover:bg-amber-400"
            />
        </div>
    );
};
