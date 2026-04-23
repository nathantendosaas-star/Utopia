import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ShieldCheck, Truck, Zap, Info, Plus, Minus, Ruler } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../lib/currency';
import { Product, products } from '../data/products';
import { Accordion } from '../components/Accordion';

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
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-primary)]">
      <p className="text-technical text-[10px] animate-pulse text-white font-[800]">SEARCHING ARCHIVE...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-white">
      
      <div className="flex flex-col lg:flex-row">
        
        {/* LEFT: Seamless Gallery (60%) */}
        <div className="lg:w-[60%] bg-black">
            <div className="flex flex-col">
                {product.images.map((img, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="w-full aspect-[4/5] overflow-hidden border-b border-white/5"
                    >
                        <img 
                            src={img} 
                            alt={`${product.name} view ${index + 1}`} 
                            className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-1000" 
                        />
                    </motion.div>
                ))}
            </div>
        </div>

        {/* RIGHT: Technical Rail (40%) */}
        <div className="lg:w-[40%] lg:sticky lg:top-0 h-fit lg:h-screen overflow-y-auto px-6 lg:px-12 py-32 flex flex-col gap-12 bg-[var(--color-bg-primary)] border-l border-white/5 scrollbar-hide">
            
            {/* Header */}
            <div>
                <p className="text-technical text-white/40 mb-2 tracking-[0.3em]">THE LAB // SS26-001</p>
                <h1 className="text-heading text-6xl md:text-7xl leading-none mb-4 text-white">{product.name}</h1>
                <div className="flex justify-between items-center border-t border-white/10 pt-6">
                    <p className="text-3xl font-black text-white">{formatPrice(product.price, currency)}</p>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <p className="text-technical text-[10px] font-bold text-white/60">IN STOCK // READY TO SHIP</p>
                    </div>
                </div>
            </div>

            {/* Color Selector (If multiple) */}
            {product.colors && product.colors.length > 0 && (
                <div className="space-y-4">
                    <p className="text-technical text-[10px] font-black uppercase text-white/40">VARIANT // {product.colors[0]}</p>
                    <div className="flex gap-3">
                        {product.colors.map(color => (
                            <button 
                                key={color}
                                className="w-8 h-8 rounded-full border border-white/20 p-0.5 hover:border-white transition-colors"
                            >
                                <div className="w-full h-full rounded-full bg-white" />
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Technical Spec Sheet */}
            <div className="bg-white/5 text-white p-8 space-y-8 border border-white/10">
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
                            <p className="text-technical text-[9px] text-white/40 mb-1 uppercase">{spec.label}</p>
                            <p className="font-display font-bold text-lg tracking-tight uppercase">{spec.value || 'NOT SPECIFIED'}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <p className="text-technical text-[10px] font-black text-white/40">SELECT ARCHIVE SIZE</p>
                    <button className="flex items-center gap-2 text-technical text-[9px] underline decoration-white/20 hover:decoration-white transition-colors font-black text-white">
                        <Ruler size={12} />
                        SIZE GUIDE
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {(product.sizes || ['XS', 'S', 'M', 'L', 'XL', 'XXL']).map(size => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`py-5 text-technical text-[11px] border transition-all font-black
                            ${selectedSize === size 
                                ? 'border-white bg-white text-black' 
                                : 'border-white/10 text-white/40 hover:border-white hover:text-white'
                            }
                            `}
                        >
                            {size}
                        </button>
                    ))}
                </div>
                {/* Model Measurements */}
                {product.specs?.modelHeight && (
                    <div className="pt-4 border-t border-white/10">
                        <p className="text-technical text-[9px] text-white/40 mb-2 uppercase tracking-widest">MODEL STATS</p>
                        <p className="text-[11px] font-bold text-white uppercase leading-relaxed">
                            MODEL IS {product.specs.modelHeight} AND WEARING SIZE {product.specs.modelSize}
                        </p>
                    </div>
                )}
            </div>

            {/* Add to Bag / App Exclusive Gate */}
            <div className="space-y-4">
                {product.badge === 'LIMITED' ? (
                    <div className="bg-white/5 text-white p-10 flex flex-col items-center text-center gap-8 border border-white/10">
                        <div className="w-48 h-48 bg-white p-4 flex items-center justify-center">
                            {/* Mock QR Code */}
                            <div className="w-full h-full border-2 border-black flex flex-col items-center justify-center gap-2">
                                <div className="grid grid-cols-5 gap-1">
                                    {[...Array(25)].map((_, i) => (
                                        <div key={i} className={`w-4 h-4 ${Math.random() > 0.5 ? 'bg-black' : 'bg-transparent'}`} />
                                    ))}
                                </div>
                                <p className="text-[6px] font-black text-black">UTOPIA APP</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-black uppercase tracking-tighter">[ APP_EXCLUSIVE_DROP ]</h3>
                            <p className="text-[10px] text-white/40 uppercase tracking-widest leading-relaxed">
                                SCAN TO DOWNLOAD THE UTOPIA APP AND ACCESS THIS PIECE. 
                                SERIALIZED DROPS ARE EXCLUSIVE TO OUR MOBILE ECOSYSTEM.
                            </p>
                        </div>
                        <button className="w-full py-4 border border-white/20 text-[10px] font-black uppercase tracking-widest cursor-not-allowed opacity-50">
                            LOCKED_ARCHIVE
                        </button>
                    </div>
                ) : (
                    <>
                        <button 
                            id="main-cta-btn"
                            onClick={() => addToCart(product)}
                            className="btn-primary w-full py-8 flex items-center justify-center gap-4 text-sm !bg-white !text-black border-white"
                        >
                            [ ADD_TO_WARDROBE ] <Zap size={18} className="fill-black" />
                        </button>
                        <div className="flex items-center justify-center gap-3 text-white/60 py-4 border border-white/10 bg-white/2">
                            <Star size={14} className="fill-white/40" />
                            <span className="text-technical text-[9px] font-black uppercase tracking-widest">Earn {Math.floor(product.price * 1.5)} Prestige Points</span>
                        </div>
                    </>
                )}
            </div>

            {/* Info Accordions */}
            <div className="border-t border-white/10">
                <Accordion title="PRODUCT DESCRIPTION" defaultOpen={true}>
                    <p className="text-white/60 leading-relaxed">{product.description}</p>
                    {product.specs && (
                        <ul className="mt-4 space-y-2 list-none p-0 text-white/40 text-xs">
                            {product.specs.composition && <li>— {product.specs.composition}</li>}
                            {product.specs.gsm && <li>— {product.specs.gsm}</li>}
                            {product.specs.fit && <li>— {product.specs.fit}</li>}
                        </ul>
                    )}
                </Accordion>
                <Accordion title="SHIPPING & RETURNS">
                    <p className="text-white/60 leading-relaxed">Global Express shipping via DHL Worldwide. 2-4 day delivery window for most international orders. Domestic shipping within Uganda takes 1-2 business days.</p>
                    <p className="mt-4 text-white/60 leading-relaxed">Returns accepted within 14 days of delivery for unworn items in original packaging.</p>
                </Accordion>
                <Accordion title="SUSTAINABILITY">
                    <p className="text-white/60 leading-relaxed">Ethically sourced materials. Crafted with a focus on longevity and minimal environmental impact in our Kampala laboratory.</p>
                </Accordion>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-12">
                <div className="flex gap-4 items-start">
                    <Truck size={20} className="shrink-0 text-white/40" />
                    <div>
                        <p className="text-technical text-[9px] mb-1 font-black uppercase text-white/60">GLOBAL EXPRESS</p>
                        <p className="text-white/40 text-[11px] leading-tight">DHL Worldwide 2-4 day delivery.</p>
                    </div>
                </div>
                <div className="flex gap-4 items-start">
                    <ShieldCheck size={20} className="shrink-0 text-white/40" />
                    <div>
                        <p className="text-technical text-[9px] mb-1 font-black uppercase tracking-widest text-white/60">AUTHENTICITY</p>
                        <p className="text-white/40 text-[11px] leading-tight">Serialized lab verification.</p>
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
                className="fixed bottom-0 left-0 w-full bg-[var(--color-bg-primary)] border-t border-white/10 z-[150] px-6 py-4 flex items-center justify-between shadow-2xl lg:px-12"
            >
                <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white/5 overflow-hidden hidden sm:block border border-white/10">
                        <img src={product.image} alt="Thumb" className="w-full h-full object-cover grayscale" />
                    </div>
                    <div>
                        <p className="font-black uppercase text-sm tracking-tighter text-white">{product.name}</p>
                        <p className="text-xs text-white/40 font-mono">{formatPrice(product.price, currency)}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex gap-2">
                        {['S', 'M', 'L'].map(s => (
                             <button 
                                key={s} 
                                onClick={() => setSelectedSize(s)}
                                className={`w-10 h-10 text-[10px] font-black border transition-colors ${selectedSize === s ? 'border-white bg-white text-black' : 'border-white/10 text-white/40 hover:border-white hover:text-white'}`}
                             >
                                 {s}
                             </button>
                        ))}
                    </div>
                    <button 
                        onClick={() => addToCart(product)}
                        className="btn-primary py-4 px-8 flex items-center gap-3 text-[10px] !bg-white !text-black border-white"
                    >
                        [ QUICK_ADD ] <Zap size={12} className="fill-black" />
                    </button>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
