import React, { useState } from 'react';
import type { HeroSlide, CategoryItem } from '../../types';
import { X, Sparkles, Upload, Image as ImageIcon, Link as LinkIcon, Check } from 'lucide-react';

interface BannerFormModalProps {
  initialData?: HeroSlide;
  categories: CategoryItem[];
  onClose: () => void;
  onSave: (slide: Omit<HeroSlide, 'id'>) => void;
}

export const BannerFormModal: React.FC<BannerFormModalProps> = ({
  initialData,
  categories,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [subtitle, setSubtitle] = useState(initialData?.subtitle || '');
  const [badge, setBadge] = useState(initialData?.badge || 'EXCLUSIVE ORGANIC OFFER');
  const [highlight, setHighlight] = useState(initialData?.highlight || 'Certified 100% Steroid Free');
  const [buttonText, setButtonText] = useState(initialData?.buttonText || 'SHOP NOW');
  const [secondaryButtonText, setSecondaryButtonText] = useState(initialData?.secondaryButtonText || 'VIEW DETAILS');
  const [targetCategory, setTargetCategory] = useState(initialData?.targetCategory || 'all');
  const [image, setImage] = useState(initialData?.image || '/images/dail_hero_banner_golden.jpg');

  const presetImages = [
    { label: '👑 Golden Pearl Hero Banner', src: '/images/dail_hero_banner_golden.jpg' },
    { label: '🌿 Full Botanical Range', src: '/images/dail_full_collection.jpg' },
    { label: '✨ Dail Beauty Cream (50g)', src: '/images/dail_beauty_cream_square.jpg' },
    { label: '🧴 Herbal Hair Oil (120ml)', src: '/images/dail_hair_oil_square.jpg' },
    { label: '💛 Hand & Foot Care', src: '/images/dail_hand_foot_square.jpg' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !image.trim()) return;

    onSave({
      title: title.trim(),
      subtitle: subtitle.trim(),
      badge: badge.trim(),
      highlight: highlight.trim(),
      buttonText: buttonText.trim(),
      secondaryButtonText: secondaryButtonText.trim(),
      targetCategory,
      image: image.trim(),
      bgGradient: initialData?.bgGradient || 'from-black/85 via-stone-950/70 to-transparent',
      accentColor: initialData?.accentColor || '#d0473e'
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl p-5 sm:p-8 max-w-2xl w-full max-h-[92vh] overflow-y-auto space-y-5 shadow-2xl">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div>
            <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-stone-900">
              {initialData ? 'Edit Hero Slider Banner' : 'Add New Hero Slider Banner'}
            </h3>
            <span className="text-xs text-stone-500">Live Homepage Carousel Slide</span>
          </div>
          <button onClick={onClose} className="p-1.5 text-stone-400 hover:text-stone-700 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Main Headline */}
          <div>
            <label className="font-bold text-stone-800 block mb-1">Main Banner Headline (Uppercase)</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. ORGANIC RADIANCE WITHOUT STEROIDS"
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-bold uppercase focus:outline-hidden focus:border-[#7b3e1d]"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="font-bold text-stone-800 block mb-1">Subtitle / Descriptive Narrative</label>
            <textarea
              rows={2}
              required
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g. Make your skin bright, soft, fresh, healthy & glowing without thinning or harmful mercury."
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#7b3e1d]"
            />
          </div>

          {/* Badge & Trust Highlight */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-stone-800 block mb-1">Top Pill Badge</label>
              <input
                type="text"
                required
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. EXPORT QUALITY 5-DAY BEAUTY PLAN"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl uppercase font-bold"
              />
            </div>

            <div>
              <label className="font-bold text-stone-800 block mb-1">Trust Highlight Pill</label>
              <input
                type="text"
                required
                value={highlight}
                onChange={(e) => setHighlight(e.target.value)}
                placeholder="e.g. Strictly 0% Clobetasol or Bleach"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-semibold"
              />
            </div>
          </div>

          {/* Button Texts & Target Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-stone-800 block mb-1">Primary CTA Button</label>
              <input
                type="text"
                required
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                placeholder="SHOP BEST SELLERS"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-bold"
              />
            </div>

            <div>
              <label className="font-bold text-stone-800 block mb-1">Secondary Button</label>
              <input
                type="text"
                required
                value={secondaryButtonText}
                onChange={(e) => setSecondaryButtonText(e.target.value)}
                placeholder="EXPLORE CREAM"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-bold"
              />
            </div>

            <div>
              <label className="font-bold text-stone-800 block mb-1">Target Category Link</label>
              <select
                value={targetCategory}
                onChange={(e) => setTargetCategory(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-medium"
              >
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.icon} {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Banner Image Selection & Upload */}
          <div className="space-y-2">
            <label className="font-bold text-stone-800 block">Banner Background Image (Select Preset, Upload from Device, or Enter URL)</label>
            
            {/* Presets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {presetImages.map((p, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setImage(p.src)}
                  className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                    image === p.src ? 'border-[#7b3e1d] bg-amber-50/60 font-bold' : 'border-stone-200 bg-stone-50'
                  }`}
                >
                  <img src={p.src} alt="" className="w-8 h-8 rounded-md object-cover shrink-0" />
                  <span className="text-[10px] line-clamp-1">{p.label}</span>
                </button>
              ))}
            </div>

            {/* Direct Device Upload & URL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <label className="flex items-center justify-center gap-2 px-3 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl cursor-pointer border border-stone-200 transition-colors">
                <Upload className="w-4 h-4 text-[#7b3e1d]" />
                <span>Upload Banner from Device</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        if (reader.result) {
                          setImage(reader.result as string);
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>

              <div className="relative">
                <input
                  type="text"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Or enter image URL (/images/banner.jpg)..."
                  className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl font-mono text-[11px]"
                />
              </div>
            </div>

            {/* Preview Banner Box */}
            {image && (
              <div className="relative h-28 sm:h-36 rounded-2xl overflow-hidden border border-stone-300 mt-2">
                <img src={image} alt="Banner Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent p-4 flex flex-col justify-end text-white">
                  <span className="text-[9px] font-bold tracking-widest text-[#c59b27] uppercase">{badge}</span>
                  <h4 className="font-heading text-sm sm:text-base font-extrabold uppercase leading-tight line-clamp-1">{title || 'BANNER TITLE'}</h4>
                  <p className="text-[10px] text-stone-200 line-clamp-1 mt-0.5">{subtitle}</p>
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-stone-100 text-stone-700 font-bold hover:bg-stone-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-[#7b3e1d] hover:bg-[#622f14] text-white font-bold cursor-pointer"
            >
              {initialData ? 'Save Banner Updates' : 'Publish Banner to Carousel'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
