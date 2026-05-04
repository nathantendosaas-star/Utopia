import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface UIContextType {
  isCartOpen: boolean;
  setCartOpen: (isOpen: boolean) => void;
  isSearchOpen: boolean;
  setSearchOpen: (isOpen: boolean) => void;
  isUserOpen: boolean;
  setUserOpen: (isOpen: boolean) => void;
  isNavOpen: boolean;
  setNavOpen: (isOpen: boolean) => void;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [isCartOpen, setCartOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isUserOpen, setUserOpen] = useState(false);
  const [isNavOpen, setNavOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  // Prevent scroll when any modal is open
  useEffect(() => {
    if (isCartOpen || isSearchOpen || isUserOpen || isNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen, isSearchOpen, isUserOpen, isNavOpen]);

  const value = React.useMemo(() => ({
    isCartOpen, setCartOpen,
    isSearchOpen, setSearchOpen,
    isUserOpen, setUserOpen,
    isNavOpen, setNavOpen,
    isLoading, setLoading
  }), [isCartOpen, isSearchOpen, isUserOpen, isNavOpen, isLoading]);

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}
