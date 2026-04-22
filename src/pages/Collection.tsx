import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { Product, products as allProducts } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export function Collection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const { isLoading, setLoading } = useStore();

  useEffect(() => {
    setLoading(true);
    // Simulate API fetch
    setTimeout(() => {
      setProducts(allProducts);
      setLoading(false);
    }, 800);
  }, [setLoading]);

  const categories = useMemo(() => {
    const cats = allProducts.reduce((acc, p) => {
      if (p.category && !acc.includes(p.category)) acc.push(p.category);
      return acc;
    }, [] as string[]);
    return ['ALL', ...cats];
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'ALL') return products;
    return products.filter(p => p.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <div className="min-h-screen w-full bg-[var(--color-bg-primary)] pb-32 pt-[clamp(8rem,14vw,12rem)]">
      
      {/* Category Header */}
      <div className="max-w-[1800px] mx-auto px-6 lg:px-10 mb-12">
        <div className="flex flex-col gap-8 border-b border-gray-100 pb-12">
          <div className="flex flex-col gap-2">
            <span className="text-technical text-[10px] text-gray-400 font-[900] tracking-[0.3em] uppercase">COLLECTIONS</span>
            <h1 className="text-[clamp(3rem,8vw,6rem)] font-[900] text-black tracking-[-0.04em] leading-[0.85] uppercase">
               {selectedCategory === 'ALL' ? 'SHOP ALL' : selectedCategory}
            </h1>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            {/* Filters */}
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-technical text-[11px] font-[800] tracking-[0.2em] transition-all relative pb-1
                    ${selectedCategory === cat ? 'text-black' : 'text-gray-400 hover:text-black'}
                  `}
                >
                  {cat}
                  {selectedCategory === cat && (
                    <motion.div 
                      layoutId="activeCategory"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-black"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Item Count */}
            <div className="text-technical text-[10px] text-gray-400 font-bold tracking-[0.1em]">
              SHOWING {filteredProducts.length} {filteredProducts.length === 1 ? 'PIECE' : 'PIECES'}
            </div>
          </div>
        </div>
      </div>

      {/* Grid Container */}
      <div className="max-w-[1800px] mx-auto px-6 lg:px-10">
        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
             {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-portrait bg-gray-50 animate-pulse border border-gray-100" />
             ))}
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-16"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((item, index) => (
                <ProductCard key={item.id} product={item} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && filteredProducts.length === 0 && (
          <div className="py-32 flex flex-col items-center justify-center border border-dashed border-[var(--color-border-subtle)]">
            <p className="text-technical text-[12px] text-[var(--color-text-secondary)] tracking-[0.2em]">NO PIECES FOUND IN THIS DEPARTMENT.</p>
            <button 
              onClick={() => setSelectedCategory('ALL')}
              className="mt-6 text-technical text-[10px] font-bold border-b border-black pb-1"
            >
              CLEAR FILTERS
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
