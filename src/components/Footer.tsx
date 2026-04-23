import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Globe } from 'lucide-react';

export function Footer() {
  const { currency, setCurrency } = useStore();

  return (
    <footer className="bg-[var(--color-bg-primary)] text-white pt-16 sm:pt-24 pb-8 sm:pb-12 px-6 lg:px-10 border-t border-white/5">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-16 sm:mb-24">
          
          {/* Join Collective */}
          <div className="flex flex-col gap-6 sm:gap-8">
            <h4 className="text-technical text-[10px] sm:text-[11px] font-[900] tracking-[0.2em] uppercase text-white">[ JOIN_COLLECTIVE ]</h4>
            <div className="flex flex-col gap-4 sm:gap-6">
              <p className="text-technical text-[9px] sm:text-[10px] text-gray-400 tracking-wider uppercase leading-relaxed">BECOME PART OF THE LAB. GET EARLY ACCESS TO DROPS AND EARN PRESTIGE POINTS.</p>
              <form className="relative flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                <input 
                    type="email" 
                    placeholder="ENTER YOUR EMAIL" 
                    className="w-full bg-transparent border-b border-white/20 py-2 sm:py-3 text-technical text-[10px] sm:text-[11px] outline-none placeholder:text-gray-600 focus:placeholder:opacity-0 transition-all text-white"
                />
                <button type="submit" className="text-technical text-[10px] sm:text-[11px] font-[900] border-b border-white self-start pb-1 hover:opacity-50 transition-opacity uppercase tracking-widest text-white">
                  // SUBSCRIBE
                </button>
              </form>
            </div>
          </div>

          {/* Links Columns */}
          <div className="flex flex-col gap-6 sm:gap-8">
            <h4 className="text-technical text-[10px] sm:text-[11px] font-[900] tracking-[0.2em] text-white">// CLIENT_SERVICES</h4>
            <ul className="flex flex-col gap-2.5 sm:gap-3">
              <li><Link to="/contact" className="text-technical text-[9px] sm:text-[10px] text-gray-400 hover:text-white transition-colors font-medium uppercase">[ CONTACT ]</Link></li>
              <li><Link to="/shipping" className="text-technical text-[9px] sm:text-[10px] text-gray-400 hover:text-white transition-colors font-medium uppercase">[ SHIPPING ]</Link></li>
              <li><Link to="/returns" className="text-technical text-[9px] sm:text-[10px] text-gray-400 hover:text-white transition-colors font-medium uppercase">[ RETURNS ]</Link></li>
              <li><Link to="/size-guide" className="text-technical text-[9px] sm:text-[10px] text-gray-400 hover:text-white transition-colors font-medium uppercase">[ SIZE_GUIDE ]</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-6 sm:gap-8">
            <h4 className="text-technical text-[10px] sm:text-[11px] font-[900] tracking-[0.2em] text-white">// UTOPIA_CORE</h4>
            <ul className="flex flex-col gap-2.5 sm:gap-3">
              <li><Link to="/signature" className="text-technical text-[9px] sm:text-[10px] text-gray-400 hover:text-white transition-colors font-medium uppercase">[ THE_SIGNATURE ]</Link></li>
              <li><Link to="/archives" className="text-technical text-[9px] sm:text-[10px] text-gray-400 hover:text-white transition-colors font-medium uppercase">[ ARCHIVES ]</Link></li>
              <li><Link to="/philosophy" className="text-technical text-[9px] sm:text-[10px] text-gray-400 hover:text-white transition-colors font-medium uppercase">[ PHILOSOPHY ]</Link></li>
              <li><Link to="/retail" className="text-technical text-[9px] sm:text-[10px] text-gray-400 hover:text-white transition-colors font-medium uppercase">[ RETAIL ]</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-6 sm:gap-8">
            <h4 className="text-technical text-[10px] sm:text-[11px] font-[900] tracking-[0.2em] text-white">// ARCHIVE_FEED</h4>
            <ul className="flex flex-col gap-2.5 sm:gap-3">
              <li><a href="https://instagram.com/utopia_ug" target="_blank" rel="noopener noreferrer" className="text-technical text-[9px] sm:text-[10px] text-gray-400 hover:text-white transition-colors font-medium uppercase">[ INSTAGRAM ]</a></li>
              <li><a href="https://tiktok.com/@utopia_ug" target="_blank" rel="noopener noreferrer" className="text-technical text-[9px] sm:text-[10px] text-gray-400 hover:text-white transition-colors font-medium uppercase">[ TIKTOK ]</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 sm:gap-8 pt-10 sm:pt-12 border-t border-white/5">
          <div className="flex flex-col gap-2 items-center lg:items-start text-center lg:text-left">
            <Link to="/" className="text-lg sm:text-xl font-[900] uppercase tracking-[-0.05em] mb-2 sm:mb-4 text-white">
              UTOPIA UG
            </Link>
            <p className="text-technical text-[8px] sm:text-[9px] text-gray-500 font-bold uppercase tracking-[0.3em]">© 2026 UTOPIA CLOTHING LIMITED // ALL_RIGHTS_RESERVED</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 sm:gap-10 items-center">
            <div className="flex items-center gap-3">
                <Globe size={13} sm:size={14} className="text-gray-500" />
                <select 
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as any)}
                    className="bg-transparent text-technical text-[8px] sm:text-[9px] font-black uppercase tracking-widest outline-none cursor-pointer text-white"
                >
                    <option value="UGX" className="bg-black text-[10px]">UGANDA (UGX)</option>
                    <option value="USD" className="bg-black text-[10px]">GLOBAL (USD)</option>
                    <option value="GBP" className="bg-black text-[10px]">UK (GBP)</option>
                </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
