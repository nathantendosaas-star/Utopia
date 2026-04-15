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
      <header className="w-full nav-header transition-colors duration-[var(--duration-mode)] ease-in-out">
        <div className="max-w-[1280px] mx-auto px-[clamp(1.25rem,5vw,4rem)] py-4">
          <div className="flex justify-between items-center">
            {/* Left: Nav Links */}
            <div className="hidden lg:flex items-center gap-8">
              <Link to="/shop" className="nav-link hover:text-[var(--color-accent-primary)] transition-colors">The Archive</Link>
              <Link to="/archives" className="nav-link hover:text-[var(--color-accent-primary)] transition-colors">Selected Pieces</Link>
              <Link to="/about" className="nav-link hover:text-[var(--color-accent-primary)] transition-colors">Culture Notes</Link>
            </div>
            
            {/* Center: Logo */}
            <div className="flex-1 text-center">
              <Link to="/" className="nav-logo hover:opacity-80 transition-opacity">
                UTOPIA
              </Link>
            </div>

            {/* Right: Icons & Menu */}
            <div className="flex justify-end items-center gap-6 text-[var(--color-text-secondary)]">
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="hover:text-[var(--color-accent-primary)] transition-colors duration-[var(--duration-fast)]"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun size={20} strokeWidth={1.5} /> : <Moon size={20} strokeWidth={1.5} />}
              </button>
              <button 
                onClick={() => setSearchOpen(true)}
                className="hover:text-[var(--color-accent-primary)] transition-colors duration-[var(--duration-fast)]"
              >
                <Search size={20} strokeWidth={1.5} />
              </button>
              <button 
                onClick={() => setCartOpen(true)}
                className="hover:text-[var(--color-accent-primary)] transition-colors duration-[var(--duration-fast)] relative"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[var(--color-accent-primary)] text-[#F5F0E8] text-[9px] w-3.5 h-3.5 rounded-[1px] flex items-center justify-center font-mono tracking-tighter">
                    {cartCount}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setUserOpen(true)}
                className="hover:text-[var(--color-accent-primary)] transition-colors duration-[var(--duration-fast)]"
              >
                <User size={20} strokeWidth={1.5} />
              </button>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden hover:text-[var(--color-accent-primary)] transition-colors duration-[var(--duration-fast)]"
              >
                {isMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
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
        <Outlet />
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
