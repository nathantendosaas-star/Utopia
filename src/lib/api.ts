import { Product, products } from '../data/products';
import { Filters, SortOption } from '../context/StoreContext';
import { filterProducts, sortProducts } from './utils';

export const fetchProducts = (filters?: Filters, sort?: SortOption): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let result = [...products];
      if (filters) {
        result = filterProducts(result, filters);
      }
      if (sort) {
        result = sortProducts(result, sort);
      }
      resolve(result);
    }, 800); // Simulate network latency
  });
};

export const fetchProductById = (id: string): Promise<Product | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products.find(p => p.id === id));
    }, 500);
  });
};
