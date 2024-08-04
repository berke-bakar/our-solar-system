import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes));

export function capitalize(str: string) {
  if (str.length > 0)
    return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();

  // Empty string
  return str;
}
