import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
}

export interface User {
  name: string;
  email: string;
  orders: Order[];
}

interface StoreContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  cartTotal: number;
  cartCount: number;
  
  user: User | null;
  login: () => void;
  logout: () => void;
  checkout: () => void;

  isCartOpen: boolean;
  setCartOpen: (isOpen: boolean) => void;
  isSearchOpen: boolean;
  setSearchOpen: (isOpen: boolean) => void;
  isUserOpen: boolean;
  setUserOpen: (isOpen: boolean) => void;
  isNavOpen: boolean;
  setNavOpen: (isOpen: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  
  currency: 'UGX' | 'USD' | 'GBP';
  setCurrency: (currency: 'UGX' | 'USD' | 'GBP') => void;
  
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isUserOpen, setUserOpen] = useState(false);
  const [isNavOpen, setNavOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [currency, setCurrency] = useState<'UGX' | 'USD' | 'GBP'>('UGX');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isCartOpen || isSearchOpen || isUserOpen || isNavOpen || quickViewProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen, isSearchOpen, isUserOpen, isNavOpen, quickViewProduct]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return removeFromCart(productId);
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity } : item));
  };

  const cartTotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const login = () => {
    setUser({
      name: "Demo User",
      email: "demo@utopia199x.com",
      orders: []
    });
  };

  const logout = () => {
    setUser(null);
  };

  const checkout = () => {
    let currentUser = user;
    if (!currentUser) {
      currentUser = {
        name: "Demo User",
        email: "demo@utopia199x.com",
        orders: []
      };
    }
    
    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 1000000)}`,
      date: new Date().toISOString(),
      items: [...cart],
      total: cartTotal
    };

    setUser({
      ...currentUser,
      orders: [newOrder, ...currentUser.orders]
    });
    
    setCart([]);
  };

  return (
    <StoreContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount,
      user, login, logout, checkout,
      isCartOpen, setCartOpen,
      isSearchOpen, setSearchOpen,
      isUserOpen, setUserOpen,
      isNavOpen, setNavOpen,
      quickViewProduct, setQuickViewProduct,
      currency, setCurrency,
      isLoading, setLoading
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
