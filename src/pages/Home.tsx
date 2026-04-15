import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { products } from '../data/products';

gsap.registerPlugin(ScrollTrigger);

export function Home() {
  const { setQuickViewProduct } = useStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero entry animation logic could go here
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      {/* 
          YIN: THE "PORTRA WARMTH" HERO
          Clean, expansive whitespace matching the highlights of your analog photos.
      */}
      <section className="relative min-h-screen w-full flex flex-col justify-center items-center py-20 px-[clamp(1.25rem,5vw,6rem)] bg-yin">
        <div className="relative z-20 w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-12"
          >
            <div className="relative aspect-video w-full overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-[var(--color-border-subtle)]">
              <picture>
                <source media="(max-width: 768px)" srcSet="/hero-desktop.png" />
                <img 
                  src="/hero-desktop.png" 
                  alt="Utopia UG" 
                  className="w-full h-full object-cover transition-all duration-[3s] scale-100 hover:scale-105"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)]/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 font-mono text-[8px] uppercase tracking-[0.5em] text-white/40">CAM-01 / REF-UG</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-12 flex flex-col items-center text-center mt-12"
          >
            <div className="flex items-center gap-6 mb-8">
              <span className="h-[1px] w-12 bg-[var(--color-accent-primary)]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--color-accent-primary)] font-bold">
                Chapter 001 / Analog
              </span>
              <span className="h-[1px] w-12 bg-[var(--color-accent-primary)]" />
            </div>
            
            <p className="text-[20px] text-[var(--color-text-secondary)] font-light leading-relaxed mb-12 max-w-2xl">
              Raw utility meets Tokyo precision. Engineered for the New York concrete.
            </p>

            <div className="flex flex-wrap gap-12 items-center justify-center">
              <Link to="/shop" className="btn-primary">
                UNIFORMS
              </Link>
              <Link to="/archives" className="group flex items-center gap-3 btn-ghost">
                RECONSTRUCTED <ArrowUpRight size={14} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 
          YANG: THE "EDITORIAL NOIR" SECTION
          Deep, inky shadows matching the Mercedes night photos and dark apparel.
      */}
      <section className="py-48 px-[clamp(1.25rem,5vw,4rem)] bg-yang border-y border-[var(--color-border-subtle)] overflow-hidden">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2 }}
              className="lg:col-span-7 relative group"
            >
              <div className="aspect-[16/9] overflow-hidden bg-black shadow-2xl border border-white/5">
                <video 
                  src="/hero-video.mp4" 
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-1000"
                  autoPlay loop muted playsInline
                />
              </div>
              <div className="absolute -bottom-10 -left-10 z-10 opacity-5 hidden lg:block">
                 <span className="font-display text-[15vw] leading-none text-white select-none outline-text">FILM</span>
              </div>
            </motion.div>

            <div className="lg:col-span-5 lg:pl-16 relative z-20">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--color-accent-primary)] mb-10 block">The Blueprint</span>
              <h2 className="text-[clamp(3.5rem,6vw,7rem)] font-display leading-[0.85] mb-12 uppercase tracking-tighter text-[var(--color-text-primary)]">
                Raw<br/><span className="italic font-light opacity-40">Construction.</span>
              </h2>
              <p className="text-[18px] text-[var(--color-text-secondary)] font-light leading-relaxed mb-16 max-w-md">
                Stripped back to the essentials. Function over everything. Deconstructing the uniform for the modern void.
              </p>
              <Link to="/about" className="btn-ghost">Behind the Brand</Link>
            </div>

          </div>
        </div>
      </section>

      {/* 
          YIN: THE CURATED ARCHIVE
          Returning to light mode for focus and retail clarity.
      */}
      <section className="py-48 bg-yin">
        <div className="max-w-[1280px] mx-auto px-[clamp(1.25rem,5vw,4rem)]">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-32 gap-12">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--color-text-muted)] mb-8 block">Current Drop</span>
              <h2 className="text-[clamp(3.5rem,7vw,8rem)] font-display text-[var(--color-text-primary)] tracking-tighter leading-none uppercase">
                The<br/>
                <span className="italic font-light opacity-30">Archive</span>
              </h2>
            </div>
            <Link to="/shop" className="btn-ghost">Explore Archive</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24">
            {products.slice(6, 10).map((item, idx) => (
              <motion.div 
                key={item.id} 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: idx * 0.1, ease: [0.25, 1, 0.5, 1] }}
                className="group cursor-pointer"
                onClick={() => setQuickViewProduct(item)}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-bg-secondary)] mb-10 shadow-xl group-hover:shadow-2xl transition-all duration-1000 border border-[var(--color-border-subtle)]">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-[1.5s]"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
                <div className="space-y-3">
                  <h5 className="font-display text-3xl text-[var(--color-text-primary)] tracking-tight leading-tight">{item.name}</h5>
                  <div className="flex justify-between items-center border-t border-[var(--color-border-subtle)] pt-4">
                    <span className="font-mono text-[10px] text-[var(--color-text-muted)] tracking-[0.3em] uppercase">${item.price}</span>
                    <span className="font-mono text-[9px] text-[var(--color-accent-primary)] font-bold tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity">QUICK VIEW</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 
          FINAL CALLOUT 
      */}
      <section className="py-72 text-center bg-yin relative overflow-hidden border-t border-[var(--color-border-subtle)]">
        <div className="absolute inset-0 pointer-events-none opacity-5">
           <span className="font-display text-[30vw] leading-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 outline-text">UTOPIA</span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="relative z-10"
        >
          <h2 className="text-[clamp(5rem,15vw,18rem)] font-display uppercase mb-20 leading-tight tracking-tighter text-[var(--color-text-primary)]">
            Own the <span className="italic font-light opacity-30">Void.</span>
          </h2>
          <Link to="/shop" className="btn-primary scale-110">
            SHOP THE DROP
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
