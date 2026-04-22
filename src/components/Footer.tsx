import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-white text-black pt-24 pb-12 px-6 lg:px-10 border-t border-gray-100">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-12 mb-24">
          
          {/* Join Collective */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <h4 className="text-technical text-[11px] font-[900] tracking-[0.2em]">Join UTOPIA COLLECTIVE</h4>
            <div className="flex flex-col gap-6">
              <p className="text-technical text-[10px] text-gray-500 tracking-wider">EARN POINTS & REWARDS ON ALL PURCHASES</p>
              <div className="flex flex-col gap-4">
                <Link to="/contact" className="text-technical text-[11px] font-[900] border-b border-black inline-block self-start pb-1">
                  SIGN UP
                </Link>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="flex flex-col gap-8">
            <h4 className="text-technical text-[11px] font-[900] tracking-[0.2em]">Client Services</h4>
            <ul className="flex flex-col gap-3">
              <li><Link to="/contact" className="text-technical text-[10px] text-gray-500 hover:text-black transition-colors font-medium uppercase">Contact</Link></li>
              <li><Link to="/shop" className="text-technical text-[10px] text-gray-500 hover:text-black transition-colors font-medium uppercase">Shipping</Link></li>
              <li><Link to="/shop" className="text-technical text-[10px] text-gray-500 hover:text-black transition-colors font-medium uppercase">Returns</Link></li>
              <li><Link to="/shop" className="text-technical text-[10px] text-gray-500 hover:text-black transition-colors font-medium uppercase">Size Guide</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-8">
            <h4 className="text-technical text-[11px] font-[900] tracking-[0.2em]">Utopia</h4>
            <ul className="flex flex-col gap-3">
              <li><Link to="/signature" className="text-technical text-[10px] text-gray-500 hover:text-black transition-colors font-medium uppercase">The Signature</Link></li>
              <li><Link to="/archives" className="text-technical text-[10px] text-gray-500 hover:text-black transition-colors font-medium uppercase">Archives</Link></li>
              <li><Link to="/signature" className="text-technical text-[10px] text-gray-500 hover:text-black transition-colors font-medium uppercase">Philosophy</Link></li>
              <li><Link to="/contact" className="text-technical text-[10px] text-gray-500 hover:text-black transition-colors font-medium uppercase">Retail</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-8">
            <h4 className="text-technical text-[11px] font-[900] tracking-[0.2em]">Social</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#" className="text-technical text-[10px] text-gray-500 hover:text-black transition-colors font-medium uppercase">Instagram</a></li>
              <li><a href="#" className="text-technical text-[10px] text-gray-500 hover:text-black transition-colors font-medium uppercase">Twitter</a></li>
              <li><a href="#" className="text-technical text-[10px] text-gray-500 hover:text-black transition-colors font-medium uppercase">TikTok</a></li>
            </ul>
          </div>

          {/* Country / App */}
          <div className="flex flex-col gap-8">
            <h4 className="text-technical text-[11px] font-[900] tracking-[0.2em]">Country</h4>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2 cursor-pointer group">
                <span className="text-technical text-[11px] font-[900]">UG / UGX</span>
                <span className="text-[10px] group-hover:translate-x-1 transition-transform">→</span>
              </div>
              
              <div className="flex flex-col gap-4 mt-4">
                <h4 className="text-technical text-[11px] font-[900] tracking-[0.2em]">Utopia App</h4>
                <div className="flex items-center gap-4">
                  <span className="text-technical text-[10px] text-gray-400 font-bold border border-gray-200 px-3 py-1 cursor-pointer hover:border-black hover:text-black transition-all">iOS</span>
                  <span className="text-technical text-[10px] text-gray-400 font-bold border border-gray-200 px-3 py-1 cursor-pointer hover:border-black hover:text-black transition-all">Android</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 pt-12 border-t border-gray-50">
          <div className="flex flex-col gap-2 items-center lg:items-start">
            <Link to="/" className="text-xl font-[900] uppercase tracking-[-0.05em] mb-4">
              UTOPIA UG
            </Link>
            <p className="text-technical text-[9px] text-gray-400 font-bold uppercase">© UTOPIA CLOTHING LIMITED 2026</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {['Terms & Conditions', 'Privacy Policy', 'Modern Slavery'].map((item) => (
              <span key={item} className="text-technical text-[9px] text-gray-400 font-bold hover:text-black cursor-pointer transition-colors uppercase">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
