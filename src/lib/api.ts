import { Product, products } from '../data/products';

export const fetchProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
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
