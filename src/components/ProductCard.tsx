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
      <div className="relative aspect-portrait overflow-hidden bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)]">
        
        {/* Badges */}
        {product.badge && (
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-[var(--color-accent-primary)] text-white text-technical text-[8px] px-3 py-1.5 font-bold tracking-[0.2em]">
              {product.badge}
            </span>
          </div>
        )}

        {/* Primary Image */}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-opacity duration-500 ${isHovered && product.secondaryImage ? 'opacity-0' : 'opacity-100'}`}
        />

        {/* Secondary Image (Hover) */}
        {product.secondaryImage && (
          <img
            src={product.secondaryImage}
            alt={`${product.name} detail`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          />
        )}

        {/* Quick Add Size Bar */}
        <div 
          className={`absolute bottom-0 left-0 w-full bg-white/95 backdrop-blur-md py-4 px-2 transform transition-transform duration-500 ease-out flex flex-col gap-2 z-30
            ${isHovered ? 'translate-y-0' : 'translate-y-full'}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-black text-technical text-[8px] text-center font-bold tracking-[0.3em] mb-1">QUICK ADD SIZE</p>
          <div className="flex justify-center gap-2 flex-wrap">
            {(product.sizes || ['S', 'M', 'L', 'XL']).map((size) => (
              <button
                key={size}
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="text-black text-technical text-[9px] border border-black/10 px-3 py-1.5 hover:bg-black hover:text-white transition-colors"
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Metadata */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-technical text-[11px] font-bold leading-tight group-hover:text-[var(--color-accent-primary)] transition-colors">
            {product.name}
          </h3>
          <p className="text-technical text-[11px] font-bold">
            {formatPrice(product.price, currency)}
          </p>
        </div>
        {product.colors && (
          <p className="text-technical text-[9px] text-[var(--color-text-secondary)]">
            {product.colors.length} COLOURS
          </p>
        )}
      </div>
    </motion.div>
  );
}

