import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Phone } from 'lucide-react';
import { useStore } from '../store/useStore';

interface FAQItem {
  question: string;
  urduQuestion: string;
  answer: string;
}

export const FaqSection: React.FC = () => {
  const { storeSettings, getWhatsAppUrl, faqs: storeFaqs } = useStore();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = storeFaqs && storeFaqs.length > 0 ? storeFaqs : [
    {
      id: 'faq-1',
      question: 'Kya Dail Beauty Cream mein waqai koi steroid ya mercury nahi hai?',
      urduQuestion: 'کیا ڈیل بیوٹی کریم میں واقعی کوئی اسٹیرائیڈ یا کیمیکل نہیں ہے؟',
      answer: 'Bilkul nahi! Dail Beauty Cream aur Hand & Foot Cream 100% WITHOUT STEROID formulate ki gayi hain. Isme koi Clobetasol, Betamethasone ya Mercury shamil nahi hai jo skin ko patla kare ya dhoop mein laal kare. Yeh 100% safe, halal aur export quality botanical actives (Saffron, Niacinamide, Pure Vitamin E) par mabni hai.'
    },
    {
      id: 'faq-2',
      question: 'Dail Premium Herbal Hair Oil (120ml) se hair fall kitne din mein rukta hai?',
      urduQuestion: 'ڈیل ہربل ہیئر آئل سے بال گرنا کتنے دن میں بند ہوتے ہیں؟',
      answer: 'Hamare 14,000+ Pakistani customers ke verified feedback ke mutabiq, 10 se 14 din ke baqaeda istemal (haftay mein 3 baar massage) se severe hair fall 80% se 90% tak ruk jata hai. Cold-pressed Rosemary aur Kalonji (Black Seed) oil dormant roots ko stimulate karke baby hairs ki growth ko tezi se shuru karte hain.'
    },
    {
      id: 'faq-3',
      question: 'Delivery charges aur delivery time kya hai Pakistan mein?',
      urduQuestion: 'ڈلیوری کا وقت اور چارجز کیا ہیں؟',
      answer: 'Hum Trax Express aur TCS Logistics ke zariye poore Pakistan (Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Peshawar, Quetta aur tamam shehron) mein 2 se 4 working days mein doorstep delivery karte hain. Rs. 2,000 se zyada ke order par Free Delivery hai. Standard flat courier fee sirf Rs. 199 hai.'
    }
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Header */}
      <div className="text-center space-y-2 mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-[#d0473e] text-[11px] font-heading font-extrabold uppercase tracking-widest rounded-xs">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>CUSTOMER HELP & SUPPORT</span>
        </div>
        <h2 className="font-heading text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-stone-900">
          Frequently Asked Questions
        </h2>
        <p className="text-stone-500 text-xs sm:text-sm font-normal">
          Aapke aam sawalaat ke sachay aur wazeh jawabaat.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3.5">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="rounded-2xl bg-white border border-stone-200/90 shadow-xs overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-stone-50/50 transition-colors"
              >
                <div>
                  <h3 className="font-serif-luxury text-sm sm:text-base font-bold text-stone-900">
                    {faq.question}
                  </h3>
                  <span className="text-[11px] text-[#c59b27] font-medium block mt-0.5 font-serif italic">
                    {faq.urduQuestion}
                  </span>
                </div>

                <div className="p-1.5 rounded-full bg-stone-100 text-stone-600 shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom WhatsApp Support Prompt */}
      <div className="mt-10 p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-stone-900">Have a specific skin or hair question?</h4>
          <p className="text-xs text-stone-600">Our certified botanical herbalists are available on WhatsApp 24/7.</p>
        </div>
        <a
          href={getWhatsAppUrl('Hello Dail Cosmetics! I have a question regarding your products.')}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-[#25D366] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs hover:bg-[#20ba59] transition-colors cursor-pointer"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Ask on WhatsApp ({storeSettings.whatsappNumber})</span>
        </a>
      </div>

    </section>
  );
};
