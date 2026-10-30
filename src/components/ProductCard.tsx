import React, { useState } from 'react';
import type { Product } from '../types';
import { useStore } from '../store/useStore';
import { Star, ShoppingBag, Eye, Heart, Phone, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    addToCart, 
    setSelectedProduct, 
    setCurrentPage, 
    setQuickViewProduct,
    isInWishlist,
    toggleWishlist,
    getWhatsAppUrl
  } = useStore();

  const [activeAngle, setActiveAngle] = useState<'product' | 'box'>('product');

  const isFavorited = isInWishlist(product.id);
  const packagingBoxImage = product.galleryImages?.[1] || '/images/dail_packaging.jpg';
  const displayImage = activeAngle === 'product' ? product.image : packagingBoxImage;

  const handleCardClick = () => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleAngleToggle = (e: React.MouseEvent, angle: 'product' | 'box') => {
    e.stopPropagation();
    setActiveAngle(angle);
  };

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = `As-salamu alaykum Dail Cosmetics! I want to order:\n• ${product.name} (Rs. ${product.price.toLocaleString()})\n\nPlease deliver via Cash on Delivery.`;
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      onClick={handleCardClick}
      className="group relative cursor-pointer bg-white border border-[#e8e8e1] hover:border-[#d0473e] p-2.5 sm:p-3.5 transition-all duration-300 flex flex-col justify-between rounded-xs shadow-2xs hover:shadow-md"
    >
      {/* 1. Golden Pearl Product Image Box */}
      <div className="relative w-full aspect-square rounded-xs overflow-hidden bg-[#fafafa] flex items-center justify-center p-3 sm:p-4 group/image">
        
        {/* Product Image */}
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-contain group-hover/image:scale-106 transition-transform duration-500"
          loading="lazy"
        />

        {/* Golden Pearl Red Sale / Best Seller Tag (Top Left) */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 items-start z-10 pointer-events-none">
          {discountPercent > 0 ? (
            <span className="bg-[#d0473e] text-white text-[9px] sm:text-[10px] font-heading font-extrabold uppercase px-2 py-0.5 tracking-wider rounded-xs shadow-xs">
              SAVE {discountPercent}%
            </span>
          ) : product.badge ? (
            <span className="bg-[#d0473e] text-white text-[9px] sm:text-[10px] font-heading font-extrabold uppercase px-2 py-0.5 tracking-wider rounded-xs shadow-xs">
              {product.badge}
            </span>
          ) : null}

          {product.badge && discountPercent > 0 && (
            <span className="bg-stone-900 text-white text-[8px] sm:text-[9px] font-heading font-bold uppercase px-1.5 py-0.5 tracking-wider rounded-xs">
              {product.badge}
            </span>
          )}
        </div>

        {/* Wishlist Heart Button (Top Right) */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white text-stone-600 hover:text-[#d0473e] flex items-center justify-center shadow-xs transition-colors z-20 cursor-pointer"
          title="Add to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#d0473e] text-[#d0473e]' : ''}`} />
        </button>

        {/* Quick View Hover Button */}
        <button
          onClick={handleQuickView}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/95 hover:bg-stone-900 hover:text-white text-stone-800 text-[10px] font-heading font-bold uppercase tracking-widest px-3 py-1.5 rounded-xs shadow-md opacity-0 group-hover:opacity-100 transition-all z-20 flex items-center gap-1 cursor-pointer shrink-0"
        >
          <Eye className="w-3 h-3" />
          <span>Quick View</span>
        </button>

        {/* Dual-Angle Pill Switcher (Jar / Bottle vs Packaging Box) */}
        {product.galleryImages?.length > 1 && (
          <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1 bg-white/80 backdrop-blur-xs p-0.5 rounded-xs border border-stone-200">
            <button
              onClick={(e) => handleAngleToggle(e, 'product')}
              className={`px-1.5 py-0.5 text-[8px] font-bold uppercase rounded-xs transition-colors ${
                activeAngle === 'product'
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-600 hover:text-black'
              }`}
            >
              Item
            </button>
            <button
              onClick={(e) => handleAngleToggle(e, 'box')}
              className={`px-1.5 py-0.5 text-[8px] font-bold uppercase rounded-xs transition-colors ${
                activeAngle === 'box'
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-600 hover:text-black'
              }`}
            >
              Box
            </button>
          </div>
        )}

      </div>

      {/* 2. Product Meta & Details */}
      <div className="pt-3 pb-1 flex flex-col flex-1 justify-between space-y-2">
        
        <div>
          {/* Star Rating */}
          <div className="flex items-center gap-1 mb-1">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-[10px] text-stone-500 font-medium">
              ({product.reviewCount})
            </span>
          </div>

          {/* Product Title (Poppins) */}
          <h3 className="font-heading text-xs sm:text-sm font-bold text-stone-900 group-hover:text-[#d0473e] transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>

          {/* Volume / Size */}
          <p className="text-[11px] text-stone-500 mt-0.5 truncate">
            {product.volume}
          </p>
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-1 space-y-2">
          
          {/* Prices (Strikethrough original + Red Current) */}
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-sm sm:text-base font-extrabold text-[#d0473e]">
              Rs. {product.price.toLocaleString()}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-stone-400 line-through font-normal">
                Rs. {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Golden Pearl Red Add To Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full btn-gp-primary py-2.5 sm:py-3 text-[11px] sm:text-xs font-heading font-extrabold tracking-[0.14em] flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>ADD TO CART</span>
          </button>

          {/* WhatsApp Direct Order Button */}
          <button
            onClick={handleWhatsAppOrder}
            className="w-full py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300/80 rounded-xs text-[10px] sm:text-[11px] font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
          >
            <Phone className="w-3 h-3 text-emerald-600" />
            <span>Order on WhatsApp</span>
          </button>

        </div>

      </div>

    </div>
  );
};
