import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUI } from '../context/UIContext';
import { BaseDrawer } from './BaseDrawer';

export function NavigationDrawer() {
  const { isNavOpen, setNavOpen } = useUI();

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

  const footer = (
    <div className="p-8 border-t border-white/10 bg-black flex flex-col gap-2">
      <p className="text-technical text-[9px] text-gray-500 uppercase tracking-widest">// LOC: 0.3476° N, 32.5825° E</p>
      <p className="text-technical text-[9px] text-gray-500 uppercase tracking-widest">© 2026 UTOPIA CLOTHING LIMITED // ALL_RIGHTS_RESERVED</p>
    </div>
  );

  return (
    <BaseDrawer
      isOpen={isNavOpen}
      onClose={() => setNavOpen(false)}
      title="[ MENU_ROOT ]"
      fullScreen
      side="left"
      footer={footer}
    >
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          {links.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              onClick={() => setNavOpen(false)}
              className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter hover:text-white/40 transition-colors flex justify-between items-center group"
            >
              {link.name.toUpperCase()}
              <ChevronRight size={40} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>

        <div className="pt-12 border-t border-white/10 grid grid-cols-2 gap-y-6">
          {supportLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              onClick={() => setNavOpen(false)}
              className="text-technical text-[10px] font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest"
            >
              [ {link.name.toUpperCase()} ]
            </Link>
          ))}
        </div>
      </div>
    </BaseDrawer>
  );
}
