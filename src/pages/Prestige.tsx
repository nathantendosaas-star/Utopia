import React from 'react';
import { motion } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { Star, Shield, Zap, Crown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Prestige() {
  const { prestigePoints, prestigeRank, user } = useStore();

  const ranks = [
    { name: 'BRONZE', points: '0+', icon: <Shield size={24} />, perks: ['Standard Access', 'Standard Shipping'] },
    { name: 'SILVER', points: '1,000+', icon: <Zap size={24} />, perks: ['Priority Support', 'Early Access to Archive Drops'] },
    { name: 'GOLD', points: '5,000+', icon: <Star size={24} />, perks: ['Free Express Shipping', 'Exclusive Colorway Access'] },
    { name: 'PLATINUM', points: '10,000+', icon: <Crown size={24} />, perks: ['1-on-1 Concierge', 'Complimentary Seasonal Gifts'] },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-40 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* 1. Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 border-b border-white/10 pb-20 mb-24">
          <div className="max-w-2xl">
            <p className="text-technical text-white/40 mb-4 tracking-[0.5em]">UTOPIA COLLECTIVE // LOYALTY PROGRAM</p>
            <h1 className="text-heading text-6xl md:text-[10rem] leading-none mb-8">PRESTIGE.</h1>
            <p className="text-xl text-white/60 font-light leading-relaxed">
              Membership has its privileges. Every purchase in the Lab earns you points, 
              unlocking higher tiers of technical access and exclusive utility.
            </p>
          </div>
          
          <div className="bg-white/5 border border-white/10 p-10 w-full md:w-96 flex flex-col gap-6">
             <p className="text-technical text-[10px] text-white/40 uppercase tracking-widest font-black">CURRENT STATUS</p>
             <div>
                <h3 className="text-4xl font-black mb-1">{prestigeRank}</h3>
                <p className="text-technical text-[11px] text-white/60">{prestigePoints} TOTAL POINTS EARNED</p>
             </div>
             <div className="h-1 w-full bg-white/10 overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(prestigePoints / 10000) * 100}%` }}
                    className="h-full bg-white"
                />
             </div>
             <p className="text-[10px] text-white/40 font-mono italic">
                *Next Rank: {prestigePoints < 1000 ? 'SILVER' : prestigePoints < 5000 ? 'GOLD' : 'PLATINUM'}
             </p>
          </div>
        </div>

        {/* 2. Tier Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {ranks.map((rank) => (
            <div key={rank.name} className={`p-8 border ${prestigeRank === rank.name ? 'border-white bg-white/10' : 'border-white/5 bg-transparent'} flex flex-col gap-8 transition-all hover:bg-white/5`}>
                <div className="flex justify-between items-start">
                    <div className={prestigeRank === rank.name ? 'text-white' : 'text-white/20'}>
                        {rank.icon}
                    </div>
                    <span className="text-technical text-[10px] font-black">{rank.points} PTS</span>
                </div>
                <div>
                    <h4 className="text-2xl font-black uppercase mb-4 tracking-tighter">{rank.name}</h4>
                    <ul className="space-y-3">
                        {rank.perks.map((perk, i) => (
                            <li key={i} className="text-technical text-[9px] text-white/40 flex items-center gap-2">
                                <ArrowRight size={10} /> {perk}
                            </li>
                        ))}
                    </ul>
                </div>
                {prestigeRank === rank.name && (
                    <div className="mt-auto pt-6 border-t border-white/20">
                        <span className="bg-white text-black text-technical text-[8px] px-2 py-1 font-bold">CURRENT RANK</span>
                    </div>
                )}
            </div>
          ))}
        </div>

        {/* 3. Call to Action */}
        <div className="bg-white text-black p-20 text-center flex flex-col items-center gap-8">
            <h2 className="text-heading text-5xl md:text-8xl">REFINED UTILITY.</h2>
            <p className="text-technical text-xs max-w-md tracking-widest font-black">
                NOT A LABEL. A UNIFORM. JOIN THE COLLECTIVE TO SCALE YOUR GEAR.
            </p>
            <Link to="/shop" className="btn-primary !bg-black !text-white !border-black mt-8">
                RETURN TO THE LAB
            </Link>
        </div>

      </div>
    </div>
  );
}
