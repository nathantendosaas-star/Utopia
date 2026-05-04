import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';
import { User, Order, OrderCustomer } from '../types/schema';
import { useCart } from './CartContext';
import { orderService } from '../services/dataService';
import { buildWhatsAppAppUrl } from '../lib/whatsapp';

interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
  checkout: (customer: OrderCustomer) => Promise<void>;
  prestigePoints: number;
  prestigeRank: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { cart, cartTotal, clearCart } = useCart();
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const saved = localStorage.getItem('utopia_auth');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('utopia_auth', JSON.stringify(user));
    } else {
      localStorage.removeItem('utopia_auth');
    }
  }, [user]);

  const login = () => {
    // Simulated login
    setUser({
      name: "Demo User",
      email: "demo@utopia199x.com",
      orders: [],
      prestigePoints: 450
    });
  };

  const logout = () => {
    setUser(null);
  };

  const checkout = async (customer: OrderCustomer) => {
    if (cart.length === 0) return;

    const currentUser = user || {
      name: customer.name || "Guest User",
      email: "guest@utopia199x.com",
      orders: [],
      prestigePoints: 0
    };
    
    const newOrder: Order = {
      id: `ORD-${crypto.randomUUID().split('-')[0].toUpperCase()}`,
      date: new Date().toISOString(),
      items: [...cart],
      total: cartTotal,
      status: 'whatsapp_pending',
      customer,
      channel: 'whatsapp',
    };

    try {
      await orderService.saveOrder(newOrder);

      const earnedPoints = Math.floor(cartTotal * 0.05); // 5% point earn rate

      setUser({
        ...currentUser,
        orders: [newOrder, ...currentUser.orders],
        prestigePoints: currentUser.prestigePoints + earnedPoints
      });

      window.location.href = buildWhatsAppAppUrl(newOrder);
      clearCart();
    } catch (error) {
      console.error('Checkout Error:', error);
      alert('CHECKOUT_PROTOCOL_FAILED');
      throw error;
    }
  };

  const prestigePoints = user?.prestigePoints || 0;
  const prestigeRank = useMemo(() => {
    if (prestigePoints >= 10000) return 'PLATINUM';
    if (prestigePoints >= 5000) return 'GOLD';
    if (prestigePoints >= 1000) return 'SILVER';
    return 'BRONZE';
  }, [prestigePoints]);

  const value = useMemo(() => ({
    user, login, logout, checkout, prestigePoints, prestigeRank
  }), [user, login, logout, checkout, prestigePoints, prestigeRank]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
