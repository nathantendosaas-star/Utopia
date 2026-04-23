import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../data/products';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../lib/currency';
import { Link, useNavigate } from 'react-router-dom';

export function ProductCard({ product, index }: { product: Product, index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, currency } = useStore();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="group flex flex-col gap-5 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Image Container */}
      <div className="relative aspect-portrait overflow-hidden bg-[var(--color-bg-secondary)] border border-white/5 group-hover:border-white/20 transition-colors">
        
        {/* Badges */}
        {product.badge && (
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-white text-black text-technical text-[8px] px-3 py-1.5 font-bold tracking-[0.2em]">
              [ {product.badge} ]
            </span>
          </div>
        )}

        {/* Primary Image */}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-700 contrast-[1.1] brightness-[0.8] group-hover:brightness-100 group-hover:scale-105 ${isHovered && product.secondaryImage ? 'opacity-0' : 'opacity-100'}`}
          style={{ filter: isHovered ? 'drop-shadow(0 0 20px rgba(255,255,255,0.3)) contrast(1.2)' : 'contrast(1.1) brightness(0.8)' }}
        />

        {/* Secondary Image (Hover) */}
        {product.secondaryImage && (
          <img
            src={product.secondaryImage}
            alt={`${product.name} detail`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 contrast-[1.1] brightness-[0.8] group-hover:brightness-100 group-hover:scale-105 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            style={{ filter: isHovered ? 'drop-shadow(0 0 20px rgba(255,255,255,0.3)) contrast(1.2)' : 'contrast(1.1) brightness(0.8)' }}
          />
        )}

        {/* Quick Add Size Bar */}
        <div 
          className={`absolute bottom-0 left-0 w-full bg-black/90 backdrop-blur-xl py-4 px-2 transform transition-transform duration-500 ease-out flex flex-col gap-2 z-30 border-t border-white/10
            ${isHovered ? 'translate-y-0' : 'translate-y-full'}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-white text-technical text-[8px] text-center font-bold tracking-[0.3em] mb-1">// SELECT_SIZE</p>
          <div className="flex justify-center gap-2 flex-wrap">
            {(product.sizes || ['S', 'M', 'L', 'XL']).map((size) => (
              <button
                key={size}
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="text-white text-technical text-[9px] border border-white/10 px-3 py-1.5 hover:bg-white hover:text-black transition-colors"
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Metadata */}
      <div className="flex flex-col gap-1.5 px-1">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-technical text-[10px] font-[700] leading-tight text-white group-hover:opacity-60 transition-opacity">
            [ {product.name.toUpperCase()} ]
          </h3>
          <p className="text-technical text-[10px] font-[700] text-white">
            {formatPrice(product.price, currency)}
          </p>
        </div>
        <div className="flex justify-between items-center">
          {product.category && (
            <p className="text-technical text-[9px] text-gray-500 font-medium">
              // {product.category.toUpperCase()}
            </p>
          )}
          <p className="text-technical text-[9px] text-gray-600 font-medium">
            UTP_REF_{product.id.substring(0, 4).toUpperCase()}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

