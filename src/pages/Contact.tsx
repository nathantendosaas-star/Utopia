import React from 'react';
import { motion } from 'motion/react';

export function Contact() {
  return (
    <div className="min-h-screen w-full pt-32">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-16 border-b border-[var(--border)] pb-8 relative">
          <h1 className="text-6xl md:text-8xl font-display font-bold uppercase tracking-tighter">
            Contact
          </h1>
          <p className="font-sans text-sm mt-4 text-[var(--text)] opacity-60 uppercase tracking-widest">GET IN TOUCH // UTOPIA UG</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-display font-bold mb-8 uppercase">Inquiries</h2>
            <form className="space-y-6 font-sans">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[var(--text)] opacity-80 mb-2 uppercase tracking-wider">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full border-b border-[var(--border)] py-3 bg-transparent focus:outline-none focus:border-[var(--text)] transition-colors rounded-none placeholder:text-[var(--text)] placeholder:opacity-30"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--text)] opacity-80 mb-2 uppercase tracking-wider">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full border-b border-[var(--border)] py-3 bg-transparent focus:outline-none focus:border-[var(--text)] transition-colors rounded-none placeholder:text-[var(--text)] placeholder:opacity-30"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[var(--text)] opacity-80 mb-2 uppercase tracking-wider">Message</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full border-b border-[var(--border)] py-3 bg-transparent focus:outline-none focus:border-[var(--text)] transition-colors rounded-none resize-none placeholder:text-[var(--text)] placeholder:opacity-30"
                  placeholder="How can we help?"
                ></textarea>
              </div>
              <button 
                type="button"
                className="bg-[var(--text)] text-[var(--bg)] px-8 py-4 rounded-full flex items-center gap-3 hover:opacity-80 transition-opacity text-sm font-medium mt-8 shadow-lg"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-16"
          >
            <div>
              <h3 className="text-sm font-sans text-[var(--text)] opacity-60 mb-4 uppercase tracking-widest">Direct Contact</h3>
              <p className="font-sans text-lg leading-relaxed">
                joshuamusiime20@gmail.com<br />
                +256 788 185518<br />
                Kampala, Uganda
              </p>
            </div>

            <div>
              <h3 className="text-sm font-sans text-[var(--text)] opacity-60 mb-4 uppercase tracking-widest">Social</h3>
              <div className="flex gap-6">
                <a href="#" className="font-sans text-lg hover:opacity-70 transition-opacity">Instagram</a>
                <a href="#" className="font-sans text-lg hover:opacity-70 transition-opacity">Twitter</a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
