import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { Product } from '../data/products';
import { fetchProducts } from '../lib/api';

const CollectionItem: React.FC<{ item: Product, index: number }> = ({ item, index }) => {
  const { setQuickViewProduct } = useStore();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
      className="group cursor-pointer flex flex-col gap-6"
      onClick={() => setQuickViewProduct(item)}
    >
      <div className="relative aspect-square overflow-hidden bg-[#0A0A0A] border border-white/5 transition-colors duration-500 group-hover:border-white/20">
        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent mix-blend-multiply pointer-events-none z-10 transition-opacity duration-500 group-hover:opacity-40" />
        
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-contain p-8 film-image group-hover:scale-110 transition-transform duration-[1.5s] ease-[0.25,1,0.5,1]"
          referrerPolicy="no-referrer"
        />
        
        <div className="absolute bottom-6 left-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <span className="text-technical text-[9px] bg-white text-black px-2 py-1">VIEW PIECE</span>
        </div>
      </div>
      
      <div className="flex flex-col gap-1 text-center">
        <h3 className="text-technical text-xs tracking-[0.2em] text-white/60 group-hover:text-white transition-colors">
          {item.name}
        </h3>
        <p className="text-technical text-sm font-bold tracking-[0.3em]">
          ${item.price}.00
        </p>
      </div>
    </motion.div>
  );
}

export function Collection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | 'All'>('All');
  const { isLoading, setLoading } = useStore();

  useEffect(() => {
    setLoading(true);
    fetchProducts().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, [setLoading]);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category || 'Uncategorized')))];
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => (p.category || 'Uncategorized') === selectedCategory);

  return (
    <div className="min-h-screen w-full bg-black transition-colors duration-[var(--duration-mode)] ease-in-out pb-[clamp(4rem,8vw,8rem)]">
      <div className="pt-[clamp(8rem,14vw,12rem)] pb-12 px-[clamp(1.25rem,5vw,6rem)] max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-white/5 pb-12">
          <div>
            <p className="text-technical text-[10px] text-white/40 mb-4 tracking-[0.5em]">DEPARTMENT // {selectedCategory.toUpperCase()}</p>
            <h1 className="text-[clamp(3rem,8vw,6rem)] font-display text-white tracking-tighter leading-none uppercase">
              The Archive<span className="opacity-20 italic">.</span>
            </h1>
          </div>
          <div className="flex flex-wrap gap-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-technical text-[10px] tracking-[0.3em] transition-all ${selectedCategory === cat ? 'text-white border-b border-white pb-1' : 'text-white/40 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-[clamp(1.25rem,5vw,6rem)]">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
             {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square bg-white/5 animate-pulse border border-white/5" />
             ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24">
            {filteredProducts.map((item, index) => (
              <CollectionItem key={item.id} item={item} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
