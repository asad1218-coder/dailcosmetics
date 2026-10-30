import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Phone, Mail, MapPin, Sparkles, Send, ShieldCheck, Truck } from 'lucide-react';
import type { PageView, ProductCategory } from '../types';

export const Footer: React.FC = () => {
  const { setCurrentPage, setSelectedCategory, setSelectedProduct, products, storeSettings, getWhatsAppUrl, customPages, navigateToCustomPage } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
  };

  const navigateTo = (page: PageView, cat?: ProductCategory) => {
    if (cat) setSelectedCategory(cat);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToProduct = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    if (prod) {
      setSelectedProduct(prod);
      setCurrentPage('product-detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#1a1a1a] text-stone-300 border-t border-stone-800 font-sans">
      
      {/* 1. Golden Pearl Newsletter Subscription Section */}
      <div className="bg-[#111111] border-b border-stone-800 py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-[10px] sm:text-xs font-heading font-extrabold uppercase tracking-[0.25em] text-[#d0473e]">
            NEWSLETTER SIGNUP
          </span>
          <h3 className="font-heading text-xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
            SUBSCRIBE FOR SPECIAL OFFERS & RS. 300 OFF
          </h3>
          <p className="text-xs sm:text-sm text-stone-400 font-normal max-w-lg mx-auto">
            Get exclusive access to new organic product launches, secret discount coupons, and healthy haircare tips.
          </p>

          {subscribed ? (
            <div className="p-3 bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-bold rounded-xs max-w-md mx-auto">
              ✓ Shukriya! You are now subscribed. Use code <span className="text-white underline">DAIL300</span> at checkout for Rs. 300 off.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto pt-2">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full sm:w-auto flex-1 bg-stone-900 border border-stone-700 rounded-xs px-4 py-3 text-xs text-white placeholder:text-stone-500 focus:outline-hidden focus:border-[#d0473e]"
              />
              <button
                type="submit"
                className="w-full sm:w-auto btn-gp-primary px-6 py-3 text-xs font-heading font-bold uppercase tracking-widest shrink-0 cursor-pointer"
              >
                SUBSCRIBE
              </button>
            </form>
          )}
        </div>
      </div>

      {/* 2. 4-Column Main Footer Links (Impulse Theme Layout) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          
          {/* Column 1: Brand About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <img src="/images/dail_logo.png" alt="Dail Cosmetics Logo" className="w-9 h-9 object-contain" />
              <div>
                <span className="font-heading font-extrabold text-base text-white tracking-wider uppercase block">
                  DAIL <span className="text-[#c59b27]">COSMETICS</span>
                </span>
                <span className="text-[9px] tracking-widest text-stone-400 uppercase font-bold">
                  ORGANICS PAKISTAN
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 font-normal leading-relaxed">
              Pakistan's trusted organic beauty and personal care brand. Dedicated to 100% pure botanical hair oil and certified without-steroid facial formulations.
            </p>

            <div className="pt-1 space-y-2 text-xs text-stone-300">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#d0473e] shrink-0" />
                <span>DHA Phase 5, Lahore, Pakistan</span>
              </p>
              <p className="flex items-center gap-2 font-bold text-white">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 underline">
                  WhatsApp: {storeSettings.whatsappNumber}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#c59b27] shrink-0" />
                <a href="mailto:dailcosmeticscht@gmail.com" className="hover:text-white underline">
                  dailcosmeticscht@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Column 2: Shop Categories */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs sm:text-sm font-extrabold uppercase tracking-widest text-white border-b border-stone-800 pb-2">
              SHOP PRODUCTS
            </h4>
            <ul className="space-y-2 text-xs font-medium text-stone-400">
              <li>
                <button onClick={() => navigateToProduct('dail-beauty-cream')} className="hover:text-white transition-colors cursor-pointer flex items-center justify-between w-full">
                  <span>Dail Beauty Cream (50g)</span>
                  <span className="text-[#d0473e] font-bold">PKR 350</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateToProduct('dail-premium-herbal-hair-oil')} className="hover:text-white transition-colors cursor-pointer flex items-center justify-between w-full">
                  <span>Premium Herbal Hair Oil (120ml)</span>
                  <span className="text-[#d0473e] font-bold">PKR 999</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateToProduct('dail-hand-and-foot-whitening-cream')} className="hover:text-white transition-colors cursor-pointer flex items-center justify-between w-full">
                  <span>Hand & Foot Whitening Cream</span>
                  <span className="text-[#d0473e] font-bold">PKR 350</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateToProduct('dail-glowing-duo-bundle')} className="hover:text-white transition-colors cursor-pointer flex items-center justify-between w-full">
                  <span>Daily Beauty & Hair Oil Duo</span>
                  <span className="text-[#c59b27] font-bold">PKR 1,199</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateToProduct('dail-complete-regimen-bundle')} className="hover:text-white transition-colors cursor-pointer flex items-center justify-between w-full">
                  <span>Complete 3-in-1 Regimen Box</span>
                  <span className="text-[#c59b27] font-bold">PKR 1,499</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateToProduct('dail-family-pack-bundle')} className="hover:text-white transition-colors cursor-pointer flex items-center justify-between w-full">
                  <span>Family Double Glow Pack</span>
                  <span className="text-emerald-400 font-bold">Free Delivery</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs sm:text-sm font-extrabold uppercase tracking-widest text-white border-b border-stone-800 pb-2">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-2 text-xs font-medium text-stone-400">
              <li>
                <button onClick={() => navigateTo('track-order')} className="hover:text-white transition-colors cursor-pointer text-amber-300 font-bold">
                  Track Your Order
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact Us / Helpline
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors cursor-pointer">
                  About Dail Cosmetics
                </button>
              </li>
              {/* Dynamic Custom Pages with showInFooter */}
              {customPages.filter((p) => p.showInFooter).map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => {
                      navigateToCustomPage(p.slug);
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left line-clamp-1"
                  >
                    {p.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Quick Order WhatsApp & Official Socials */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs sm:text-sm font-extrabold uppercase tracking-widest text-white border-b border-stone-800 pb-2">
              CONNECT & ORDER
            </h4>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-extrabold text-xs uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>WHATSAPP: {storeSettings.whatsappNumber}</span>
            </a>

            {/* Official Social Links */}
            <div className="pt-2 space-y-1.5 text-xs">
              <span className="text-stone-400 text-[11px] uppercase tracking-wider font-bold block">
                Official Channels:
              </span>
              <div className="flex flex-col gap-1.5">
                <a
                  href="https://www.facebook.com/profile.php?id=61563795102913&mibextid=ZbWKwL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors flex items-center gap-2 text-stone-300"
                >
                  <span>📘 Facebook Page</span>
                </a>
                <a
                  href="https://www.instagram.com/dailcosmetics?igsh=ZzYyd29rZ3p3d3c="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors flex items-center gap-2 text-stone-300"
                >
                  <span>📸 Instagram @dailcosmetics</span>
                </a>
                <a
                  href="https://www.tiktok.com/@dailcosmetics?_t=8olPFWJTJLT&_r=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2 text-stone-300"
                >
                  <span>🎵 TikTok @dailcosmetics</span>
                </a>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-stone-400 space-y-1">
              <p className="flex items-center gap-1.5 text-stone-300 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                100% Organic & Halal Certified
              </p>
              <p className="flex items-center gap-1.5 text-stone-300 font-semibold">
                <Truck className="w-3.5 h-3.5 text-amber-400" />
                Cash On Delivery Nationwide
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Bottom Bar: Copyright & Payment Badges */}
      <div className="border-t border-stone-800 bg-black/60 py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <p className="text-center sm:text-left">
            © 2026 Dail Cosmetics Pakistan. All Rights Reserved. Certified 100% Organic & Steroid-Free Formulation.
          </p>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-900 border border-stone-700 px-2 py-1 rounded-xs text-stone-300">
              💵 Cash on Delivery
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-900 border border-stone-700 px-2 py-1 rounded-xs text-stone-300">
              JazzCash
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-900 border border-stone-700 px-2 py-1 rounded-xs text-stone-300">
              EasyPaisa
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-900 border border-stone-700 px-2 py-1 rounded-xs text-stone-300">
              Visa / Master
            </span>
          </div>
        </div>
      </div>

    </footer>
  );
};
