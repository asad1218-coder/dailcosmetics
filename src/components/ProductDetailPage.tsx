import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Dali3DCanvas } from './3d/Dali3DCanvas';
import { PRODUCTS, PAKISTAN_CITIES } from '../data/products';
import {
  Star,
  ShoppingBag,
  ArrowLeft,
  ShieldCheck,
  Truck,
  Phone,
  Check,
  ChevronDown,
  ChevronUp,
  Heart,
  Box,
  CheckCircle2,
  Clock,
  Sparkles,
  MessageSquarePlus,
  X
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProduct,
    setCurrentPage,
    addToCart,
    setIsCartOpen,
    isInWishlist,
    toggleWishlist,
    reviews,
    addReview,
    storeSettings,
    getWhatsAppUrl
  } = useStore();

  const product = selectedProduct || PRODUCTS[0];

  const [activeViewMode, setActiveViewMode] = useState<'gallery' | '3d'>('gallery');
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'benefits' | 'ingredients' | 'howToUse'>('overview');
  const [addedToast, setAddedToast] = useState(false);
  const [calcCity, setCalcCity] = useState('Lahore');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewCity, setNewReviewCity] = useState('Lahore');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');

  // Automatically scroll to the top and reset image whenever product changes
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setSelectedImage(product.image);
    setActiveViewMode('gallery');
  }, [product.id, product.image]);

  const isFavorited = isInWishlist(product.id);
  const allImages = [product.image, ...(product.galleryImages || [])];

  const currentPrice = product.price;
  const currentOriginalPrice = product.originalPrice;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setIsCartOpen(false);
    setCurrentPage('checkout');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;
    addReview({
      author: newReviewAuthor,
      city: newReviewCity,
      rating: newReviewRating,
      verified: true,
      comment: newReviewComment,
    });
    setIsReviewModalOpen(false);
    setNewReviewAuthor('');
    setNewReviewComment('');
    alert('Thank you! Your verified review has been published.');
  };

  return (
    <div className="w-full bg-[#fbf9f5] min-h-screen py-3 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between pb-1">
          <button
            onClick={() => setCurrentPage('shop')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-[#7b3e1d] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Formulations</span>
          </button>

          <span className="text-xs text-stone-400 hidden sm:inline-block">
            Catalog / {product.category.toUpperCase()} / {product.name}
          </span>
        </div>

        {/* Product Showcase Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
          
          {/* Left Column: Interactive Visuals (Gallery + 3D Toggle) */}
          <div className="lg:col-span-6 space-y-3 sm:space-y-4">
            
            {/* View Mode Toggle Switcher */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl border border-stone-200 text-xs">
                <button
                  onClick={() => setActiveViewMode('gallery')}
                  className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                    activeViewMode === 'gallery'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Photo Gallery
                </button>
                <button
                  onClick={() => setActiveViewMode('3d')}
                  className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeViewMode === '3d'
                      ? 'bg-[#7b3e1d] text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>360° 3D Studio</span>
                </button>
              </div>

              <button
                onClick={() => toggleWishlist(product.id)}
                className="p-2 sm:p-2.5 rounded-full bg-white border border-stone-200 text-stone-500 hover:text-rose-500 shadow-xs transition-colors cursor-pointer"
                title="Save to Wishlist"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            {/* Display Stage Container - Carefully bounded for mobile viewport */}
            <div className="relative aspect-square w-full max-h-[320px] sm:max-h-[460px] rounded-2xl sm:rounded-3xl bg-white sm:bg-gradient-to-b sm:from-[#fdfbf7] sm:via-[#f7f2ea] sm:to-[#eee4d6] border border-stone-200 shadow-xs overflow-hidden flex flex-col items-center justify-center p-2 sm:p-6 group mx-auto">
              
              {/* Radial Spotlight Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.95)_0%,rgba(247,242,234,0.4)_65%,transparent_100%)] pointer-events-none" />

              {activeViewMode === 'gallery' ? (
                <div className="relative z-10 w-full h-full flex items-center justify-center p-2">
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className="max-h-[280px] sm:max-h-[420px] max-w-full w-auto h-auto object-contain mx-auto drop-shadow-md group-hover:scale-102 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="relative z-10 w-full h-full bg-gradient-to-b from-[#fbf9f5] to-[#ece5d8] rounded-xl overflow-hidden">
                  <Dali3DCanvas initialModel={product.modelType as any} className="w-full h-full" />
                </div>
              )}

              {/* Badges on Top Left */}
              <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
                {product.badge && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-[#7b3e1d] text-white uppercase tracking-wider shadow-xs">
                    {product.badge}
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-amber-100 text-[#7b3e1d]">
                  {product.volume}
                </span>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {activeViewMode === 'gallery' && allImages.length > 1 && (
              <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1 pt-1 justify-center sm:justify-start">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-14 h-14 sm:w-18 sm:h-18 rounded-xl overflow-hidden bg-white border-2 p-1 transition-all shrink-0 cursor-pointer ${
                      selectedImage === img ? 'border-[#7b3e1d] ring-2 ring-[#7b3e1d]/20 shadow-xs' : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Buying Box & Specifications */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5">
            
            <div className="space-y-1.5">
              <span className="text-[11px] font-heading font-extrabold uppercase tracking-[0.2em] text-[#d0473e] block">
                Official Dail Packaging • {product.volume}
              </span>
              <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 leading-tight uppercase">
                {product.name}
              </h1>
              {product.urduName && (
                <p className="text-[#c59b27] font-serif text-base sm:text-lg italic">{product.urduName}</p>
              )}
              {/* Product Tagline */}
              {product.tagline && (
                <p className="text-stone-700 text-xs sm:text-sm font-semibold leading-relaxed border-l-2 border-[#d0473e] pl-3 py-1 bg-stone-50 rounded-r-xs mt-1">
                  {product.tagline}
                </p>
              )}
            </div>

            {/* Rating & Review Counter */}
            <div className="flex items-center gap-3">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-stone-900">{product.rating}</span>
              <span className="text-xs text-stone-500 font-medium">({product.reviewCount} verified Pakistani reviews)</span>
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="text-xs font-bold text-[#7b3e1d] hover:underline ml-auto flex items-center gap-1 cursor-pointer"
              >
                <MessageSquarePlus className="w-3.5 h-3.5" />
                <span>Write Review</span>
              </button>
            </div>

            {/* Pricing Section */}
            <div className="p-4 rounded-xs bg-white border border-[#e8e8e1] flex items-baseline justify-between shadow-xs">
              <div className="flex items-baseline gap-3">
                <span className="font-heading text-3xl font-extrabold text-[#d0473e]">
                  Rs. {currentPrice.toLocaleString()}
                </span>
                {currentOriginalPrice && (
                  <span className="text-base text-stone-400 line-through">
                    Rs. {currentOriginalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {currentOriginalPrice && (
                <span className="text-xs font-bold text-white bg-[#d0473e] px-2.5 py-1 rounded-xs uppercase tracking-wider">
                  Save Rs. {(currentOriginalPrice - currentPrice).toLocaleString()}
                </span>
              )}
            </div>

            {/* Estimated Delivery Calculator */}
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 text-stone-700">
                <Truck className="w-4 h-4 text-[#7b3e1d]" />
                <span>Estimate delivery to:</span>
                <select
                  value={calcCity}
                  onChange={(e) => setCalcCity(e.target.value)}
                  className="bg-white border border-stone-300 rounded-lg px-2 py-1 font-bold text-stone-900 cursor-pointer text-xs"
                >
                  {PAKISTAN_CITIES.slice(0, 10).map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <span className="text-emerald-700 font-bold">
                ✓ 2-3 Business Days (Express COD)
              </span>
            </div>

            {/* Quantity & CTA Buttons */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden bg-white shadow-xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-3 text-stone-600 hover:bg-stone-100 transition-colors text-sm font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-3 text-stone-900 text-sm font-bold min-w-10 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-3 text-stone-600 hover:bg-stone-100 transition-colors text-sm font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 btn-gp-primary py-4 px-4 sm:px-6 rounded-xl text-xs sm:text-sm font-heading font-extrabold tracking-[0.14em] flex items-center justify-center gap-2.5 shadow-md hover:shadow-xl transition-all cursor-pointer group/btn"
                >
                  <ShoppingBag className="w-4 h-4 group-hover/btn:-translate-y-0.5 group-hover/btn:rotate-6 transition-transform" />
                  <span>ADD TO CART • RS. {(currentPrice * quantity).toLocaleString()}</span>
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 hover:from-black hover:to-stone-900 text-white font-heading font-extrabold text-xs uppercase tracking-[0.16em] shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.99] transition-all cursor-pointer border border-stone-800"
              >
                BUY NOW (CASH ON DELIVERY)
              </button>

              <a
                href={getWhatsAppUrl(`As-salamu alaykum Dail Cosmetics!\n\nI want to order:\n• ${product.name} (${product.volume})\nQty: ${quantity} • Total: Rs. ${(currentPrice * quantity).toLocaleString()}\nCity: ${calcCity}\n\nPlease confirm delivery!`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20ba59] hover:to-[#0f7a6d] text-white text-xs font-heading font-extrabold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.99] cursor-pointer uppercase tracking-wider group/wa"
              >
                <Phone className="w-4 h-4 group-hover/wa:rotate-12 transition-transform" />
                <span>Instant Order via WhatsApp ({storeSettings.whatsappNumber})</span>
              </a>
            </div>

            {/* Added Toast */}
            {addedToast && (
              <div className="p-3 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl text-center border border-emerald-300 animate-in fade-in duration-200">
                ✓ Added {quantity}x {product.name} to your shopping bag!
              </div>
            )}

            {/* 3 Key Trust Badges directly under buttons */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-stone-200 text-center">
              <div className="p-2 bg-white rounded-lg border border-stone-200/80 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <span className="text-[10px] font-bold text-stone-800 block">0% Steroids</span>
                <span className="text-[9px] text-stone-500">Pure Organic</span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-stone-200/80 shadow-2xs">
                <Truck className="w-4 h-4 text-[#7b3e1d] mx-auto mb-1" />
                <span className="text-[10px] font-bold text-stone-800 block">Fast COD</span>
                <span className="text-[9px] text-stone-500">All Pakistan</span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-stone-200/80 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                <span className="text-[10px] font-bold text-stone-800 block">Original Sealed</span>
                <span className="text-[9px] text-stone-500">Tamper-Proof</span>
              </div>
            </div>

          </div>

        </div>

        {/* Dedicated Product Description & Specifications Section (Always Clear & Visible) */}
        <div className="pt-4 border-t border-stone-200 space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
            {/* Section Header with Tabs */}
            <div className="border-b border-stone-200 bg-stone-50/70 p-2 sm:p-3 flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-white text-stone-900 shadow-xs border border-stone-200'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Product Description & Overview
              </button>
              <button
                onClick={() => setActiveTab('benefits')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'benefits'
                    ? 'bg-white text-stone-900 shadow-xs border border-stone-200'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Key Benefits & Results
              </button>
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'ingredients'
                    ? 'bg-white text-stone-900 shadow-xs border border-stone-200'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Active Herbal Ingredients
              </button>
              <button
                onClick={() => setActiveTab('howToUse')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'howToUse'
                    ? 'bg-white text-stone-900 shadow-xs border border-stone-200'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                How To Apply
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-5 sm:p-8">
              {activeTab === 'overview' && (
                <div className="space-y-4 max-w-4xl">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#d0473e]" />
                    <h2 className="font-heading text-lg sm:text-xl font-extrabold text-stone-900 uppercase">
                      Detailed Formulation Overview
                    </h2>
                  </div>
                  <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-normal">
                    {product.description}
                  </p>
                  {product.fullIngredients && (
                    <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                      <strong className="text-stone-900 block mb-1">Official Certified Ingredients:</strong>
                      <span className="text-stone-600 leading-relaxed">{product.fullIngredients}</span>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'benefits' && (
                <div className="space-y-4 max-w-4xl">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <h2 className="font-heading text-lg sm:text-xl font-extrabold text-stone-900 uppercase">
                      Clinically Proven Results & Benefits
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {product.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200/80">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-stone-800 font-medium">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'ingredients' && (
                <div className="space-y-4 max-w-4xl">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#7b3e1d]" />
                    <h2 className="font-heading text-lg sm:text-xl font-extrabold text-stone-900 uppercase">
                      Active Herbal Actives & Clinical Purpose
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {product.keyIngredients.map((item, i) => (
                      <div key={i} className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                        <strong className="text-stone-900 text-xs sm:text-sm block">{item.name}</strong>
                        <p className="text-xs text-stone-600 mt-1 leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'howToUse' && (
                <div className="space-y-4 max-w-4xl">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#7b3e1d]" />
                    <h2 className="font-heading text-lg sm:text-xl font-extrabold text-stone-900 uppercase">
                      Recommended Application Ritual
                    </h2>
                  </div>
                  <div className="space-y-3 pt-2">
                    {product.howToUse.map((step, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-stone-50 border border-stone-200">
                        <span className="w-6 h-6 rounded-full bg-[#7b3e1d] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tamper-Proof 0% Steroid Seal Banner */}
            <div className="border-t border-stone-200 bg-amber-50/50 p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0" />
              <div className="text-center sm:text-left text-xs">
                <strong className="text-stone-900 block font-heading uppercase tracking-wide">
                  100% Original Dail Quality & 0% Steroids Certified Guarantee
                </strong>
                <span className="text-stone-600">
                  Every batch of Dail Cosmetics is factory sealed with our signature embossed gold lids. Strictly certified 0% betamethasone, 0% clobetasol, and 0% toxic mercury. Safe for lifelong daily use by Pakistani men and women.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section on PDP */}
        <div className="pt-12 border-t border-stone-200 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#c59b27]">Verified Feedback</span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-900">
                Customer Reviews ({reviews.length})
              </h3>
            </div>

            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-[#7b3e1d] hover:bg-[#622f14] text-white text-xs font-bold shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Leave a Review</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 6).map((rev) => (
              <div key={rev.id} className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400">{rev.date}</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed font-normal">
                  "{rev.comment}"
                </p>
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <strong className="text-stone-900">{rev.author} ({rev.city})</strong>
                  <span className="text-emerald-700 font-semibold text-[11px]">✓ Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Write a Review Modal */}
      {isReviewModalOpen && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsReviewModalOpen(false)}
        >
          <div className="min-h-full flex items-start sm:items-center justify-center p-2 sm:p-4 text-center">
            <div 
              className="w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl border border-stone-200 space-y-5 my-4 text-left animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-lg sm:text-xl font-bold uppercase text-stone-900">
                  Write a Verified Review
                </h3>
                <button
                  onClick={() => setIsReviewModalOpen(false)}
                  className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-700 font-bold mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maryam Siddiqui"
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 focus:outline-hidden focus:border-[#7b3e1d]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Your City in Pakistan *</label>
                <select
                  value={newReviewCity}
                  onChange={(e) => setNewReviewCity(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 focus:outline-hidden focus:border-[#7b3e1d] cursor-pointer"
                >
                  {PAKISTAN_CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Star Rating (1 to 5) *</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReviewRating(star)}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-6 h-6 ${star <= newReviewRating ? 'fill-current' : 'text-stone-300'}`} />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-stone-700 ml-2">{newReviewRating} Stars</span>
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Your Detailed Experience & Results *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about the scent, results after 2 weeks, packaging, etc..."
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 focus:outline-hidden focus:border-[#7b3e1d]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#7b3e1d] hover:bg-[#622f14] text-white font-bold text-sm shadow-xs transition-all cursor-pointer"
              >
                Submit Verified Review
              </button>
            </form>
          </div>
        </div>
      </div>
    )}

    </div>
  );
};
