import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { products, Product } from '../data/products';

const CollectionItem: React.FC<{ item: Product, index: number }> = ({ item, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const { setQuickViewProduct } = useStore();

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group cursor-pointer flex flex-col gap-[var(--space-4)]"
      onClick={() => setQuickViewProduct(item)}
    >
      <div className="relative aspect-[3/4] overflow-hidden border border-[var(--color-border-subtle)] bg-[#160E06]">
        {/* Dark overlay for film feel */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#140A04]/40 to-transparent mix-blend-multiply pointer-events-none z-10 transition-opacity duration-500 group-hover:opacity-0" />
        <div className="hero-scanlines z-10 opacity-50 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
        
        <motion.div style={{ y: imageY }} className="w-full h-full">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover film-image scale-110 group-hover:scale-105 transition-transform duration-[1.2s] ease-[0.25,0.46,0.45,0.94]"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <div className="absolute bottom-0 left-0 w-full h-[40px] bg-[var(--color-bg-primary)]/80 backdrop-blur-[4px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--duration-base)] z-20">
          <span className="font-mono text-[11px] uppercase text-[var(--color-text-primary)] tracking-[var(--tracking-widest)]">Quick View</span>
        </div>
      </div>
      
      <div className="flex justify-between items-start">
        <h3 className="font-display text-[var(--text-heading-sm)] text-[var(--color-text-primary)] leading-none group-hover:text-[var(--color-accent-primary)] transition-colors duration-300">
          {item.name}
        </h3>
        <span className="font-mono text-[var(--text-micro)] tracking-[var(--tracking-widest)] text-[var(--color-text-secondary)]">
          ${item.price}
        </span>
      </div>
    </motion.div>
  );
}

export function Collection() {
  useEffect(() => {
    const el = document.querySelector('.collection-headline');
    if (el) {
      el.classList.add('vhs-glitch');
      setTimeout(() => el.classList.remove('vhs-glitch'), 420);
    }
  }, []);

  return (
    <div className="min-h-screen w-full bg-[var(--color-bg-primary)] transition-colors duration-[var(--duration-mode)] ease-in-out pb-[clamp(4rem,8vw,8rem)]">
      {/* Header Section */}
      <div className="pt-[clamp(6rem,12vw,10rem)] pb-[clamp(4rem,8vw,6rem)] px-[clamp(1.25rem,5vw,4rem)] max-w-[1280px] mx-auto relative">
        <div className="hero-monogram opacity-50 top-0 left-0">
          <span className="mono-ug">UG</span>
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-[var(--space-8)] border-b border-[var(--color-border-subtle)] pb-[var(--space-8)]">
          <div>
            <p className="hero-label">SHOP THE ARCHIVE</p>
            <h1 className="hero-headline collection-headline mb-0" data-text="Collection.">
              Collection.
            </h1>
          </div>
          <p className="font-mono text-[var(--text-micro)] text-[var(--color-text-secondary)] uppercase tracking-[var(--tracking-widest)] max-w-[200px] md:text-right">
            DISPLAYING {products.length} ITEMS<br/>NO WASTED POTENTIAL
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-[clamp(1.25rem,5vw,4rem)]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-[var(--space-20)] md:gap-y-0">
          {products.map((item, index) => {
            const isEven = index % 2 !== 0;
            // Alternating patterns for a more editorial, less rigid feel
            const layoutClasses = isEven 
              ? (index % 4 === 1 
                  ? 'md:col-span-5 md:col-start-7 md:mt-[var(--space-48)] lg:mt-[var(--space-64)]' 
                  : 'md:col-span-4 md:col-start-8 md:mt-[var(--space-24)] lg:mt-[var(--space-32)]')
              : (index % 4 === 0 
                  ? 'md:col-span-5 md:col-start-2' 
                  : 'md:col-span-6 md:col-start-1 md:mt-[var(--space-12)]');

            return (
              <div 
                key={item.id} 
                className={`flex flex-col ${layoutClasses}`}
              >
                <CollectionItem item={item} index={index} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
