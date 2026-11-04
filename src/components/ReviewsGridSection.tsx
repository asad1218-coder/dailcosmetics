import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquarePlus, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { PAKISTAN_CITIES } from '../data/products';

export const ReviewsGridSection: React.FC = () => {
  const { reviews, addReview } = useStore();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'oil' | 'cream'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [city, setCity] = useState('Lahore');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const filtered = reviews.filter((r) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'oil') return r.comment.toLowerCase().includes('oil') || r.comment.toLowerCase().includes('hair');
    if (selectedFilter === 'cream') return r.comment.toLowerCase().includes('cream') || r.comment.toLowerCase().includes('face') || r.comment.toLowerCase().includes('hand');
    return true;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;
    addReview({
      author,
      city,
      rating,
      verified: true,
      comment,
    });
    setIsModalOpen(false);
    setAuthor('');
    setComment('');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-6 mb-8 sm:mb-10">
        <div>
          <span className="text-[10px] sm:text-xs font-heading font-extrabold uppercase tracking-[0.25em] text-[#d0473e]">
            REAL RESULTS ACROSS PAKISTAN
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-stone-900 mt-1">
            Verified Customer Reviews
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm font-normal mt-1">
            Real Pakistani men & women who stopped using harmful steroid creams and switched to Dail.
          </p>
        </div>

        {/* Global Rating Score Box & Write Review Button */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3 p-3.5 rounded-xs bg-white border border-[#e8e8e1] shadow-2xs">
            <div className="text-center">
              <span className="font-heading text-2xl sm:text-3xl font-extrabold text-[#d0473e]">4.95</span>
              <div className="flex justify-center text-amber-400 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>
            <div className="pl-3 border-l border-stone-200 text-left text-xs">
              <strong className="text-stone-900 block font-heading font-bold uppercase">100% Export Quality</strong>
              <span className="text-emerald-700 font-semibold text-[11px]">Verified COD Purchases</span>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-gp-primary px-5 py-3 rounded-xs text-xs font-heading font-extrabold tracking-wider shadow-xs flex items-center gap-2 cursor-pointer transition-all"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>WRITE A REVIEW</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setSelectedFilter('all')}
          className={`px-4 py-2 rounded-full font-semibold transition-all cursor-pointer ${
            selectedFilter === 'all'
              ? 'bg-[#7b3e1d] text-white shadow-xs'
              : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
          }`}
        >
          All Reviews ({reviews.length})
        </button>
        <button
          onClick={() => setSelectedFilter('oil')}
          className={`px-4 py-2 rounded-full font-semibold transition-all cursor-pointer ${
            selectedFilter === 'oil'
              ? 'bg-[#7b3e1d] text-white shadow-xs'
              : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
          }`}
        >
          Hair Oil Reviews
        </button>
        <button
          onClick={() => setSelectedFilter('cream')}
          className={`px-4 py-2 rounded-full font-semibold transition-all cursor-pointer ${
            selectedFilter === 'cream'
              ? 'bg-[#7b3e1d] text-white shadow-xs'
              : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
          }`}
        >
          Beauty & Hand Creams
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
          >
            <div>
              {/* Stars & Date */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[11px] text-stone-400">{rev.date}</span>
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                "{rev.comment}"
              </p>
            </div>

            {/* Author info & Verified Buyer */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <div>
                <strong className="text-stone-900 block font-bold">{rev.author}</strong>
                <span className="text-stone-400 text-[11px]">{rev.city}</span>
              </div>

              {rev.verified && (
                <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle className="w-3 h-3" />
                  <span>Verified Buyer</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Submit Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-luxury text-xl font-bold text-stone-900">
                Share Your Dail Experience
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-700 font-bold mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zainab Malik"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 focus:outline-hidden focus:border-[#7b3e1d]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Your City in Pakistan *</label>
                <input
                  type="text"
                  required
                  list="grid-review-cities-list"
                  placeholder="Apna shehar likhein (e.g. Multan, Peshawar, Sukkur...)"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 focus:outline-hidden focus:border-[#7b3e1d]"
                />
                <datalist id="grid-review-cities-list">
                  {PAKISTAN_CITIES.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Rating *</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-6 h-6 ${star <= rating ? 'fill-current' : 'text-stone-300'}`} />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-stone-700 ml-2">{rating} Stars</span>
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Your Honest Review *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share details about your hair regrowth or glowing results with Dail..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 focus:outline-hidden focus:border-[#7b3e1d]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#7b3e1d] hover:bg-[#622f14] text-white font-bold text-sm shadow-xs transition-all cursor-pointer"
              >
                Publish Review
              </button>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
