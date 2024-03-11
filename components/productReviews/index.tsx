import { calculateRating, cn } from "@/lib/utils";
import { Review } from "@prisma/client";
import { FC, HTMLAttributes, useMemo } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Card, CardContent } from "../ui/card";
import { StarIcon } from "lucide-react";
import moment from "moment";

interface ProductReviewsProps extends HTMLAttributes<HTMLDivElement> {
    reviews: Array<Review>;
}

export const ProductReviews: FC<ProductReviewsProps> = async ({ reviews, ...props }) => {
    const ratings = useMemo(() => calculateRating(reviews.map((x) => x.rating || 0)), [reviews]);
    return (
        <div className="flex flex-col space-y-6" {...props}>
            <div className="grid grid-cols-2">
                <div className="col-span-1 mb-2 flex flex-col space-y-4">
                    <div className="prose-2xl flex flex-col">
                        <h3 className="font-bold ">
                            {ratings.average} out of {ratings.highestRating}
                        </h3>
                    </div>
                    <div className="flex items-center">
                        {[...Array(5)].map((_, key) => (
                            <svg
                                key={key}
                                className={cn("me-1 h-4 w-4", Math.round(ratings.average) >= key + 1 ? "text-amber-500" : "text-gray-300")}
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                            >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                        ))}
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">({ratings.total} ratings)</p>
                    </div>
                    <div className="flex space-x-6">
                        <Button variant="outline" size="sm" className="rounded-full">
                            View all review
                        </Button>
                        <Button variant="default" size="sm" className="rounded-full text-white">
                            Write a review
                        </Button>
                    </div>
                </div>
                <div className="col-span-1">
                    {[...Array(5)].map((_, key) => {
                        const stat = ratings.stats[key + 1];
                        const statCount = stat.count ? Math.round(stat.count / (key + 1)) : stat.count;
                        return (
                            <div key={key} className="mt-1 flex items-center">
                                <div className="text-sm font-medium text-black underline hover:underline dark:text-blue-500">{key + 1} star</div>
                                <div className="mx-4 h-2 flex-1 rounded bg-gray-200 dark:bg-gray-700">
                                    <div className={`h-2 rounded bg-primary`} style={{ width: `${stat.percentage}%` }} />
                                </div>
                                <div className="min-w-10 text-sm font-medium text-gray-500 dark:text-gray-400">{statCount}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Separator />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {reviews.map((review) => (
                    <Card key={review.id}>
                        <CardContent className="space-y-6 p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center font-semibold">
                                    {Array.from({ length: 5 }, (_, key) => (
                                        <StarIcon key={key} size={16} fill={review.rating && review.rating > key ? "black" : "none"} />
                                    ))}
                                    <p className="ms-2 text-success">
                                        <small>Verified purchase</small>
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        <small>{moment(review.createdAt).format("MM/DD/YYYY")}</small>
                                    </p>
                                </div>
                            </div>
                            <div className="">
                                <h3 className="font-semibold">{review.title}</h3>
                                <p>{review.review}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};
