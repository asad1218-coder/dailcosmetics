import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { X, Star, Check, ShoppingBag, ShieldCheck, Truck, Phone, Heart } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    isInWishlist, 
    toggleWishlist,
    setSelectedProduct,
    setCurrentPage 
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isFavorited = isInWishlist(product.id);
  // Deduplicate images
  const images = Array.from(new Set([product.image, ...(product.galleryImages || [])]));

  const handleClose = () => {
    setQuickViewProduct(null);
    setQuantity(1);
    setSelectedImgIndex(0);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    handleClose();
  };

  const handleViewFullPage = () => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'instant' });
    handleClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div className="min-h-full flex items-start sm:items-center justify-center p-2 sm:p-4 text-center">
        <div 
          className="w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden relative my-3 sm:my-6 text-left animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button - Always visible at top right */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 z-30 p-2 rounded-full bg-white/90 hover:bg-stone-100 text-stone-700 shadow-xs border border-stone-200 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-8">
            
            {/* Left: Gallery Column */}
            <div className="space-y-3">
              <div className="relative aspect-square w-full max-h-[300px] sm:max-h-[420px] rounded-2xl overflow-hidden bg-white border border-stone-200 p-2 sm:p-4 flex items-center justify-center group mx-auto">
                <img
                  src={images[selectedImgIndex] || product.image}
                  alt={product.name}
                  className="max-h-[260px] sm:max-h-[380px] max-w-full w-auto h-auto object-contain mx-auto drop-shadow-md transition-transform duration-300 group-hover:scale-102 z-10"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-[#7b3e1d] text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs z-20">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnail selector */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1 justify-center sm:justify-start">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImgIndex(idx)}
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 p-1 transition-all shrink-0 cursor-pointer ${
                        selectedImgIndex === idx ? 'border-[#7b3e1d] ring-2 ring-[#7b3e1d]/20 shadow-xs' : 'border-stone-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details Column */}
            <div className="flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between pr-8">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d0473e]">
                    Official Dail Packaging • {product.volume}
                  </span>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 hover:text-rose-500 transition-colors cursor-pointer"
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>

                <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-stone-900 leading-tight uppercase">
                  {product.name}
                </h2>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-stone-700">
                  {product.rating} ({product.reviewCount} verified reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-2xl sm:text-3xl font-bold text-[#7b3e1d]">
                  Rs. {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-stone-400 line-through">
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Save Rs. {(product.originalPrice - product.price).toLocaleString()}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {product.description}
              </p>

              {/* Key Highlights */}
              <div className="space-y-1.5 pt-2">
                {product.benefits.slice(0, 3).map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-3 pt-4 border-t border-stone-100">
              
              <div className="flex items-center gap-3">
                {/* Quantity selector */}
                <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden bg-stone-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-stone-600 hover:bg-stone-200 transition-colors text-sm font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-stone-800 text-sm font-bold min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-stone-600 hover:bg-stone-200 transition-colors text-sm font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag CTA */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-6 bg-[#7b3e1d] hover:bg-[#622f14] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag • Rs. {(product.price * quantity).toLocaleString()}</span>
                </button>
              </div>

              {/* View Full Page link */}
              <button
                onClick={handleViewFullPage}
                className="w-full text-center text-xs text-[#7b3e1d] hover:underline font-semibold"
              >
                View Full Clinical Specifications & Reviews →
              </button>

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-stone-500">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>0% Steroid Certified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-stone-600" />
                  <span>Nationwide Express COD</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
