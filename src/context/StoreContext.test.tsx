import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useStore, StoreProvider } from '../context/StoreContext';
import { Product } from '../data/products';
import React from 'react';

const mockProduct: Product = {
  id: 'test-1',
  name: 'Test Shirt',
  price: 50,
  image: '/test.jpg'
};

describe('StoreContext', () => {
  it('should add item to cart', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <StoreProvider>{children}</StoreProvider>;
    const { result } = renderHook(() => useStore(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    expect(result.current.cart.length).toBe(1);
    expect(result.current.cartCount).toBe(1);
    expect(result.current.cartTotal).toBe(50);
  });
});
