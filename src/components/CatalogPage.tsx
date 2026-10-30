import React, { useState, useMemo } from 'react';
import { useStore } from '../store/useStore';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import type { ProductCategory } from '../types';
import { Filter, RotateCcw, Search, Sparkles, SlidersHorizontal, Check } from 'lucide-react';

export const CatalogPage: React.FC = () => {
  const {
    products,
    categories,
    concerns,
    selectedCategory,
    setSelectedCategory,
    selectedConcern,
    setSelectedConcern,
    searchQuery,
    setSearchQuery,
    maxPriceFilter,
    setMaxPriceFilter
  } = useStore();

  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category match
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Concern match
      if (selectedConcern !== 'all' && !product.concern.some((c) => c.toLowerCase().includes(selectedConcern.toLowerCase()))) {
        return false;
      }
      // Price filter
      if (product.price > maxPriceFilter) {
        return false;
      }
      // Search query match
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesTagline = product.tagline.toLowerCase().includes(query);
        const matchesIngredients = product.fullIngredients.toLowerCase().includes(query);
        if (!matchesName && !matchesTagline && !matchesIngredients) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, selectedConcern, searchQuery, sortBy, maxPriceFilter]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedConcern('all');
    setSearchQuery('');
    setMaxPriceFilter(5000);
    setSortBy('featured');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedConcern !== 'all' || searchQuery !== '' || maxPriceFilter < 5000;

  return (
    <div className="w-full bg-white min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Minimal Golden Pearl Style Bar: Filter button, Products Count & Sort Dropdown */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#e8e8e1]">
          {/* Mobile Filter Toggle / Category Pill */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-heading font-extrabold uppercase tracking-wider text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xs border border-stone-200 cursor-pointer transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#d0473e]" />
              <span>Filter</span>
            </button>
            <span className="text-xs text-stone-500 font-medium hidden sm:inline">
              ({filteredProducts.length} items)
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-heading text-base sm:text-xl font-extrabold uppercase tracking-wider text-stone-900 text-center flex-1">
            {selectedCategory === 'all' ? 'All Products' : categories.find(c => c.slug === selectedCategory)?.name || 'Products'}
          </h1>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="Sort products by"
              className="bg-white border border-stone-300 rounded-xs px-3 py-2 text-xs text-stone-800 focus:outline-hidden focus:border-[#d0473e] cursor-pointer font-bold uppercase tracking-wider"
            >
              <option value="featured">Best selling</option>
              <option value="price-low">Price, low to high</option>
              <option value="price-high">Price, high to low</option>
              <option value="rating">Top customer rated</option>
            </select>
          </div>
        </div>

        {/* Collapsible / Expandable Category & Concern Filter Pills */}
        <div className={`${showFiltersMobile ? 'block' : 'hidden md:block'} bg-stone-50/70 p-3.5 sm:p-4 rounded-xs border border-stone-200 space-y-3`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-heading font-extrabold uppercase tracking-wider text-stone-500 mr-1">
                Category:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-3 py-1.5 rounded-xs text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedCategory === cat.slug
                      ? 'bg-[#d0473e] text-white shadow-xs'
                      : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 text-xs text-[#d0473e] hover:underline font-bold cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200/90 max-w-md mx-auto p-8 shadow-xs space-y-3">
            <p className="text-base font-bold text-stone-800">No products match your selected filters</p>
            <p className="text-xs text-stone-500">Please adjust your price or concern filter to view Dail formulations.</p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2 rounded-full bg-[#7b3e1d] text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
