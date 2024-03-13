import productAction, { ProductWithAssociations } from "@/actions/product.action";
import { ProductCarousel } from "@/components/productCarousel";
import { ProductPageImage } from "@/components/productPageImage";
import { SectionHeaders } from "@/components/sectionHeader";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { NextPageProps } from "@/lib/types";
import { Product } from "@prisma/client";
import { HeartIcon } from "lucide-react";
import { NextPage } from "next";
import { FC } from "react";
import Link from "next/link";
import { capitalize } from "lodash";
import AddToCartButton from "@/components/addToCartButton";
import { AddToListButton } from "@/components/addToListButton";
import { ProductReviews } from "@/components/productReviews";
import { DeliveryInformation } from "@/components/deliveryInformation";

const ProductPrice: FC<{ retail: Product["retailPrice"]; sale: Product["salePrice"] }> = ({ retail, sale }) => {
    return (
        <div className="my-2">
            <div className="space-x-3">
                <span className="text-3xl font-bold text-success">Now ${sale}</span> <span className="text-base text-gray-500 line-through">${retail}</span>
            </div>
            {retail !== sale && (
                <div className="flex items-center space-x-2 font-bold text-green-700">
                    <Badge className="rounded bg-green-100 font-bold">You save</Badge> <span>${retail - sale}</span>
                </div>
            )}
            <span>
                <small className="text-black">Price when purchased online</small>
            </span>
        </div>
    );
};

const OtherInterestLink: FC<{ productId: string }> = ({ productId: id }) => {
    return (
        <div className="py-4">
            <div className="prose min-w-full rounded bg-[#F2F8FD] p-4">
                <p className="m-0">
                    Interested in other options? <Link href={`/shop/product/related/${id}`}>view related products</Link>
                </p>
            </div>
        </div>
    );
};

const ProductMeta: FC<{ product: ProductWithAssociations }> = ({ product }) => {
    return (
        <div>
            <span className="text-sm">
                <Link href={"#"} className="text-gray-500  no-underline hover:text-black hover:underline">
                    {product.brand?.name}
                </Link>
            </span>
            <h3 className="my-0">
                {product.name} - {product.description}
            </h3>
        </div>
    );
};

const ProductMetaHeader: FC = () => {
    return (
        <div className="flex items-center space-x-2">
            <Badge variant="outline" className="rounded border-blue-500 text-blue-500">
                Reduced Price
            </Badge>
            <Badge variant="default" className="rounded text-white">
                Best seller
            </Badge>
        </div>
    );
};

