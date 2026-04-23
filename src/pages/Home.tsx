import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { ArrowRight, Zap, MoveDown, Info, ShieldCheck } from 'lucide-react';

export function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const product = products[0];
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div ref={containerRef} className="relative w-full bg-[var(--color-bg-primary)] overflow-hidden">
      
      {/* 1. Cinematic Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover grayscale brightness-[0.3] contrast-[1.2]"
          >
            <source src={product.video} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
        </motion.div>

        <div className="relative z-10 w-full px-6 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="flex items-center justify-center gap-3 mb-8">
                <span className="w-12 h-px bg-white/10" />
                <p className="text-technical text-white/40 tracking-[0.5em] uppercase">SS26 // ARCHIVE_DROP_001</p>
                <span className="w-12 h-px bg-white/10" />
            </div>
            <h1 className="relative mb-12">
              <span className="block text-[clamp(4rem,20vw,18rem)] font-display font-[900] uppercase leading-[0.75] tracking-[-0.05em] text-white">
                UTOPIA
              </span>
              <span className="block text-[clamp(4rem,20vw,18rem)] font-display font-[900] uppercase leading-[0.75] tracking-[-0.04em] text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
                UG
              </span>
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/signature" className="btn-ghost-white group flex items-center gap-3 min-w-[240px] !border-white/20 hover:!border-white">
                [ THE_STORY ] <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/shop" className="btn-primary group flex items-center gap-3 min-w-[240px] !bg-white !text-black border-white">
                [ ACCESS_DROP ] <Zap size={14} className="fill-black" />
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-10 z-10 text-white/20 flex flex-col gap-1"
        >
          <span className="text-technical text-[10px]">LOC: 0.3476° N, 32.5825° E</span>
          <span className="text-technical text-[10px]">VER: SS26.001.ARCHIVE</span>
        </motion.div>
      </section>

      {/* 2. The Blueprint — Technical Callouts */}
      <section className="relative py-40 bg-[var(--color-bg-primary)] border-y border-white/5">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-10">
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            
            {/* Left Tech Stack */}
            <div className="lg:col-span-3 space-y-20 z-10">
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="border-l border-white/20 pl-8"
                >
                    <p className="text-technical text-white/30 mb-2">// SPEC_01</p>
                    <h3 className="text-2xl font-bold uppercase mb-4 tracking-tighter text-white">220GSM_HEAVYWEIGHT</h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-mono">SUBSTANTIAL DRAPE. ENGINEERED 100% LONG-STAPLE COTTON.</p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="border-l border-white/20 pl-8"
                >
                    <p className="text-technical text-white/30 mb-2">// SPEC_02</p>
                    <h3 className="text-2xl font-bold uppercase mb-4 tracking-tighter text-white">REINFORCED_COLLAR</h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-mono">DOUBLE-NEEDLE STITCHED 1X1 RIB. ZERO STRETCH DEFORMATION.</p>
                </motion.div>
            </div>

            {/* Center Ghost Image */}
            <div className="lg:col-span-6 relative">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative aspect-square"
                >
                    <img 
                        src={product.image} 
                        alt="The Signature Blueprint" 
                        className="w-full h-full object-contain grayscale brightness-[0.7] contrast-[1.2] opacity-80"
                    />
                    {/* SVG Blueprint Lines */}
                    <div className="absolute inset-0 pointer-events-none opacity-20">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            <line x1="20" y1="30" x2="80" y2="30" stroke="white" strokeWidth="0.1" strokeDasharray="1,1" />
                            <line x1="20" y1="70" x2="80" y2="70" stroke="white" strokeWidth="0.1" strokeDasharray="1,1" />
                            <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="0.05" />
                        </svg>
                    </div>
                </motion.div>
            </div>

            {/* Right Tech Stack */}
            <div className="lg:col-span-3 space-y-20 z-10 lg:text-right">
                <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="lg:border-r lg:border-l-0 border-l border-white/20 lg:pr-8 pl-8 lg:pl-0"
                >
                    <p className="text-technical text-white/30 mb-2">// SPEC_03</p>
                    <h3 className="text-2xl font-bold uppercase mb-4 tracking-tighter text-white">OVERSIZED_BLOCK</h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-mono">DROPPED SHOULDER. EXTENDED SLEEVE. BRUTALIST SILHOUETTE.</p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="lg:border-r lg:border-l-0 border-l border-white/20 lg:pr-8 pl-8 lg:pl-0"
                >
                    <p className="text-technical text-white/30 mb-2">// SPEC_04</p>
                    <h3 className="text-2xl font-bold uppercase mb-4 tracking-tighter text-white">KAMPALA_FINISH</h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-mono">FINAL STRUCTURAL ASSEMBLY. LAB VERIFIED QUALITY.</p>
                </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. The Manifesto — Editorial Split */}
      <section className="bg-black py-40 px-6 border-b border-white/5">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-40 items-center">
            <div className="relative">
                <motion.h2 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-heading text-[clamp(3rem,10vw,12rem)] text-white leading-[0.85] mb-20"
                >
                    NOT_A<br />LABEL.<br />A_UNIFORM.
                </motion.h2>
                <div className="flex gap-12">
                    <div className="space-y-6">
                        <Info className="text-white/40" size={32} />
                        <p className="text-white/30 text-technical text-xs leading-relaxed max-w-[200px]">
                            [ ENGINEERED_FOR_THE_VOID_BETWEEN_THE_CONCRETE_AND_THE_CLOUDS ]
                        </p>
                    </div>
                    <div className="space-y-6">
                        <ShieldCheck className="text-white/40" size={32} />
                        <p className="text-white/30 text-technical text-xs leading-relaxed max-w-[200px]">
                            [ SERIALIZED_PRODUCTION // LIMITED_TO_100_PIECES_PER_DROP ]
                        </p>
                    </div>
                </div>
            </div>
            <div className="relative aspect-[3/4] overflow-hidden border border-white/10">
                <motion.img 
                    initial={{ scale: 1.2 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                    src={product.images[5]} 
                    alt="Atmospheric" 
                    className="w-full h-full object-cover grayscale brightness-50"
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>
        </div>
      </section>

      {/* 4. The Product Reveal */}
      <section className="py-40 px-6 bg-[var(--color-bg-primary)]">
          <div className="max-w-7xl mx-auto text-center mb-32">
              <h2 className="text-heading text-6xl md:text-9xl mb-8 text-white tracking-[-0.05em]">THE_SIGNATURE.</h2>
              <Link to="/shop" className="btn-primary group flex items-center gap-4 mx-auto w-fit py-8 px-16 !bg-white !text-black">
                  [ ACCESS_THE_LAB ] <Zap size={16} className="fill-black" />
              </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {product.images.slice(0, 3).map((img, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="aspect-[4/5] bg-white/5 overflow-hidden border border-white/5"
                  >
                      <img src={img} alt="Detail" className="w-full h-full object-cover grayscale brightness-[0.6] hover:brightness-100 transition-all duration-1000" />
                  </motion.div>
              ))}
          </div>
      </section>

    </div>
  );
}
