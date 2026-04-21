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
    <div className="min-h-screen flex items-center justify-center bg-white">
      <p className="text-technical text-[10px] animate-pulse text-black font-[800]">SEARCHING ARCHIVE...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pt-[clamp(6rem,12vw,10rem)]">
      
      {/* Breadcrumbs */}
      <div className="max-w-[1800px] mx-auto px-6 lg:px-10 mb-8 flex items-center gap-4 opacity-40">
        <Link to="/shop" className="text-technical text-[9px] hover:text-black transition-colors font-[800]">SHOP</Link>
        <ChevronRight size={10} />
        <span className="text-technical text-[9px] font-[800]">{product.category}</span>
        <ChevronRight size={10} />
        <span className="text-technical text-[9px] font-[800]">{product.name}</span>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 lg:px-10 pb-32">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* 60% Left: Gallery */}
          <div className="flex-[1.5] flex flex-col gap-4">
            <div className="aspect-[4/5] bg-gray-50 border border-gray-100 overflow-hidden">
               <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {product.secondaryImage && (
              <div className="aspect-[4/5] bg-gray-50 border border-gray-100 overflow-hidden">
                 <img src={product.secondaryImage} alt={`${product.name} back`} className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* 40% Right: Sticky Info Rail */}
          <div className="flex-1 lg:sticky lg:top-[120px] h-fit flex flex-col gap-10">
            
            {/* Title & Price */}
            <div className="flex flex-col gap-4 border-b border-gray-100 pb-8">
              <div className="flex justify-between items-start gap-8">
                <h1 className="text-[clamp(1.5rem,3vw,2.5rem)] text-heading uppercase leading-[0.9] tracking-tight">
                  {product.name}
                </h1>
                <p className="text-xl font-[900] tracking-tight">{formatPrice(product.price, currency)}</p>
              </div>
              <p className="text-technical text-[10px] text-gray-400 tracking-[0.2em] font-[800]">
                TAX INCLUDED // FREE SHIPPING OVER $200
              </p>
            </div>

            {/* Colors */}
            <div className="flex flex-col gap-4">
              <p className="text-technical text-[10px] font-[800]">COLOUR: <span className="text-gray-400 uppercase font-medium">{product.colors?.[0] || 'Original'}</span></p>
              <div className="flex gap-3">
                {product.colors?.map(color => (
                  <button 
                    key={color}
                    className={`w-8 h-8 rounded-full border ${color === product.colors?.[0] ? 'border-black p-0.5' : 'border-transparent'}`}
                  >
                    <div className="w-full h-full rounded-full bg-gray-100 border border-black/5" />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <p className="text-technical text-[10px] font-[800]">SELECT SIZE</p>
                <button className="text-technical text-[9px] underline decoration-gray-300 hover:decoration-black transition-colors font-[800]">SIZE GUIDE</button>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {(product.sizes || ['S', 'M', 'L', 'XL']).map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-technical text-[11px] border transition-all font-[800]
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
                <p className="text-technical text-[10px] text-gray-400 font-[800] tracking-wider">MODEL MEASUREMENTS</p>
                <p className="text-technical text-[11px] font-[800] tracking-[0.1em]">
                  HEIGHT: {product.specs.modelHeight} // WEARING SIZE: {product.specs.modelSize}
                </p>
              </div>
            )}

            {/* Add to Cart */}
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => addToCart(product)}
                className="btn-primary w-full py-6"
              >
                ADD TO WARDROBE
              </button>
              
              {/* Prestige Points */}
              <div className="flex items-center justify-center gap-3 text-black py-3 border border-gray-100 bg-gray-50">
                <Star size={14} fill="currentColor" />
                <span className="text-technical text-[9px] font-[800]">EARN {Math.floor(product.price * 1.5)} PRESTIGE POINTS</span>
              </div>
            </div>

            {/* Accordions */}
            <div className="flex flex-col border-t border-gray-100 mt-8">
              
              {/* Product Details */}
              <div className="border-b border-gray-100">
                <button 
                  onClick={() => setOpenAccordion(openAccordion === 'details' ? null : 'details')}
                  className="w-full py-6 flex justify-between items-center group"
                >
                  <span className="text-technical text-[11px] font-[800] group-hover:opacity-50 transition-opacity">PRODUCT DETAILS</span>
                  <ChevronDown size={16} className={`transition-transform duration-500 ${openAccordion === 'details' ? 'rotate-180' : ''}`} />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.8,0,0.2,1)]
                    ${openAccordion === 'details' ? 'max-h-[500px] pb-8' : 'max-h-0'}
                  `}
                >
                  <div className="flex flex-col gap-6">
                    <p className="text-gray-500 leading-relaxed text-sm font-medium">
                      {product.description || "The piece is engineered for maximum utility and style, featuring high-quality construction and attention to every detail."}
                    </p>
                    <div className="grid grid-cols-2 gap-y-4">
                       <div className="flex flex-col gap-1">
                          <span className="text-technical text-[9px] text-gray-400 font-medium">GSM</span>
                          <span className="text-technical text-[10px] font-[800]">{product.specs?.gsm || "220GSM"}</span>
                       </div>
                       <div className="flex flex-col gap-1">
                          <span className="text-technical text-[9px] text-gray-400 font-medium">COMPOSITION</span>
                          <span className="text-technical text-[10px] font-[800]">{product.specs?.composition || "100% COTTON"}</span>
                       </div>
                       <div className="flex flex-col gap-1">
                          <span className="text-technical text-[9px] text-gray-400 font-medium">FIT</span>
                          <span className="text-technical text-[10px] font-[800]">{product.specs?.fit || "OVERSIZED"}</span>
                       </div>
                       <div className="flex flex-col gap-1">
                          <span className="text-technical text-[9px] text-gray-400 font-medium">COUNTRY OF ORIGIN</span>
                          <span className="text-technical text-[10px] font-[800]">UGANDA</span>
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping & Returns */}
              <div className="border-b border-gray-100">
                <button 
                  onClick={() => setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')}
                  className="w-full py-6 flex justify-between items-center group"
                >
                  <span className="text-technical text-[11px] font-[800] group-hover:opacity-50 transition-opacity">SHIPPING & RETURNS</span>
                  <ChevronDown size={16} className={`transition-transform duration-500 ${openAccordion === 'shipping' ? 'rotate-180' : ''}`} />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.8,0,0.2,1)]
                    ${openAccordion === 'shipping' ? 'max-h-[500px] pb-8' : 'max-h-0'}
                  `}
                >
                  <ul className="flex flex-col gap-4">
                    <li className="flex gap-4 items-start">
                      <Truck size={16} className="shrink-0 text-black" />
                      <div>
                        <p className="text-technical text-[10px] mb-1 font-[800]">FREE EXPRESS SHIPPING</p>
                        <p className="text-gray-500 text-[12px] font-medium">ON ALL ORDERS OVER $200. DHL WORLDWIDE DELIVERY.</p>
                      </div>
                    </li>
                    <li className="flex gap-4 items-start">
                      <ShieldCheck size={16} className="shrink-0 text-black" />
                      <div>
                        <p className="text-technical text-[10px] mb-1 font-[800]">14 DAY RETURNS</p>
                        <p className="text-gray-500 text-[12px] font-medium">HASSLE-FREE RETURNS ON ALL UNWORN PIECES.</p>
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
