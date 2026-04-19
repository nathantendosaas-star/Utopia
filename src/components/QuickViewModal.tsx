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
            className="fixed inset-0 z-[1001] flex items-center justify-center p-4 md:p-8"
          >
            <div className="relative w-full max-w-5xl h-full max-h-[90vh] flex flex-col items-center bg-black text-white overflow-hidden border border-white/5">
              
              {/* Header: Large Title */}
              <div className="w-full pt-12 pb-8 px-8 text-center border-b border-white/5">
                <h2 className="text-[clamp(2rem,5vw,4rem)] font-display leading-none tracking-tight">
                  {quickViewProduct.name}
                </h2>
              </div>

              {/* Body: Image & Controls */}
              <div className="flex-1 w-full relative flex items-center justify-center p-8 overflow-hidden group">
                <button 
                  onClick={() => setQuickViewProduct(null)} 
                  className="absolute top-8 right-8 z-20 hover:text-[var(--color-accent-primary)] transition-colors"
                >
                  <X size={32} strokeWidth={1} />
                </button>

                <div className="relative aspect-square w-full max-w-xl">
                  <img 
                    src={quickViewProduct.image} 
                    alt={quickViewProduct.name} 
                    className="w-full h-full object-contain film-image scale-110"
                  />
                </div>

                {/* Technical Product Identifier Overlay */}
                <div className="absolute bottom-8 left-0 w-full px-12 flex justify-between items-end">
                   <div className="space-y-2">
                      <p className="text-technical text-[10px] text-white/40">IDENTIFIER</p>
                      <h3 className="text-technical text-lg tracking-[0.3em]">
                        {quickViewProduct.name.toUpperCase()} [BLACK]
                      </h3>
                   </div>
                   <div className="text-right space-y-2">
                      <p className="text-technical text-[10px] text-white/40">VALUATION</p>
                      <p className="text-technical text-2xl tracking-[0.2em] font-bold">
                        ${quickViewProduct.price}.00
                      </p>
                   </div>
                </div>

                {/* Thumbnail Previews (Mockup for design) */}
                <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-4 opacity-40 group-hover:opacity-100 transition-opacity">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className={`w-12 h-12 border ${i === 0 ? 'border-white' : 'border-white/10'} bg-white/5 overflow-hidden grayscale hover:grayscale-0 transition-all cursor-pointer`}>
                        <img src={quickViewProduct.image} className="w-full h-full object-cover" alt="" />
                      </div>
                    ))}
                </div>
              </div>

              {/* Footer: CTA */}
              <div className="w-full border-t border-white/5 p-8 flex justify-center bg-zinc-950">
                <button 
                  onClick={() => {
                    addToCart(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  className="btn-bracket text-xl scale-110 hover:scale-125 transition-transform"
                >
                  ADD TO WARDROBE
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
