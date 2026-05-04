import React from 'react';
import { motion } from 'motion/react';

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white pt-40 pb-20 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <div>
          <p className="text-technical text-gray-400 mb-2 tracking-[0.3em]">LEGAL // V1.0</p>
          <h1 className="text-heading text-6xl md:text-8xl leading-none uppercase">Privacy Policy</h1>
        </div>

        <div className="prose prose-sm font-body leading-relaxed text-gray-600 space-y-8 max-w-none">
          <section className="space-y-4">
            <h2 className="text-xl font-black uppercase text-black tracking-tight border-b border-black pb-2">01 // Data Collection</h2>
            <p>
              Utopia Lab collects essential identification data required to process your order and maintain your membership within the Utopia Collective. This includes name, delivery coordinates, and transaction history.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black uppercase text-black tracking-tight border-b border-black pb-2">02 // Usage Protocols</h2>
            <p>
              Your data is utilized strictly for logistics and communication regarding "The Signature" series drops. We do not sell or lease your identity to third-party entities.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black uppercase text-black tracking-tight border-b border-black pb-2">03 // Security Systems</h2>
            <p>
              All transactional data is encrypted via industry-standard protocols. Our servers are located in secure environments to prevent unauthorized access to the Utopia infrastructure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black uppercase text-black tracking-tight border-b border-black pb-2">04 // Cookies & Analytics</h2>
            <p>
              We use minimal cookies to maintain your session integrity and track anonymous site performance to optimize the "The Lab" user experience.
            </p>
          </section>
        </div>

        <div className="pt-12 border-t border-gray-100">
          <p className="text-technical text-[10px] text-gray-400">LAST UPDATED: APRIL 2026 // KAMPALA, UGANDA</p>
        </div>
      </motion.div>
    </div>
  );
}
