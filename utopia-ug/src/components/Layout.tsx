import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Search, ShoppingBag, Heart, User, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { CartDrawer } from './CartDrawer';
import { SearchModal } from './SearchModal';
import { UserProfile } from './UserProfile';
import { QuickViewModal } from './QuickViewModal';

export function Layout() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { cartCount, setCartOpen, setSearchOpen, setUserOpen } = useStore();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [isDarkMode]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen transition-colors duration-[var(--duration-mode)] ease-in-out">
      <div className="scanline-global" aria-hidden="true" />
      <div className="lens-overlay" aria-hidden="true" />
      <div className="film-frame" aria-hidden="true" />
      
      {/* Premium Minimal Header */}
      <header className={`w-full transition-colors duration-[var(--duration-mode)] ease-in-out z-[100] ${location.pathname === '/' ? 'fixed top-0 bg-transparent border-none' : 'nav-header'}`}>
        <div className="max-w-[1440px] mx-auto px-[clamp(1.25rem,5vw,6rem)] py-6">
          <div className="flex justify-between items-center relative">
            {/* Left: Menu/Nav */}
            <div className="flex-1 flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="group flex items-center gap-4 hover:text-[var(--color-accent-primary)] transition-colors"
              >
                <div className="flex flex-col gap-1.5 w-6">
                  <span className={`h-[1px] w-full bg-current transition-transform ${isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                  <span className={`h-[1px] w-full bg-current transition-opacity ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                  <span className={`h-[1px] w-full bg-current transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                </div>
                <span className="text-technical hidden sm:block">MENU</span>
              </button>
            </div>
            
            {/* Center: Info/Logo */}
            <div className="flex-[2] text-center">
              {location.pathname === '/' ? (
                <div className="flex flex-col items-center gap-1">
                  <div className="text-technical text-[8px] opacity-40 flex items-center gap-4">
                    <span>0.3476° N, 32.5825° E</span>
                    <span className="h-2 w-[1px] bg-white/20" />
                    <span>KAMPALA</span>
                  </div>
                  <Link to="/" className="nav-logo text-2xl tracking-[0.6em] hover:opacity-80 transition-opacity">
                    UTOPIA
                  </Link>
                </div>
              ) : (
                <Link to="/" className="nav-logo hover:opacity-80 transition-opacity">
                  UTOPIA
                </Link>
              )}
            </div>

            {/* Right: Cart & Actions */}
            <div className="flex-1 flex justify-end items-center gap-8">
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="hidden sm:block hover:text-[var(--color-accent-primary)] transition-colors"
              >
                {isDarkMode ? <Sun size={18} strokeWidth={1} /> : <Moon size={18} strokeWidth={1} />}
              </button>
              <button 
                onClick={() => setSearchOpen(true)}
                className="hidden sm:block hover:text-[var(--color-accent-primary)] transition-colors"
              >
                <Search size={18} strokeWidth={1} />
              </button>
              <button 
                onClick={() => setCartOpen(true)}
                className="flex items-center gap-3 hover:text-[var(--color-accent-primary)] transition-colors group"
              >
                <span className="text-technical hidden sm:block">CART [{cartCount}]</span>
                <ShoppingBag size={18} strokeWidth={1} className="sm:hidden" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[var(--color-bg-secondary)] border-t border-[var(--color-border-subtle)] overflow-hidden"
            >
              <div className="px-[clamp(1.25rem,5vw,4rem)] py-8 flex flex-col gap-6">
                <Link to="/shop" className="nav-link text-left hover:text-[var(--color-accent-primary)] transition-colors">The Archive</Link>
                <Link to="/archives" className="nav-link text-left hover:text-[var(--color-accent-primary)] transition-colors">Selected Pieces</Link>
                <Link to="/about" className="nav-link text-left hover:text-[var(--color-accent-primary)] transition-colors">Culture Notes</Link>
                <button 
                  onClick={() => { setUserOpen(true); setIsMenuOpen(false); }} 
                  className="nav-link text-left hover:text-[var(--color-accent-primary)] transition-colors"
                >
                  Identity
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <CartDrawer />
      <SearchModal />
      <UserProfile />
      <QuickViewModal />

      <footer className="w-full py-[clamp(4rem,8vw,8rem)] px-[clamp(1.25rem,5vw,4rem)] bg-[var(--color-bg-secondary)] border-t border-[var(--color-border-subtle)] relative z-50 transition-colors duration-[var(--duration-mode)] ease-in-out">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--space-16)] items-start mb-[var(--space-20)]">
            <div className="flex flex-col gap-[var(--space-4)]">
              <h4 className="font-mono text-[var(--text-micro)] uppercase tracking-[var(--tracking-widest)] text-[var(--color-text-secondary)]">The Brand</h4>
              <p className="font-body text-[var(--text-body)] text-[var(--color-text-primary)] leading-[var(--leading-relaxed)] max-w-xs">
                No Wasted Potential. A movement in analog minimalism and structural form.
              </p>
            </div>
            <div className="flex flex-col gap-[var(--space-4)]">
              <h4 className="font-mono text-[var(--text-micro)] uppercase tracking-[var(--tracking-widest)] text-[var(--color-text-secondary)]">Navigation</h4>
              <div className="flex flex-col gap-[var(--space-3)] items-start">
                <Link to="/shop" className="btn-ghost">The Archive</Link>
                <Link to="/archives" className="btn-ghost">Selected Pieces</Link>
                <Link to="/about" className="btn-ghost">Culture Notes</Link>
              </div>
            </div>
          </div>
          
          <div className="pt-[var(--space-8)] border-t border-[var(--color-border-subtle)] flex flex-col md:flex-row justify-between items-center gap-[var(--space-6)]">
            <div className="font-mono text-[var(--text-micro)] uppercase tracking-[var(--tracking-widest)] text-[var(--color-text-secondary)]">
              © 199X UTOPIA UG — ALL RIGHTS RESERVED
            </div>
            <div className="flex gap-[var(--space-8)]">
              <Link to="/privacy" className="btn-ghost">Privacy</Link>
              <Link to="/terms" className="btn-ghost">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
