import React from 'react';
import { motion } from 'motion/react';

export function Shipping() {
  return (
    <div className="min-h-screen bg-white pt-40 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-technical mb-4">CLIENT SERVICES // SHIPPING</p>
          <h1 className="text-heading text-6xl md:text-8xl mb-12">SHIPPING.</h1>
          
          <div className="space-y-12 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-black font-bold uppercase tracking-widest mb-4">Domestic (Uganda)</h2>
              <p>Standard delivery within Kampala: 1-2 business days.</p>
              <p>Regional delivery: 3-5 business days.</p>
              <p className="mt-2 font-mono text-xs">Rates: Starting from 10,000 UGX.</p>
            </section>

            <section>
              <h2 className="text-black font-bold uppercase tracking-widest mb-4">International</h2>
              <p>We ship globally via DHL Express. Delivery typically takes 5-10 business days depending on location.</p>
              <p className="mt-2 font-mono text-xs">Rates: Calculated at checkout based on weight and destination.</p>
            </section>

            <section>
              <h2 className="text-black font-bold uppercase tracking-widest mb-4">Tracking</h2>
              <p>Once your order is dispatched, you will receive a tracking number via email to monitor your delivery progress.</p>
            </section>

            <section>
              <h2 className="text-black font-bold uppercase tracking-widest mb-4">Customs & Duties</h2>
              <p>International orders may be subject to import duties and taxes, which are the responsibility of the recipient.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
