import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useStore();

  if (!quickViewProduct) return null;

  return (
    <AnimatePresence>
      {quickViewProduct && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setQuickViewProduct(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-4xl bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] z-[1001] flex flex-col md:flex-row overflow-hidden max-h-[90vh]"
          >
            <button 
              onClick={() => setQuickViewProduct(null)} 
              className="absolute top-4 right-4 z-10 bg-[var(--color-bg-primary)]/80 backdrop-blur-sm p-2 rounded-full hover:text-[var(--color-accent-primary)] transition-colors"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            <div className="w-full md:w-1/2 bg-[#160E06] relative aspect-square md:aspect-auto">
              <img 
                src={quickViewProduct.image} 
                alt={quickViewProduct.name} 
                className="w-full h-full object-cover film-image"
              />
              {quickViewProduct.badge && (
                <span className={`absolute top-4 left-4 px-3 py-1 text-[10px] font-mono uppercase tracking-widest ${
                  quickViewProduct.badge === 'NEW DROP' ? 'bg-[var(--color-accent-primary)] text-[#F5F0E8]' : 
                  quickViewProduct.badge === 'LIMITED' ? 'bg-black text-white border border-white/20' : 
                  'bg-white text-black'
                }`}>
                  {quickViewProduct.badge}
                </span>
              )}
            </div>

            <div className="w-full md:w-1/2 p-[var(--space-8)] flex flex-col overflow-y-auto" data-lenis-prevent>
              <div className="mb-[var(--space-6)]">
                <p className="font-mono text-[var(--text-micro)] text-[var(--color-text-secondary)] uppercase tracking-[var(--tracking-widest)] mb-2">
                  {quickViewProduct.category || 'Archive Piece'}
                </p>
                <h2 className="font-display text-[var(--text-heading-md)] uppercase leading-tight mb-2">
                  {quickViewProduct.name}
                </h2>
                <p className="font-mono text-[var(--text-body-base)] text-[var(--color-text-secondary)]">
                  ${quickViewProduct.price}
                </p>
              </div>

              <div className="prose prose-sm prose-invert mb-[var(--space-8)] font-body text-[var(--color-text-secondary)] leading-relaxed">
                <p>
                  A meticulously crafted piece from our latest collection. Designed with analog minimalism and structural form in mind. This item embodies the "No Wasted Potential" philosophy.
                </p>
                <ul className="mt-4 space-y-1 font-mono text-[var(--text-micro)]">
                  <li>Premium materials</li>
                  <li>Tailored fit</li>
                  <li>Limited production run</li>
                </ul>
              </div>

              <div className="mt-auto pt-[var(--space-6)] border-t border-[var(--color-border-subtle)]">
                <button 
                  onClick={() => {
                    addToCart(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  className="btn-primary w-full justify-center flex items-center gap-2 py-4"
                >
                  <ShoppingBag size={18} />
                  <span>ADD TO WARDROBE</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
