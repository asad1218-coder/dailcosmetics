import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send } from 'lucide-react';
import { useStore } from '../store/useStore';

export const ContactPage: React.FC = () => {
  const { storeSettings, getWhatsAppUrl } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', concern: 'Hair Fall Consultation', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#fbf9f5] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#c59b27]">
            Direct Customer Helpline & Consultations
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-stone-900">
            We are Here to <span className="italic text-[#7b3e1d]">Help You</span>
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm font-normal">
            Have questions about our 100% organic hair oil, steroid-free cream, or tracking your order? Reach out anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Direct Helpline Info */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 space-y-6 shadow-xs">
              <h3 className="font-serif-luxury text-2xl font-bold text-stone-900">
                Official Helpline & Channels
              </h3>

              {/* WhatsApp Quick Connect */}
              <a
                href={getWhatsAppUrl('Hi Dail Cosmetics! I need a personalized organic consultation regarding my hair and skin.')}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-4 hover:bg-emerald-100/70 transition-all group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-[#25d366] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <strong className="text-stone-900 text-sm block font-bold">Official WhatsApp Helpline</strong>
                  <span className="text-emerald-800 text-xs font-mono font-bold">+92 {storeSettings.whatsappNumber.replace(/^0/, '')}</span>
                  <span className="text-[10px] text-stone-500 block mt-0.5">Instant replies 10 AM - 10 PM PKT</span>
                </div>
              </a>

              {/* Email & Hubs */}
              <div className="space-y-4 text-xs text-stone-600">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#d0473e] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block font-bold">Email Inquiries</strong>
                    <a href="mailto:dailcosmeticscht@gmail.com" className="text-[#d0473e] underline font-semibold">
                      dailcosmeticscht@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#d0473e] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block font-bold">Logistics & Dispatch Warehouses</strong>
                    <span>Karachi & Lahore Logistics Hubs, Pakistan</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#d0473e] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block font-bold">Operating Hours</strong>
                    <span>Monday to Saturday: 9:00 AM - 9:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Official Social Media Channels */}
              <div className="pt-4 border-t border-stone-100 space-y-2">
                <strong className="text-xs font-heading font-extrabold text-stone-900 uppercase tracking-wider block">
                  Official Social Channels:
                </strong>
                <div className="flex flex-col gap-2.5 text-xs">
                  {storeSettings.facebookUrl && (
                    <a 
                      href={storeSettings.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-bold flex items-center gap-2"
                    >
                      <span>📘 Facebook Official Page</span>
                    </a>
                  )}
                  {storeSettings.instagramUrl && (
                    <a 
                      href={storeSettings.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-600 hover:underline font-bold flex items-center gap-2"
                    >
                      <span>📸 Instagram @dailcosmetics</span>
                    </a>
                  )}
                  {(storeSettings.tiktokUrl1 || storeSettings.tiktokUrl) && (
                    <a 
                      href={storeSettings.tiktokUrl1 || storeSettings.tiktokUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-900 hover:underline font-bold flex items-center gap-2"
                    >
                      <span>🎵 TikTok Account 1</span>
                    </a>
                  )}
                  {storeSettings.tiktokUrl2 && (
                    <a 
                      href={storeSettings.tiktokUrl2}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-900 hover:underline font-bold flex items-center gap-2"
                    >
                      <span>🎵 TikTok Account 2</span>
                    </a>
                  )}
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-6">
              <h3 className="font-serif-luxury text-2xl font-bold text-stone-900">
                Send Us a Message
              </h3>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <div className="text-3xl">🌿</div>
                  <h4 className="font-serif-luxury text-lg font-bold text-emerald-900">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs text-stone-600">
                    Our botanical representative will call or WhatsApp you within 2 to 4 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sana Tariq"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 focus:outline-hidden focus:border-[#7b3e1d]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-bold mb-1">WhatsApp Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0300-1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 focus:outline-hidden focus:border-[#7b3e1d]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Select Consultation Subject</label>
                    <select
                      value={formData.concern}
                      onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 focus:outline-hidden focus:border-[#7b3e1d] cursor-pointer"
                    >
                      <option>Hair Fall & Scalp Thinning</option>
                      <option>Steroid-Free Beauty Cream Routine</option>
                      <option>Hand & Foot Knuckle Whitening</option>
                      <option>Bulk / Export Order Inquiry</option>
                      <option>Parcel Delivery Status</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Your Message or Query *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe your question or concern in detail..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 focus:outline-hidden focus:border-[#7b3e1d]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#7b3e1d] hover:bg-[#622f14] text-white font-bold text-sm shadow-sm transition-all cursor-pointer"
                  >
                    Send Message to Dail Experts
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
