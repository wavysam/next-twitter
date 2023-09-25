import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isBase64Image = (value: string): boolean => {
  const regex = /^data:image\/\w+;base64,/;
  return regex.test(value);
};

export const delay = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
