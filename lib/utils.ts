import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Convert USD to INR (1 USD = 75 INR approximately)
export function usdToInr(usdPrice: number): number {
  return usdPrice * 75
}

// Format price in Indian Rupees
export function formatIndianPrice(price: number): string {
  // Format with Indian numbering system (e.g., 1,00,000 instead of 100,000)
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  })

  return formatter.format(price)
}

