import React, { useState } from 'react';
import type { CustomPage } from '../../types';
import { X, FileText, CheckCircle, Globe, Shield } from 'lucide-react';

interface CustomPageFormModalProps {
  initialData?: CustomPage;
  onClose: () => void;
  onSave: (page: Omit<CustomPage, 'id' | 'updatedAt'>) => void;
}

export const CustomPageFormModal: React.FC<CustomPageFormModalProps> = ({
  initialData,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [showInFooter, setShowInFooter] = useState(initialData?.showInFooter ?? true);
  const [showInNav, setShowInNav] = useState(initialData?.showInNav ?? false);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!initialData) {
      // Auto-generate slug from title
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(generatedSlug);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) return;

    onSave({
      title: title.trim(),
      slug: slug.trim().toLowerCase(),
      content: content.trim() || 'Content coming soon.',
      showInFooter,
      showInNav
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl p-5 sm:p-8 max-w-2xl w-full max-h-[92vh] overflow-y-auto space-y-5 shadow-2xl">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div>
            <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-stone-900">
              {initialData ? 'Edit Store Custom Page' : 'Create New Custom Page'}
            </h3>
            <span className="text-xs text-stone-500">Live Web Page Content & Policies</span>
          </div>
          <button onClick={onClose} className="p-1.5 text-stone-400 hover:text-stone-700 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Title & Slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-stone-800 block mb-1">Page Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. 7-Day Exchange & Refund Policy"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-bold focus:outline-hidden focus:border-[#7b3e1d]"
              />
            </div>

            <div>
              <label className="font-bold text-stone-800 block mb-1">URL Identifier / Slug</label>
              <div className="flex items-center bg-stone-50 border border-stone-200 rounded-xl px-3 py-2">
                <span className="text-stone-400 font-mono">/page/</span>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="exchange-policy"
                  className="w-full bg-transparent font-mono font-bold focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Visibility Toggles */}
          <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex items-center gap-2 cursor-pointer font-medium text-stone-800">
              <input
                type="checkbox"
                checked={showInFooter}
                onChange={(e) => setShowInFooter(e.target.checked)}
                className="w-4 h-4 text-[#7b3e1d] rounded-sm cursor-pointer"
              />
              <span>Show Link in Website Footer</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-medium text-stone-800">
              <input
                type="checkbox"
                checked={showInNav}
                onChange={(e) => setShowInNav(e.target.checked)}
                className="w-4 h-4 text-[#7b3e1d] rounded-sm cursor-pointer"
              />
              <span>Show in Top Header Navigation Bar</span>
            </label>
          </div>

          {/* Page Content Body */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-stone-800">Page Content (Markdown & Paragraphs)</label>
              <span className="text-[10px] text-stone-400">Use ### for headings, - for bullet points</span>
            </div>
            <textarea
              rows={10}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`### Section Heading\n\nEnter the full details and terms of this page here...\n\n- Point 1: Certified 100% genuine formulation\n- Point 2: Free nationwide shipping\n\nContact support on WhatsApp for further assistance.`}
              className="w-full px-3.5 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#7b3e1d] font-sans text-xs leading-relaxed"
            />
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
              {initialData ? 'Save Page Changes' : 'Publish New Page to Storefront'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
