import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, Zap } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../lib/currency';
import { products } from '../data/products';

export function CartDrawer() {
  const { isCartOpen, setCartOpen, cart, updateQuantity, removeFromCart, cartTotal, checkout, currency, addToCart } = useStore();

  const FREE_SHIPPING_THRESHOLD = 150000;
  const shippingProgress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - cartTotal, 0);

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
            className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-[var(--color-bg-primary)] border-l border-white/10 z-[1001] flex flex-col text-white"
          >
            {/* Header */}
            <div className="p-6 sm:p-8 border-b border-white/5 flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <h2 className="text-heading text-xl sm:text-2xl text-white">[ WAREHOUSE_MANIFEST ]</h2>
                <p className="text-technical text-[8px] sm:text-[9px] text-gray-500 uppercase tracking-widest">// ARCHIVE_TOTAL: {cart.length} PIECES</p>
              </div>
              <button onClick={() => setCartOpen(false)} className="hover:opacity-50 transition-opacity p-2 text-white">
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* Shipping Progress */}
            {cart.length > 0 && (
                <div className="px-6 sm:px-8 py-5 sm:py-6 border-b border-white/5 bg-white/2">
                    <div className="flex justify-between items-center mb-2 sm:mb-3">
                        <p className="text-technical text-[8px] sm:text-[9px] font-black tracking-widest uppercase text-white/60">
                            {remainingForFreeShipping > 0 
                                ? `// DEFICIT: ${formatPrice(remainingForFreeShipping, currency)}`
                                : '[ FREE_SHIPPING_UNLOCKED ]'}
                        </p>
                        <span className="text-technical text-[8px] sm:text-[9px] font-black text-white">{Math.round(shippingProgress)}%</span>
                    </div>
                    <div className="h-1 w-full bg-white/10 overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${shippingProgress}%` }}
                            className="h-full bg-white"
                        />
                    </div>
                </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col gap-6 sm:gap-8 scrollbar-hide" data-lenis-prevent>
              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-6 text-gray-600 text-center">
                  <p className="text-technical text-[9px] sm:text-[10px] tracking-[0.3em] uppercase">[ MANIFEST_EMPTY ]</p>
                  <button onClick={() => setCartOpen(false)} className="btn-secondary text-[9px] sm:text-[10px] !border-white/20 !text-white hover:!bg-white hover:!text-black">// RETURN_TO_COLLECTION</button>
                </div>
              ) : (
                <>
                    <div className="flex flex-col gap-6 sm:gap-8">
                        {cart.map((item) => (
                        <div key={item.product.id} className="flex gap-4 sm:gap-6 group">
                            <div className="w-20 sm:w-24 aspect-[4/5] bg-white/5 overflow-hidden border border-white/10 shrink-0">
                            <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover grayscale brightness-75 transition-all duration-500" />
                            </div>
                            <div className="flex-1 flex flex-col justify-between py-1">
                            <div className="flex flex-col gap-1.5 sm:gap-2">
                                <div className="flex justify-between items-start gap-4">
                                <h3 className="text-technical text-[10px] sm:text-[11px] font-[700] leading-tight group-hover:opacity-60 transition-opacity uppercase tracking-widest text-white">[ {item.product.name} ]</h3>
                                <button onClick={() => removeFromCart(item.product.id)} className="text-gray-600 hover:text-white transition-colors">
                                    <Trash2 size={14} />
                                </button>
                                </div>
                                <p className="text-technical text-[9px] sm:text-[10px] text-gray-500">// {formatPrice(item.product.price, currency)}</p>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <div className="flex items-center border border-white/10">
                                <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1.5 sm:p-2 hover:bg-white/5 transition-colors border-r border-white/10"><Minus size={11} sm:size={12} /></button>
                                <span className="text-technical text-[9px] sm:text-[10px] px-3 sm:px-4 font-[800] text-white">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1.5 sm:p-2 hover:bg-white/5 transition-colors border-l border-white/10"><Plus size={11} sm:size={12} /></button>
                                </div>
                                <span className="text-technical text-[10px] sm:text-[11px] font-[800] tracking-wider text-white">{formatPrice(item.product.price * item.quantity, currency)}</span>
                            </div>
                            </div>
                        </div>
                        ))}
                    </div>

                    {/* Upsell Section */}
                    <div className="pt-10 sm:pt-12 border-t border-white/5">
                        <p className="text-technical text-[8px] sm:text-[9px] font-[900] mb-6 sm:mb-8 tracking-[0.3em] uppercase text-white/40">// COMPLETE_UNIFORM</p>
                        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 scrollbar-hide">
                            {products.slice(0, 4).filter(p => !cart.find(c => c.product.id === p.id)).map(p => (
                                <div key={p.id} className="min-w-[120px] sm:min-w-[140px] flex flex-col gap-3 sm:gap-4 group cursor-pointer" onClick={() => addToCart(p)}>
                                    <div className="aspect-[4/5] bg-white/5 overflow-hidden border border-white/10 relative">
                                        <img src={p.image} alt={p.name} className="w-full h-full object-cover grayscale brightness-50 group-hover:brightness-100 group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors" />
                                        <div className="absolute bottom-2 right-2 bg-white text-black p-1.5 sm:p-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 shadow-sm">
                                            <Plus size={12} strokeWidth={3} />
                                        </div>
                                    </div>
                                    <div className="space-y-1 px-1">
                                        <p className="text-technical text-[8px] font-bold truncate uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">[ {p.name} ]</p>
                                        <p className="text-technical text-[8px] text-gray-600 font-bold">{formatPrice(p.price, currency)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 sm:p-8 border-t border-white/5 bg-[var(--color-bg-primary)] flex flex-col gap-4 sm:gap-6">
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="flex justify-between items-center text-technical text-[9px] sm:text-[10px]">
                    <span className="text-gray-500 font-medium tracking-widest uppercase">// TOTAL_PAYABLE</span>
                    <span className="font-[900] text-lg sm:text-xl text-white">{formatPrice(cartTotal, currency)}</span>
                  </div>
                  <div className="flex justify-between items-center text-technical text-[8px] sm:text-[9px] text-white">
                    <span className="font-bold tracking-widest text-white/60">ARCHIVE_POINTS_EARNED</span>
                    <span className="font-[900] text-white">+{Math.floor(cartTotal * 1.5)}</span>
                  </div>
                </div>
                
                <button 
                  onClick={checkout}
                  className="btn-primary w-full py-4 sm:py-5 flex items-center justify-center gap-3 !bg-white !text-black border-white text-[10px] sm:text-[11px]"
                >
                  [ INITIATE_CHECKOUT ] <Zap size={14} className="fill-black" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

