import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative w-full transition-colors duration-[var(--duration-base)]">
      
      {/* 1. Hero Section - Full Height Atmospheric Image */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Atmospheric Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-img.jpg" 
            alt="Heaton SS26" 
            className="w-full h-full object-cover brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Hero Content - Centered */}
        <div className="relative z-10 flex flex-col items-center text-center text-white px-6">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[14px] font-bold uppercase tracking-[0.2em] mb-4"
          >
            Now Live
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[clamp(2.5rem,8vw,5.5rem)] font-bold uppercase leading-none mb-10 tracking-tight"
          >
            <Link to="/shop" className="hover:opacity-70 transition-opacity">
              UTOPIA UG
            </Link>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-4 sm:gap-6"
          >
            <Link to="/shop" className="min-w-[160px] bg-transparent border border-white text-white py-4 px-10 text-[12px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
              Explore Collection
            </Link>
            <Link to="/about" className="min-w-[160px] bg-transparent border border-white text-white py-4 px-10 text-[12px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
              Our Story
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Featured Grid Section - As shown in the second screenshot */}
      <section className="bg-white py-20 px-6 lg:px-10">
        <div className="max-w-[1800px] mx-auto flex flex-col items-center">
          
          {/* Horizontal Product Scroller/Grid */}
          <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            {[
              { id: '1', name: 'MH Shrunken Zip Hoodie', price: 40000, color: 'Vintage Navy', image: '/shirt-1.jpg' },
              { id: '2', name: 'GH Shrunken Zip Hoodie', price: 40000, color: 'Jet Black', image: '/shirt-2.jpg' },
              { id: '3', name: 'GH Knitted Long Sleeve Top', price: 40000, color: 'Jet Black', variants: '2 Colours', image: '/shirt-3.jpg' },
              { id: '4', name: 'GH Knitted Long Sleeve Top', price: 40000, color: 'Espresso', variants: '2 Colours', image: '/shirt-4.jpg' },
              { id: '5', name: 'GH Shrunken Sweatshirt', price: 40000, color: 'Jet Black', image: '/shirt-2.jpg' },
            ].map((item) => (
              <div key={item.id} className="flex flex-col gap-3 group cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden bg-gray-50 relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute bottom-4 right-4 bg-white/80 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </div>
                </div>
                <div className="flex flex-col gap-1 pr-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-[11px] font-bold uppercase leading-tight max-w-[140px]">{item.name}</h3>
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium">
                    {item.color}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link to="/shop" className="bg-black text-white py-4 px-12 text-[12px] font-bold uppercase tracking-[0.2em] hover:opacity-80 transition-opacity">
            Shop Heaton
          </Link>
        </div>
      </section>

      {/* 3. Editorial Section */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <img 
          src="/hero-desktop.png" 
          alt="Technical Apparel" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </section>

    </div>
  );
}


