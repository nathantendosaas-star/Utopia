import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search as SearchIcon } from 'lucide-react';
import { useUI } from '../context/UIContext';
import { useCart } from '../context/CartContext';
import { useProduct } from '../context/ProductContext';
import { productService } from '../services/dataService';
import { Product } from '../types/schema';
import { formatPrice } from '../lib/currency';

export function SearchModal() {
  const { isSearchOpen, setSearchOpen, isLoading, setLoading } = useUI();
  const { addToCart } = useCart();
  const { currency } = useProduct();
  const [query, setQuery] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    let mounted = true;
    if (isSearchOpen && allProducts.length === 0) {
      setLoading(true);
      productService.getAllProducts().then(data => {
        if (mounted) {
          setAllProducts(data);
          setLoading(false);
        }
      }).catch(err => {
        console.error('SEARCH_FETCH_FAILED:', err);
        if (mounted) setLoading(false);
      });
    }
    return () => { mounted = false; };
  }, [isSearchOpen, allProducts.length, setLoading]);

  const filteredProducts = query.trim() === '' 
    ? [] 
    : allProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.category?.toLowerCase().includes(query.toLowerCase()));

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[var(--color-bg-primary)]/95 backdrop-blur-md z-[1000] flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="max-w-[1280px] w-full mx-auto px-6 sm:px-[clamp(1.25rem,5vw,4rem)] py-6 sm:py-8"
          >
            <div className="flex justify-end mb-6 sm:mb-8">
              <button onClick={() => setSearchOpen(false)} className="hover:text-[var(--color-accent-primary)] transition-colors" aria-label="Close search">
                <X size={28} strokeWidth={1} />
              </button>
            </div>
            
            <div className="relative border-b border-[var(--color-text-primary)] pb-3 sm:pb-4 mb-8 sm:mb-12">
              <SearchIcon size={24} strokeWidth={1} className="absolute left-0 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" />
              <input 
                type="text" 
                placeholder="SEARCH THE ARCHIVE..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none pl-10 sm:pl-14 text-xl sm:text-3xl md:text-5xl font-display uppercase placeholder:text-[var(--color-text-secondary)]/50"
                autoFocus
              />
            </div>

            <div className="overflow-y-auto max-h-[65vh] pb-20" data-lenis-prevent>
              {isLoading ? (
                <p className="font-mono text-[9px] sm:text-[var(--text-micro)] text-[var(--color-text-secondary)] uppercase tracking-[var(--tracking-widest)] animate-pulse">Loading Archive...</p>
              ) : query.trim() !== '' && filteredProducts.length === 0 ? (
                <p className="font-mono text-[9px] sm:text-[var(--text-micro)] text-[var(--color-text-secondary)] uppercase tracking-[var(--tracking-widest)]">No results found for "{query}"</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredProducts.map(product => (
                    <div key={product.id} className="group cursor-pointer flex flex-col gap-3 sm:gap-4">
                      <div className="relative aspect-[3/4] overflow-hidden border border-[var(--color-border-subtle)] bg-[#0a0a0b]">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover grayscale brightness-75 group-hover:brightness-100 transition-all duration-700" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product);
                              setSearchOpen(false);
                            }}
                            className="btn-primary text-[8px] sm:text-[10px] py-2 px-3 sm:px-4"
                          >
                            [ ADD_TO_ARCHIVE ]
                          </button>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-display text-[11px] sm:text-[var(--text-body-base)] uppercase text-white truncate">[ {product.name} ]</h3>
                        <p className="font-mono text-[9px] sm:text-[var(--text-micro)] text-[var(--color-text-secondary)]">{formatPrice(product.price, currency)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
