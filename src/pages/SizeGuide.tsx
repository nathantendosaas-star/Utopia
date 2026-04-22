import React from 'react';
import { motion } from 'motion/react';

export function SizeGuide() {
  return (
    <div className="min-h-screen bg-white pt-40 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-technical mb-4">CLIENT SERVICES // SIZE GUIDE</p>
          <h1 className="text-heading text-6xl md:text-8xl mb-12">SIZE GUIDE.</h1>
          
          <div className="space-y-16 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-black font-bold uppercase tracking-widest mb-6 border-b border-gray-100 pb-2">The Signature T-Shirt (Oversized Fit)</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="py-4">SIZE</th>
                      <th className="py-4">CHEST (CM)</th>
                      <th className="py-4">LENGTH (CM)</th>
                      <th className="py-4">SHOULDER (CM)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    <tr>
                      <td className="py-4 text-black font-bold">S</td>
                      <td className="py-4">116</td>
                      <td className="py-4">72</td>
                      <td className="py-4">54</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-black font-bold">M</td>
                      <td className="py-4">122</td>
                      <td className="py-4">74</td>
                      <td className="py-4">56</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-black font-bold">L</td>
                      <td className="py-4">128</td>
                      <td className="py-4">76</td>
                      <td className="py-4">58</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-black font-bold">XL</td>
                      <td className="py-4">134</td>
                      <td className="py-4">78</td>
                      <td className="py-4">60</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-6 text-xs text-gray-400 font-mono italic">
                * Our signature oversized block is designed to be worn loose. For a more standard fit, we recommend sizing down.
              </p>
            </section>

            <section>
              <h2 className="text-black font-bold uppercase tracking-widest mb-4">How to Measure</h2>
              <div className="space-y-4">
                <p><span className="text-black font-bold uppercase mr-2">CHEST:</span> Measure under the arms, around the fullest part of the chest.</p>
                <p><span className="text-black font-bold uppercase mr-2">LENGTH:</span> Measure from the highest point of the shoulder down to the hem.</p>
                <p><span className="text-black font-bold uppercase mr-2">SHOULDER:</span> Measure across the back from the edge of one shoulder to the other.</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
