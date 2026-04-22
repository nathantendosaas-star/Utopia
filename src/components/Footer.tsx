import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Globe } from 'lucide-react';

export function Footer() {
  const { currency, setCurrency } = useStore();

  return (
    <footer className="bg-white text-black pt-24 pb-12 px-6 lg:px-10 border-t border-gray-100">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          
          {/* Join Collective */}
          <div className="flex flex-col gap-8">
            <h4 className="text-technical text-[11px] font-[900] tracking-[0.2em] uppercase">Join UTOPIA COLLECTIVE</h4>
            <div className="flex flex-col gap-6">
              <p className="text-technical text-[10px] text-gray-500 tracking-wider uppercase leading-relaxed">BECOME PART OF THE LAB. GET EARLY ACCESS TO DROPS AND EARN PRESTIGE POINTS.</p>
              <form className="relative flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                <input 
                    type="email" 
                    placeholder="ENTER YOUR EMAIL" 
                    className="w-full bg-transparent border-b border-black py-3 text-technical text-[11px] outline-none placeholder:text-gray-300 focus:placeholder:opacity-0 transition-all"
                />
                <button type="submit" className="text-technical text-[11px] font-[900] border-b border-black self-start pb-1 hover:opacity-50 transition-opacity uppercase tracking-widest">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Links Columns */}
          <div className="flex flex-col gap-8">
            <h4 className="text-technical text-[11px] font-[900] tracking-[0.2em]">Client Services</h4>
            <ul className="flex flex-col gap-3">
              <li><Link to="/contact" className="text-technical text-[10px] text-gray-500 hover:text-black transition-colors font-medium uppercase">Contact</Link></li>
              <li><Link to="/shipping" className="text-technical text-[10px] text-gray-500 hover:text-black transition-colors font-medium uppercase">Shipping</Link></li>
              <li><Link to="/returns" className="text-technical text-[10px] text-gray-500 hover:text-black transition-colors font-medium uppercase">Returns</Link></li>
              <li><Link to="/size-guide" className="text-technical text-[10px] text-gray-500 hover:text-black transition-colors font-medium uppercase">Size Guide</Link></li>
              <li><Link to="/terms-conditions" className="text-technical text-[10px] text-gray-500 hover:text-black transition-colors font-medium uppercase">Terms & Conditions</Link></li>
              <li><Link to="/privacy-policy" className="text-technical text-[10px] text-gray-500 hover:text-black transition-colors font-medium uppercase">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-8">
            <h4 className="text-technical text-[11px] font-[900] tracking-[0.2em]">Utopia</h4>
            <ul className="flex flex-col gap-3">
              <li><Link to="/signature" className="text-technical text-[10px] text-gray-500 hover:text-black transition-colors font-medium uppercase">The Signature</Link></li>
              <li><Link to="/archives" className="text-technical text-[10px] text-gray-500 hover:text-black transition-colors font-medium uppercase">Archives</Link></li>
              <li><Link to="/philosophy" className="text-technical text-[10px] text-gray-500 hover:text-black transition-colors font-medium uppercase">Philosophy</Link></li>
              <li><Link to="/retail" className="text-technical text-[10px] text-gray-500 hover:text-black transition-colors font-medium uppercase">Retail</Link></li>
              <li><Link to="/prestige" className="text-technical text-[10px] text-gray-500 hover:text-black transition-colors font-medium uppercase">Prestige Rewards</Link></li>
              <li><Link to="/support" className="text-technical text-[10px] text-gray-500 hover:text-black transition-colors font-medium uppercase">FAQ / Support</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-8">
            <h4 className="text-technical text-[11px] font-[900] tracking-[0.2em]">Social</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="https://instagram.com/utopia_ug" target="_blank" rel="noopener noreferrer" className="text-technical text-[10px] text-gray-500 hover:text-black transition-colors font-medium uppercase">Instagram</a></li>
              <li><a href="https://tiktok.com/@utopia_ug" target="_blank" rel="noopener noreferrer" className="text-technical text-[10px] text-gray-500 hover:text-black transition-colors font-medium uppercase">TikTok</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 pt-12 border-t border-gray-50">
          <div className="flex flex-col gap-2 items-center lg:items-start">
            <Link to="/" className="text-xl font-[900] uppercase tracking-[-0.05em] mb-4">
              UTOPIA UG
            </Link>
            <p className="text-technical text-[9px] text-gray-400 font-bold uppercase tracking-[0.3em]">© UTOPIA CLOTHING LIMITED 2026</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-10 items-center">
            <div className="flex items-center gap-3">
                <Globe size={14} className="text-gray-400" />
                <select 
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as any)}
                    className="bg-transparent text-technical text-[9px] font-black uppercase tracking-widest outline-none cursor-pointer"
                >
                    <option value="UGX">UGANDA (UGX)</option>
                    <option value="USD">GLOBAL (USD)</option>
                    <option value="GBP">UK (GBP)</option>
                </select>
            </div>
            {[{title: 'Terms & Conditions', path: '/terms-conditions'}, {title: 'Privacy Policy', path: '/privacy-policy'}].map((item) => (
              <Link key={item.title} to={item.path} className="text-technical text-[9px] text-gray-400 font-bold hover:text-black cursor-pointer transition-colors uppercase tracking-widest">
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
