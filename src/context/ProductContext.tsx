import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { Product } from '../types/schema';

export interface Filters {
  categories: string[];
  sizes: string[];
  colors: string[];
  minPrice: number;
  maxPrice: number;
}

export type SortOption = 'latest' | 'price-low' | 'price-high' | 'popular';

interface ProductContextType {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  sort: SortOption;
  setSort: (sort: SortOption) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  currency: 'UGX' | 'USD' | 'GBP';
  setCurrency: (currency: 'UGX' | 'USD' | 'GBP') => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    sizes: [],
    colors: [],
    minPrice: 0,
    maxPrice: 1000000
  });
  const [sort, setSort] = useState<SortOption>('latest');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [currency, setCurrency] = useState<'UGX' | 'USD' | 'GBP'>('UGX');

  return (
    <ProductContext.Provider value={{
      filters, setFilters,
      sort, setSort,
      quickViewProduct, setQuickViewProduct,
      currency, setCurrency
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
}
