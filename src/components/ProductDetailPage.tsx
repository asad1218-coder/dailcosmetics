import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Dali3DCanvas } from './3d/Dali3DCanvas';
import { PRODUCTS, PAKISTAN_CITIES } from '../data/products';
import { ProductCard } from './ProductCard';
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
  const [selectedSize, setSelectedSize] = useState<'standard' | 'jumbo'>('standard');
  const [openAccordion, setOpenAccordion] = useState<'description' | 'benefits' | 'ingredients' | 'howToUse' | 'safety' | null>('description');
  const [addedToast, setAddedToast] = useState(false);
  const [calcCity, setCalcCity] = useState('Lahore');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewCity, setNewReviewCity] = useState('Lahore');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');

  const isFavorited = isInWishlist(product.id);
  const allImages = [product.image, ...product.galleryImages];
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  // Dynamic price calculation based on size variant
  const currentPrice = selectedSize === 'jumbo'
    ? Math.round(product.price * 1.85) // 15% discount for jumbo
    : product.price;

  const currentOriginalPrice = product.originalPrice
    ? (selectedSize === 'jumbo' ? Math.round(product.originalPrice * 2) : product.originalPrice)
    : undefined;

  const handleAddToCart = () => {
    addToCart(
      {
        ...product,
        price: currentPrice,
        volume: selectedSize === 'jumbo' ? (product.volume.includes('120') ? '240ml Jumbo Pack' : '100g Double Pack') : product.volume
      },
      quantity
    );
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

  const whatsappMessage = encodeURIComponent(
    `As-salamu alaykum Dail Cosmetics!\n\nI want to order:\n• ${product.name} (${selectedSize === 'jumbo' ? 'Jumbo Pack' : product.volume})\nQty: ${quantity} • Total: Rs. ${(currentPrice * quantity).toLocaleString()}\nCity: ${calcCity}\n\nPlease confirm delivery!`
  );

  return (
    <div className="w-full bg-[#fbf9f5] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentPage('shop')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-[#7b3e1d] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Formulations</span>
          </button>

          <span className="text-xs text-stone-400">
            Catalog / {product.category.toUpperCase()} / {product.name}
          </span>
        </div>

        {/* Product Showcase Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Interactive Visuals (Gallery + 3D Toggle) */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* View Mode Toggle Switcher */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200 text-xs">
                <button
                  onClick={() => setActiveViewMode('gallery')}
                  className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    activeViewMode === 'gallery'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Photo Gallery
                </button>
                <button
                  onClick={() => setActiveViewMode('3d')}
                  className={`px-3.5 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeViewMode === '3d'
                      ? 'bg-[#7b3e1d] text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>360° Real 3D Studio</span>
                </button>
              </div>

              <button
                onClick={() => toggleWishlist(product.id)}
                className="p-2.5 rounded-full bg-white border border-stone-200 text-stone-500 hover:text-rose-500 shadow-xs transition-colors cursor-pointer"
                title="Save to Wishlist"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            {/* Display Stage Container */}
            <div className="relative aspect-square w-full rounded-2xl sm:rounded-3xl bg-white sm:bg-gradient-to-b sm:from-[#fdfbf7] sm:via-[#f7f2ea] sm:to-[#eee4d6] border border-stone-200 shadow-sm overflow-hidden flex flex-col items-center justify-center p-2 sm:p-6 group">
              
              {/* Radial Spotlight Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.95)_0%,rgba(247,242,234,0.4)_65%,transparent_100%)] pointer-events-none" />

              {activeViewMode === 'gallery' ? (
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-2">
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className="w-full h-full object-contain max-h-[350px] sm:max-h-[460px] drop-shadow-[0_10px_20px_rgba(0,0,0,0.08)] group-hover:scale-104 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="relative z-10 w-full h-full bg-gradient-to-b from-[#fbf9f5] to-[#ece5d8] rounded-2xl overflow-hidden">
                  <Dali3DCanvas initialModel={product.modelType as any} className="w-full h-full" />
                </div>
              )}

              {/* Badges on Top Left */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10 pointer-events-none">
                {product.badge && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#7b3e1d] text-white uppercase tracking-wider shadow-xs">
                    {product.badge}
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-[#7b3e1d]">
                  {selectedSize === 'jumbo' ? (product.volume.includes('120') ? '240ml' : '100g') : product.volume}
                </span>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {activeViewMode === 'gallery' && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden bg-white border-2 p-1 transition-all shrink-0 cursor-pointer ${
                      selectedImage === img ? 'border-[#7b3e1d] shadow-xs' : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Buying Box & Specifications */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-2">
              <span className="text-[11px] font-heading font-extrabold uppercase tracking-[0.2em] text-[#d0473e] block">
                Official Dail Packaging • {product.volume}
              </span>
              <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 leading-tight uppercase">
                {product.name}
              </h1>
              {product.urduName && (
                <p className="text-[#c59b27] font-serif text-base sm:text-lg italic">{product.urduName}</p>
              )}
              {/* Product Tagline & Full Description */}
              {product.tagline && (
                <p className="text-stone-700 text-xs sm:text-sm font-semibold leading-relaxed border-l-2 border-[#d0473e] pl-3 py-0.5 bg-stone-50 rounded-r-xs">
                  {product.tagline}
                </p>
              )}
              {product.description && (
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-normal pt-1">
                  {product.description}
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

            {/* Urgent Stock Remaining Notice */}
            <div className="flex items-center justify-between text-xs bg-amber-50/70 p-3 rounded-xl border border-amber-200/80">
              <div className="flex items-center gap-2 text-stone-800 font-medium">
                <Clock className="w-4 h-4 text-[#7b3e1d] animate-pulse" />
                <span>Only <strong>7 units remaining</strong> in today's export batch!</span>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                Ready to Dispatch
              </span>
            </div>

            {/* Size / Volume Switcher */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-800 block">Select Package Size:</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedSize('standard')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedSize === 'standard'
                      ? 'border-[#7b3e1d] bg-amber-50/50 shadow-xs'
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  }`}
                >
                  <strong className="block text-xs font-bold text-stone-900">
                    {product.volume} Standard
                  </strong>
                  <span className="text-[11px] text-[#7b3e1d] font-bold">Rs. {product.price.toLocaleString()}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedSize('jumbo')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedSize === 'jumbo'
                      ? 'border-[#7b3e1d] bg-amber-50/50 shadow-xs'
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <strong className="block text-xs font-bold text-stone-900">
                      {product.volume.includes('120') ? '240ml Family Pack' : '100g Double Glow'}
                    </strong>
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-sm">Save 15%</span>
                  </div>
                  <span className="text-[11px] text-[#7b3e1d] font-bold">Rs. {Math.round(product.price * 1.85).toLocaleString()}</span>
                </button>
              </div>
            </div>

            {/* Estimated Delivery Calculator */}
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-stone-700">
                <Truck className="w-4 h-4 text-[#7b3e1d]" />
                <span>Estimate delivery to:</span>
                <select
                  value={calcCity}
                  onChange={(e) => setCalcCity(e.target.value)}
                  className="bg-white border border-stone-300 rounded-lg px-2 py-1 font-bold text-stone-900 cursor-pointer"
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
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden bg-white shadow-xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-3 text-stone-600 hover:bg-stone-100 transition-colors text-sm font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 py-3 text-stone-900 text-sm font-bold min-w-10 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-3 text-stone-600 hover:bg-stone-100 transition-colors text-sm font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 btn-gp-primary py-3.5 px-6 rounded-xs text-xs sm:text-sm font-heading font-extrabold tracking-[0.16em] flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO CART • RS. {(currentPrice * quantity).toLocaleString()}</span>
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 px-6 rounded-xs bg-stone-900 hover:bg-black text-white font-heading font-extrabold text-xs uppercase tracking-[0.16em] shadow-md transition-all cursor-pointer"
              >
                BUY NOW (CASH ON DELIVERY)
              </button>

              <a
                href={getWhatsAppUrl(`As-salamu alaykum Dail Cosmetics!\n\nI want to order:\n• ${product.name} (${selectedSize === 'jumbo' ? 'Jumbo Pack' : product.volume})\nQty: ${quantity} • Total: Rs. ${(currentPrice * quantity).toLocaleString()}\nCity: ${calcCity}\n\nPlease confirm delivery!`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xs bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer uppercase tracking-wider"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Instant Order via WhatsApp ({storeSettings.whatsappNumber})</span>
              </a>
            </div>

            {/* Added Toast */}
            {addedToast && (
              <div className="p-3 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl text-center border border-emerald-300 animate-in fade-in duration-200">
                ✓ Added {quantity}x {product.name} to your shopping bag!
              </div>
            )}

            {/* Accordion Specs */}
            <div className="pt-4 border-t border-stone-200 space-y-2.5">
              
              {/* 1. Full Product Description Accordion */}
              <div className="rounded-xl border border-stone-200 bg-white overflow-hidden shadow-2xs">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'description' ? null : 'description')}
                  className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-stone-900 hover:bg-stone-50 cursor-pointer"
                >
                  <span className="font-heading uppercase tracking-wider">Product Overview & Details</span>
                  {openAccordion === 'description' ? <ChevronUp className="w-4 h-4 text-[#d0473e]" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'description' && (
                  <div className="p-4 pt-2 text-xs text-stone-600 space-y-3 border-t border-stone-100 leading-relaxed">
                    <p>{product.description}</p>
                    {product.fullIngredients && (
                      <div className="p-2.5 bg-stone-50 rounded-xs border border-stone-200 text-[11px]">
                        <strong className="text-stone-800 block mb-1">Full Ingredients:</strong>
                        <span className="text-stone-600">{product.fullIngredients}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 2. Clinical Benefits Accordion */}
              <div className="rounded-xl border border-stone-200 bg-white overflow-hidden">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'benefits' ? null : 'benefits')}
                  className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-stone-900 hover:bg-stone-50 cursor-pointer"
                >
                  <span className="font-heading uppercase tracking-wider">Clinical Benefits & Results</span>
                  {openAccordion === 'benefits' ? <ChevronUp className="w-4 h-4 text-[#d0473e]" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'benefits' && (
                  <div className="p-4 pt-0 text-xs text-stone-600 space-y-2 border-t border-stone-100">
                    {product.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-stone-200 bg-white overflow-hidden">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'ingredients' ? null : 'ingredients')}
                  className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-stone-900 hover:bg-stone-50"
                >
                  <span>Active Herbal Ingredients</span>
                  {openAccordion === 'ingredients' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'ingredients' && (
                  <div className="p-4 pt-0 text-xs text-stone-600 space-y-2 border-t border-stone-100">
                    {product.keyIngredients.map((item, i) => (
                      <div key={i} className="p-2 bg-stone-50 rounded-lg">
                        <strong className="text-stone-900 block">{item.name}</strong>
                        <p className="text-[11px] text-stone-500 mt-0.5">{item.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-stone-200 bg-white overflow-hidden">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'howToUse' ? null : 'howToUse')}
                  className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-stone-900 hover:bg-stone-50"
                >
                  <span>How To Apply (Ritual Routine)</span>
                  {openAccordion === 'howToUse' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'howToUse' && (
                  <div className="p-4 pt-0 text-xs text-stone-600 space-y-2 border-t border-stone-100">
                    {product.howToUse.map((step, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-amber-100 text-[#7b3e1d] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-stone-200 bg-white overflow-hidden">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'safety' ? null : 'safety')}
                  className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-stone-900 hover:bg-stone-50"
                >
                  <span>0% Steroid & Tamper-Proof Seal Guarantee</span>
                  {openAccordion === 'safety' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'safety' && (
                  <div className="p-4 pt-0 text-xs text-stone-600 leading-relaxed border-t border-stone-100">
                    <p>
                      Every batch of Dail Cosmetics is factory sealed with our signature embossed gold lids. 
                      Strictly certified 0% betamethasone, 0% clobetasol, and 0% toxic mercury. Safe for lifelong daily use by Pakistani men and women.
                    </p>
                  </div>
                )}
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

        {/* Related Products Carousel */}
        <div className="pt-12 border-t border-stone-200 space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-[11px] font-heading font-extrabold uppercase tracking-widest text-[#d0473e]">RECOMMENDED FOR YOU</span>
              <h3 className="font-heading text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-stone-900 mt-1">
                More Formulations & Products
              </h3>
            </div>
            <button
              onClick={() => setCurrentPage('shop')}
              className="text-xs font-heading font-bold text-[#d0473e] hover:underline uppercase tracking-wider cursor-pointer"
            >
              View All Products →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </div>

      {/* Write a Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-luxury text-xl font-bold text-stone-900">
                Write a Verified Review
              </h3>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700"
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
      )}

    </div>
  );
};
