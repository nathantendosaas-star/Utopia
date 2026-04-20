import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen w-full bg-black overflow-hidden selection:bg-white selection:text-black">
      {/* Texture Layer */}
      <div className="fixed inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] z-50" />
      
      <div className="relative z-20 w-full max-w-[var(--container-max)] mx-auto px-[var(--gutter)] pt-[clamp(10rem,20vh,15rem)]">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "circOut" }}
            className="w-full"
          >
             <div className="flex items-center gap-4 mb-8">
               <span className="h-[2px] w-12 bg-[var(--color-accent-primary)]" />
               <span className="text-technical text-[10px] text-[var(--color-accent-primary)] font-bold tracking-[1em]">EST. 199X / KLA</span>
             </div>
             <div className="flex flex-col lg:flex-row items-start lg:items-end gap-8 mb-12">
               <h1 className="text-[clamp(4rem,12vw,10rem)] font-display uppercase tracking-tighter tracking-wide leading-[0.8] text-white">
                 <span className="block mb-4">UTOPIA</span>
                 <span>UG</span>
               </h1>
               <div className="w-full aspect-video overflow-hidden rounded-sm border border-white/10 mb-2 relative group">
                 <div className="absolute inset-0 bg-[var(--color-accent-primary)]/10 mix-blend-overlay z-10" />
                 <video 
                   src="/hero-video.mp4" 
                   autoPlay 
                   loop 
                   muted 
                   playsInline 
                   className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                 />
               </div>
             </div>             <p className="font-mono text-sm text-white/60 leading-relaxed uppercase tracking-widest max-w-2xl">
                Raw utility meets Kampala spirit. Engineered for the Ugandan streets. A movement in analog minimalism and structural form.
             </p>
          </motion.div>
        </div>

        {/* Action Links — Minimal Bracketed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-wrap gap-x-16 gap-y-8 items-center border-t border-white/5 pt-12 mb-48"
        >
          <Link to="/shop" className="btn-bracket text-lg hover:translate-x-2 transition-transform">
            GET ON THE LIST
          </Link>
          <Link to="/archives" className="btn-bracket text-lg hover:translate-x-2 transition-transform">
            F&F ACCESS
          </Link>
          <Link to="/about" className="btn-bracket text-lg hover:translate-x-2 transition-transform">
            EXPLORE LOOKBOOK
          </Link>
        </motion.div>

        {/* Minimal Information Footer */}
        <div className="border-t border-white/5 py-12 flex flex-col md:flex-row justify-between items-end gap-8 opacity-30">
          <div className="text-technical text-[7px] space-y-1">
            <p>DESIGNED IN KAMPALA</p>
            <p>GLOBAL DISTRIBUTION // SYSTEM 0.1</p>
          </div>
          <div className="text-technical text-[7px] text-right">
            <p>© 199X UTOPIA UG</p>
            <p>ALL RIGHTS RESERVED</p>
          </div>
        </div>
      </div>

      {/* Decorative Scanner Line */}
      <div className="fixed top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent animate-scan z-50 pointer-events-none" />
    </div>
  );
}
