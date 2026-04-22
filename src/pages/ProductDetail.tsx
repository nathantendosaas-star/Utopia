import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronDown, Star, ShieldCheck, Truck, Zap, Info } from 'lucide-react';
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
    // Default to the first product if no ID or single-product mode
    const p = id ? products.find(item => item.id === id) : products[0];
    if (p) {
      setProduct(p);
      if (p.sizes && p.sizes.length > 0) setSelectedSize(p.sizes[0]);
    }
  }, [id]);

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <p className="text-technical text-[10px] animate-pulse text-black font-[800]">SEARCHING ARCHIVE...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pt-[clamp(6rem,12vw,10rem)]">
      
      {/* Header Info */}
      <div className="max-w-[1800px] mx-auto px-6 lg:px-10 mb-12 flex flex-col md:flex-row justify-between items-end gap-8 border-b border-black/5 pb-12">
        <div>
            <p className="text-technical text-gray-400 mb-2 tracking-[0.3em]">THE LAB // SS26-001</p>
            <h1 className="text-heading text-6xl md:text-8xl leading-none">{product.name}</h1>
        </div>
        <div className="text-right">
            <p className="text-3xl font-black mb-2">{formatPrice(product.price, currency)}</p>
            <p className="text-technical text-[10px] text-gray-400">TAX INCLUDED // GLOBAL SHIPPING AVAILABLE</p>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 lg:px-10 pb-32">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* 60% Left: Full Gallery (6 Images) */}
          <div className="flex-[1.5] grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.images.map((img, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`aspect-[4/5] bg-gray-50 border border-gray-100 overflow-hidden ${index === 0 ? 'md:col-span-2' : ''}`}
              >
                 <img src={img} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
              </motion.div>
            ))}
          </div>

          {/* 40% Right: Technical Configurator */}
          <div className="flex-1 lg:sticky lg:top-[120px] h-fit flex flex-col gap-10">
            
            {/* Technical Brief */}
            <div className="bg-black text-white p-8 space-y-6">
                <div className="flex items-center gap-3 text-technical text-white/40">
                    <Info size={14} />
                    <span>TECHNICAL SPECIFICATIONS</span>
                </div>
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <p className="text-technical text-[9px] text-white/40 mb-1">MATERIAL</p>
                        <p className="font-bold text-sm">{product.specs?.composition}</p>
                    </div>
                    <div>
                        <p className="text-technical text-[9px] text-white/40 mb-1">WEIGHT</p>
                        <p className="font-bold text-sm">{product.specs?.gsm}</p>
                    </div>
                    <div>
                        <p className="text-technical text-[9px] text-white/40 mb-1">FIT</p>
                        <p className="font-bold text-sm">{product.specs?.fit}</p>
                    </div>
                    <div>
                        <p className="text-technical text-[9px] text-white/40 mb-1">ORIGIN</p>
                        <p className="font-bold text-sm">UGANDA</p>
                    </div>
                </div>
            </div>

            {/* Size Selector */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <p className="text-technical text-[10px] font-[800]">SELECT SIZE</p>
                <button className="text-technical text-[9px] underline decoration-gray-300 hover:decoration-black transition-colors font-[800]">SIZE GUIDE</button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {(product.sizes || ['S', 'M', 'L', 'XL']).map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-4 text-technical text-[11px] border transition-all font-[800]
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

            {/* Model Stats */}
            {product.specs?.modelHeight && (
              <div className="bg-gray-50 border border-gray-100 p-6 flex flex-col gap-2">
                <p className="text-technical text-[10px] text-gray-400 font-[800] tracking-wider uppercase">Reference Fit</p>
                <p className="text-technical text-[11px] font-[800] tracking-[0.1em]">
                  MODEL: {product.specs.modelHeight} // WEARING SIZE: {product.specs.modelSize}
                </p>
              </div>
            )}

            {/* Add to Cart */}
            <div className="flex flex-col gap-4 pt-4">
              <button 
                onClick={() => addToCart(product)}
                className="btn-primary w-full py-8 flex items-center justify-center gap-4"
              >
                ADD TO WARDROBE <Zap size={16} className="fill-white" />
              </button>
              
              <div className="flex items-center justify-center gap-3 text-black py-4 border border-gray-100 bg-gray-50">
                <Star size={14} fill="currentColor" />
                <span className="text-technical text-[9px] font-[800]">EARN {Math.floor(product.price * 1.5)} PRESTIGE POINTS</span>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8 border-t border-gray-100 pt-8">
                <p className="text-gray-500 leading-relaxed font-medium mb-12">
                  {product.description}
                </p>
                
                {/* Benefits */}
                <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                        <Truck size={18} className="shrink-0 text-black" />
                        <div>
                            <p className="text-technical text-[10px] mb-1 font-[800]">GLOBAL EXPRESS</p>
                            <p className="text-gray-400 text-[12px]">DHL Worldwide Express shipping on all orders.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start">
                        <ShieldCheck size={18} className="shrink-0 text-black" />
                        <div>
                            <p className="text-technical text-[10px] mb-1 font-[800]">AUTHENTICITY GUARANTEED</p>
                            <p className="text-gray-400 text-[12px]">Every piece is serialized and verified by Utopia Lab.</p>
                        </div>
                    </div>
                </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
