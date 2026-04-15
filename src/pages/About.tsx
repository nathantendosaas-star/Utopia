import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  useEffect(() => {
    const el = document.querySelector('.about-headline');
    if (el) {
      el.classList.add('vhs-glitch');
      setTimeout(() => el.classList.remove('vhs-glitch'), 420);
    }
  }, []);

  return (
    <div className="min-h-screen w-full bg-[var(--color-bg-primary)] transition-colors duration-[var(--duration-mode)] ease-in-out pb-[clamp(4rem,8vw,8rem)]" ref={containerRef}>
      {/* Header Section */}
      <div className="pt-[clamp(6rem,12vw,10rem)] pb-[clamp(4rem,8vw,6rem)] px-[clamp(1.25rem,5vw,4rem)] max-w-[1280px] mx-auto relative">
        <div className="hero-monogram opacity-50 top-0 left-0">
          <span className="mono-ug">UG</span>
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-[var(--space-8)] border-b border-[var(--color-border-subtle)] pb-[var(--space-8)]">
          <div>
            <p className="hero-label">BEHIND THE BRAND</p>
            <h1 className="hero-headline about-headline mb-0" data-text="The Blueprint.">
              The<br /><em>Blueprint.</em>
            </h1>
          </div>
          <p className="font-mono text-[var(--text-micro)] text-[var(--color-text-secondary)] uppercase tracking-[var(--tracking-widest)] max-w-[200px] md:text-right">
            Engineered for the modern void.
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-[clamp(1.25rem,5vw,4rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--space-12)] items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-5 relative aspect-[4/5] overflow-hidden border border-[var(--color-border-subtle)] bg-[#160E06] group"
          >
            {/* Dark overlay for film feel */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#140A04]/40 to-transparent mix-blend-multiply pointer-events-none z-10 transition-opacity duration-500 group-hover:opacity-0" />
            <div className="hero-scanlines z-10 opacity-50 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
            
            <motion.img 
              style={{ y: imageY }}
              src="/hero-img.jpg" 
              alt="About Utopia"
              className="w-full h-full object-cover film-image scale-110 group-hover:scale-105 transition-transform duration-[1.2s] ease-[0.25,0.46,0.45,0.94]"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-6 lg:col-start-7 flex flex-col gap-[var(--space-8)]"
          >
            <div className="space-y-[var(--space-6)] font-body text-[var(--text-body-base)] text-[var(--color-text-secondary)] leading-[var(--leading-relaxed)]">
              <div className="relative pb-[var(--space-6)] mb-[var(--space-6)] border-b border-[var(--color-border-subtle)]">
                <span className="absolute -top-8 -left-6 text-[8rem] font-display text-[var(--color-accent-primary)] opacity-10 leading-none select-none">"</span>
                <p className="relative z-10 text-[var(--text-heading-md)] md:text-[var(--text-heading-lg)] font-display text-[var(--color-text-primary)] leading-[var(--leading-snug)] italic">
                  Utopia isn't a destination. It's the grit of the street and the precision of the studio. We don't just make clothes; we build uniforms for those who navigate the void between the concrete and the clouds.
                </p>
              </div>
              <p>
                Our ethos, <span className="font-mono text-[var(--text-micro)] text-[var(--color-text-primary)] tracking-[var(--tracking-widest)] uppercase">"NO WASTED POTENTIAL"</span>, is the standard. Every cut, every stitch, every drop is a refusal to settle for the mediocre. 
              </p>
              <p>
                Sourcing from the archives of Tokyo utility and New York energy, we bridge the gap. In a world of noise, we choose raw, deconstructed silence.
              </p>
            </div>

            <div className="mt-[var(--space-8)] pt-[var(--space-8)] border-t border-[var(--color-border-subtle)]">
              <div className="grid grid-cols-2 gap-[var(--space-8)] font-mono text-[var(--text-micro)] uppercase tracking-[var(--tracking-widest)]">
                <div>
                  <h4 className="text-[var(--color-text-secondary)] mb-[var(--space-2)]">ESTABLISHED</h4>
                  <p className="text-[var(--color-text-primary)]">2024</p>
                </div>
                <div>
                  <h4 className="text-[var(--color-text-secondary)] mb-[var(--space-2)]">LOCATION</h4>
                  <p className="text-[var(--color-text-primary)]">GLOBAL</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
