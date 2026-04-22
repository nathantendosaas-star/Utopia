import React from 'react';
import { motion } from 'motion/react';
import { Layout } from '../components/Layout';

const archives = [
  { id: 1, year: "2025", title: "Core Utility", images: ["/shirt-1.jpg", "/shirt-2.jpg", "/shirt-3.jpg"], description: "Initial systems for the concrete environment." },
];

export function Archives() {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="mb-20">
        <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 block mb-4">The Log</span>
        <h1 className="text-6xl md:text-8xl font-display uppercase tracking-tighter leading-none mb-8">
          The<br/>
          <span className="text-zinc-600">Archives</span>
        </h1>
        <p className="max-w-xl text-zinc-400 font-body leading-relaxed">
          The evolution of the Utopia signature. A chronological record of our single-minded pursuit of the perfect shirt, crafted for the streets of Kampala.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-40">
        {archives.map((item, idx) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
            className="group"
          >
            <div className="flex flex-col md:flex-row gap-12 items-end mb-12">
              <div className="md:w-1/3">
                <span className="font-mono text-4xl mb-4 block">{item.year}</span>
                <h3 className="text-4xl font-display uppercase mb-6">{item.title}</h3>
                <p className="text-zinc-500 font-body leading-relaxed">{item.description}</p>
              </div>
              <div className="md:w-2/3 grid grid-cols-3 gap-4">
                {item.images.map((img, i) => (
                  <div key={i} className="aspect-[3/4] overflow-hidden bg-zinc-900 border border-zinc-800">
                    <img src={img} alt="" className="w-full h-full object-cover transition-all duration-700" />
                  </div>
                ))}
              </div>
            </div>
            <div className="h-px bg-zinc-800 w-full" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
