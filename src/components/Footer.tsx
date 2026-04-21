import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#050505] text-white pt-24 pb-12 px-6 lg:px-10">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-24">
          
          {/* Logo */}
          <div className="lg:col-span-1">
            <Link to="/" className="text-3xl font-black uppercase tracking-tighter">
              UTOPIA UG
            </Link>
          </div>

          {/* Links Columns */}
          {[
            { title: 'Client Services', links: ['Contact', 'Shipping', 'Returns', 'Size Guide', 'FAQ'] },
            { title: 'Company', links: ['About', 'Careers', 'Retail', 'Privacy', 'Cookies'] },
            { title: 'Social', links: ['Instagram', 'Twitter', 'YouTube', 'TikTok'] },
          ].map((col) => (
            <div key={col.title} className="flex flex-col gap-6">
              <h4 className="text-technical text-[10px] font-bold tracking-[0.2em] text-white/50">{col.title}</h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link to={`/${link.toLowerCase().replace(' ', '-')}`} className="text-[12px] font-medium text-white/70 hover:text-white transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="flex flex-col gap-6">
            <h4 className="text-technical text-[10px] font-bold tracking-[0.2em] text-white/50">Join the Collective</h4>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-transparent border-b border-white/20 py-2 text-[12px] outline-none focus:border-white transition-colors"
              />
              <button className="text-technical text-[10px] font-bold tracking-[0.2em] hover:text-white/70 transition-colors text-left">
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-white/40 uppercase tracking-[0.2em]">
          <p>© 2026 UTOPIA UG CLOTHING LIMITED.</p>
          <div className="flex gap-6">
            <span>Terms & Conditions</span>
            <span>Privacy Policy</span>
            <span>Cookie Preferences</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
