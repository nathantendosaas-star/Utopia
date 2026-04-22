import React from 'react';
import { motion } from 'motion/react';
import { products } from '../data/products';
import { ArrowRight, Box, Layers, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export function TheSignature() {
  const product = products[0];

  return (
    <div className="bg-white min-h-screen">
      {/* Editorial Header */}
      <section className="pt-40 pb-20 px-6 border-b border-black/5">
        <div className="max-w-7xl mx-auto">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-technical mb-4"
          >
            EDITORIAL // SS26-001
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-heading text-7xl md:text-[12rem] leading-[0.8] mb-12"
          >
            THE<br />SIGNATURE.
          </motion.h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <p className="text-xl leading-relaxed text-gray-600 italic">
              "The pursuit of the perfect shirt is a journey through architecture, not just fashion. 
              We looked at the brutalist structures of Kampala and the raw energy of its streets 
              to engineer a garment that acts as a second skin for the urban explorer."
            </p>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 text-technical">
                <div className="w-12 h-px bg-black" />
                <span>CRAFTED IN UGANDA</span>
              </div>
              <div className="flex items-center gap-4 text-technical">
                <div className="w-12 h-px bg-black" />
                <span>220GSM HEAVYWEIGHT COTTON</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Narrative Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-video overflow-hidden bg-gray-100"
            >
              <img src={product.images[4]} alt="Story 1" className="w-full h-full object-cover" />
            </motion.div>
          </div>
          <div className="md:col-span-4 flex flex-col justify-center gap-8">
             <div className="p-8 border border-black/10">
                <Layers className="mb-4" size={24} />
                <h3 className="font-bold uppercase mb-2">Structural Integrity</h3>
                <p className="text-sm text-gray-500">Double-needle stitched seams and a reinforced collar ensure the silhouette holds its form through every movement.</p>
             </div>
             <div className="p-8 border border-black/10 bg-black text-white">
                <Box className="mb-4" size={24} />
                <h3 className="font-bold uppercase mb-2">The Fit</h3>
                <p className="text-sm text-gray-400">An oversized block designed to drape naturally, providing comfort without sacrificing the aggressive aesthetic.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-black text-white px-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-20 opacity-10">
            <Zap size={400} />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-heading text-5xl md:text-8xl mb-12">UTOPIA IS NOT A PLACE.</h2>
          <p className="text-2xl font-light text-gray-400 mb-16 leading-relaxed">
            It's a state of mind. A commitment to quality that transcends borders. 
            From the first thread to the final press, the Signature T-Shirt is a 
            testament to the power of minimalist design.
          </p>
          <Link to="/shop" className="btn-ghost-white group flex items-center gap-4 mx-auto w-fit">
            EXPERIENCE THE PIECE <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Secondary Gallery */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="order-2 md:order-1">
             <img src={product.images[2]} alt="Story 2" className="w-full aspect-square object-cover" />
          </div>
          <div className="order-1 md:order-2 space-y-8">
            <p className="text-technical text-gray-400">KAMPALA // 00.3476° N</p>
            <h2 className="text-4xl font-black uppercase tracking-tighter">Engineered for the Void.</h2>
            <p className="text-gray-600 leading-relaxed">
              Every detail has been scrutinized. The weight of the fabric, the drop of the shoulder, 
              the subtle branding—all working in harmony to create a garment that feels as 
              substantial as the city that inspired it.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
