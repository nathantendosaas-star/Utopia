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
            className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-white border-l border-gray-100 z-[1001] flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white">
              <div className="flex flex-col gap-1">
                <h2 className="text-heading text-2xl">WARDROBE</h2>
                <p className="text-technical text-[9px] text-gray-400 uppercase tracking-widest">COLLECTION // {cart.length} PIECES</p>
              </div>
              <button onClick={() => setCartOpen(false)} className="hover:opacity-50 transition-opacity p-2">
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* Shipping Progress */}
            {cart.length > 0 && (
                <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
                    <div className="flex justify-between items-center mb-3">
                        <p className="text-technical text-[9px] font-black tracking-widest uppercase">
                            {remainingForFreeShipping > 0 
                                ? `SPEND ${formatPrice(remainingForFreeShipping, currency)} MORE FOR FREE EXPRESS SHIPPING`
                                : 'YOU HAVE UNLOCKED FREE EXPRESS SHIPPING'}
                        </p>
                        <span className="text-technical text-[9px] font-black">{Math.round(shippingProgress)}%</span>
                    </div>
                    <div className="h-1 w-full bg-gray-200 overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${shippingProgress}%` }}
                            className="h-full bg-black"
                        />
                    </div>
                </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8 scrollbar-hide" data-lenis-prevent>
              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-6 text-gray-400">
                  <p className="text-technical text-[10px] tracking-[0.3em] uppercase">YOUR WARDROBE IS EMPTY</p>
                  <button onClick={() => setCartOpen(false)} className="btn-secondary text-[10px]">BACK TO SHOP</button>
                </div>
              ) : (
                <>
                    <div className="flex flex-col gap-8">
                        {cart.map((item) => (
                        <div key={item.product.id} className="flex gap-6 group">
                            <div className="w-24 aspect-[4/5] bg-gray-50 overflow-hidden border border-gray-100 shrink-0">
                            <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover transition-all duration-500" />
                            </div>
                            <div className="flex-1 flex flex-col justify-between py-1">
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-start gap-4">
                                <h3 className="text-technical text-[11px] font-[800] leading-tight group-hover:opacity-60 transition-opacity uppercase tracking-widest">{item.product.name}</h3>
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
                        ))}
                    </div>

                    {/* Upsell Section */}
                    <div className="pt-12 border-t border-gray-100">
                        <p className="text-technical text-[9px] font-[900] mb-8 tracking-[0.3em] uppercase">Complete the Uniform</p>
                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                            {products.slice(0, 4).filter(p => !cart.find(c => c.product.id === p.id)).map(p => (
                                <div key={p.id} className="min-w-[140px] flex flex-col gap-4 group cursor-pointer" onClick={() => addToCart(p)}>
                                    <div className="aspect-[4/5] bg-gray-50 overflow-hidden border border-gray-100 relative">
                                        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors" />
                                        <div className="absolute bottom-2 right-2 bg-white text-black p-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 shadow-sm">
                                            <Plus size={12} strokeWidth={3} />
                                        </div>
                                    </div>
                                    <div className="space-y-1 px-1">
                                        <p className="text-technical text-[8px] font-black truncate uppercase tracking-widest">{p.name}</p>
                                        <p className="text-technical text-[8px] text-gray-400 font-bold">{formatPrice(p.price, currency)}</p>
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
              <div className="p-8 border-t border-gray-100 bg-white flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center text-technical text-[10px]">
                    <span className="text-gray-500 font-medium tracking-widest uppercase">SUBTOTAL</span>
                    <span className="font-[900] text-xl">{formatPrice(cartTotal, currency)}</span>
                  </div>
                  <div className="flex justify-between items-center text-technical text-[9px] text-black">
                    <span className="font-bold tracking-widest">PRESTIGE POINTS EARNED</span>
                    <span className="font-[900]">+{Math.floor(cartTotal * 1.5)}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 leading-tight font-medium uppercase tracking-widest">
                    Shipping and taxes calculated at checkout.
                  </p>
                </div>
                
                <button 
                  onClick={checkout}
                  className="btn-primary w-full py-5 flex items-center justify-center gap-3"
                >
                  INITIATE CHECKOUT <Zap size={14} className="fill-white" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

