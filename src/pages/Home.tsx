import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { ArrowRight, Zap, MoveDown } from 'lucide-react';

export function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const product = products[0];
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div ref={containerRef} className="relative w-full bg-black overflow-hidden">
      
      {/* 1. Cinematic Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover brightness-[0.5] grayscale-[0.2]"
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
            <p className="text-technical text-white/60 mb-8 tracking-[0.5em] uppercase">Utopia Ug // The Signature Series</p>
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
              <Link to="/shop" className="btn-primary group flex items-center gap-3 min-w-[240px]">
                SHOP THE PIECE <Zap size={14} className="fill-white" />
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/30 flex flex-col items-center gap-2"
        >
          <span className="text-technical text-[10px]">SCROLL TO DISCOVER</span>
          <MoveDown size={16} className="animate-bounce" />
        </motion.div>
      </section>

      {/* 2. Manifesto Section */}
      <section className="relative py-32 px-6 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <h2 className="text-heading text-6xl md:text-8xl text-white leading-tight">
                RAW UTILITY.<br />
                KAMPALA<br />
                SPIRIT.
              </h2>
              <p className="text-xl text-white/60 leading-relaxed font-light max-w-md">
                Utopia isn't a destination. It's the grit of the street and the precision of the studio. 
                We don't just make clothes; we build uniforms for those who navigate the void 
                between the concrete and the clouds.
              </p>
              <div className="pt-8">
                <Link to="/signature" className="text-nav text-white flex items-center gap-4 group">
                  READ THE MANIFESTO <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000"
            >
              <img 
                src={product.images[1]} 
                alt="Signature Detail" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border-[20px] border-black/20 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. The Blueprint Brief */}
      <section className="py-32 px-6 bg-[#111] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto text-center mb-24">
          <p className="text-technical text-white/40 mb-4">SPECIFICATIONS // ID: 001-SS26</p>
          <h2 className="text-heading text-5xl md:text-7xl uppercase">The Engineering</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-white/10">
          {[
            { label: 'MATERIAL', value: product.specs?.composition },
            { label: 'WEIGHT', value: product.specs?.gsm },
            { label: 'FIT', value: product.specs?.fit }
          ].map((spec, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-black p-12 flex flex-col items-center gap-4 text-center border border-white/5"
            >
              <span className="text-technical text-white/30">{spec.label}</span>
              <span className="text-3xl font-bold tracking-tighter">{spec.value}</span>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-24 text-center">
          <Link to="/shop" className="btn-ghost-white">VIEW ALL TECHNICAL DETAILS</Link>
        </div>
      </section>

    </div>
  );
}
