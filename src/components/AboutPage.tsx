import React from 'react';
import { useStore } from '../store/useStore';
import { ShieldCheck, Sparkles, Award, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentPage } = useStore();

  return (
    <div className="w-full bg-[#fbf9f5] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Header with Logo */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="w-24 h-24 mx-auto drop-shadow-md mb-2">
            <img 
              src="/images/dail_logo.png" 
              alt="Dail Cosmetics" 
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-xs font-heading font-extrabold uppercase tracking-[0.25em] text-[#d0473e]">
            Purity • Sustainability • Integrity
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-stone-900 leading-tight">
            About <span className="text-[#d0473e]">Dail Cosmetics</span>
          </h1>
          <p className="text-stone-700 text-sm sm:text-base font-normal leading-relaxed max-w-2xl mx-auto">
            At Dail Cosmetics, we are passionate advocates for the power of nature to nurture and revitalize. Founded on the principles of purity, sustainability, and integrity, we specialize in crafting exquisite organic and herbal products that elevate personal care routines to a higher standard.
          </p>
          <p className="text-stone-600 text-xs sm:text-sm font-normal leading-relaxed max-w-2xl mx-auto">
            Our journey began with a simple belief: that beauty and wellness should never come at the expense of the environment or personal health. Guided by this ethos, we meticulously source the finest botanical ingredients, ensuring each product is not only effective but also gentle and nurturing. With a commitment to transparency and ethical practices, we invite you to join us on this journey towards a more radiant, harmonious, and sustainable future.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-8 rounded-3xl bg-white border border-stone-200/90 space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-2xl border border-rose-200">
              🛡️
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-stone-900">Strictly Without Steroid</h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Most commercial formula creams in Pakistan thin the epidermal barrier and cause steroid addiction. Dail Beauty Cream and Hand & Foot Cream are 100% steroid-free, safely promoting natural cellular illumination and barrier repair.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-stone-200/90 space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-2xl border border-amber-200">
              🧴
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-stone-900">100% Organic Herbal Hair Oil</h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Our 120ml signature hair oil is cold-infused with pure mountain Rosemary, Amla, Kalonji (Black Seed), and Castor oil. Stops hair shedding at the root, thickens thinning patches, and stimulates new hair growth naturally.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-stone-200/90 space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-2xl border border-emerald-200">
              ⭐
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-stone-900">Export Quality Standards</h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              From our signature embossed gold tin lids to airtight tamper-proof hygiene seals, every piece is manufactured to international export-grade standards, setting a proud benchmark for Pakistani botanical cosmetics.
            </p>
          </div>

        </div>

        {/* Call to action */}
        <div className="text-center pt-8">
          <button
            onClick={() => setCurrentPage('shop')}
            className="px-8 py-3.5 rounded-full bg-[#7b3e1d] hover:bg-[#622f14] text-white text-sm font-bold inline-flex items-center gap-2 shadow-sm transition-all"
          >
            <span>Explore The Formulations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
