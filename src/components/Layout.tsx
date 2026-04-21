import React, { useEffect, useState, useRef } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Bookmark, User, X, ChevronDown, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { CartDrawer } from './CartDrawer';
import { SearchModal } from './SearchModal';
import { UserProfile } from './UserProfile';
import { QuickViewModal } from './QuickViewModal';
import { Footer } from './Footer';
import { NavigationDrawer } from './NavigationDrawer';

export function Layout() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [promoVisible, setPromoVisible] = useState(true);
  const { cartCount, setCartOpen, setSearchOpen, setUserOpen, setNavOpen, currency, setCurrency } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Top bar — Promo Text */}
      <AnimatePresence>
        {promoVisible && (
          <motion.div 
            exit={{ height: 0, opacity: 0 }}
            className="bg-black text-white text-[11px] font-bold py-3 px-4 flex justify-between items-center z-[110] relative"
          >
            <div className="flex-1 text-center uppercase tracking-widest">
              DOWNLOAD THE APP FOR 20% OFF YOUR FIRST ORDER
            </div>
            <button onClick={() => setPromoVisible(false)} className="absolute right-4">
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Header */}
      <header 
        className={`fixed w-full z-[100] transition-all duration-300 ease-in-out border-b
          ${scrolled || location.pathname !== '/' 
            ? 'bg-white text-black border-gray-100 py-4' 
            : 'bg-transparent text-white border-transparent py-6'}
        `}
      >
        <div className="max-w-[1800px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between">
            
            {/* Left Nav */}
            <div className="flex items-center gap-6 flex-1">
              <button onClick={() => setNavOpen(true)} className="lg:hidden p-2 -ml-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              </button>
              <Link to="/shop" className="hidden lg:block text-[12px] font-bold uppercase tracking-wider hover:opacity-70 transition-opacity">
                Shop
              </Link>
              <Link to="/shop?cat=247" className="hidden lg:block text-[12px] font-bold uppercase tracking-wider hover:opacity-70 transition-opacity flex items-center gap-1">
                247 <Zap size={12} fill="currentColor" />
              </Link>
            </div>

            {/* Center: Logo */}
            <div className="flex justify-center">
              <Link to="/" className="text-2xl font-black uppercase tracking-tighter">
                UTOPIA UG
              </Link>
            </div>

            {/* Right Nav */}
            <div className="flex items-center justify-end gap-6 flex-1">
              <div className="hidden lg:flex items-center gap-6 mr-6">
                <Link to="/retail" className="text-[12px] font-bold uppercase tracking-wider hover:opacity-70 transition-opacity">Retail</Link>
                <Link to="/archives" className="text-[12px] font-bold uppercase tracking-wider hover:opacity-70 transition-opacity">The Vault</Link>
                <Link to="/prestige" className="text-[12px] font-bold uppercase tracking-wider hover:opacity-70 transition-opacity">Prestige</Link>
                <div className="relative group/currency">
                  <button className="text-[12px] font-bold uppercase tracking-wider hover:opacity-70 transition-opacity flex items-center gap-1">
                    {currency} <ChevronDown size={12} />
                  </button>
                  <div className="absolute right-0 top-full pt-2 opacity-0 group-hover/currency:opacity-100 transition-opacity pointer-events-none group-hover/currency:pointer-events-auto z-[200]">
                    <div className="bg-white text-black border border-gray-100 p-2 flex flex-col gap-1 shadow-lg">
                      {['UGX', 'USD', 'GBP'].map((c) => (
                        <button 
                          key={c}
                          onClick={() => setCurrency(c as 'UGX' | 'USD' | 'GBP')}
                          className={`text-[10px] font-bold uppercase px-3 py-1 hover:bg-gray-50 ${currency === c ? 'bg-gray-100' : ''}`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-5">
                <button className="hover:opacity-70 transition-opacity">
                  <Bookmark size={20} strokeWidth={1.5} />
                </button>
                <button onClick={() => setSearchOpen(true)} className="hover:opacity-70 transition-opacity">
                  <Search size={20} strokeWidth={1.5} />
                </button>
                <button onClick={() => setUserOpen(true)} className="hover:opacity-70 transition-opacity">
                  <User size={20} strokeWidth={1.5} />
                </button>
                <button 
                  onClick={() => setCartOpen(true)}
                  className="hover:opacity-70 transition-opacity flex items-center"
                >
                  <ShoppingBag size={20} strokeWidth={1.5} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </header>

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <NavigationDrawer />

      {/* Floating Chat Icon */}
      <div className="fixed bottom-6 right-6 z-[90]">
        <button className="bg-black text-white p-4 rounded-full shadow-lg hover:scale-105 transition-transform">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </button>
      </div>

      <CartDrawer />
      <SearchModal />
      <UserProfile />
      <QuickViewModal />
    </div>
  );
}

