import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { products } from '../data/products';
import { Zap, ArrowRight, Layers, Box } from 'lucide-react';

export function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <div ref={containerRef} className="relative w-full bg-white">
      
      {/* 1. Hero Section - Brutalist & Immersive */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover brightness-[0.6] grayscale-[0.3]"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
        </motion.div>

        <div className="relative z-10 w-full px-6 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="text-center"
          >
            <p className="text-technical text-white/60 mb-8 tracking-[0.4em]">SEASON 01 — SS26</p>
            <h1 className="relative">
              <span className="block text-[clamp(3.2rem,17.6vw,16rem)] font-display font-[900] uppercase leading-[0.75] tracking-[-0.02em] text-white">
                UTOPIA
              </span>
              <span className="block text-[clamp(3.2rem,17.6vw,16rem)] font-display font-[900] uppercase leading-[0.75] tracking-[-0.01em] text-transparent stroke-white stroke-1" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}>
                UG
              </span>
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-12 flex flex-col sm:flex-row gap-6"
          >
            <Link to="/shop" className="btn-ghost-white group flex items-center gap-3">
              EXPLORE COLLECTION <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Technical Corner Info */}
        <div className="absolute bottom-10 left-10 z-10 hidden lg:block">
          <div className="text-technical text-white/40 flex flex-col gap-1">
            <span>LAT: 0.3476° N</span>
            <span>LONG: 32.5825° E</span>
          </div>
        </div>
      </section>

      {/* 2. Marquee - Brand Energy */}
      <div className="bg-black py-6 border-y border-white/10 overflow-hidden">
        <div className="animate-marquee flex gap-12 items-center">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-12">
              <span className="text-heading text-4xl text-white">UTOPIA UGANDA</span>
              <Zap size={24} className="text-white fill-white" />
              <span className="text-heading text-4xl text-transparent stroke-white" style={{ WebkitTextStroke: '1px white' }}>STREETWEAR</span>
              <Box size={24} className="text-white" />
            </div>
          ))}
        </div>
      </div>

      {/* 3. Lookbook Section - Asymmetrical Technical Grid */}
      <section className="py-32 px-6 lg:px-10 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
          
          {/* Item 1 - Large Left */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 group"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 mb-8">
              <img 
                src={products[0]?.image || "/shirt-1.jpg"} 
                alt="Product" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute top-6 left-6 bg-black text-white px-3 py-1 text-technical">
                NEW RELEASE
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-heading text-3xl mb-2">{products[0]?.name}</h3>
                <div className="flex gap-4 text-technical text-gray-500">
                  <span>{products[0]?.specs?.gsm}</span>
                  <span>{products[0]?.specs?.fit}</span>
                </div>
              </div>
              <Link to={`/product/${products[0]?.id}`} className="p-4 border border-black hover:bg-black hover:text-white transition-colors">
                <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>

          {/* Item 2 - Smaller Offset Right */}
          <motion.div 
            style={{ y: y2 }}
            className="lg:col-span-4 lg:col-start-9 mt-20"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-8 group">
               <img 
                src={products[0]?.secondaryImage || "/shirt-2.jpg"} 
                alt="Product" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="border-l-2 border-black pl-6">
              <p className="text-technical text-gray-400 mb-4">SPECIFICATIONS</p>
              <p className="text-sm leading-relaxed text-gray-600 mb-6 italic">
                "{products[0]?.description?.split('.')[0]}."
              </p>
              <Link to="/shop" className="text-nav flex items-center gap-2 group">
                VIEW TECHNICAL SPECS <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 4. Full Width Editorial */}
      <section className="relative h-[90vh] w-full overflow-hidden bg-black">
        <motion.img 
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src="/hero-desktop.png" 
          alt="Technical Apparel" 
          className="w-full h-full object-cover opacity-80 grayscale"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <h2 className="text-heading text-[clamp(3rem,10vw,8rem)] text-white mb-8">THE VAULT</h2>
            <Link to="/archives" className="btn-ghost-white">BROWSE ARCHIVES</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
