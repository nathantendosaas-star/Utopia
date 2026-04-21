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

  const filteredProducts = products;

  return (
    <div className="min-h-screen w-full bg-[var(--color-bg-primary)] pb-32 pt-[clamp(8rem,14vw,12rem)]">
      
      {/* Category Header */}
      <div className="max-w-[1800px] mx-auto px-6 lg:px-10 mb-16">
        <div className="flex flex-col gap-6 border-b border-gray-100 pb-12">
          <div className="flex items-center gap-4">
             <span className="text-technical text-[10px] text-gray-400 font-[900] tracking-[0.3em]">ALL CLOTHING</span>
          </div>
          <h1 className="text-[clamp(3.5rem,10vw,7rem)] font-[900] text-black tracking-[-0.04em] leading-[0.85] uppercase">
             SHOP ALL
          </h1>
        </div>
      </div>

      {/* Grid Container */}
      <div className="max-w-[1800px] mx-auto px-6 lg:px-10">
        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
             {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-portrait bg-gray-50 animate-pulse border border-gray-100" />
             ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12">
            {filteredProducts.map((item, index) => (
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
