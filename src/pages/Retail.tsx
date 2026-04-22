import React from 'react';
import { motion } from 'motion/react';

export function Retail() {
  return (
    <div className="min-h-screen bg-white pt-40 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-technical mb-4">UTOPIA // RETAIL</p>
          <h1 className="text-heading text-6xl md:text-8xl mb-12">RETAIL LOCATIONS.</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-600 leading-relaxed">
            <section className="border border-gray-100 p-12 hover:border-black transition-colors">
              <h2 className="text-black font-bold uppercase tracking-widest mb-4 text-2xl">The Lab (Kampala)</h2>
              <p>Plot 42, Kira Road</p>
              <p>Kampala, Uganda</p>
              <div className="mt-8 space-y-2 text-sm font-mono uppercase">
                <p>Monday - Friday: 10:00 - 19:00</p>
                <p>Saturday: 11:00 - 18:00</p>
                <p>Sunday: Closed</p>
              </div>
            </section>

            <section className="border border-gray-100 p-12 bg-black text-white">
              <h2 className="font-bold uppercase tracking-widest mb-4 text-2xl">Global Stockists</h2>
              <p className="text-gray-400 mb-8">Selected partners carrying the series.</p>
              <ul className="space-y-4 font-bold uppercase tracking-widest text-sm">
                <li>Coming Soon — Tokyo</li>
                <li>Coming Soon — New York</li>
                <li>Coming Soon — London</li>
              </ul>
            </section>
          </div>

          <div className="mt-24">
             <h2 className="text-black font-bold uppercase tracking-widest mb-8">Wholesale Inquiries</h2>
             <p className="text-gray-500 mb-4">Interested in carrying UTOPIA UG in your store?</p>
             <p className="font-mono text-black">Email: wholesale@utopiaug.com</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
