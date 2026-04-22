import React from 'react';
import { motion } from 'motion/react';
import { Accordion } from '../components/Accordion';
import { Mail, MessageCircle, HelpCircle, Truck, RefreshCw, Ruler } from 'lucide-react';

export function Support() {
  const faqs = [
    {
      category: 'ORDERS & SHIPPING',
      icon: <Truck size={20} />,
      items: [
        { q: 'How long does shipping take?', a: 'Domestic orders within Kampala typically arrive in 1-2 business days. International orders via DHL Express take 3-7 business days depending on customs.' },
        { q: 'Can I track my order?', a: 'Yes. Once dispatched, you will receive a technical log (tracking number) via email to monitor your shipment in real-time.' },
        { q: 'Do you ship to my country?', a: 'We ship to over 150 countries worldwide. Shipping rates are calculated at checkout based on location and parcel weight.' }
      ]
    },
    {
      category: 'RETURNS & EXCHANGES',
      icon: <RefreshCw size={20} />,
      items: [
        { q: 'What is your return policy?', a: 'Items must be returned within 14 days of receipt in original, unworn condition with all technical tags attached.' },
        { q: 'How do I start a return?', a: 'Contact our lab support team at returns@utopiaug.com with your order identifier to initiate the process.' }
      ]
    },
    {
      category: 'FIT & FABRIC',
      icon: <Ruler size={20} />,
      items: [
        { q: 'How do the shirts fit?', a: 'Most Utopia pieces feature an oversized, boxy silhouette. We recommend your standard size for the intended aesthetic, or sizing down for a standard fit.' },
        { q: 'What material do you use?', a: 'We use premium 220GSM+ long-staple cotton, custom-knit to maintain structural integrity and heavy drape.' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-40 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-24">
            <p className="text-technical text-gray-400 mb-4 tracking-[0.5em]">UTOPIA LAB // CLIENT SERVICES</p>
            <h1 className="text-heading text-6xl md:text-9xl leading-none uppercase">SUPPORT.</h1>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
            <div className="p-10 border border-gray-100 flex flex-col items-center text-center gap-6 group hover:bg-black hover:text-white transition-all cursor-pointer">
                <Mail size={32} strokeWidth={1} />
                <div>
                    <h3 className="text-technical text-[10px] font-black mb-2">EMAIL US</h3>
                    <p className="text-sm font-medium">support@utopiaug.com</p>
                </div>
            </div>
            <div className="p-10 border border-gray-100 flex flex-col items-center text-center gap-6 group hover:bg-black hover:text-white transition-all cursor-pointer">
                <MessageCircle size={32} strokeWidth={1} />
                <div>
                    <h3 className="text-technical text-[10px] font-black mb-2">WHATSAPP</h3>
                    <p className="text-sm font-medium">+256 7XX XXX XXX</p>
                </div>
            </div>
            <div className="p-10 border border-gray-100 flex flex-col items-center text-center gap-6 group hover:bg-black hover:text-white transition-all cursor-pointer">
                <HelpCircle size={32} strokeWidth={1} />
                <div>
                    <h3 className="text-technical text-[10px] font-black mb-2">INSTAGRAM</h3>
                    <p className="text-sm font-medium">@utopia_ug</p>
                </div>
            </div>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-24">
            {faqs.map((section) => (
                <section key={section.category}>
                    <div className="flex items-center gap-4 border-b-2 border-black pb-4 mb-8">
                        {section.icon}
                        <h2 className="text-technical text-[12px] font-black tracking-widest">{section.category}</h2>
                    </div>
                    <div>
                        {section.items.map((item, i) => (
                            <Accordion key={i} title={item.q}>
                                {item.a}
                            </Accordion>
                        ))}
                    </div>
                </section>
            ))}
        </div>

      </div>
    </div>
  );
}
