import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useUI } from '../context/UIContext';
import { useCart } from '../context/CartContext';
import { CartDrawer } from './CartDrawer';
import { SearchModal } from './SearchModal';
import { UserProfile } from './UserProfile';
import { QuickViewModal } from './QuickViewModal';
import { Footer } from './Footer';
import { NavigationDrawer } from './NavigationDrawer';

export function Layout() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { setCartOpen, setSearchOpen, setUserOpen, setNavOpen } = useUI();
  const { cartCount } = useCart();

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
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-white selection:bg-white selection:text-black">
      {/* VHS Scanner Line */}
      <div className="scanner-line" />

      {/* 1. Technical Info / Promo Bar */}
      <div className="bg-black text-white text-[10px] py-2 px-4 sm:px-6 flex justify-between items-center z-[110] relative font-mono tracking-widest border-b border-white/5">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          <span className="hidden xs:inline">STATUS: ONLINE // SYS_v1.04</span>
          <span className="xs:hidden">SYS_v1.04</span>
        </div>
        <div className="uppercase animate-pulse text-[8px] sm:text-[9px] font-bold">ARCHIVE_ACTIVE</div>
        <div className="hidden md:block">0.3476° N, 32.5825° E</div>
        <div className="md:hidden text-[8px] opacity-60">UG // KLA</div>
      </div>

      {/* Primary Header */}
      <header 
        className={`fixed w-full z-[100] transition-all duration-500 ease-in-out border-b
          ${scrolled || !isHome 
            ? 'bg-[var(--color-bg-primary)]/80 backdrop-blur-xl border-white/5 py-3 sm:py-4' 
            : 'bg-transparent border-white/5 py-5 sm:py-6'}
        `}
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between">
            
            {/* Left Nav */}
            <div className="flex items-center gap-4 sm:gap-10 flex-1">
              <button onClick={() => setNavOpen(true)} className="p-1 -ml-1 hover:opacity-50 transition-opacity">
                <Menu size={20} strokeWidth={1.5} />
              </button>
              <div className="hidden lg:flex items-center gap-10">
                <div className="relative group">
                    <Link to="/shop" className="text-nav hover:opacity-50 transition-opacity uppercase font-bold text-[10px] tracking-widest flex items-center gap-1">
                        [ SHOP_COLLECTION ]
                    </Link>
                    {/* Mega Menu Mockup */}
                    <div className="absolute top-full left-0 pt-8 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-500 z-[200]">
                        <div className="bg-[var(--color-bg-primary)] border border-white/10 p-8 shadow-2xl flex gap-12 w-[600px]">
                            <div className="flex flex-col gap-4">
                                <p className="text-technical text-[9px] font-black border-b border-white/20 pb-2 mb-2">// CATEGORIES</p>
                                <Link to="/shop" className="text-[11px] font-bold hover:translate-x-1 transition-transform uppercase">The Signature</Link>
                                <Link to="/shop" className="text-[11px] font-bold hover:translate-x-1 transition-transform uppercase">The Archive</Link>
                                <Link to="/shop" className="text-[11px] font-bold hover:translate-x-1 transition-transform uppercase">Accessories</Link>
                            </div>
                            <div className="flex-1 aspect-[16/9] bg-white/5 relative overflow-hidden">
                                <img src="/hero-desktop.png" alt="Featured" className="w-full h-full object-cover grayscale brightness-50" />
                                <div className="absolute inset-0 bg-black/40" />
                                <div className="absolute bottom-4 left-4">
                                    <p className="text-white text-[10px] font-black uppercase tracking-widest">[ SS26_DROP_01 ]</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Link to="/signature" className="text-nav hover:opacity-50 transition-opacity uppercase font-bold text-[10px] tracking-widest">
                  [ THE_SIGNATURE ]
                </Link>
              </div>
            </div>

            {/* Center: Logo */}
            <div className="flex justify-center">
              <Link to="/" className="text-lg sm:text-2xl font-[900] uppercase tracking-[-0.06em] leading-none glitch-text text-white">
                UTOPIA UG
              </Link>
            </div>

            {/* Right Nav */}
            <div className="flex items-center justify-end gap-4 sm:gap-10 flex-1">
              <div className="hidden lg:flex items-center gap-10">
                <Link to="/archives" className="text-nav hover:opacity-50 transition-opacity uppercase font-bold text-[10px] tracking-widest">[ ARCHIVES ]</Link>
              </div>
              
              <div className="flex items-center gap-3 sm:gap-6">
                <button onClick={() => setSearchOpen(true)} className="hover:opacity-50 transition-opacity glitch-hover">
                  <Search size={18} strokeWidth={1.5} />
                </button>
                <button onClick={() => setUserOpen(true)} className="hover:opacity-50 transition-opacity glitch-hover hidden xs:block">
                  <User size={18} strokeWidth={1.5} />
                </button>
                <button 
                  onClick={() => setCartOpen(true)}
                  className="hover:opacity-50 transition-opacity flex items-center relative glitch-hover"
                >
                  <ShoppingBag size={18} strokeWidth={1.5} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-white text-black text-[7px] sm:text-[8px] font-bold w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center">
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
