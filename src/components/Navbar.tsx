import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { ShoppingBag, Search, Heart, Menu, X, Phone, ChevronDown, Sparkles } from 'lucide-react';
import type { PageView, ProductCategory } from '../types';

export const Navbar: React.FC = () => {
  const { 
    currentPage, 
    setCurrentPage, 
    getTotalItemsCount, 
    getCartSubtotal,
    setIsCartOpen, 
    wishlist,
    setSelectedCategory,
    setIsSearchOpen,
    storeSettings,
    getWhatsAppUrl,
    customPages,
    navigateToCustomPage,
    setSelectedProduct,
    products
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [skincareDropdownOpen, setSkincareDropdownOpen] = useState(false);
  const [haircareDropdownOpen, setHaircareDropdownOpen] = useState(false);

  const cartCount = getTotalItemsCount();
  const subtotal = getCartSubtotal();
  const wishlistCount = wishlist.length;

  const navigateTo = (page: PageView, category?: ProductCategory) => {
    if (category) {
      setSelectedCategory(category);
    }
    setCurrentPage(page);
    setMobileMenuOpen(false);
    setSkincareDropdownOpen(false);
    setHaircareDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToProduct = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    if (prod) {
      setSelectedProduct(prod);
      setCurrentPage('product-detail');
      setMobileMenuOpen(false);
      setSkincareDropdownOpen(false);
      setHaircareDropdownOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-xs">
      
      {/* 1. Golden Pearl Signature Announcement Bar */}
      <div className="bg-[#d0473e] text-white text-[11px] sm:text-xs py-2 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Scrolling / Clean Announcement Message */}
          <div className="flex items-center gap-2 font-medium tracking-wider uppercase text-center sm:text-left mx-auto sm:mx-0 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 animate-pulse" />
            <span className="truncate">
              {storeSettings.announcementText}
            </span>
          </div>

          {/* Quick Help & Track Links */}
          <div className="hidden md:flex items-center gap-3 text-[11px] text-white/90 shrink-0 uppercase tracking-widest font-semibold">
            <a 
              href={getWhatsAppUrl()} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-amber-200 flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3 h-3 text-emerald-300" /> WhatsApp
            </a>
            <span className="opacity-40">|</span>
            {(storeSettings.tiktokUrl1 || storeSettings.tiktokUrl) && (
              <>
                <a 
                  href={storeSettings.tiktokUrl1 || storeSettings.tiktokUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-amber-200 transition-colors"
                >
                  TikTok 1
                </a>
                <span className="opacity-40">|</span>
              </>
            )}
            {storeSettings.tiktokUrl2 && (
              <>
                <a 
                  href={storeSettings.tiktokUrl2} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-amber-200 transition-colors"
                >
                  TikTok 2
                </a>
                <span className="opacity-40">|</span>
              </>
            )}
            <button 
              onClick={() => navigateTo('track-order')}
              className="hover:text-amber-200 cursor-pointer transition-colors"
            >
              Track Order
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Golden Pearl Style White Header */}
      <nav className="bg-white border-b border-[#e8e8e1] px-4 sm:px-6 lg:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-stone-800 hover:text-[#d0473e] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Golden Pearl / Dail Brand Logo */}
          <div 
            onClick={() => navigateTo('home')}
            className="cursor-pointer flex items-center gap-3 group"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-white p-0.5 border border-[#c59b27] shadow-xs group-hover:scale-105 transition-transform shrink-0">
              <img 
                src="/images/dail_logo.png" 
                alt="Dail Cosmetics Pakistan Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg sm:text-2xl font-extrabold tracking-[0.1em] text-stone-900 group-hover:text-[#d0473e] transition-colors uppercase leading-none">
                DAIL <span className="text-[#c59b27]">COSMETICS</span>
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-stone-500 font-bold uppercase mt-1">
                ORGANICS PAKISTAN
              </span>
            </div>
          </div>

          {/* Golden Pearl Desktop Main Navigation Menu */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 font-heading text-[13px] font-bold uppercase tracking-[0.12em] text-stone-800">
            
            <button 
              onClick={() => navigateTo('home')}
              className={`hover:text-[#d0473e] transition-colors cursor-pointer py-1 relative ${
                currentPage === 'home' ? 'text-[#d0473e]' : ''
              }`}
            >
              Home
              {currentPage === 'home' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#d0473e]" />
              )}
            </button>

            <button 
              onClick={() => navigateTo('shop', 'all')}
              className="hover:text-[#d0473e] transition-colors cursor-pointer py-1 flex items-center gap-1 text-[#d0473e]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Best Sellers
            </button>

            {/* Skincare Dropdown */}
            <div 
              className="relative group py-1"
              onMouseEnter={() => setSkincareDropdownOpen(true)}
              onMouseLeave={() => setSkincareDropdownOpen(false)}
            >
              <button 
                onClick={() => navigateTo('shop', 'cream')}
                className="hover:text-[#d0473e] transition-colors cursor-pointer flex items-center gap-1"
              >
                Skincare
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#d0473e] transition-transform group-hover:rotate-180" />
              </button>

              {skincareDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-white border border-[#e8e8e1] shadow-xl py-3 px-2 rounded-xs z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="text-[10px] tracking-widest text-[#d0473e] font-bold px-3 py-1 mb-1 border-b border-stone-100">
                    SKINCARE COLLECTIONS
                  </div>
                  {products.filter((p) => p.category === 'cream').map((p) => (
                    <button
                      key={p.id}
                      onClick={() => navigateToProduct(p.id)}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-stone-700 hover:text-[#d0473e] hover:bg-stone-50 rounded-xs flex items-center justify-between cursor-pointer"
                    >
                      <span className="truncate mr-2">{p.name}</span>
                      <span className="text-[10px] text-[#d0473e] font-bold shrink-0">PKR {p.price.toLocaleString()}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Haircare Dropdown */}
            <div 
              className="relative group py-1"
              onMouseEnter={() => setHaircareDropdownOpen(true)}
              onMouseLeave={() => setHaircareDropdownOpen(false)}
            >
              <button 
                onClick={() => navigateTo('shop', 'hair-care')}
                className="hover:text-[#d0473e] transition-colors cursor-pointer flex items-center gap-1"
              >
                Hair Care
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#d0473e] transition-transform group-hover:rotate-180" />
              </button>

              {haircareDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-white border border-[#e8e8e1] shadow-xl py-3 px-2 rounded-xs z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="text-[10px] tracking-widest text-[#d0473e] font-bold px-3 py-1 mb-1 border-b border-stone-100">
                    HAIRCARE COLLECTION
                  </div>
                  {products.filter((p) => p.category === 'hair-care').map((p) => (
                    <button
                      key={p.id}
                      onClick={() => navigateToProduct(p.id)}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-stone-700 hover:text-[#d0473e] hover:bg-stone-50 rounded-xs flex items-center justify-between cursor-pointer"
                    >
                      <span className="truncate mr-2">{p.name}</span>
                      <span className="text-[10px] text-[#d0473e] font-bold shrink-0">PKR {p.price.toLocaleString()}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button 
              onClick={() => navigateTo('shop', 'bundles')}
              className="hover:text-[#d0473e] transition-colors cursor-pointer py-1 relative text-[#c59b27] flex items-center gap-1"
            >
              Bundles & Offers
              <span className="text-[9px] bg-[#d0473e] text-white px-1.5 py-0.2 rounded-xs font-bold uppercase ml-0.5">
                Save 30%
              </span>
            </button>

            <button 
              onClick={() => navigateTo('track-order')}
              className={`hover:text-[#d0473e] transition-colors cursor-pointer py-1 ${
                currentPage === 'track-order' ? 'text-[#d0473e]' : ''
              }`}
            >
              Track Order
            </button>

            <button 
              onClick={() => navigateTo('contact')}
              className={`hover:text-[#d0473e] transition-colors cursor-pointer py-1 ${
                currentPage === 'contact' ? 'text-[#d0473e]' : ''
              }`}
            >
              Contact
            </button>

            {/* Dynamic Custom Pages with showInNav */}
            {customPages.filter((p) => p.showInNav).map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  navigateToCustomPage(p.slug);
                  setMobileMenuOpen(false);
                }}
                className="hover:text-[#d0473e] transition-colors cursor-pointer py-1 font-semibold truncate max-w-[150px]"
                title={p.title}
              >
                {p.title}
              </button>
            ))}

          </div>

          {/* Right Header Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Search Icon */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-stone-700 hover:text-[#d0473e] hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
              aria-label="Search Catalog"
              title="Search Products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Heart Icon */}
            <button 
              onClick={() => navigateTo('wishlist')}
              className="relative p-2 text-stone-700 hover:text-[#d0473e] hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
              aria-label="Wishlist"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#d0473e] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger Button (Golden Pearl Style) */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 px-3 py-2 bg-stone-900 hover:bg-[#d0473e] text-white rounded-xs transition-colors cursor-pointer shadow-xs group"
              aria-label="Open Cart Drawer"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 w-4 h-4 bg-[#d0473e] border border-white text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline-block font-heading text-xs font-bold uppercase tracking-wider">
                Rs. {subtotal.toLocaleString()}
              </span>
            </button>

          </div>

        </div>
      </nav>

      {/* 3. Mobile Slide-Over Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            
            {/* Drawer Top Header */}
            <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <div className="flex items-center gap-2.5">
                <img src="/images/dail_logo.png" alt="Dail Logo" className="w-8 h-8 object-contain" />
                <span className="font-heading font-extrabold text-stone-900 tracking-wider uppercase text-sm">
                  DAIL COSMETICS
                </span>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-stone-600 hover:text-stone-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links List */}
            <div className="p-4 space-y-1 font-heading text-sm font-bold uppercase tracking-wider text-stone-800">
              
              <button
                onClick={() => navigateTo('home')}
                className="w-full text-left py-3 px-3 hover:bg-stone-50 hover:text-[#d0473e] rounded-xs border-b border-stone-100"
              >
                Home
              </button>

              <button
                onClick={() => navigateTo('shop', 'all')}
                className="w-full text-left py-3 px-3 hover:bg-stone-50 text-[#d0473e] rounded-xs border-b border-stone-100 flex items-center justify-between"
              >
                <span>Best Sellers</span>
                <span className="text-[10px] bg-red-100 text-[#d0473e] px-2 py-0.5 rounded font-bold">HOT</span>
              </button>

              {/* Skincare Accordion */}
              <div className="border-b border-stone-100">
                <button
                  onClick={() => setSkincareDropdownOpen(!skincareDropdownOpen)}
                  className="w-full text-left py-3 px-3 hover:bg-stone-50 hover:text-[#d0473e] rounded-xs flex items-center justify-between"
                >
                  <span>Skincare</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${skincareDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {skincareDropdownOpen && (
                  <div className="pl-4 pb-2 space-y-1 text-xs font-semibold text-stone-600">
                    <button
                      onClick={() => navigateToProduct('dail-beauty-cream')}
                      className="w-full text-left py-2 px-3 hover:text-[#d0473e] cursor-pointer"
                    >
                      Dail Beauty Cream (5-Day Plan)
                    </button>
                    <button
                      onClick={() => navigateToProduct('dail-hand-and-foot-whitening-cream')}
                      className="w-full text-left py-2 px-3 hover:text-[#d0473e] cursor-pointer"
                    >
                      Hand & Foot Whitening Cream (PKR 350)
                    </button>
                  </div>
                )}
              </div>

              {/* Haircare Accordion */}
              <div className="border-b border-stone-100">
                <button
                  onClick={() => setHaircareDropdownOpen(!haircareDropdownOpen)}
                  className="w-full text-left py-3 px-3 hover:bg-stone-50 hover:text-[#d0473e] rounded-xs flex items-center justify-between"
                >
                  <span>Hair Care</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${haircareDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {haircareDropdownOpen && (
                  <div className="pl-4 pb-2 space-y-1 text-xs font-semibold text-stone-600">
                    <button
                      onClick={() => navigateToProduct('dail-premium-herbal-hair-oil')}
                      className="w-full text-left py-2 px-3 hover:text-[#d0473e] cursor-pointer"
                    >
                      Premium Herbal Hair Oil 120ml (PKR 999)
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => navigateTo('shop', 'bundles')}
                className="w-full text-left py-3 px-3 hover:bg-stone-50 text-[#c59b27] rounded-xs border-b border-stone-100 flex items-center justify-between"
              >
                <span>Bundles & Deals</span>
                <span className="text-[10px] bg-amber-100 text-[#c59b27] px-2 py-0.5 rounded font-bold">SAVE 30%</span>
              </button>

              <button
                onClick={() => navigateTo('track-order')}
                className="w-full text-left py-3 px-3 hover:bg-stone-50 hover:text-[#d0473e] rounded-xs border-b border-stone-100"
              >
                Track Your Order
              </button>

              <button
                onClick={() => navigateTo('contact')}
                className="w-full text-left py-3 px-3 hover:bg-stone-50 hover:text-[#d0473e] rounded-xs border-b border-stone-100"
              >
                Contact Us
              </button>

              {/* Dynamic Custom Pages in Mobile Menu */}
              {customPages.filter((p) => p.showInNav).map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    navigateToCustomPage(p.slug);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-3 px-3 hover:bg-stone-50 hover:text-[#d0473e] rounded-xs border-b border-stone-100 font-semibold"
                >
                  {p.title}
                </button>
              ))}

            </div>

            {/* Mobile Drawer Bottom Info */}
            <div className="mt-auto p-4 bg-stone-50 border-t border-stone-200 space-y-3">
              <a 
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xs flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                <Phone className="w-3.5 h-3.5" /> Order on WhatsApp
              </a>

              {/* TikTok Links */}
              <div className="flex items-center justify-center gap-3 pt-1 text-[11px] font-semibold text-stone-600">
                {(storeSettings.tiktokUrl1 || storeSettings.tiktokUrl) && (
                  <a 
                    href={storeSettings.tiktokUrl1 || storeSettings.tiktokUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-black hover:underline flex items-center gap-1"
                  >
                    <span>🎵 TikTok 1</span>
                  </a>
                )}
                {storeSettings.tiktokUrl2 && (
                  <>
                    <span className="text-stone-300">•</span>
                    <a 
                      href={storeSettings.tiktokUrl2} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-black hover:underline flex items-center gap-1"
                    >
                      <span>🎵 TikTok 2</span>
                    </a>
                  </>
                )}
              </div>

              <p className="text-[11px] text-stone-500 text-center font-normal">
                Official Helpline: {storeSettings.whatsappNumber}
              </p>
            </div>

          </div>
        </div>
      )}

    </header>
  );
};
