import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../lib/currency';

export function CartDrawer() {
  const { isCartOpen, setCartOpen, cart, updateQuantity, removeFromCart, cartTotal, checkout, currency } = useStore();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[1000]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-[var(--color-bg-primary)] border-l border-[var(--color-border-subtle)] z-[1001] flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-[var(--color-border-subtle)] flex justify-between items-center bg-[var(--color-bg-secondary)]">
              <div className="flex flex-col gap-1">
                <h2 className="font-display text-2xl uppercase tracking-tight">WARDROBE</h2>
                <p className="text-technical text-[9px] text-[var(--color-text-secondary)]">SYSTEM 0.1 // {cart.length} PIECES</p>
              </div>
              <button onClick={() => setCartOpen(false)} className="hover:text-[var(--color-accent-primary)] transition-colors p-2">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8 scrollbar-hide" data-lenis-prevent>
              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-4 text-[var(--color-text-secondary)]">
                  <p className="text-technical text-[10px] tracking-[0.3em]">YOUR WARDROBE IS EMPTY</p>
                  <button onClick={() => setCartOpen(false)} className="btn-bracket text-[10px]">BACK TO SHOP</button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.product.id} className="flex gap-6 group">
                    <div className="w-24 aspect-[4/5] bg-[var(--color-bg-secondary)] overflow-hidden border border-[var(--color-border-subtle)] shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="text-technical text-[11px] font-bold leading-tight group-hover:text-[var(--color-accent-primary)] transition-colors">{item.product.name}</h3>
                          <button onClick={() => removeFromCart(item.product.id)} className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-primary)] transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-technical text-[10px] text-[var(--color-text-secondary)]">{formatPrice(item.product.price, currency)}</p>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center border border-[var(--color-border-subtle)]">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-2 hover:bg-[var(--color-bg-secondary)] transition-colors border-r border-[var(--color-border-subtle)]"><Minus size={12} /></button>
                          <span className="text-technical text-[10px] px-4 font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-2 hover:bg-[var(--color-bg-secondary)] transition-colors border-l border-[var(--color-border-subtle)]"><Plus size={12} /></button>
                        </div>
                        <span className="text-technical text-[11px] font-bold tracking-wider">{formatPrice(item.product.price * item.quantity, currency)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)] flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center text-technical text-[10px]">
                    <span className="text-[var(--color-text-secondary)]">SUBTOTAL</span>
                    <span className="font-bold text-lg text-white">{formatPrice(cartTotal, currency)}</span>
                  </div>
                  <div className="flex justify-between items-center text-technical text-[9px] text-[var(--color-accent-primary)]">
                    <span>PRESTIGE POINTS EARNED</span>
                    <span>+{Math.floor(cartTotal * 1.5)}</span>
                  </div>
                  <p className="text-[10px] text-[var(--color-text-secondary)] leading-tight italic">
                    Shipping and taxes calculated at checkout.
                  </p>
                </div>
                
                <button 
                  onClick={checkout}
                  className="w-full bg-white text-black py-5 text-technical text-[12px] font-bold tracking-[0.4em] hover:bg-[var(--color-accent-primary)] hover:text-white transition-all duration-500 active:scale-[0.98]"
                >
                  INITIATE CHECKOUT
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

