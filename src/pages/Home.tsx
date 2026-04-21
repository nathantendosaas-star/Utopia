import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useStore();

  const featuredItems = [
    { id: '1', name: 'UTOPIA SIGNATURE T-SHIRT', price: 40000, color: 'Black', image: '/shirt-1.jpg' },
    { id: '1-white', name: 'UTOPIA SIGNATURE T-SHIRT', price: 40000, color: 'White', image: '/shirt-2.jpg' },
    { id: '1-cobalt', name: 'UTOPIA SIGNATURE T-SHIRT', price: 40000, color: 'Cobalt', image: '/shirt-3.jpg' },
    { id: '1-flat-white', name: 'UTOPIA SIGNATURE T-SHIRT', price: 40000, color: 'Flat White', image: '/shirt-4.jpg' },
  ];

  return (
    <div ref={containerRef} className="relative w-full transition-colors duration-[var(--duration-base)]">
      
      {/* 1. Hero Section - Full Height Atmospheric Video/Image */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        {/* Atmospheric Background Video */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover brightness-[0.7]"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Hero Content - Centered */}
        <div className="relative z-10 flex flex-col items-center text-center text-white px-6">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-technical text-[12px] mb-6"
          >
            Now Live
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3.5rem,15vw,12rem)] font-[900] uppercase leading-[0.85] mb-12 tracking-[-0.04em]"
          >
            UTOPIA UG
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/shop" className="btn-ghost-white min-w-[200px]">
              Shop Now
            </Link>
            <Link to="/about" className="btn-ghost-white min-w-[200px]">
              The Story
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Featured Grid Section */}
      <section className="bg-white py-24 px-6 lg:px-10">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-technical text-gray-400 mb-4">Summer 2026</h2>
            <h3 className="text-heading text-4xl">Featured Collection</h3>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 mb-20">
            {products.slice(0, 4).map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>

          <div className="flex justify-center">
            <Link to="/shop" className="btn-primary min-w-[240px]">
              View All Products
            </Link>
          </div>
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
