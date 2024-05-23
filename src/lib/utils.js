import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Returns the first n most recently updated items from the given array
export function recentItems(items, maxItems) {
  return items
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .slice(0, maxItems);
}