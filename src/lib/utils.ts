import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Product } from '../data/products';
import { Filters, SortOption } from '../context/StoreContext';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filterProducts(products: Product[], filters: Filters): Product[] {
  return products.filter(product => {
    const matchesCategory = filters.categories.length === 0 || filters.categories.includes(product.category || '');
    const matchesSize = filters.sizes.length === 0 || product.sizes?.some(s => filters.sizes.includes(s));
    const matchesColor = filters.colors.length === 0 || product.colors?.some(c => filters.colors.includes(c));
    const matchesPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice;
    
    return matchesCategory && matchesSize && matchesColor && matchesPrice;
  });
}

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];
  switch (sort) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'popular':
      // Simulated popularity
      return sorted;
    case 'latest':
    default:
      return sorted;
  }
}
