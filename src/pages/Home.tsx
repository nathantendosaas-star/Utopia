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
    <div ref={containerRef} className="relative w-full bg-white overflow-hidden">
      
      {/* 1. Cinematic Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover brightness-[0.4] grayscale-[0.5]"
          >
            <source src={product.video} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
        </motion.div>

        <div className="relative z-10 w-full px-6 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="flex items-center justify-center gap-3 mb-8">
                <span className="w-12 h-px bg-white/30" />
                <p className="text-technical text-white/60 tracking-[0.5em] uppercase">SS26 // THE SIGNATURE SERIES</p>
                <span className="w-12 h-px bg-white/30" />
            </div>
            <h1 className="relative mb-12">
              <span className="block text-[clamp(4rem,20vw,18rem)] font-display font-[900] uppercase leading-[0.75] tracking-[-0.03em] text-white">
                UTOPIA
              </span>
              <span className="block text-[clamp(4rem,20vw,18rem)] font-display font-[900] uppercase leading-[0.75] tracking-[-0.02em] text-transparent stroke-white stroke-1" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>
                UG
              </span>
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/signature" className="btn-ghost-white group flex items-center gap-3 min-w-[240px]">
                THE STORY <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/shop" className="btn-primary group flex items-center gap-3 min-w-[240px] !bg-white !text-black border-white">
                SHOP THE PIECE <Zap size={14} className="fill-black" />
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-10 z-10 text-white/30 flex flex-col gap-1"
        >
          <span className="text-technical text-[10px]">LOC: 0.3476° N, 32.5825° E</span>
          <span className="text-technical text-[10px]">VER: SS26.001.V1</span>
        </motion.div>
      </section>

      {/* 2. The Blueprint — Technical Callouts */}
      <section className="relative py-40 bg-white bg-blueprint">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-10">
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            
            {/* Left Tech Stack */}
            <div className="lg:col-span-3 space-y-20 z-10">
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="border-l-4 border-black pl-8"
                >
                    <p className="text-technical text-gray-400 mb-2">SPEC 01</p>
                    <h3 className="text-2xl font-black uppercase mb-4 tracking-tighter">220GSM Heavyweight</h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">A substantial drape that holds its structural integrity, engineered from 100% premium long-staple cotton.</p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="border-l-4 border-black pl-8"
                >
                    <p className="text-technical text-gray-400 mb-2">SPEC 02</p>
                    <h3 className="text-2xl font-black uppercase mb-4 tracking-tighter">Reinforced Collar</h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">Double-needle stitched 1x1 rib collar designed to resist stretching and maintain a clean neckline.</p>
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
                        className="w-full h-full object-contain mix-blend-multiply opacity-90"
                    />
                    {/* SVG Blueprint Lines */}
                    <div className="absolute inset-0 pointer-events-none opacity-20">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            <line x1="20" y1="30" x2="80" y2="30" stroke="black" strokeWidth="0.1" strokeDasharray="1,1" />
                            <line x1="20" y1="70" x2="80" y2="70" stroke="black" strokeWidth="0.1" strokeDasharray="1,1" />
                            <circle cx="50" cy="50" r="45" fill="none" stroke="black" strokeWidth="0.05" />
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
                    className="lg:border-r-4 lg:border-l-0 border-l-4 border-black lg:pr-8 pl-8 lg:pl-0"
                >
                    <p className="text-technical text-gray-400 mb-2">SPEC 03</p>
                    <h3 className="text-2xl font-black uppercase mb-4 tracking-tighter">Oversized Block</h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">Dropped shoulder silhouette with extended sleeve length for a definitive brutalist aesthetic.</p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="lg:border-r-4 lg:border-l-0 border-l-4 border-black lg:pr-8 pl-8 lg:pl-0"
                >
                    <p className="text-technical text-gray-400 mb-2">SPEC 04</p>
                    <h3 className="text-2xl font-black uppercase mb-4 tracking-tighter">Kampala Finish</h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">Final structural assembly and quality verification executed in our Kampala laboratory.</p>
                </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. The Manifesto — Editorial Split */}
      <section className="bg-black py-40 px-6">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-40 items-center">
            <div className="relative">
                <motion.h2 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-heading text-[clamp(3rem,10vw,12rem)] text-white leading-[0.85] mb-20"
                >
                    NOT A<br />LABEL.<br />A UNIFORM.
                </motion.h2>
                <div className="flex gap-12">
                    <div className="space-y-6">
                        <Info className="text-white" size={32} />
                        <p className="text-white/40 text-technical text-xs leading-relaxed max-w-[200px]">
                            ENGINEERED FOR THE VOID BETWEEN THE CONCRETE AND THE CLOUDS.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <ShieldCheck className="text-white" size={32} />
                        <p className="text-white/40 text-technical text-xs leading-relaxed max-w-[200px]">
                            SERIALIZED PRODUCTION // LIMITED TO 100 PIECES PER DROP.
                        </p>
                    </div>
                </div>
            </div>
            <div className="relative aspect-[3/4] overflow-hidden grayscale">
                <motion.img 
                    initial={{ scale: 1.2 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                    src={product.images[5]} 
                    alt="Atmospheric" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
            </div>
        </div>
      </section>

      {/* 4. The Product Reveal */}
      <section className="py-40 px-6 bg-white">
          <div className="max-w-7xl mx-auto text-center mb-32">
              <h2 className="text-heading text-6xl md:text-9xl mb-8">THE SIGNATURE.</h2>
              <Link to="/shop" className="btn-primary group flex items-center gap-4 mx-auto w-fit py-8 px-16">
                  ACCESS THE LAB <Zap size={16} className="fill-white" />
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
                    className="aspect-[4/5] bg-gray-50 overflow-hidden"
                  >
                      <img src={img} alt="Detail" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                  </motion.div>
              ))}
          </div>
      </section>

    </div>
  );
}
