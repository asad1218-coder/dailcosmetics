import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Sparkles, Truck, Star } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export const HeroSection: React.FC = () => {
  const { setCurrentPage, setSelectedCategory, setSelectedProduct, heroSlides } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = heroSlides && heroSlides.length > 0 ? heroSlides : [
    {
      id: 'default-1',
      badge: 'EXPORT QUALITY 5-DAY BEAUTY PLAN',
      title: 'ORGANIC RADIANCE WITHOUT STEROIDS',
      subtitle: 'Make your skin bright, soft, fresh, healthy & glowing without thinning or harmful mercury.',
      highlight: 'Strictly 0% Clobetasol or Bleach',
      buttonText: 'SHOP BEST SELLERS',
      secondaryButtonText: 'EXPLORE BEAUTY CREAM',
      targetCategory: 'cream',
      productIndex: 1,
      image: '/images/dail_hero_banner_golden.jpg',
      bgGradient: 'from-black/85 via-stone-950/70 to-transparent',
      accentColor: '#d0473e'
    }
  ];

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const slideIndex = currentSlide >= slides.length ? 0 : currentSlide;
  const slide = slides[slideIndex];

  const handlePrimaryAction = () => {
    setSelectedCategory(slide.targetCategory);
    setCurrentPage('shop');
  };

  const handleSecondaryAction = () => {
    const prod = (typeof slide.productIndex === 'number' && PRODUCTS[slide.productIndex])
      ? PRODUCTS[slide.productIndex]
      : PRODUCTS[0];
    setSelectedProduct(prod);
    setCurrentPage('product-detail');
  };

  return (
    <section className="relative w-full overflow-hidden bg-stone-950">
      
      {/* Slide Container */}
      <div className="relative min-h-[480px] sm:min-h-[560px] lg:min-h-[640px] flex items-center">
        
        {/* Background Image with Layered Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={slide.image} 
            alt={slide.title} 
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Gradient Overlay for high-end readability */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient}`} />
          <div className="absolute inset-0 bg-black/35" />
        </div>

        {/* Content Area */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-24 w-full">
          <div className="max-w-2xl text-white space-y-4 sm:space-y-6">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur-md border border-white/25 rounded-xs text-[11px] sm:text-xs font-heading font-extrabold tracking-[0.2em] uppercase text-white shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>{slide.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold uppercase tracking-tight text-white leading-[1.08]">
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-stone-200 text-xs sm:text-base lg:text-lg font-normal leading-relaxed max-w-xl">
              {slide.subtitle}
            </p>

            {/* Highlight Trust Micro-Point */}
            <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-amber-200 tracking-wide">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                {slide.highlight}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-amber-300" />
                Cash on Delivery Available
              </span>
            </div>

            {/* CTA Buttons (Golden Pearl Angled Buttons with Shine Effect) */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={handlePrimaryAction}
                className="btn-gp-primary px-7 sm:px-9 py-4 sm:py-4.5 text-xs sm:text-sm font-extrabold tracking-[0.18em] shadow-xl hover:shadow-2xl flex items-center gap-2.5 group cursor-pointer rounded-xl hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <span>{slide.buttonText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
              </button>

              <button
                onClick={handleSecondaryAction}
                className="px-6 sm:px-8 py-3.5 sm:py-4 bg-white/10 hover:bg-white text-white hover:text-stone-900 border border-white/40 hover:border-white font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.14em] rounded-xl backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
              >
                {slide.secondaryButtonText}
              </button>
            </div>

          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-black/40 hover:bg-[#d0473e] text-white rounded-full flex items-center justify-center backdrop-blur-xs transition-all duration-300 hover:scale-110 active:scale-90 cursor-pointer border border-white/20 shadow-lg"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-black/40 hover:bg-[#d0473e] text-white rounded-full flex items-center justify-center backdrop-blur-xs transition-all duration-300 hover:scale-110 active:scale-90 cursor-pointer border border-white/20 shadow-lg"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Carousel Dots */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-2.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 sm:h-2.5 rounded-full transition-all cursor-pointer ${
                currentSlide === idx 
                  ? 'w-7 sm:w-8 bg-[#d0473e]' 
                  : 'w-2 sm:w-2.5 bg-white/50 hover:bg-white'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>

    </section>
  );
};
