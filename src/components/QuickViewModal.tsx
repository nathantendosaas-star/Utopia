import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, ChevronRight, ChevronLeft } from 'lucide-react';
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
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[1000]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="fixed inset-0 z-[1001] flex items-center justify-center p-0 sm:p-4 md:p-8"
          >
            <div className="relative w-full max-w-5xl h-full sm:max-h-[90vh] flex flex-col items-center bg-black text-white overflow-hidden border-0 sm:border border-white/5">
              
              {/* Header: Large Title */}
              <div className="w-full pt-16 sm:pt-12 pb-6 sm:pb-8 px-6 sm:px-8 text-center border-b border-white/5">
                <h2 className="text-[clamp(1.5rem,8vw,4rem)] font-display leading-none tracking-tight uppercase">
                  {quickViewProduct.name}
                </h2>
              </div>

              {/* Body: Image & Controls */}
              <div className="flex-1 w-full relative flex items-center justify-center p-6 sm:p-8 overflow-hidden group">
                <button 
                  onClick={() => setQuickViewProduct(null)} 
                  className="absolute top-6 sm:top-8 right-6 sm:right-8 z-20 hover:text-[var(--color-accent-primary)] transition-colors"
                >
                  <X size={28} strokeWidth={1} />
                </button>

                <div className="relative aspect-square w-full max-w-xl">
                  <img 
                    src={quickViewProduct.image} 
                    alt={quickViewProduct.name} 
                    className="w-full h-full object-contain grayscale brightness-[0.8] hover:brightness-100 transition-all duration-700"
                  />
                </div>

                {/* Technical Product Identifier Overlay */}
                <div className="absolute bottom-6 sm:bottom-8 left-0 w-full px-6 sm:px-12 flex justify-between items-end">
                   <div className="space-y-1 sm:space-y-2">
                      <p className="text-technical text-[8px] sm:text-[10px] text-white/40">// IDENTIFIER</p>
                      <h3 className="text-technical text-sm sm:text-lg tracking-[0.2em] sm:tracking-[0.3em] font-bold">
                        {quickViewProduct.name.toUpperCase()}
                      </h3>
                   </div>
                   <div className="text-right space-y-1 sm:space-y-2">
                      <p className="text-technical text-[8px] sm:text-[10px] text-white/40">// VALUATION</p>
                      <p className="text-technical text-lg sm:text-2xl tracking-[0.1em] sm:tracking-[0.2em] font-bold">
                        {formatPrice(quickViewProduct.price, currency)}
                      </p>
                   </div>
                </div>

                {/* Thumbnail Previews (Mockup for design) */}
                <div className="absolute bottom-24 sm:bottom-32 left-1/2 -translate-x-1/2 flex gap-3 sm:gap-4 opacity-40 group-hover:opacity-100 transition-opacity">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className={`w-10 h-10 sm:w-12 sm:h-12 border ${i === 0 ? 'border-white' : 'border-white/10'} bg-white/5 overflow-hidden hover:opacity-70 transition-all cursor-pointer`}>
                        <img src={quickViewProduct.image} className="w-full h-full object-cover grayscale" alt="" />
                      </div>
                    ))}
                </div>
              </div>

              {/* Footer: CTA */}
              <div className="w-full border-t border-white/5 p-6 sm:p-8 flex justify-center bg-zinc-950">
                <button 
                  onClick={() => {
                    addToCart(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  className="btn-primary py-4 px-10 sm:px-16 text-xs sm:text-xl !bg-white !text-black w-full sm:w-auto"
                >
                  [ ADD_TO_WARDROBE ]
                </button>
              </div>

              {/* Secondary Details (Hidden by default, scrollable) */}
              <div className="absolute top-0 right-0 h-full w-80 bg-black/80 backdrop-blur-xl border-l border-white/5 translate-x-full transition-transform hover:translate-x-0 p-8 hidden lg:block">
                 <p className="text-technical text-[8px] text-white/40 mb-8 tracking-[0.5em]">SYSTEM NOTES</p>
                 <div className="prose prose-invert prose-sm text-white/60 font-mono text-[10px] leading-relaxed uppercase space-y-6">
                    <p>Designed for the Ugandan streets. Raw utility meets Kampala spirit.</p>
                    <div className="space-y-2 border-t border-white/10 pt-4">
                       <p>— PREMIUM MATERIALS</p>
                       <p>— TAILORED FIT</p>
                       <p>— LIMITED PRODUCTION RUN</p>
                    </div>
                    <p className="pt-8 opacity-20">REF: UG-DROP-001</p>
                 </div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
-DROP-001</p>
                 </div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
