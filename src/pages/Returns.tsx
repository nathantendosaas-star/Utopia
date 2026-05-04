import React from 'react';
import { motion } from 'motion/react';

export function Returns() {
  return (
    <div className="min-h-screen bg-white pt-40 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-technical mb-4">CLIENT SERVICES // RETURNS</p>
          <h1 className="text-heading text-6xl md:text-8xl mb-12">RETURNS.</h1>
          
          <div className="space-y-12 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-black font-bold uppercase tracking-widest mb-4">Returns Policy</h2>
              <p>Items must be returned within 14 days of receipt, in their original condition and packaging, with all tags attached.</p>
              <p className="mt-2">Worn, washed, or altered items will not be accepted for return or exchange.</p>
            </section>

            <section>
              <h2 className="text-black font-bold uppercase tracking-widest mb-4">Process</h2>
              <p>To initiate a return, please contact our support team with your order number and the reason for the return.</p>
              <p className="mt-2 font-mono text-xs">Email: joshuamusiime20@gmail.com</p>
            </section>

            <section>
              <h2 className="text-black font-bold uppercase tracking-widest mb-4">Exchanges</h2>
              <p>Exchanges are subject to item availability. If the desired size or style is unavailable, a refund or credit will be issued.</p>
            </section>

            <section>
              <h2 className="text-black font-bold uppercase tracking-widest mb-4">Refunds</h2>
              <p>Refunds will be processed to the original payment method within 7-10 business days of receiving the returned items.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
