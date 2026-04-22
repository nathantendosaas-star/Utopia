import React from 'react';
import { motion } from 'motion/react';

export function Philosophy() {
  return (
    <div className="min-h-screen bg-white pt-40 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-technical mb-4">UTOPIA // PHILOSOPHY</p>
          <h1 className="text-heading text-6xl md:text-[10rem] leading-none mb-12">THE VOID.</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-gray-600 leading-relaxed">
            <div className="space-y-8">
              <p className="text-2xl font-light italic text-black">
                "Utopia isn't a destination. It's the grit of the street and the precision of the studio."
              </p>
              <p>
                We operate in the space between the concrete and the clouds. Our philosophy is rooted in 
                the brutalist architecture of Kampala and the raw energy of urban evolution. 
                We don't just make clothes; we build uniforms for those who navigate the modern void.
              </p>
            </div>
            
            <div className="space-y-12">
              <section>
                <h2 className="text-black font-bold uppercase tracking-widest mb-4">No Wasted Potential</h2>
                <p>
                  Our ethos is the standard. Every cut, every stitch, every drop is a refusal 
                  to settle for the mediocre. We bridge the gap between global utility and local 
                  soul.
                </p>
              </section>

              <section>
                <h2 className="text-black font-bold uppercase tracking-widest mb-4">Brutal Minimalism</h2>
                <p>
                  In a world of noise, we choose raw, deconstructed silence. Our design language 
                  is stripped of the unnecessary, focusing on form, function, and substance.
                </p>
              </section>
            </div>
          </div>
          
          <div className="mt-24 border-t border-gray-100 pt-12">
             <div className="flex flex-col items-center justify-center text-center">
                <p className="text-technical text-xs mb-4">ESTABLISHED 2024</p>
                <p className="text-4xl font-black uppercase tracking-tighter">DESIGNED IN KAMPALA. ENGINEERED FOR THE WORLD.</p>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
