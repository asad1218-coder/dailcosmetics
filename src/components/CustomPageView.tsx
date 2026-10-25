import React from 'react';
import { useStore } from '../store/useStore';
import { ArrowLeft, Clock, ShieldCheck, Phone, CheckCircle, FileText } from 'lucide-react';

export const CustomPageView: React.FC = () => {
  const { customPages, activeCustomPageSlug, setCurrentPage, navigateToCustomPage, getWhatsAppUrl, storeSettings } = useStore();

  const page = customPages.find((p) => p.slug === activeCustomPageSlug) || customPages[0];

  if (!page) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-heading font-extrabold text-stone-900">PAGE NOT FOUND</h2>
        <p className="text-stone-500 text-sm">The requested page could not be located or has been archived.</p>
        <button
          onClick={() => setCurrentPage('home')}
          className="btn-gp-primary px-6 py-3 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Homepage
        </button>
      </div>
    );
  }

  // Parse lines to render paragraphs or markdown subheadings gracefully
  const renderFormattedContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) {
        return <div key={idx} className="h-3" />;
      }
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className="font-heading text-lg sm:text-xl font-extrabold uppercase tracking-tight text-stone-900 mt-6 mb-2">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} className="font-heading text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-stone-900 mt-8 mb-3">
            {trimmed.replace('## ', '')}
          </h2>
        );
      }
      if (trimmed.startsWith('- ')) {
        return (
          <li key={idx} className="ml-5 list-disc text-stone-700 leading-relaxed my-1 pl-1">
            {trimmed.replace('- ', '')}
          </li>
        );
      }
      return (
        <p key={idx} className="text-stone-700 leading-relaxed my-2 text-sm sm:text-base">
          {trimmed}
        </p>
      );
    });
  };

  const otherPages = customPages.filter((p) => p.id !== page.id);

  return (
    <div className="bg-[#fcfbf9] min-h-[70vh] py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-6 font-medium">
          <button onClick={() => setCurrentPage('home')} className="hover:text-[#d0473e] cursor-pointer">
            Home
          </button>
          <span>/</span>
          <span className="text-stone-400">Policies & Information</span>
          <span>/</span>
          <span className="text-stone-900 font-bold truncate">{page.title}</span>
        </div>

        {/* Main Document Card */}
        <div className="bg-white rounded-2xl border border-stone-200/90 shadow-xs p-6 sm:p-10 lg:p-12 space-y-6">
          
          {/* Header */}
          <div className="border-b border-stone-200 pb-6 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-[#c59b27] border border-amber-200/60 rounded-xs text-[11px] font-heading font-extrabold uppercase tracking-widest">
              <FileText className="w-3.5 h-3.5" />
              <span>OFFICIAL STORE DOCUMENT</span>
            </div>

            <h1 className="font-heading text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-stone-900 leading-tight">
              {page.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 pt-1">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                Updated: {page.updatedAt || 'Recent'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Dail Cosmetics Official Policy
              </span>
            </div>
          </div>

          {/* Body Content */}
          <div className="prose prose-stone max-w-none text-stone-700 font-sans">
            {renderFormattedContent(page.content)}
          </div>

          {/* Guarantee Box */}
          <div className="mt-8 p-5 bg-stone-50 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" /> Have questions regarding this policy?
              </h4>
              <p className="text-xs text-stone-500">
                Our support team is active 7 days a week on WhatsApp helpline ({storeSettings.whatsappNumber}).
              </p>
            </div>
            <a
              href={getWhatsAppUrl(`Inquiry regarding policy: ${page.title}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xs flex items-center gap-2 shrink-0 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" /> Ask on WhatsApp
            </a>
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => setCurrentPage('home')}
              className="text-xs font-bold text-stone-600 hover:text-[#d0473e] flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
            </button>

            <button
              onClick={() => setCurrentPage('shop')}
              className="btn-gp-primary px-6 py-2.5 text-xs font-heading font-bold uppercase tracking-widest cursor-pointer"
            >
              Shop All Products
            </button>
          </div>

        </div>

        {/* Other Published Pages */}
        {otherPages.length > 0 && (
          <div className="mt-10 space-y-3">
            <h3 className="font-heading text-xs font-extrabold uppercase tracking-widest text-stone-500 px-1">
              OTHER POLICIES & PAGES
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {otherPages.map((op) => (
                <button
                  key={op.id}
                  onClick={() => navigateToCustomPage(op.slug)}
                  className="p-4 bg-white rounded-xl border border-stone-200 hover:border-[#c59b27] text-left transition-all group cursor-pointer shadow-2xs"
                >
                  <span className="text-xs font-bold text-stone-800 group-hover:text-[#d0473e] block line-clamp-1">
                    {op.title}
                  </span>
                  <span className="text-[10px] text-stone-400 mt-1 block">
                    Read Document →
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
