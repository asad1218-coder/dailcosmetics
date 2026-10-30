import React, { useState, useMemo } from 'react';
import { useStore } from '../store/useStore';
import { PRODUCTS } from '../data/products';
import { Search, X, ArrowRight, ShoppingBag, Star } from 'lucide-react';
import type { Product } from '../types';

export const SearchModal: React.FC = () => {
  const { products, isSearchOpen, setIsSearchOpen, addToCart, setSelectedProduct, setCurrentPage } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products.slice(0, 4);
    const query = searchTerm.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.tagline.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.concern.some((c) => c.toLowerCase().includes(query))
    );
  }, [searchTerm, products]);

  if (!isSearchOpen) return null;

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-stone-100 flex items-center gap-3 bg-stone-50/50">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search herbal hair oil, beauty cream, steroid-free..."
            className="w-full bg-transparent text-stone-900 placeholder:text-stone-400 focus:outline-hidden text-base sm:text-lg"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Tags */}
        <div className="px-6 py-3 bg-stone-50 border-b border-stone-100 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-stone-400 font-medium shrink-0">Popular:</span>
          {['Hair Fall', 'Without Steroid', 'Beauty Cream', '120ml Oil', 'Full Regimen'].map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchTerm(tag)}
              className="px-2.5 py-1 rounded-full bg-white border border-stone-200 text-stone-600 hover:border-[#7b3e1d] hover:text-[#7b3e1d] transition-colors shrink-0"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 divide-y divide-stone-100">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-stone-500">
              <p className="text-base font-semibold">No products found matching "{searchTerm}"</p>
              <p className="text-xs text-stone-400 mt-1">Try searching for "hair oil", "cream", or "organic".</p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="py-3 flex items-center justify-between gap-4 hover:bg-stone-50 px-3 rounded-2xl transition-colors cursor-pointer group"
                onClick={() => handleSelectProduct(product)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-stone-100 border border-stone-200 overflow-hidden shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#7b3e1d] transition-colors line-clamp-1">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5 text-xs">
                      <span className="font-bold text-[#7b3e1d]">Rs. {product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-stone-400 line-through text-[11px]">
                          Rs. {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                      <span className="text-stone-400">•</span>
                      <span className="text-stone-500">{product.volume}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product, 1);
                      setIsSearchOpen(false);
                    }}
                    className="p-2.5 rounded-full bg-stone-100 hover:bg-[#7b3e1d] text-stone-700 hover:text-white transition-colors"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#7b3e1d] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
