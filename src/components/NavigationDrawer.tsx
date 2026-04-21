import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export function NavigationDrawer() {
  const { isNavOpen, setNavOpen } = useStore();

  const links = [
    { name: 'Shop All', path: '/shop' },
    { name: '247', path: '/shop?cat=247' },
    { name: 'New Arrivals', path: '/shop?new=true' },
    { name: 'The Vault', path: '/archives' },
    { name: 'Prestige', path: '/prestige' },
    { name: 'About', path: '/about' },
  ];

  return (
    <AnimatePresence>
      {isNavOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white z-[200] flex flex-col"
        >
          <div className="flex justify-between items-center p-8 border-b border-gray-100">
            <h2 className="text-2xl font-black uppercase tracking-tighter">Menu</h2>
            <button onClick={() => setNavOpen(false)} className="hover:opacity-70 transition-opacity">
              <X size={32} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto px-8 py-12 flex flex-col gap-6">
            {links.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                onClick={() => setNavOpen(false)}
                className="text-4xl md:text-6xl font-black uppercase tracking-tighter hover:text-gray-400 transition-colors flex justify-between items-center"
              >
                {link.name}
                <ChevronRight size={40} />
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
