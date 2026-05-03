import React, { ReactNode } from 'react';
import { UIProvider } from './UIContext';
import { CartProvider } from './CartContext';
import { AuthProvider } from './AuthContext';
import { ProductProvider } from './ProductContext';

export function StoreProvider({ children }: { children: ReactNode }) {
  return (
    <UIProvider>
      <CartProvider>
        <AuthProvider>
          <ProductProvider>
            {children}
          </ProductProvider>
        </AuthProvider>
      </CartProvider>
    </UIProvider>
  );
}

// Backward compatibility exports (Legacy)
export { useUI as useStoreUI } from './UIContext';
export { useCart as useStoreCart } from './CartContext';
export { useAuth as useStoreAuth } from './AuthContext';
export { useProduct as useStoreProduct } from './ProductContext';
export type { Filters, SortOption } from './ProductContext';

// We will also export a "hook aggregator" to avoid breaking every single file immediately
import { useUI } from './UIContext';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';
import { useProduct } from './ProductContext';

export function useStore() {
  const ui = useUI();
  const cart = useCart();
  const auth = useAuth();
  const product = useProduct();

  return {
    ...ui,
    ...cart,
    ...auth,
    ...product
  };
}