const ProductDetails: FC<{ product: Product }> = ({ product }) => {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>Product details</AccordionTrigger>
                <AccordionContent className="prose-sm min-w-full">
                    <p className="font-semibold">
                        Our premium-quality artificial olive tree is designed with a high degree of simulation to give you a natural and realistic feel.It comes
                        pre-potted in a white pot,which looks more aesthetically pleasing,and there is no need to buy extra pots to dress up.The leaves are made
                        of silk cloth with bright colors.
                    </p>
                    <p className="font-semibold">
                        As an interior decoration,it is durable and easy to maintain; no watering or pruning is required,you just need to wipe it clean with a
                        damp cloth when you find dust.Its branches are adjustable,so you can rearrange the combinations according to your needs.The premium
                        material and perfect size make this potted faux olive tree a great decoration choice for indoors.It can provide a sense of elegance and
                        romanticism to rooms such as the home,office,bedroom,living room,or reading room.The olive fruit is dyed,does not fade.There is also no
                        bad smell of plastic here.This olive tree can be used for a long time and will not become fragile over time.
                    </p>
                    <ul>
                        <li className="list-disc">
                            LIFELIKE APPEARANCE: The trunk of the artificial olive tree has a lifelike bark texture,imitation branches,leaves with detailed
                            veins,and some fruits embellishments among the leaves,making it an excellent addition to any natural-themed decor.
                        </li>
                        <li className="list-disc">
                            LOW-MAINTENANCE: This artificial plant is ideal for those who want to enjoy the beauty of a plant,without worrying about
                            watering,sunlight,or soil.You just need to dust it regularly.
                        </li>
                        <li className="list-disc">
                            EASY TO PLACE: Standing at 5 feet (60 Inch) tall, it&apos;s perfect for adding highlight and greenery to any space.The artificial
                            olive tree comes in a white square pot that is pre-potted,complementing any modern home decor style.
                        </li>
                        <li className="list-disc">
                            DURABLE AND LONG-LASTING: Made with high-quality materials,this fake olive tree is built to last and will retain its beauty for
                            years to come.
                        </li>
                        <li className="list-disc">
                            VERSATILE DECOR: Ideal for adding a touch of green and elegance to any indoor space,such as living
                            rooms,bedrooms,offices,porch,hallway,staircase corner or even lobbies,etc. 8lb.
                        </li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Specification</AccordionTrigger>
                <AccordionContent className="prose-sm">
                    {product["specification"] &&
                        Object.entries(product.specification).map(([spec, value], key) => {
                            return (
                                <div key={key}>
                                    <span className="font-bold">{capitalize(spec)}</span>: {value}
                                </div>
                            );
                        })}
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>Warranty</AccordionTrigger>
                <AccordionContent className="prose-sm">
                    <p className="font-semibold">Warranty Infomration</p>
                    <p>
                        Please be aware that the warranty terms on items offered for sale by third party Marketplace sellers may differ from those displayed in
                        this section (if any). To confirm warranty terms on an item offered for sale by a third party Marketplace seller, please use the
                        &apos;Contact seller&apos; feature on the third party Marketplace seller&apos;s information page and request the item&apos;s warranty
                        terms prior to purchase.
                    </p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

//function to generate the routes for all the products
export async function generateStaticParams() {
    const products = await productAction.getAllProducts({ limit: -1 });
    return products.map(({ id }) => ({ id }));
}

const SingleProductPage: NextPage<NextPageProps> = async ({ params: { id }, searchParams }) => {
    const product = await productAction.getSingleProduct({ id, include: ["relatedProducts", "relatedToProducts", "review", "brand"] });

    if (!product) return <></>;

    return (
        <div className="mt-6 grid grid-cols-5 gap-6">
            <div className="col-span-3 space-y-6">
                <ProductPageImage product={product} />
                <div className="pb-6 pt-10">
                    <SectionHeaders sectionTitle="Similar items you might like" sectionDescription="Based on what customers bought" />
                    <ProductCarousel products={product.relatedProducts || []} columns={4} />
                    <Separator className="my-8" />
                    <SectionHeaders sectionTitle="About this item" />
                    <ProductDetails product={product} />
                    {product.relatedToProducts && product.relatedToProducts.length > 0 && (
                        <>
                            <SectionHeaders sectionTitle="Customers also considered" className="mt-8" />
                            <ProductCarousel products={product.relatedToProducts || []} columns={4} />
                        </>
                    )}
                </div>
                <SectionHeaders sectionTitle="Customer reviews and ratings" />
                <ProductReviews reviews={product.review ?? []} />
            </div>
            <div className="col-span-2">
                <Card className="sticky top-0">
                    <CardContent className="prose flex min-w-full flex-col space-y-3 px-4 py-6">
                        <ProductMetaHeader />
                        <ProductMeta product={product} />
                        <ProductPrice retail={product.retailPrice} sale={product.salePrice} />
                        <OtherInterestLink productId={product.id} />
                        <AddToCartButton productId={product.id} buttonText="Add to cart" />
                        <DeliveryInformation bordered="default" description="How you'll get this item:" />
                    </CardContent>
                    <CardFooter className="flex justify-around">
                        <AddToListButton productId={product.id} />
                        <Separator className="h-6" orientation="vertical" />
                        <Button variant="link">
                            <HeartIcon size={16} className="mx-2" />
                            Add to Registry
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};
export default SingleProductPage;
