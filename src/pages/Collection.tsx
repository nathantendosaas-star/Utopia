import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { Product, products as allProducts } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export function Collection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | 'All'>('All');
  const { isLoading, setLoading } = useStore();

  useEffect(() => {
    setLoading(true);
    // Simulate API fetch
    setTimeout(() => {
      setProducts(allProducts);
      setLoading(false);
    }, 800);
  }, [setLoading]);

  const categories = ['All', 'Shirts', '247', 'Outerwear', 'Footwear'];
  
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => (p.category || 'Uncategorized') === selectedCategory);

  return (
    <div className="min-h-screen w-full bg-[var(--color-bg-primary)] pb-32 pt-[clamp(8rem,14vw,12rem)]">
      
      {/* Category Header */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-16 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-[var(--color-border-subtle)] pb-12">
          <div className="flex flex-col gap-4">
             <div className="flex items-center gap-4">
                <span className="h-[1px] w-12 bg-[var(--color-accent-primary)]" />
                <span className="text-technical text-[10px] text-[var(--color-accent-primary)] font-bold tracking-[0.5em]">SYSTEM 0.1 // {selectedCategory.toUpperCase()}</span>
             </div>
             <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-display text-white tracking-tighter leading-none uppercase">
                DISCOVER ALL<span className="opacity-20 italic">.</span>
             </h1>
          </div>
          
          <div className="flex flex-wrap gap-8 sm:gap-12 overflow-x-auto pb-4 sm:pb-0 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-technical text-[11px] font-bold tracking-[0.3em] transition-all whitespace-nowrap
                  ${selectedCategory === cat 
                    ? 'text-white border-b border-[var(--color-accent-primary)] pb-2' 
                    : 'text-[var(--color-text-secondary)] hover:text-white'
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Container */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-16">
        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
             {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-portrait bg-[var(--color-bg-secondary)] animate-pulse border border-[var(--color-border-subtle)]" />
             ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 sm:gap-y-24">
            {filteredProducts.map((item, index) => (
              /* @ts-expect-error - key is a special prop */
              <ProductCard key={item.id} product={item} index={index} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredProducts.length === 0 && (
          <div className="py-32 flex flex-col items-center justify-center border border-dashed border-[var(--color-border-subtle)]">
            <p className="text-technical text-[12px] text-[var(--color-text-secondary)]">NO PIECES FOUND IN THIS DEPARTMENT.</p>
          </div>
        )}
      </div>
    </div>
  );
}
