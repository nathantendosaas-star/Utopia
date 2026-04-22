import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu } from 'lucide-react';
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
  const { cartCount, setCartOpen, setSearchOpen, setUserOpen, setNavOpen } = useStore();

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

  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-white selection:bg-black selection:text-white">
      {/* 1. Technical Info / Promo Bar */}
      <div className="bg-black text-white text-[10px] py-2 px-6 flex justify-between items-center z-[110] relative font-mono tracking-widest border-b border-white/10">
        <div className="hidden sm:block">STATUS: ONLINE // SS26 ACTIVE</div>
        <div className="uppercase">Worldwide Shipping Available</div>
        <div className="hidden sm:block">UG — KLA</div>
      </div>

      {/* Primary Header */}
      <header 
        className={`fixed w-full z-[100] transition-all duration-500 ease-in-out
          ${scrolled || !isHome 
            ? 'bg-white text-black py-4 border-b border-gray-100' 
            : 'bg-transparent text-white py-6 border-b border-white/10'}
        `}
      >
        <div className="max-w-[1920px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between">
            
            {/* Left Nav */}
            <div className="flex items-center gap-10 flex-1">
              <button onClick={() => setNavOpen(true)} className="p-1 -ml-1 hover:opacity-50 transition-opacity">
                <Menu size={20} strokeWidth={1.5} />
              </button>
              <div className="hidden lg:flex items-center gap-10">
                <Link to="/shop" className="text-nav hover:opacity-50 transition-opacity uppercase font-black text-[11px] tracking-widest">
                  Shop
                </Link>
                <Link to="/signature" className="text-nav hover:opacity-50 transition-opacity uppercase font-black text-[11px] tracking-widest">
                  The Signature
                </Link>
              </div>
            </div>

            {/* Center: Logo */}
            <div className="flex justify-center">
              <Link to="/" className="text-2xl font-[900] uppercase tracking-[-0.06em] leading-none">
                UTOPIA UG
              </Link>
            </div>

            {/* Right Nav */}
            <div className="flex items-center justify-end gap-10 flex-1">
              <div className="hidden lg:flex items-center gap-10">
                <Link to="/archives" className="text-nav hover:opacity-50 transition-opacity uppercase font-black text-[11px] tracking-widest">Archives</Link>
              </div>
              
              <div className="flex items-center gap-6">
                <button onClick={() => setSearchOpen(true)} className="hover:opacity-50 transition-opacity">
                  <Search size={20} strokeWidth={1.5} />
                </button>
                <button onClick={() => setUserOpen(true)} className="hover:opacity-50 transition-opacity">
                  <User size={20} strokeWidth={1.5} />
                </button>
                <button 
                  onClick={() => setCartOpen(true)}
                  className="hover:opacity-50 transition-opacity flex items-center relative"
                >
                  <ShoppingBag size={20} strokeWidth={1.5} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <NavigationDrawer />

      <CartDrawer />
      <SearchModal />
      <UserProfile />
      <QuickViewModal />
    </div>
  );
}
