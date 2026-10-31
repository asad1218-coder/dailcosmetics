import React from 'react';
import { useStore } from '../store/useStore';
import { ShoppingBag, Sparkles, CheckCircle2, Truck, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export const ValueBundlesSection: React.FC = () => {
  const { addToCart, setSelectedProduct, setCurrentPage } = useStore();

  const bundles = [
    {
      id: 'bundle-trio',
      title: 'Dail Complete 3-in-1 Regimen Box',
      tagline: '120ml Herbal Hair Oil (PKR 999) + Dail Beauty Cream (PKR 350) + Hand & Foot Cream (PKR 350)',
      badge: 'TOP VALUE DEAL',
      price: 1499,
      originalPrice: 1699,
      saving: 200,
      image: '/images/dail_hero_banner_golden.jpg',
      features: [
        'All 3 signature export-quality formulations in one box',
        'Stops hair fall + imparts radiant facial glow without steroids',
        'Tamper-proof golden factory seal & export grade packing',
        'Cash On Delivery available across Pakistan'
      ],
      product: PRODUCTS[4] || PRODUCTS[0]
    },
    {
      id: 'bundle-duo',
      title: 'Daily Beauty Cream + Herbal Hair Oil Duo',
      tagline: 'Dail Beauty Cream (PKR 350) + Premium Herbal Hair Oil 120ml (PKR 999)',
      badge: 'BESTSELLER DUO',
      price: 1199,
      originalPrice: 1349,
      saving: 150,
      image: '/images/dail_full_collection.jpg',
      features: [
        'Strictly 0% steroids — safe daily cell renewal and glow',
        'Cold-pressed rosemary bio-actives & amla for rapid regrowth',
        'Visible results in 5 to 7 days guaranteed',
        'Official factory batch direct from Dail Cosmetics'
      ],
      product: PRODUCTS[3] || PRODUCTS[1]
    },
    {
      id: 'bundle-family',
      title: 'Dail Family Double Pack (FREE DELIVERY)',
      tagline: '2x Herbal Hair Oils 120ml + 2x Dail Beauty Creams (Double supply)',
      badge: 'FREE DELIVERY',
      price: 2399,
      originalPrice: 2698,
      saving: 299,
      image: '/images/dail_hero_banner_golden.jpg',
      features: [
        'Double supply (2x Hair Oils 120ml + 2x Beauty Creams 50g)',
        'FREE express courier delivery nationwide included',
        'Pure rosemary, kalonji, amla & glutathione formulations',
        'Best family value savings pack'
      ],
      product: PRODUCTS[5] || PRODUCTS[0]
    }
  ];

  const handleAddBundle = (bundle: typeof bundles[0]) => {
    addToCart(bundle.product, 1);
  };

  const handleViewDetails = (bundle: typeof bundles[0]) => {
    setSelectedProduct(bundle.product);
    setCurrentPage('product-detail');
  };

  return (
    <section className="py-12 sm:py-18 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <span className="text-[10px] sm:text-xs font-heading font-extrabold uppercase tracking-[0.25em] text-[#d0473e] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              CRAZY OFFERS & VALUE BUNDLES
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-stone-900 mt-1">
              Save More With Bundles
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm mt-1 max-w-xl font-normal">
              Get complete routines and save with complimentary nationwide courier shipping on orders above Rs. 2,000.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentPage('shop');
            }}
            className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-900 font-heading text-xs font-bold uppercase tracking-wider rounded-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>View All Bundles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3-Bundle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bundles.map((bundle) => (
            <div
              key={bundle.id}
              className="group bg-white border border-stone-200/90 hover:border-[#c59b27] rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Savings Badge */}
              <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-[#d0473e] to-[#e8544a] text-white text-[10px] font-heading font-extrabold uppercase px-3 py-1 rounded-full tracking-wider shadow-md">
                SAVE RS. {bundle.saving.toLocaleString()}
              </div>

              <div>
                {/* Image */}
                <div 
                  onClick={() => handleViewDetails(bundle)}
                  className="relative aspect-4/3 w-full bg-gradient-to-b from-stone-50 to-stone-100/50 rounded-xl overflow-hidden p-4 mb-4 flex items-center justify-center cursor-pointer border border-stone-100"
                >
                  <img 
                    src={bundle.image} 
                    alt={bundle.title} 
                    className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500 ease-out"
                  />
                  <span className="absolute bottom-2.5 left-2.5 bg-stone-900/90 backdrop-blur-xs text-amber-300 border border-amber-400/30 text-[9px] font-bold uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow-xs">
                    {bundle.badge}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 
                  onClick={() => handleViewDetails(bundle)}
                  className="font-heading text-sm sm:text-base font-extrabold uppercase text-stone-900 group-hover:text-[#d0473e] transition-colors cursor-pointer leading-snug"
                >
                  {bundle.title}
                </h3>
                <p className="text-stone-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                  {bundle.tagline}
                </p>

                {/* Features Checklist */}
                <ul className="mt-4 space-y-2 border-t border-stone-100 pt-3.5">
                  {bundle.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-stone-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Price & Button */}
              <div className="mt-6 pt-4 border-t border-stone-100 space-y-3.5">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-lg sm:text-xl font-extrabold text-[#d0473e]">
                      Rs. {bundle.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-stone-400 line-through">
                      Rs. {bundle.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                    <Truck className="w-3 h-3 text-emerald-600" /> Free Delivery
                  </span>
                </div>

                <button
                  onClick={() => handleAddBundle(bundle)}
                  className="w-full btn-gp-primary py-3.5 text-xs font-heading font-extrabold tracking-[0.14em] flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-xl rounded-xl transition-all duration-300 group/btn"
                >
                  <ShoppingBag className="w-4 h-4 group-hover/btn:-translate-y-0.5 group-hover/btn:rotate-6 transition-transform duration-200" />
                  <span>CLAIM THIS BUNDLE</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
