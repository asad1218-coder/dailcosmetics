import React, { useState } from 'react';
import type { FaqItem } from '../../types';
import { X, HelpCircle } from 'lucide-react';

interface FaqFormModalProps {
  initialData?: FaqItem;
  onClose: () => void;
  onSave: (faq: Omit<FaqItem, 'id'>) => void;
}

export const FaqFormModal: React.FC<FaqFormModalProps> = ({
  initialData,
  onClose,
  onSave,
}) => {
  const [question, setQuestion] = useState(initialData?.question || '');
  const [urduQuestion, setUrduQuestion] = useState(initialData?.urduQuestion || '');
  const [answer, setAnswer] = useState(initialData?.answer || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;

    onSave({
      question: question.trim(),
      urduQuestion: urduQuestion.trim() || undefined,
      answer: answer.trim()
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl p-5 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-5 shadow-2xl">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div>
            <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-stone-900">
              {initialData ? 'Edit FAQ Item' : 'Add New FAQ Item'}
            </h3>
            <span className="text-xs text-stone-500">Live Customer Help & FAQ Section</span>
          </div>
          <button onClick={onClose} className="p-1.5 text-stone-400 hover:text-stone-700 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div>
            <label className="font-bold text-stone-800 block mb-1">Question (English / Roman Urdu)</label>
            <input
              type="text"
              required
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. Is Dail Beauty Cream suitable for sensitive skin?"
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-medium focus:outline-hidden focus:border-[#7b3e1d]"
            />
          </div>

          <div>
            <label className="font-bold text-stone-800 block mb-1">Urdu Question (Optional)</label>
            <input
              type="text"
              value={urduQuestion}
              onChange={(e) => setUrduQuestion(e.target.value)}
              placeholder="کیا ڈیل بیوٹی کریم حساس جلد کے لیے محفوظ ہے؟"
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden"
            />
          </div>

          <div>
            <label className="font-bold text-stone-800 block mb-1">Detailed Answer</label>
            <textarea
              rows={4}
              required
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Provide a clear, reassuring answer for your customers..."
              className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#7b3e1d] leading-relaxed"
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
              {initialData ? 'Save FAQ Updates' : 'Add FAQ to Storefront'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
