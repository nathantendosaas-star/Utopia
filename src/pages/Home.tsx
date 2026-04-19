import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add a dark theme class to the body when on home for maximum impact
    document.documentElement.setAttribute('data-theme', 'dark');
    return () => {
      // Optional: keep theme or revert based on user preference
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen w-full bg-black overflow-hidden flex flex-col justify-center items-center px-[clamp(1.25rem,5vw,6rem)]">
      {/* Gritty Texture Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      
      {/* Background Graphic (Subtle) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <span className="font-display text-[40vw] leading-none select-none outline-text">UTOPIA</span>
      </div>

      <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Main Logo/Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
          className="mb-16"
        >
          <img 
            src="/Gemini_Generated_Image_404e2c404e2c404e.png" 
            alt="Utopia UG Logo" 
            className="w-32 h-auto opacity-80"
          />
        </motion.div>

        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="space-y-4 mb-24"
        >
          <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-display uppercase tracking-tighter leading-none text-white">
            SEE YOU SOON WORLD!
          </h1>
          <p className="text-technical text-white/40 tracking-[0.4em]">
            Don't miss the next drop
          </p>
        </motion.div>

        {/* Action Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col gap-8 items-center w-full"
        >
          <Link to="/shop" className="btn-bracket text-lg">
            GET ON THE LIST
          </Link>
          <Link to="/archives" className="btn-bracket text-lg">
            F&F ACCESS
          </Link>
          <Link to="/about" className="btn-bracket text-lg">
            EXPLORE LOOKBOOK
          </Link>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 left-0 w-full px-[clamp(1.25rem,5vw,6rem)] flex justify-between items-end pointer-events-none"
        >
          <div className="text-technical text-[7px] space-y-1">
            <p>REF. 00-UG-2026</p>
            <p>KAMPALA // UGANDA</p>
          </div>
          <div className="text-technical text-[7px] text-right">
            <p>GLOBAL DISTRIBUTION</p>
            <p>UTOPIA™ ANALOG SYSTEMS</p>
          </div>
        </motion.div>
      </div>

      {/* Decorative Scanner Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent animate-scan" />
    </div>
  );
}
