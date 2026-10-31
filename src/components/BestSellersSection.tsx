import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { ProductCard } from './ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';

export const BestSellersSection: React.FC = () => {
  const { products, setCurrentPage, setSelectedCategory } = useStore();
  const [activeTab, setActiveTab] = useState<'all' | 'skincare' | 'haircare' | 'bundles'>('all');

  const tabs = [
    { id: 'all', label: 'All Products' },
    { id: 'skincare', label: 'Skincare' },
    { id: 'haircare', label: 'Hair Care' },
    { id: 'bundles', label: 'Bundles & Deals' },
  ];

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'skincare') return p.category === 'cream' || p.category === 'cleanser' || p.category === 'serum';
    if (activeTab === 'haircare') return p.category === 'hair-oil' || p.category === 'hair-care';
    if (activeTab === 'bundles') return p.category === 'bundles';
    return true;
  });

  const handleViewAll = () => {
    setSelectedCategory('all');
    setCurrentPage('shop');
  };

  return (
    <section className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
        <div>
          <span className="text-[10px] sm:text-xs font-heading font-extrabold uppercase tracking-[0.25em] text-[#d0473e] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            TOP RATED FORMULATIONS
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-stone-900 mt-1">
            Best Sellers
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-1 max-w-xl font-normal">
            Export quality organic batches crafted with cold-pressed botanical oils. Factory sealed with signature embossed lids.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-[11px] sm:text-xs font-heading font-extrabold uppercase tracking-wider rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-stone-900 to-stone-800 text-amber-300 border border-amber-400/30 shadow-md scale-102'
                  : 'bg-stone-100/80 hover:bg-[#d0473e] hover:text-white text-stone-700 hover:shadow-sm'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid: 2-Cols on Mobile, 4-Cols on Desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {filteredProducts.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-8 sm:mt-12 text-center">
        <button
          onClick={handleViewAll}
          className="inline-flex items-center gap-2.5 px-8 py-4 bg-white hover:bg-stone-900 text-stone-900 hover:text-white border-2 border-stone-900 font-heading text-xs font-extrabold uppercase tracking-[0.16em] rounded-xl shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
        >
          <span>VIEW FULL CATALOG ({products.length} PRODUCTS)</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>

    </section>
  );
};
