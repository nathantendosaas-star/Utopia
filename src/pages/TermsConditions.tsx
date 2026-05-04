import React from 'react';
import { motion } from 'motion/react';

export function TermsConditions() {
  return (
    <div className="min-h-screen bg-white pt-40 pb-20 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <div>
          <p className="text-technical text-gray-400 mb-2 tracking-[0.3em]">LEGAL // V1.0</p>
          <h1 className="text-heading text-6xl md:text-8xl leading-none uppercase">Terms & Conditions</h1>
        </div>

        <div className="prose prose-sm font-body leading-relaxed text-gray-600 space-y-8 max-w-none">
          <section className="space-y-4">
            <h2 className="text-xl font-black uppercase text-black tracking-tight border-b border-black pb-2">01 // Agreement</h2>
            <p>
              By accessing the Utopia digital portal and acquiring pieces from "The Signature" series, you enter into a binding agreement with Utopia Clothing Limited. All transactions are final upon receipt of delivery verification.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black uppercase text-black tracking-tight border-b border-black pb-2">02 // Exclusive Property</h2>
            <p>
              All technical designs, blueprint layouts, and media assets presented on this site are the exclusive intellectual property of Utopia Lab. Unauthorized reproduction is strictly prohibited.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black uppercase text-black tracking-tight border-b border-black pb-2">03 // Production Variance</h2>
            <p>
              Given the "serialized" nature of our production, minor variances in fabric texture and finish may occur. These are markers of our unique production process.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black uppercase text-black tracking-tight border-b border-black pb-2">04 // Logistics</h2>
            <p>
              Utopia Lab coordinates worldwide shipping. Liability transfers to the logistics partner once the piece has cleared our Kampala verification center.
            </p>
          </section>
        </div>

        <div className="pt-12 border-t border-gray-100">
          <p className="text-technical text-[10px] text-gray-400">JURISDICTION: KAMPALA, UGANDA</p>
        </div>
      </motion.div>
    </div>
  );
}
