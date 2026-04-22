import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export function CartDrawer() {
  const { isCartOpen, setCartOpen, cart, updateQuantity, removeFromCart, cartTotal, checkout } = useStore();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[var(--color-bg-primary)] border-l border-[var(--color-border-subtle)] z-[1001] flex flex-col"
          >
            <div className="p-[var(--space-6)] border-b border-[var(--color-border-subtle)] flex justify-between items-center">
              <h2 className="font-display text-[var(--text-heading-sm)] uppercase">Wardrobe</h2>
              <button onClick={() => setCartOpen(false)} className="hover:text-[var(--color-accent-primary)] transition-colors">
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-[var(--space-6)] flex flex-col gap-[var(--space-6)]" data-lenis-prevent>
              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-[var(--color-text-secondary)]">
                  <p className="font-mono text-[var(--text-micro)] uppercase tracking-[var(--tracking-widest)]">Your wardrobe is empty</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.product.id} className="flex gap-[var(--space-4)] border border-[var(--color-border-subtle)] p-[var(--space-2)] bg-[var(--color-bg-secondary)]">
                    <div className="w-24 aspect-[3/4] bg-[#160E06] overflow-hidden border border-[var(--color-border-subtle)]">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover film-image" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-[var(--space-2)] pr-[var(--space-2)]">
                      <div>
                        <h3 className="font-display text-[var(--text-body-base)] uppercase leading-tight">{item.product.name}</h3>
                        <p className="font-mono text-[var(--text-micro)] text-[var(--color-text-secondary)] mt-1">${item.product.price}</p>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-3 border border-[var(--color-border-subtle)] px-2 py-1">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="hover:text-[var(--color-accent-primary)] transition-colors"><Minus size={14} /></button>
                          <span className="font-mono text-[var(--text-micro)]">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="hover:text-[var(--color-accent-primary)] transition-colors"><Plus size={14} /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.product.id)} className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-[var(--space-6)] border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)]">
                <div className="flex justify-between items-center mb-[var(--space-6)] font-mono text-[var(--text-body-sm)]">
                  <span className="text-[var(--color-text-secondary)] uppercase tracking-[var(--tracking-widest)]">Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <button 
                  onClick={checkout}
                  className="w-full btn-primary py-4 text-center justify-center font-mono text-[var(--text-micro)] tracking-[var(--tracking-widest)]"
                >
                  CHECKOUT (DEMO)
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
