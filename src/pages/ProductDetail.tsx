import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ShieldCheck, Truck, Zap, Info, Plus, Minus } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../lib/currency';
import { Product, products } from '../data/products';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [scrolledPastCta, setScrolledPastCta] = useState(false);
  const { addToCart, currency } = useStore();

  useEffect(() => {
    const p = id ? products.find(item => item.id === id) : products[0];
    if (p) {
      setProduct(p);
      if (p.sizes && p.sizes.length > 0) setSelectedSize(p.sizes[0]);
    }

    const handleScroll = () => {
        const ctaBtn = document.getElementById('main-cta-btn');
        if (ctaBtn) {
            const rect = ctaBtn.getBoundingClientRect();
            setScrolledPastCta(rect.top < 0);
        }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [id]);

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <p className="text-technical text-[10px] animate-pulse text-black font-[800]">SEARCHING ARCHIVE...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      
      <div className="flex flex-col lg:flex-row">
        
        {/* LEFT: Seamless Gallery (60%) */}
        <div className="lg:w-[60%] bg-gray-50">
            <div className="flex flex-col">
                {product.images.map((img, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="w-full aspect-[4/5] overflow-hidden"
                    >
                        <img 
                            src={img} 
                            alt={`${product.name} view ${index + 1}`} 
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
                        />
                    </motion.div>
                ))}
            </div>
        </div>

        {/* RIGHT: Technical Rail (40%) */}
        <div className="lg:w-[40%] lg:sticky lg:top-0 h-fit lg:h-screen overflow-y-auto px-6 lg:px-12 py-32 flex flex-col gap-12 bg-white border-l border-gray-100">
            
            {/* Header */}
            <div>
                <p className="text-technical text-gray-400 mb-2 tracking-[0.3em]">THE LAB // SS26-001</p>
                <h1 className="text-heading text-6xl md:text-7xl leading-none mb-4">{product.name}</h1>
                <div className="flex justify-between items-center border-t border-black pt-6">
                    <p className="text-3xl font-black">{formatPrice(product.price, currency)}</p>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <p className="text-technical text-[10px] font-bold">IN STOCK // READY TO SHIP</p>
                    </div>
                </div>
            </div>

            {/* Technical Spec Sheet */}
            <div className="bg-black text-white p-8 space-y-8">
                <div className="flex items-center gap-3 text-technical text-white/40 border-b border-white/10 pb-4">
                    <Info size={14} />
                    <span>TECHNICAL SPECIFICATIONS</span>
                </div>
                <div className="grid grid-cols-2 gap-y-10">
                    {[
                        { label: 'MATERIAL', value: product.specs?.composition },
                        { label: 'WEIGHT', value: product.specs?.gsm },
                        { label: 'FIT', value: product.specs?.fit },
                        { label: 'CONSTRUCTION', value: 'Double-Needle' }
                    ].map((spec, i) => (
                        <div key={i}>
                            <p className="text-technical text-[9px] text-white/40 mb-1">{spec.label}</p>
                            <p className="font-display font-bold text-lg tracking-tight uppercase">{spec.value}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <p className="text-technical text-[10px] font-black">SELECT ARCHIVE SIZE</p>
                    <button className="text-technical text-[9px] underline decoration-gray-300 hover:decoration-black transition-colors font-black">SIZE GUIDE</button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {(product.sizes || ['XS', 'S', 'M', 'L', 'XL', 'XXL']).map(size => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`py-5 text-technical text-[11px] border transition-all font-black
                            ${selectedSize === size 
                                ? 'border-black bg-black text-white' 
                                : 'border-gray-100 text-gray-400 hover:border-black hover:text-black'
                            }
                            `}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Add to Bag */}
            <div className="space-y-4">
                <button 
                    id="main-cta-btn"
                    onClick={() => addToCart(product)}
                    className="btn-primary w-full py-8 flex items-center justify-center gap-4 text-sm"
                >
                    ADD TO WARDROBE <Zap size={18} className="fill-white" />
                </button>
                <div className="flex items-center justify-center gap-3 text-black py-4 border border-gray-100 bg-gray-50">
                    <Star size={14} fill="currentColor" />
                    <span className="text-technical text-[9px] font-black uppercase">Earn {Math.floor(product.price * 1.5)} Prestige Points</span>
                </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-12">
                <div className="flex gap-4 items-start">
                    <Truck size={20} className="shrink-0" />
                    <div>
                        <p className="text-technical text-[9px] mb-1 font-black">GLOBAL EXPRESS</p>
                        <p className="text-gray-400 text-[11px] leading-tight">DHL Worldwide 2-4 day delivery.</p>
                    </div>
                </div>
                <div className="flex gap-4 items-start">
                    <ShieldCheck size={20} className="shrink-0" />
                    <div>
                        <p className="text-technical text-[9px] mb-1 font-black">AUTHENTICITY</p>
                        <p className="text-gray-400 text-[11px] leading-tight">Serialized lab verification.</p>
                    </div>
                </div>
            </div>

        </div>

      </div>

      {/* Floating Quick Add (Visible when scrolled past main CTA) */}
      <AnimatePresence>
        {scrolledPastCta && (
            <motion.div 
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                exit={{ y: 100 }}
                className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 z-[150] px-6 py-4 flex items-center justify-between shadow-2xl lg:px-12"
            >
                <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-gray-100 overflow-hidden hidden sm:block">
                        <img src={product.image} alt="Thumb" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <p className="font-black uppercase text-sm tracking-tighter">{product.name}</p>
                        <p className="text-xs text-gray-500 font-mono">{formatPrice(product.price, currency)}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex gap-2">
                        {['S', 'M', 'L'].map(s => (
                             <button 
                                key={s} 
                                onClick={() => setSelectedSize(s)}
                                className={`w-10 h-10 text-[10px] font-black border ${selectedSize === s ? 'border-black bg-black text-white' : 'border-gray-200'}`}
                             >
                                 {s}
                             </button>
                        ))}
                    </div>
                    <button 
                        onClick={() => addToCart(product)}
                        className="btn-primary py-4 px-8 flex items-center gap-3 text-[10px]"
                    >
                        QUICK ADD <Zap size={12} className="fill-white" />
                    </button>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
