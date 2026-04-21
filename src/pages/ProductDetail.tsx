import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronDown, Plus, Minus, Star, ShieldCheck, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../lib/currency';
import { Product, products } from '../data/products';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [openAccordion, setOpenAccordion] = useState<string | null>('details');
  const { addToCart, currency } = useStore();

  useEffect(() => {
    const p = products.find(item => item.id === id);
    if (p) {
      setProduct(p);
      if (p.sizes && p.sizes.length > 0) setSelectedSize(p.sizes[0]);
    }
  }, [id]);

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <p className="text-technical text-[10px] animate-pulse">SEARCHING ARCHIVE...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-[clamp(6rem,12vw,10rem)]">
      
      {/* Breadcrumbs */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-16 mb-8 flex items-center gap-4 opacity-40">
        <Link to="/shop" className="text-technical text-[9px] hover:text-white transition-colors">SHOP</Link>
        <ChevronRight size={10} />
        <span className="text-technical text-[9px]">{product.category}</span>
        <ChevronRight size={10} />
        <span className="text-technical text-[9px]">{product.name}</span>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 lg:px-16 pb-32">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* 60% Left: Gallery */}
          <div className="flex-[1.5] flex flex-col gap-4">
            <div className="aspect-[4/5] bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] overflow-hidden">
               <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {product.secondaryImage && (
              <div className="aspect-[4/5] bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] overflow-hidden">
                 <img src={product.secondaryImage} alt={`${product.name} back`} className="w-full h-full object-cover" />
              </div>
            )}
            {/* Additional gallery images could be added here */}
          </div>

          {/* 40% Right: Sticky Info Rail */}
          <div className="flex-1 lg:sticky lg:top-[120px] h-fit flex flex-col gap-10">
            
            {/* Title & Price */}
            <div className="flex flex-col gap-4 border-b border-[var(--color-border-subtle)] pb-8">
              <div className="flex justify-between items-start gap-8">
                <h1 className="text-[clamp(1.5rem,3vw,2.5rem)] font-display uppercase leading-none tracking-tight">
                  {product.name}
                </h1>
                <p className="text-xl font-mono tracking-wider">{formatPrice(product.price, currency)}</p>
              </div>
              <p className="text-technical text-[10px] text-[var(--color-text-secondary)] tracking-[0.2em]">
                TAX INCLUDED // FREE SHIPPING OVER $200
              </p>
            </div>

            {/* Colors */}
            <div className="flex flex-col gap-4">
              <p className="text-technical text-[10px] font-bold">COLOUR: <span className="text-[var(--color-text-secondary)] uppercase">{product.colors?.[0] || 'Original'}</span></p>
              <div className="flex gap-3">
                {product.colors?.map(color => (
                  <button 
                    key={color}
                    className={`w-8 h-8 rounded-full border ${color === product.colors?.[0] ? 'border-[var(--color-accent-primary)] p-0.5' : 'border-transparent'}`}
                  >
                    <div className="w-full h-full rounded-full bg-white/10 border border-white/5" />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <p className="text-technical text-[10px] font-bold">SELECT SIZE</p>
                <button className="text-technical text-[9px] underline decoration-[var(--color-text-muted)] hover:decoration-white transition-colors">SIZE GUIDE</button>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {(product.sizes || ['S', 'M', 'L', 'XL']).map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-technical text-[11px] border transition-all
                      ${selectedSize === size 
                        ? 'border-white bg-white text-black font-bold' 
                        : 'border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:border-white hover:text-white'
                      }
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Model Stats */}
            {product.specs?.modelHeight && (
              <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] p-6 flex flex-col gap-2">
                <p className="text-technical text-[10px] text-[var(--color-text-secondary)]">MODEL MEASUREMENTS</p>
                <p className="text-technical text-[11px] tracking-[0.2em]">
                  HEIGHT: {product.specs.modelHeight} // WEARING SIZE: {product.specs.modelSize}
                </p>
              </div>
            )}

            {/* Add to Cart */}
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => addToCart(product)}
                className="w-full bg-white text-black py-6 text-technical text-[12px] font-bold tracking-[0.4em] hover:bg-[var(--color-accent-primary)] hover:text-white transition-all duration-500 transform active:scale-[0.98]"
              >
                ADD TO WARDROBE
              </button>
              
              {/* Prestige Points */}
              <div className="flex items-center justify-center gap-3 text-[var(--color-accent-primary)] py-2 border border-[var(--color-accent-primary)]/20 bg-[var(--color-accent-primary)]/5">
                <Star size={14} fill="currentColor" />
                <span className="text-technical text-[9px] font-bold">EARN {Math.floor(product.price * 1.5)} PRESTIGE POINTS</span>
              </div>
            </div>

            {/* Accordions */}
            <div className="flex flex-col border-t border-[var(--color-border-subtle)] mt-8">
              
              {/* Product Details */}
              <div className="border-b border-[var(--color-border-subtle)]">
                <button 
                  onClick={() => setOpenAccordion(openAccordion === 'details' ? null : 'details')}
                  className="w-full py-6 flex justify-between items-center group"
                >
                  <span className="text-technical text-[11px] group-hover:text-white transition-colors">PRODUCT DETAILS</span>
                  <ChevronDown size={16} className={`transition-transform duration-500 ${openAccordion === 'details' ? 'rotate-180' : ''}`} />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.8,0,0.2,1)]
                    ${openAccordion === 'details' ? 'max-h-[500px] pb-8' : 'max-h-0'}
                  `}
                >
                  <div className="flex flex-col gap-6">
                    <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm">
                      {product.description || "The piece is engineered for maximum utility and style, featuring high-quality construction and attention to every detail."}
                    </p>
                    <div className="grid grid-cols-2 gap-y-4">
                       <div className="flex flex-col gap-1">
                          <span className="text-technical text-[9px] text-[var(--color-text-muted)]">GSM</span>
                          <span className="text-technical text-[10px]">{product.specs?.gsm || "220GSM"}</span>
                       </div>
                       <div className="flex flex-col gap-1">
                          <span className="text-technical text-[9px] text-[var(--color-text-muted)]">COMPOSITION</span>
                          <span className="text-technical text-[10px]">{product.specs?.composition || "100% COTTON"}</span>
                       </div>
                       <div className="flex flex-col gap-1">
                          <span className="text-technical text-[9px] text-[var(--color-text-muted)]">FIT</span>
                          <span className="text-technical text-[10px]">{product.specs?.fit || "OVERSIZED"}</span>
                       </div>
                       <div className="flex flex-col gap-1">
                          <span className="text-technical text-[9px] text-[var(--color-text-muted)]">COUNTRY OF ORIGIN</span>
                          <span className="text-technical text-[10px]">UGANDA</span>
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping & Returns */}
              <div className="border-b border-[var(--color-border-subtle)]">
                <button 
                  onClick={() => setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')}
                  className="w-full py-6 flex justify-between items-center group"
                >
                  <span className="text-technical text-[11px] group-hover:text-white transition-colors">SHIPPING & RETURNS</span>
                  <ChevronDown size={16} className={`transition-transform duration-500 ${openAccordion === 'shipping' ? 'rotate-180' : ''}`} />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.8,0,0.2,1)]
                    ${openAccordion === 'shipping' ? 'max-h-[500px] pb-8' : 'max-h-0'}
                  `}
                >
                  <ul className="flex flex-col gap-4">
                    <li className="flex gap-4 items-start">
                      <Truck size={16} className="shrink-0 text-[var(--color-accent-primary)]" />
                      <div>
                        <p className="text-technical text-[10px] mb-1">FREE EXPRESS SHIPPING</p>
                        <p className="text-[var(--color-text-secondary)] text-[12px]">ON ALL ORDERS OVER $200. DHL WORLDWIDE DELIVERY.</p>
                      </div>
                    </li>
                    <li className="flex gap-4 items-start">
                      <ShieldCheck size={16} className="shrink-0 text-[var(--color-accent-primary)]" />
                      <div>
                        <p className="text-technical text-[10px] mb-1">14 DAY RETURNS</p>
                        <p className="text-[var(--color-text-secondary)] text-[12px]">HASSLE-FREE RETURNS ON ALL UNWORN PIECES.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
