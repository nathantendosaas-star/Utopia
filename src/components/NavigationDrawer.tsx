import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export function NavigationDrawer() {
  const { isNavOpen, setNavOpen } = useStore();

  const links = [
    { name: 'The Lab (Shop)', path: '/shop' },
    { name: 'The Signature', path: '/signature' },
    { name: 'Archives', path: '/archives' },
    { name: 'About', path: '/about' },
  ];

  const supportLinks = [
    { name: 'Contact', path: '/contact' },
    { name: 'Shipping', path: '/shipping' },
    { name: 'Returns', path: '/returns' },
    { name: 'Size Guide', path: '/size-guide' },
    { name: 'Philosophy', path: '/philosophy' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
  ];

  return (
    <AnimatePresence>
      {isNavOpen && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="fixed inset-0 bg-white z-[200] flex flex-col"
        >
          <div className="flex justify-between items-center p-8 border-b border-gray-100">
            <h2 className="text-2xl font-black uppercase tracking-tighter">Menu</h2>
            <button onClick={() => setNavOpen(false)} className="hover:opacity-70 transition-opacity">
              <X size={32} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto px-8 py-12 flex flex-col gap-12 scrollbar-hide">
            <div className="flex flex-col gap-6">
              {links.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  onClick={() => setNavOpen(false)}
                  className="text-4xl md:text-6xl font-black uppercase tracking-tighter hover:text-gray-400 transition-colors flex justify-between items-center group"
                >
                  {link.name}
                  <ChevronRight size={40} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>

            <div className="pt-12 border-t border-gray-100 grid grid-cols-2 gap-y-6">
              {supportLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  onClick={() => setNavOpen(false)}
                  className="text-technical text-[10px] font-bold hover:text-black transition-colors uppercase tracking-widest"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="p-8 border-t border-gray-100 bg-gray-50 flex flex-col gap-2">
            <p className="text-technical text-[9px] text-gray-400 uppercase tracking-widest">EST. 199X / KLA</p>
            <p className="text-technical text-[9px] text-gray-400 uppercase tracking-widest">© 2026 UTOPIA CLOTHING LIMITED</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
