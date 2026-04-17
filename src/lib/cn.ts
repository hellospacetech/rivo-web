import { clsx, type ClassValue } from "clsx";

/**
 * Tiny classname helper. Thin wrapper over clsx, use it everywhere
 * we conditionally compose Tailwind classes.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
