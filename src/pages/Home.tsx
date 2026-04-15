import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { products } from '../data/products';

gsap.registerPlugin(ScrollTrigger);

export function Home() {
  const { setQuickViewProduct } = useStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = document.querySelector('.hero-headline');
    if (el) {
      el.classList.add('vhs-glitch');
      setTimeout(() => el.classList.remove('vhs-glitch'), 420);
    }
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      {/* 
          YIN: WARM SAND SECTION 
          Matches the Golden Hour sunlight in the photos.
      */}
      <section className="relative min-h-[90vh] w-full flex flex-col justify-center items-center py-32 px-[clamp(1.25rem,5vw,6rem)] bg-yin">
        <div className="relative z-20 w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-5 order-2 lg:order-1"
          >
            <div className="flex items-center gap-4 mb-10">
              <span className="h-px w-10 bg-[var(--color-accent-primary)]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--color-accent-primary)] font-bold">
                Chapter 001 / Reconstruct
              </span>
            </div>
            
            <h1 className="hero-headline text-[var(--color-text-primary)] mb-10 leading-[0.9] text-[clamp(4rem,9vw,9rem)] font-display uppercase tracking-tighter" data-text="No Wasted Potential.">
              No Wasted<br />
              <span className="italic font-light">Potential.</span>
            </h1>

            <p className="text-[18px] text-[var(--color-text-secondary)] font-light leading-relaxed mb-14 max-w-sm">
              Exploring the harmony between raw industrial textures and the softness of human movement.
            </p>

            <div className="flex flex-wrap gap-10 items-center">
              <Link to="/shop" className="btn-primary">
                COLLECTION
              </Link>
              <Link to="/archives" className="group flex items-center gap-3 btn-ghost">
                RECONSTRUCTED <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-7 order-1 lg:order-2"
          >
            <div className="relative aspect-[3/2] w-full overflow-hidden shadow-2xl border border-[var(--color-border-subtle)]">
              <img 
                src="/hero-img.jpg" 
                alt="Utopia UG" 
                className="w-full h-full object-cover transition-all duration-[2s] scale-100 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)]/10 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 
          YANG: DEEP ESPRESSO SECTION 
          Matches the shadows and the Mercedes night photos.
      */}
      <section className="py-40 px-[clamp(1.25rem,5vw,4rem)] bg-yang border-y border-[var(--color-border-subtle)]">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            
            <div className="lg:col-span-7 relative group">
              <div className="aspect-[16/9] overflow-hidden bg-black shadow-2xl border border-[var(--color-border-subtle)]">
                <video 
                  src="/hero-video.mp4" 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-1000"
                  autoPlay loop muted playsInline
                />
              </div>
            </div>

            <div className="lg:col-span-5 lg:pl-10">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--color-accent-primary)] mb-8 block">Philosophy</span>
              <h2 className="text-[clamp(3.5rem,5.5vw,5.5rem)] font-display leading-[0.9] mb-10 uppercase tracking-tighter">
                The Art of<br/><span className="italic font-light opacity-60">Omission.</span>
              </h2>
              <p className="text-[17px] text-[var(--color-text-secondary)] leading-relaxed mb-12 max-w-md">
                We believe that what is left behind is just as important as what is presented. Stripping the garment to its architectural soul.
              </p>
              <Link to="/about" className="btn-ghost">The Void Narrative</Link>
            </div>

          </div>
        </div>
      </section>

      {/* 
          PRODUCT SHOWCASE 
      */}
      <section className="py-40 bg-yin">
        <div className="max-w-[1280px] mx-auto px-[clamp(1.25rem,5vw,4rem)]">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-24 gap-10">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--color-text-muted)] mb-6 block">The Archive</span>
              <h2 className="text-[clamp(3.5rem,6vw,6rem)] font-display text-[var(--color-text-primary)] tracking-tighter leading-none uppercase">
                Selected<br/>
                <span className="italic font-light opacity-40">Silhouettes</span>
              </h2>
            </div>
            <Link to="/shop" className="btn-ghost">View All</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {products.slice(6, 10).map((item, idx) => (
              <motion.div 
                key={item.id} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: idx * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group cursor-pointer"
                onClick={() => setQuickViewProduct(item)}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-bg-secondary)] mb-8 shadow-md border border-[var(--color-border-subtle)]">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover transition-all duration-1000"
                  />
                </div>
                <div className="space-y-2">
                  <h5 className="font-display text-2xl text-[var(--color-text-primary)] tracking-tight">{item.name}</h5>
                  <span className="font-mono text-[10px] text-[var(--color-text-muted)] tracking-[0.3em] uppercase">${item.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 
          FINAL CALLOUT 
      */}
      <section className="py-60 text-center bg-yin relative overflow-hidden border-t border-[var(--color-border-subtle)]">
        <div className="absolute inset-0 pointer-events-none opacity-5">
           <span className="font-display text-[25vw] leading-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 outline-text">UTOPIA</span>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="relative z-10"
        >
          <h2 className="text-[clamp(4.5rem,11vw,11rem)] font-display uppercase mb-16 leading-tight tracking-tighter">
            Own the <span className="italic font-light opacity-50">Void.</span>
          </h2>
          <Link to="/shop" className="btn-primary">
            Enter Store
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
