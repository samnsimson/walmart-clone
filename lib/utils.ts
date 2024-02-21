import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

declare global {
  interface URLSearchParams {
    toObject(): Record<string, string>;
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

URLSearchParams.prototype.toObject = function () {
  const object: Record<string, string> = {};
  for (const [key, value] of this.entries()) object[key] = value;
  return object;
};
