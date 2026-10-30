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
  const images = [product.image, ...product.galleryImages];

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
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div 
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/80 hover:bg-stone-100 text-stone-700 shadow-xs transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
          
          {/* Left: Gallery Column */}
          <div className="space-y-4">
            <div className="relative aspect-4/5 sm:aspect-square w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#fdfbf7] via-[#f7f2ea] to-[#eee4d6] border border-stone-200/80 p-4 flex flex-col items-center justify-center group">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.95)_0%,rgba(247,242,234,0.4)_65%,transparent_100%)] pointer-events-none" />
              <img
                src={images[selectedImgIndex] || product.image}
                alt={product.name}
                className="max-h-[85%] max-w-[90%] object-contain drop-shadow-[0_18px_24px_rgba(123,62,29,0.2)] transition-transform duration-300 group-hover:scale-105 z-10"
              />
              <div className="w-3/4 h-2.5 rounded-[50%] bg-[#7b3e1d]/14 blur-[5px] -mt-1.5 pointer-events-none z-5" />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-[#7b3e1d] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs z-20">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImgIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImgIndex === idx ? 'border-[#7b3e1d] shadow-xs' : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details Column */}
          <div className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c59b27]">
                  Official Dail Packaging • {product.volume}
                </span>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="p-2 rounded-full hover:bg-stone-100 text-stone-500 hover:text-rose-500 transition-colors"
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>

              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
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
  );
};
