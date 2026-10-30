import React from 'react';
import { useStore } from '../store/useStore';
import type { ProductCategory } from '../types';

export const CategoryCirclesBar: React.FC = () => {
  const { categories, products, setSelectedCategory, setCurrentPage } = useStore();

  // Exclude 'all' from the circles row
  const displayCategories = categories.filter((c) => c.slug !== 'all');

  const handleSelect = (slug: string) => {
    setSelectedCategory(slug as ProductCategory);
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <section className="py-8 sm:py-12 bg-[#faf9f6] border-b border-[#e8e8e1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Mini Heading (Golden Pearl Style) */}
        <div className="text-center mb-6 sm:mb-9">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#d0473e] block">
            SHOP BY COLLECTION
          </span>
          <h2 className="font-heading text-xl sm:text-3xl font-extrabold uppercase tracking-tight text-stone-900 mt-1">
            EXPLORE CATEGORIES
          </h2>
          <div className="w-12 h-0.5 bg-[#d0473e] mx-auto mt-2.5" />
        </div>

        {/* Categories Horizontal Scroll / Grid with large prominent circles */}
        <div className="flex items-start justify-start sm:justify-center gap-4 sm:gap-7 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth">
          {displayCategories.map((cat) => {
            const matchedProduct = products.find((p) => p.category === cat.slug);
            const imageSrc = cat.image || matchedProduct?.image || '/images/dail_beauty_cream_square.jpg';
            const priceTag = matchedProduct ? `PKR ${matchedProduct.price.toLocaleString()}` : null;

            return (
              <div
                key={cat.id || cat.slug}
                onClick={() => handleSelect(cat.slug)}
                className="flex flex-col items-center gap-2.5 cursor-pointer group shrink-0"
              >
                {/* Large Prominent Circle Avatar with Ring */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full p-1.5 bg-white border-2 border-stone-200 group-hover:border-[#d0473e] transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:scale-106 overflow-hidden flex items-center justify-center">
                  <img 
                    src={imageSrc} 
                    alt={cat.name} 
                    className="w-full h-full object-contain p-1 group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Floating Price Tag */}
                  {priceTag && (
                    <span className="absolute bottom-1 inset-x-2 bg-[#d0473e] text-white text-[8px] sm:text-[9.5px] font-heading font-extrabold uppercase tracking-wider text-center py-0.5 rounded-full shadow-xs">
                      {priceTag}
                    </span>
                  )}
                  {/* Category Icon Badge */}
                  {cat.icon && (
                    <span className="absolute top-1 right-2 text-xs sm:text-sm drop-shadow-xs pointer-events-none">
                      {cat.icon}
                    </span>
                  )}
                </div>

                {/* Category Label */}
                <div className="text-center">
                  <span className="font-heading text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-800 group-hover:text-[#d0473e] block max-w-[100px] sm:max-w-[120px] leading-tight transition-colors">
                    {cat.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
