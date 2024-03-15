import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Cart, PaginatedRecord, RatingsData } from "./types";

declare global {
    interface URLSearchParams {
        toObject(): Record<string, string>;
    }
}

URLSearchParams.prototype.toObject = function () {
    const object: Record<string, string> = {};
    for (const [key, value] of this.entries()) object[key] = value;
    return object;
};

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const isUUID = (str: string) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(str);
};

export const paginate = <T>(items: Array<T> = [], limit: number = 24, page: number = 1): PaginatedRecord<T> => ({
    current: limit,
    total: items.length,
    page,
    data: items.splice((page - 1) * limit, limit),
});

export const calculateRating = (rating: Array<number>): RatingsData => {
    const ratings: any = {};
    const stats: Record<string, any> = {};
    const totalCount = rating.length;
    [1, 2, 3, 4, 5].forEach((r) => (stats[r] = rating.filter((x) => x === r).reduce((a, b) => a + b, 0)));
    const highestCount = Math.max(...Object.values(stats));
    const averageRating = (Object.entries(stats).reduce((sum, [rating, count]) => sum + parseInt(rating) * count, 0) / totalCount / 5) * 5;
    const statsWithPercentage = Object.fromEntries(
        Object.entries(stats).map(([key, count]: any) => [key, { count, percentage: Math.round((count / highestCount) * 100) }]),
    );
    ratings["total"] = totalCount;
    ratings["highestCount"] = highestCount;
    ratings["highestRating"] = 5;
    ratings["average"] = parseFloat(averageRating.toFixed(2));
    ratings["stats"] = statsWithPercentage;
    return ratings as RatingsData;
};

export const qtyMultiplier = (price: number, id: string, cart: Cart[]) => {
    const product = cart.find((x) => x.id === id);
    if (!product) return 0;
    return price * product.quantity;
};

export const selectFields = (fields: Array<string>) => {
    const select: Record<string, boolean> = {};
    fields.forEach((field) => (select[field] = true));
    return select;
};
