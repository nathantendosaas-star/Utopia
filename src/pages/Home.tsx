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
      
      {/* Background Hero Graphic */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none overflow-hidden">
        <motion.span 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.05 }}
          transition={{ duration: 3, ease: [0.25, 1, 0.5, 1] }}
          className="font-display text-[50vw] leading-none select-none outline-text"
        >
          UTOPIA
        </motion.span>
      </div>

      <div className="relative z-20 w-full max-w-[var(--container-max)] mx-auto px-[var(--gutter)] pt-[clamp(10rem,20vh,15rem)]">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "circOut" }}
            className="max-w-xl"
          >
             <div className="flex items-center gap-4 mb-8">
               <span className="h-[1px] w-8 bg-white/20" />
               <span className="text-technical text-[9px] text-white/40 tracking-[0.6em]">EST. 199X / KLA</span>
             </div>
             <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-display uppercase tracking-tighter leading-[0.85] text-white mb-12">
               SEE YOU SOON<br/><span className="italic font-light opacity-40">WORLD!</span>
             </h1>
             <p className="font-mono text-[11px] text-white/40 leading-relaxed uppercase tracking-wider max-w-sm">
                Raw utility meets Kampala spirit. Engineered for the Ugandan streets. A movement in analog minimalism and structural form.
             </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="w-32 h-32 md:w-48 md:h-48 border border-white/10 flex items-center justify-center bg-white/[0.02] backdrop-blur-sm"
          >
             <img 
               src="/Gemini_Generated_Image_404e2c404e2c404e.png" 
               alt="Utopia Logo" 
               className="w-2/3 h-auto opacity-80"
             />
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

        {/* Featured Editorial Section — Asymmetric Grid */}
        <section className="pb-[var(--section-spacing)]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
            
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
              className="md:col-span-8 group relative overflow-hidden"
            >
              <div className="absolute top-6 left-6 z-20 mix-blend-difference">
                 <p className="text-technical text-[8px] text-white tracking-[0.5em]">EDITORIAL // 01</p>
              </div>
              <div className="aspect-[16/10] overflow-hidden border border-white/5 bg-zinc-950">
                <img 
                  src="/hero-desktop.png" 
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2.5s] ease-out"
                  alt="Editorial Large"
                />
              </div>
              <div className="absolute bottom-6 right-6 z-20 text-right opacity-0 group-hover:opacity-40 transition-opacity">
                 <p className="text-technical text-[7px] text-white tracking-[0.3em]">REF. 2026-UG-01</p>
              </div>
            </motion.div>

            <div className="md:col-span-4 space-y-12">
               <motion.div
                 initial={{ opacity: 0, x: 50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 1.2, delay: 0.3 }}
                 className="aspect-square border border-white/5 bg-zinc-950 overflow-hidden group"
               >
                 <img 
                   src="/hero-img.jpg" 
                   className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-1000"
                   alt="Editorial Small"
                 />
               </motion.div>
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 1 }}
                 className="p-8 border-l border-white/10 bg-white/[0.01] backdrop-blur-3xl"
               >
                 <p className="text-technical text-[8px] text-white/20 mb-6 tracking-[0.5em]">SYSTEM NOTES</p>
                 <h4 className="font-display text-2xl text-white mb-4 uppercase tracking-tight">Analog Utility</h4>
                 <p className="font-mono text-[10px] text-white/40 leading-relaxed uppercase space-y-4">
                    <span>Stripped back to the essentials. Function over everything. Deconstructing the uniform for the modern void.</span>
                    <br/><br/>
                    <span className="opacity-20">— Utopia™ Analog Systems</span>
                 </p>
               </motion.div>
            </div>

          </div>
        </section>

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
