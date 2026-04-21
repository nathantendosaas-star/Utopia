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
            className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-white border-l border-gray-100 z-[1001] flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white">
              <div className="flex flex-col gap-1">
                <h2 className="text-heading text-2xl">WARDROBE</h2>
                <p className="text-technical text-[9px] text-gray-400">COLLECTION // {cart.length} PIECES</p>
              </div>
              <button onClick={() => setCartOpen(false)} className="hover:opacity-50 transition-opacity p-2">
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8 scrollbar-hide" data-lenis-prevent>
              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-6 text-gray-400">
                  <p className="text-technical text-[10px] tracking-[0.3em]">YOUR WARDROBE IS EMPTY</p>
                  <button onClick={() => setCartOpen(false)} className="btn-secondary text-[10px]">BACK TO SHOP</button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.product.id} className="flex gap-6 group">
                    <div className="w-24 aspect-[4/5] bg-gray-50 overflow-hidden border border-gray-100 shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover transition-all duration-500" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="text-technical text-[11px] font-[800] leading-tight group-hover:opacity-60 transition-opacity">{item.product.name}</h3>
                          <button onClick={() => removeFromCart(item.product.id)} className="text-gray-400 hover:text-black transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-technical text-[10px] text-gray-500">{formatPrice(item.product.price, currency)}</p>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center border border-gray-100">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-2 hover:bg-gray-50 transition-colors border-r border-gray-100"><Minus size={12} /></button>
                          <span className="text-technical text-[10px] px-4 font-[800]">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-2 hover:bg-gray-50 transition-colors border-l border-gray-100"><Plus size={12} /></button>
                        </div>
                        <span className="text-technical text-[11px] font-[800] tracking-wider">{formatPrice(item.product.price * item.quantity, currency)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 border-t border-gray-100 bg-white flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center text-technical text-[10px]">
                    <span className="text-gray-500 font-medium">SUBTOTAL</span>
                    <span className="font-[900] text-xl">{formatPrice(cartTotal, currency)}</span>
                  </div>
                  <div className="flex justify-between items-center text-technical text-[9px] text-black">
                    <span>PRESTIGE POINTS EARNED</span>
                    <span className="font-[900]">+{Math.floor(cartTotal * 1.5)}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 leading-tight font-medium">
                    Shipping and taxes calculated at checkout.
                  </p>
                </div>
                
                <button 
                  onClick={checkout}
                  className="btn-primary w-full py-5"
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

