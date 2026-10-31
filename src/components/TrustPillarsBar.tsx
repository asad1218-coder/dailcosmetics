import React from 'react';
import { Truck, ShieldCheck, Banknote, PhoneCall } from 'lucide-react';
import { useStore } from '../store/useStore';

export const TrustPillarsBar: React.FC = () => {
  const { storeSettings, getWhatsAppUrl } = useStore();

  const pillars = [
    {
      icon: <Truck className="w-7 h-7 text-[#d0473e]" />,
      title: 'FREE DELIVERY',
      description: 'On all orders PKR 2,000 & above nationwide'
    },
    {
      icon: <Banknote className="w-7 h-7 text-[#d0473e]" />,
      title: 'CASH ON DELIVERY',
      description: 'Pay safely at your doorstep anywhere in Pakistan'
    },
    {
      icon: <ShieldCheck className="w-7 h-7 text-[#d0473e]" />,
      title: 'STRICTLY 0% STEROIDS',
      description: '100% certified organic & halal botanical formulas'
    },
    {
      icon: <PhoneCall className="w-7 h-7 text-[#d0473e]" />,
      title: 'DEDICATED HELPLINE',
      description: `Call / WhatsApp 24/7: ${storeSettings.whatsappNumber}`,
      isLink: true
    }
  ];

  return (
    <section className="bg-white border-y border-[#e8e8e1] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {pillars.map((item, idx) => (
            <div 
              key={idx}
              className="flex items-center sm:items-start gap-4 p-4 rounded-xl border border-stone-200/70 bg-gradient-to-b from-white to-stone-50/50 hover:border-[#c59b27]/70 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-default"
            >
              <div className="p-3 bg-red-50 group-hover:bg-[#d0473e] rounded-xl shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-2xs text-[#d0473e] group-hover:text-white [&>svg]:transition-colors [&>svg]:group-hover:text-white">
                {item.icon}
              </div>
              <div>
                <h4 className="font-heading text-xs sm:text-sm font-extrabold uppercase tracking-wider text-stone-900 group-hover:text-[#d0473e] transition-colors duration-200">
                  {item.title}
                </h4>
                {item.isLink ? (
                  <a 
                    href={getWhatsAppUrl()} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-stone-500 hover:text-[#d0473e] text-xs mt-0.5 block font-medium underline"
                  >
                    {item.description}
                  </a>
                ) : (
                  <p className="text-stone-500 text-xs mt-0.5 font-normal leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
