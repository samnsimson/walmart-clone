import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { PaginatedRecord } from "./types";

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
