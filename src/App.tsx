import React from 'react';
import { useStore } from './store/useStore';
import { Navbar } from './components/Navbar';
import { TrustPillarsBar } from './components/TrustPillarsBar';
import { CatalogPage } from './components/CatalogPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CheckoutPage } from './components/CheckoutPage';
import { OrderTrackingPage } from './components/OrderTrackingPage';
import { WishlistPage } from './components/WishlistPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { CustomPageView } from './components/CustomPageView';
import { AdminPortal } from './components/AdminPortal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { ReviewsMarquee } from './components/ReviewsMarquee';
import { SteroidComparisonSection } from './components/SteroidComparisonSection';
import { ReviewsGridSection } from './components/ReviewsGridSection';
import { FaqSection } from './components/FaqSection';

export function App() {
  const { currentPage, setCurrentPage } = useStore();

  React.useEffect(() => {
    const handleUrlRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (path === '/admin' || path.startsWith('/admin') || hash === '#admin' || search.includes('admin')) {
        setCurrentPage('admin');
      }
    };
    handleUrlRoute();
    window.addEventListener('popstate', handleUrlRoute);
    window.addEventListener('hashchange', handleUrlRoute);
    return () => {
      window.removeEventListener('popstate', handleUrlRoute);
      window.removeEventListener('hashchange', handleUrlRoute);
    };
  }, [setCurrentPage]);

  // If Admin Portal is active, render the dedicated private workspace directly
  if (currentPage === 'admin') {
    return <AdminPortal />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView />;
      case 'shop':
        return <CatalogPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'track-order':
        return <OrderTrackingPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'custom-page':
        return <CustomPageView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col font-sans selection:bg-[#d0473e] selection:text-white antialiased">
      {/* 1. Global Golden Pearl Style Header & Announcement Bar */}
      <Navbar />

      {/* 2. Main Page Content */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* 3. Global Slide-Over Cart Drawer */}
      <CartDrawer />

      {/* 4. Global Search Modal */}
      <SearchModal />

      {/* 5. Global Quick View Modal */}
      <QuickViewModal />

      {/* 6. Floating 24/7 WhatsApp Ordering Button */}
      <WhatsAppFloatingButton />

      {/* 7. Golden Pearl Impulse Style Footer */}
      <Footer />
    </div>
  );
}

export default App;

/**
 * Home View: Direct Catalog Products Layout (Navbar ke foran baad products, without hero, split banners & videos)
 */
const HomeView: React.FC = () => {
  return (
    <div className="space-y-0">
      
      {/* 1. All Products Catalog Grid directly below Navbar */}
      <CatalogPage />

      {/* 2. Golden Pearl Trust Pillars & Guarantees (Free Delivery, COD, 0% Steroids, Helpline) */}
      <TrustPillarsBar />

      {/* 3. Medical Truth: "Why Without Steroids?" Trust Comparison */}
      <SteroidComparisonSection />

      {/* 4. Verified Customer Reviews Infinite Marquee */}
      <ReviewsMarquee />

      {/* 5. Customer Reviews Grid & Interactive Submission */}
      <ReviewsGridSection />

      {/* 6. Customer FAQ Accordion */}
      <FaqSection />

    </div>
  );
};
