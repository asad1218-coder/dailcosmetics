import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import type { Product, OrderDetails, CategoryItem, HeroSlide, CustomPage, FaqItem } from '../types';
import { BannerFormModal } from './admin/BannerFormModal';
import { CustomPageFormModal } from './admin/CustomPageFormModal';
import { FaqFormModal } from './admin/FaqFormModal';
import {
  Package,
  ShoppingBag,
  Star,
  Settings,
  Truck,
  CheckCircle2,
  Clock,
  ArrowLeft,
  TrendingUp,
  Plus,
  Trash2,
  Edit,
  Search,
  ExternalLink,
  Printer,
  RotateCcw,
  Check,
  X,
  Phone,
  AlertCircle,
  Eye,
  EyeOff,
  Filter,
  DollarSign,
  Tag,
  Layers,
  Sparkles,
  ShieldCheck,
  MessageCircle,
  Lock,
  Unlock,
  KeyRound,
  LogOut,
  Image as ImageIcon,
  Sliders,
  FileText,
  HelpCircle
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductStock,
    resetProductsToDefault,
    categories,
    addCategory,
    deleteCategory,
    concerns,
    addConcern,
    deleteConcern,
    orders,
    updateOrderStatus,
    deleteOrder,
    reviews,
    addReview,
    deleteReview,
    coupons,
    addCoupon,
    deleteCoupon,
    toggleCouponStatus,
    heroSlides,
    addHeroSlide,
    updateHeroSlide,
    deleteHeroSlide,
    resetHeroSlidesToDefault,
    customPages,
    addCustomPage,
    updateCustomPage,
    deleteCustomPage,
    navigateToCustomPage,
    faqs,
    addFaq,
    updateFaq,
    deleteFaq,
    storeSettings,
    updateStoreSettings,
    setCurrentPage,
    setSelectedProduct,
    getWhatsAppUrl
  } = useStore();

  // Authentication State (Password Protected)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return (
      sessionStorage.getItem('dail_admin_auth') === 'true' ||
      localStorage.getItem('dail_admin_remember') === 'true'
    );
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<'products' | 'banners' | 'pages' | 'categories' | 'orders' | 'reviews' | 'coupons' | 'settings'>('products');

  // Banner Modals State
  const [isAddBannerModalOpen, setIsAddBannerModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<HeroSlide | null>(null);

  // Custom Page Modals State
  const [isAddPageModalOpen, setIsAddPageModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<CustomPage | null>(null);

  // FAQ Modals State
  const [isAddFaqModalOpen, setIsAddFaqModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  
  // Product Search & Filter
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');

  // Product Modals
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Category & Concern Modals
  const [newCatName, setNewCatName] = useState('');
  const [newCatSlug, setNewCatSlug] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('✨');
  const [newConcernInput, setNewConcernInput] = useState('');

  // Coupon State
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState<number>(10);
  const [newCouponMinOrder, setNewCouponMinOrder] = useState<number>(0);

  // Order Filter & Invoice Modal
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [inspectingOrder, setInspectingOrder] = useState<OrderDetails | null>(null);
  const [editingTrackingOrder, setEditingTrackingOrder] = useState<OrderDetails | null>(null);
  const [newCourier, setNewCourier] = useState('Trax Express');
  const [newTracking, setNewTracking] = useState('');

  // Reviews Modal
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewCity, setNewReviewCity] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');

  // Settings State Form
  const [settingsForm, setSettingsForm] = useState(storeSettings);
  const [showAdminKeyInSettings, setShowAdminKeyInSettings] = useState(false);
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);

  // Calculations for KPI Cards
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrdersCount = orders.filter((o) => o.status === 'confirmed' || o.status === 'processing').length;
  const inStockCount = products.filter((p) => p.inStock).length;

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchCat = productCategoryFilter === 'all' || p.category === productCategoryFilter;
    const matchSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) || 
      p.tagline.toLowerCase().includes(productSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter === 'all') return true;
    return o.status === orderStatusFilter;
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = passwordInput.trim();
    const correctPassword = storeSettings.adminPassword || 'dail@2026';

    // Verify against configured password or master recovery keys (dail@2026 / dail786)
    if (
      cleanInput === correctPassword ||
      cleanInput.toLowerCase() === 'dail@2026' ||
      cleanInput.toLowerCase() === 'dail786'
    ) {
      setIsAuthenticated(true);
      sessionStorage.setItem('dail_admin_auth', 'true');
      if (rememberMe) {
        localStorage.setItem('dail_admin_remember', 'true');
      }
      setAuthError('');
    } else {
      setAuthError('Ghalat password! Baraye meherbani durust Admin Key darj karein.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('dail_admin_auth');
    localStorage.removeItem('dail_admin_remember');
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  const handleReturnToStore = () => {
    window.history.pushState(null, '', '/');
    setCurrentPage('home');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreSettings(settingsForm);
    setSettingsSavedToast(true);
    setTimeout(() => setSettingsSavedToast(false), 2500);
  };

  const handleUpdateTracking = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTrackingOrder) {
      updateOrderStatus(editingTrackingOrder.orderId, editingTrackingOrder.status, newCourier, newTracking);
      setEditingTrackingOrder(null);
    }
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    const slug = newCatSlug.trim() || newCatName.toLowerCase().replace(/\s+/g, '-');
    addCategory({
      name: newCatName.trim(),
      slug,
      icon: newCatIcon.trim() || '🌿',
      description: `${newCatName} collection by Dail Cosmetics`,
    });
    setNewCatName('');
    setNewCatSlug('');
    alert(`Category "${newCatName}" added successfully!`);
  };

  const handleAddConcern = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConcernInput.trim()) return;
    addConcern(newConcernInput.trim());
    setNewConcernInput('');
  };

  const handleAddCustomReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;
    addReview({
      author: newReviewAuthor.trim(),
      city: newReviewCity.trim() || 'Pakistan',
      rating: newReviewRating,
      verified: true,
      comment: newReviewComment.trim(),
    });
    setNewReviewAuthor('');
    setNewReviewCity('');
    setNewReviewComment('');
    alert('Verified review published to live storefront!');
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    addCoupon({
      code: newCouponCode.trim(),
      discountPercentage: Number(newCouponDiscount),
      minOrderAmount: Number(newCouponMinOrder) || 0,
      isActive: true,
    });
    setNewCouponCode('');
    setNewCouponDiscount(10);
    setNewCouponMinOrder(0);
    alert(`Discount Coupon "${newCouponCode.trim().toUpperCase()}" created and active!`);
  };

  // =========================================================================
  // 1. PRIVATE PASSWORD LOGIN GATE (Restricted Access)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-radial from-[#241711] via-[#15100c] to-[#0c0806] flex items-center justify-center p-4 text-stone-100 font-sans selection:bg-[#c59b27] selection:text-black">
        <div className="w-full max-w-md bg-stone-900/90 backdrop-blur-xl border border-amber-900/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
          
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-60 h-60 bg-[#7b3e1d]/20 rounded-full blur-3xl pointer-events-none" />

          {/* Dail Cosmetics Brand Header */}
          <div className="text-center space-y-3 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#fbf8f3] to-[#e6d8c3] border border-amber-300/40 p-2 mx-auto flex items-center justify-center shadow-lg">
              <img src="/images/dail_logo.png" alt="Dail Logo" className="w-full h-full object-contain" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-bold uppercase tracking-widest mb-1">
                <Lock className="w-3 h-3" />
                <span>Restricted Store Admin Portal</span>
              </div>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Dail Cosmetics Pakistan
              </h2>
              <p className="text-stone-400 text-xs mt-1">
                Authorized Personnel Only • Enter your secret owner key to unlock catalog and order controls.
              </p>
            </div>
          </div>

          {/* Error Banner */}
          {authError && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {/* Password Form */}
          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-300 flex items-center justify-between">
                <span>Admin Secret Key</span>
                <span className="text-[10px] text-stone-500">Default: dail@2026</span>
              </label>

              <div className="relative">
                <KeyRound className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (authError) setAuthError('');
                  }}
                  placeholder="Enter admin password..."
                  className="w-full pl-10 pr-10 py-3 bg-stone-950/80 border border-stone-800 rounded-xl text-sm font-mono text-white placeholder-stone-600 focus:outline-hidden focus:border-[#c59b27] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 p-1 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-stone-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded-sm bg-stone-950 border-stone-800 text-[#7b3e1d] focus:ring-0 cursor-pointer"
                />
                <span>Remember on this device (30 Days)</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#7b3e1d] to-[#9a4f25] hover:from-[#622f14] hover:to-[#7b3e1d] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-amber-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Unlock className="w-4 h-4 text-amber-300" />
              <span>Unlock Admin Dashboard</span>
            </button>
          </form>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs relative z-10">
            <button
              onClick={handleReturnToStore}
              className="text-stone-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Storefront</span>
            </button>

            <a
              href={getWhatsAppUrl('As-salamu alaykum! I need password assistance for Dail Cosmetics Admin Portal.')}
              target="_blank"
              rel="noreferrer"
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Help via WhatsApp</span>
            </a>
          </div>

        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. AUTHENTICATED ADMIN DASHBOARD
  // =========================================================================
  return (
    <div className="w-full bg-[#fbf9f5] min-h-screen py-6 sm:py-10 text-stone-900">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Top Operational Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-6 bg-white rounded-3xl border border-stone-200 shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#7b3e1d] text-white uppercase tracking-wider">
                Dail Cosmetics • Central Store Operations & Full Customizer
              </span>
              <span className="text-xs text-stone-500 font-medium">Official Store Manager</span>
            </div>
            <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-900">
              Master Store Dashboard & Control Center
            </h1>
            <p className="text-xs text-stone-500">
              Full control over products, multi-image galleries, hero carousel banners, custom pages, categories, live texts, and order fulfillment.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to restore default factory formulations and settings?')) {
                  resetProductsToDefault();
                  alert('Store reset to official default formulations.');
                }
              }}
              className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Reset default formulations"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#7b3e1d]" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>

            <button
              onClick={handleReturnToStore}
              className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Live Store</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-rose-200"
              title="Lock Admin and Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lock & Logout</span>
            </button>
          </div>
        </div>

        {/* 4 Real-Time Operational KPI Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
          <div className="p-4 sm:p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-stone-500 text-xs">
              <span>Gross Store Revenue</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="text-xl sm:text-3xl font-bold text-[#7b3e1d]">
              Rs. {totalRevenue.toLocaleString()}
            </h3>
            <span className="text-[10px] sm:text-xs text-emerald-700 font-semibold block">
              COD & Prepaid Transactions
            </span>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-stone-500 text-xs">
              <span>Orders to Dispatch</span>
              <Truck className="w-4 h-4 text-[#c59b27]" />
            </div>
            <h3 className="text-xl sm:text-3xl font-bold text-stone-900">
              {pendingOrdersCount} Pending
            </h3>
            <span className="text-[10px] sm:text-xs text-stone-500 block">
              Awaiting Courier Handover
            </span>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-stone-500 text-xs">
              <span>Active Products</span>
              <Package className="w-4 h-4 text-stone-600" />
            </div>
            <h3 className="text-xl sm:text-3xl font-bold text-stone-900">
              {products.length} SKUs
            </h3>
            <span className="text-[10px] sm:text-xs text-emerald-600 font-semibold block">
              {inStockCount} In Stock ({products.length - inStockCount} Sold Out)
            </span>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-stone-500 text-xs">
              <span>Active WhatsApp</span>
              <MessageCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="text-base sm:text-xl font-bold font-mono text-emerald-800">
              {storeSettings.whatsappNumber}
            </h3>
            <span className="text-[10px] sm:text-xs text-stone-500 block">
              Instant 1-Click Helpline
            </span>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 border-b border-stone-200 text-xs font-bold">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer transition-all ${
              activeTab === 'products'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'
            }`}
          >
            <Package className="w-4 h-4 text-[#c59b27]" />
            <span>Products ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('banners')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer transition-all ${
              activeTab === 'banners'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-[#c59b27]" />
            <span>Hero Banners ({heroSlides.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('pages')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer transition-all ${
              activeTab === 'pages'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'
            }`}
          >
            <FileText className="w-4 h-4 text-[#c59b27]" />
            <span>Custom Pages ({customPages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer transition-all ${
              activeTab === 'categories'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'
            }`}
          >
            <Layers className="w-4 h-4 text-[#c59b27]" />
            <span>Categories & Concerns</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer transition-all ${
              activeTab === 'orders'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'
            }`}
          >
            <Truck className="w-4 h-4 text-[#c59b27]" />
            <span>Orders & Dispatch ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer transition-all ${
              activeTab === 'reviews'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'
            }`}
          >
            <Star className="w-4 h-4 text-[#c59b27]" />
            <span>Customer Reviews ({reviews.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('coupons')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer transition-all ${
              activeTab === 'coupons'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'
            }`}
          >
            <Tag className="w-4 h-4 text-[#c59b27]" />
            <span>Coupons & Discounts ({coupons.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer transition-all ${
              activeTab === 'settings'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'
            }`}
          >
            <Settings className="w-4 h-4 text-[#c59b27]" />
            <span>Settings & Site Content</span>
          </button>
        </div>

        {/* =========================================================================
            TAB 1: PRODUCTS MANAGEMENT
        ========================================================================= */}
        {activeTab === 'products' && (
          <div className="space-y-5">
            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-stone-200/90 shadow-xs">
              <div className="flex flex-wrap items-center gap-2 flex-1">
                {/* Search */}
                <div className="relative min-w-[200px] flex-1">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search by product name..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#7b3e1d]"
                  />
                </div>

                {/* Category filter */}
                <select
                  value={productCategoryFilter}
                  onChange={(e) => setProductCategoryFilter(e.target.value)}
                  className="px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#7b3e1d] font-medium"
                >
                  <option value="all">All Categories</option>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setIsAddProductModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-[#7b3e1d] hover:bg-[#622f14] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-stone-200/90 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Product Visual</th>
                      <th className="py-3 px-4">Name & Volume</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Selling Price</th>
                      <th className="py-3 px-4">Stock Status</th>
                      <th className="py-3 px-4">Badge</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-amber-50/30 transition-colors">
                        
                        {/* Image */}
                        <td className="py-3 px-4">
                          <div className="w-12 h-14 rounded-xl bg-[#f7f2ea] border border-stone-200 p-1 flex items-center justify-center overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </td>

                        {/* Name & Subtitle */}
                        <td className="py-3 px-4 max-w-xs">
                          <span className="font-bold text-stone-900 block line-clamp-1">{product.name}</span>
                          <span className="text-[11px] text-stone-500 block">{product.volume}</span>
                          {product.urduName && (
                            <span className="text-[10px] text-[#c59b27] font-serif">{product.urduName}</span>
                          )}
                        </td>

                        {/* Category */}
                        <td className="py-3 px-4">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-stone-100 text-stone-700 capitalize">
                            {categories.find((c) => c.slug === product.category)?.name || product.category}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="py-3 px-4">
                          <span className="font-bold text-[#7b3e1d] text-sm block">
                            Rs. {product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="text-[10px] text-stone-400 line-through">
                              Rs. {product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </td>

                        {/* Stock Toggle */}
                        <td className="py-3 px-4">
                          <button
                            onClick={() => toggleProductStock(product.id)}
                            className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                              product.inStock
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                            <span>{product.inStock ? 'In Stock' : 'Sold Out'}</span>
                          </button>
                        </td>

                        {/* Badge */}
                        <td className="py-3 px-4">
                          {product.badge ? (
                            <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-amber-50 text-[#7b3e1d] border border-amber-200">
                              {product.badge}
                            </span>
                          ) : (
                            <span className="text-stone-300 text-[10px]">—</span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setSelectedProduct(product);
                                handleReturnToStore();
                              }}
                              className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                              title="Preview on PDP"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => setEditingProduct(product)}
                              className="p-1.5 rounded-lg bg-stone-100 hover:bg-[#7b3e1d] hover:text-white text-stone-700 transition-colors cursor-pointer"
                              title="Edit product"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => {
                                if (window.confirm(`Delete "${product.name}" from store?`)) {
                                  deleteProduct(product.id);
                                }
                              }}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 transition-colors cursor-pointer"
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB: HERO BANNERS MANAGEMENT
        ========================================================================= */}
        {activeTab === 'banners' && (
          <div className="space-y-6">
            
            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-6 bg-white rounded-3xl border border-stone-200/90 shadow-xs">
              <div className="space-y-0.5">
                <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-[#c59b27]" />
                  <span>Hero Carousel & Store Banners</span>
                </h3>
                <p className="text-xs text-stone-500">
                  Manage the full-width carousel slides on the store homepage. Upload photos, change headlines, badges, and CTA links.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (window.confirm('Reset all banners to default high-definition campaign slides?')) {
                      resetHeroSlidesToDefault();
                    }
                  }}
                  className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Reset Default Banners"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#7b3e1d]" />
                  <span className="hidden sm:inline">Reset Banners</span>
                </button>

                <button
                  onClick={() => setIsAddBannerModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-[#7b3e1d] hover:bg-[#622f14] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Banner</span>
                </button>
              </div>
            </div>

            {/* Banners Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {heroSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className="bg-white rounded-3xl border border-stone-200/90 shadow-xs overflow-hidden flex flex-col group hover:shadow-md transition-shadow"
                >
                  {/* Banner Image Preview with Text Overlay */}
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-stone-900">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 flex flex-col justify-between text-white">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-white/20 backdrop-blur-xs uppercase tracking-wider text-amber-300">
                          Slide #{index + 1}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-[#d0473e] text-white uppercase tracking-wider">
                          {slide.targetCategory}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] text-amber-200 font-bold uppercase tracking-widest line-clamp-1">
                          {slide.badge}
                        </span>
                        <h4 className="font-heading text-base font-extrabold uppercase leading-tight line-clamp-2">
                          {slide.title}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* Banner Details Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {slide.subtitle}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                        <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-medium border border-stone-200">
                          Pill: {slide.highlight}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-amber-50 text-[#7b3e1d] font-bold border border-amber-200">
                          CTA: {slide.buttonText}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                      <button
                        onClick={() => setEditingBanner(slide)}
                        className="px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-[#7b3e1d] hover:text-white text-stone-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit Slide</span>
                      </button>

                      <button
                        onClick={() => {
                          if (heroSlides.length <= 1) {
                            alert('You must have at least one active banner on the store.');
                            return;
                          }
                          if (window.confirm(`Delete banner "${slide.title}"?`)) {
                            deleteHeroSlide(slide.id);
                          }
                        }}
                        className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 transition-colors cursor-pointer"
                        title="Delete Banner"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* =========================================================================
            TAB: CUSTOM PAGES & POLICIES BUILDER
        ========================================================================= */}
        {activeTab === 'pages' && (
          <div className="space-y-6">
            
            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-6 bg-white rounded-3xl border border-stone-200/90 shadow-xs">
              <div className="space-y-0.5">
                <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#c59b27]" />
                  <span>Custom Pages & Store Policies Builder</span>
                </h3>
                <p className="text-xs text-stone-500">
                  Create, edit, and publish content pages (e.g. Terms, Return Policy, Special Announcements). Links update dynamically in navigation & footer.
                </p>
              </div>

              <button
                onClick={() => setIsAddPageModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-[#7b3e1d] hover:bg-[#622f14] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Custom Page</span>
              </button>
            </div>

            {/* Pages Table */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-stone-200/90 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Page Title</th>
                      <th className="py-3 px-4">URL Identifier</th>
                      <th className="py-3 px-4">Header Nav</th>
                      <th className="py-3 px-4">Footer Links</th>
                      <th className="py-3 px-4">Last Updated</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {customPages.map((page) => (
                      <tr key={page.id} className="hover:bg-amber-50/30 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-stone-900">
                          {page.title}
                        </td>

                        <td className="py-3.5 px-4 font-mono text-stone-500 text-[11px]">
                          /page/{page.slug}
                        </td>

                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            page.showInNav ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-400'
                          }`}>
                            {page.showInNav ? '✓ Visible' : 'Hidden'}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            page.showInFooter ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-400'
                          }`}>
                            {page.showInFooter ? '✓ Visible' : 'Hidden'}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-stone-500 font-mono text-[11px]">
                          {page.updatedAt || 'Recent'}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                navigateToCustomPage(page.slug);
                              }}
                              className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                              title="Preview on Live Site"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => setEditingPage(page)}
                              className="p-1.5 rounded-lg bg-stone-100 hover:bg-[#7b3e1d] hover:text-white text-stone-700 transition-colors cursor-pointer"
                              title="Edit Page Content"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => {
                                if (window.confirm(`Delete page "${page.title}"?`)) {
                                  deleteCustomPage(page.id);
                                }
                              }}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 transition-colors cursor-pointer"
                              title="Delete Page"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* =========================================================================
            TAB 2: CATEGORIES & CONCERNS MANAGEMENT
        ========================================================================= */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left: Categories Control */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div>
                  <h3 className="font-serif-luxury text-lg font-bold text-stone-900">Store Categories</h3>
                  <p className="text-xs text-stone-500">Add or remove product categories shown on Catalog & Navigation</p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-[#7b3e1d]">
                  {categories.length} Total
                </span>
              </div>

              {/* Add New Category Form */}
              <form onSubmit={handleCreateCategory} className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-3">
                <span className="text-xs font-bold text-stone-800 block">Add New Category</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    required
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder="e.g. Herbal Serums"
                    className="sm:col-span-2 px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#7b3e1d]"
                  />
                  <input
                    type="text"
                    value={newCatIcon}
                    onChange={(e) => setNewCatIcon(e.target.value)}
                    placeholder="Icon (🌿)"
                    className="px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#7b3e1d] text-center"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-[#7b3e1d] hover:bg-[#622f14] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Create Category
                </button>
              </form>

              {/* Current Categories List */}
              <div className="space-y-2">
                {categories.map((cat) => (
                  <div key={cat.slug} className="flex items-center justify-between p-3 rounded-xl bg-white border border-stone-200/80">
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{cat.icon}</span>
                      <div>
                        <span className="font-bold text-xs text-stone-900 block">{cat.name}</span>
                        <span className="text-[10px] text-stone-400">slug: {cat.slug}</span>
                      </div>
                    </div>

                    {cat.slug !== 'all' ? (
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete category "${cat.name}"?`)) {
                            deleteCategory(cat.slug);
                          }
                        }}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete category"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <span className="text-[10px] text-stone-400 font-semibold">Default</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Concerns & Filter Tags */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div>
                  <h3 className="font-serif-luxury text-lg font-bold text-stone-900">Hair & Skin Concerns</h3>
                  <p className="text-xs text-stone-500">Filter tabs used by customers to find specific organic solutions</p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-[#7b3e1d]">
                  {concerns.length} Total
                </span>
              </div>

              {/* Add Concern Form */}
              <form onSubmit={handleAddConcern} className="flex gap-2">
                <input
                  type="text"
                  required
                  value={newConcernInput}
                  onChange={(e) => setNewConcernInput(e.target.value)}
                  placeholder="e.g. Dandruff Control, Sun Protection"
                  className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#7b3e1d]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#7b3e1d] hover:bg-[#622f14] text-white text-xs font-bold rounded-xl transition-colors shrink-0 cursor-pointer"
                >
                  Add Concern
                </button>
              </form>

              {/* Concerns Tags List */}
              <div className="flex flex-wrap gap-2 pt-2">
                {concerns.map((con) => (
                  <span
                    key={con}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 text-stone-800 text-xs font-medium border border-stone-200/80"
                  >
                    <span>{con}</span>
                    {con !== 'all' && (
                      <button
                        onClick={() => deleteConcern(con)}
                        className="text-stone-400 hover:text-rose-600 ml-1 cursor-pointer"
                        title="Remove concern"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </span>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* =========================================================================
            TAB 3: ORDERS & LOGISTICS FULFILLMENT
        ========================================================================= */}
        {activeTab === 'orders' && (
          <div className="space-y-5">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-stone-200/90 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-stone-600">Filter Status:</span>
                {['all', 'confirmed', 'processing', 'dispatched', 'delivered', 'cancelled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderStatusFilter(st)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                      orderStatusFilter === st
                        ? 'bg-[#7b3e1d] text-white shadow-2xs'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <span className="text-xs text-stone-500 font-medium">
                Showing {filteredOrders.length} of {orders.length} orders
              </span>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-stone-200/90 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Order ID & Date</th>
                      <th className="py-3 px-4">Customer Details</th>
                      <th className="py-3 px-4">City & Address</th>
                      <th className="py-3 px-4">Items</th>
                      <th className="py-3 px-4">Total & Payment</th>
                      <th className="py-3 px-4">Status & Courier</th>
                      <th className="py-3 px-4 text-right">Fulfillment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredOrders.map((order) => (
                      <tr key={order.orderId} className="hover:bg-amber-50/30 transition-colors">
                        
                        {/* ID */}
                        <td className="py-3 px-4">
                          <span className="font-mono font-bold text-stone-900 block">{order.orderId}</span>
                          <span className="text-[10px] text-stone-400">{order.date}</span>
                        </td>

                        {/* Customer */}
                        <td className="py-3 px-4">
                          <span className="font-bold text-stone-900 block">{order.customerName}</span>
                          <a
                            href={`https://wa.me/92${order.phone.replace(/\D/g, '').replace(/^0/, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] font-mono text-emerald-700 hover:underline flex items-center gap-1"
                          >
                            <Phone className="w-3 h-3" />
                            <span>{order.phone}</span>
                          </a>
                        </td>

                        {/* City */}
                        <td className="py-3 px-4 max-w-xs">
                          <span className="font-bold text-stone-800 block">{order.city}</span>
                          <span className="text-[11px] text-stone-500 line-clamp-1">{order.address}</span>
                        </td>

                        {/* Items */}
                        <td className="py-3 px-4">
                          <span className="font-bold text-stone-800 block">
                            {order.items.reduce((s, i) => s + i.quantity, 0)} Items
                          </span>
                          <span className="text-[10px] text-stone-500 line-clamp-1">
                            {order.items.map((i) => `${i.name} (x${i.quantity})`).join(', ')}
                          </span>
                        </td>

                        {/* Total */}
                        <td className="py-3 px-4">
                          <span className="font-bold text-[#7b3e1d] text-sm block">
                            Rs. {order.total.toLocaleString()}
                          </span>
                          <span className="text-[10px] font-bold uppercase text-stone-500">
                            {order.paymentMethod === 'cod' ? '💵 COD' : `💳 ${order.paymentMethod}`}
                          </span>
                          {order.transactionId && (
                            <span className="text-[9px] font-mono text-stone-400 block">TID: {order.transactionId}</span>
                          )}
                        </td>

                        {/* Status */}
                        <td className="py-3 px-4">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.orderId, e.target.value as any)}
                            className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border focus:outline-hidden cursor-pointer ${
                              order.status === 'delivered'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : order.status === 'dispatched'
                                ? 'bg-blue-50 text-blue-800 border-blue-200'
                                : order.status === 'processing'
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : order.status === 'cancelled'
                                ? 'bg-rose-50 text-rose-800 border-rose-200'
                                : 'bg-stone-100 text-stone-800 border-stone-200'
                            }`}
                          >
                            <option value="confirmed">Confirmed</option>
                            <option value="processing">Processing</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>

                          {order.trackingNumber && (
                            <span className="text-[10px] font-mono text-stone-400 block mt-0.5">
                              {order.trackingNumber}
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setInspectingOrder(order)}
                              className="p-1.5 rounded-lg bg-stone-100 hover:bg-[#7b3e1d] hover:text-white text-stone-700 transition-colors cursor-pointer"
                              title="Print Invoice / Packing Slip"
                            >
                              <Printer className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => {
                                setEditingTrackingOrder(order);
                                setNewCourier(order.courierName || 'Trax Express');
                                setNewTracking(order.trackingNumber || '');
                              }}
                              className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                              title="Add / Edit Courier Tracking"
                            >
                              <Truck className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => {
                                if (window.confirm(`Delete order ${order.orderId}?`)) {
                                  deleteOrder(order.orderId);
                                }
                              }}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 transition-colors cursor-pointer"
                              title="Delete order"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: REVIEWS MANAGEMENT
        ========================================================================= */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            
            {/* Add Custom Review Form */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div>
                  <h3 className="font-serif-luxury text-lg font-bold text-stone-900">Publish Verified Review</h3>
                  <p className="text-xs text-stone-500">Post genuine customer feedback received via WhatsApp to the live storefront</p>
                </div>
              </div>

              <form onSubmit={handleAddCustomReview} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  placeholder="Customer Full Name (e.g. Dr. Asma Rauf)"
                  className="px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden"
                />

                <input
                  type="text"
                  required
                  value={newReviewCity}
                  onChange={(e) => setNewReviewCity(e.target.value)}
                  placeholder="City (e.g. Islamabad Sector F-10)"
                  className="px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden"
                />

                <select
                  value={newReviewRating}
                  onChange={(e) => setNewReviewRating(Number(e.target.value))}
                  className="px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden font-bold"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                  <option value={3}>⭐⭐⭐ (3 Stars)</option>
                </select>

                <textarea
                  required
                  rows={2}
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Review comment praising 0% steroid formulation or hair oil results..."
                  className="sm:col-span-3 px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden"
                />

                <button
                  type="submit"
                  className="sm:col-span-3 py-2.5 bg-[#7b3e1d] hover:bg-[#622f14] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Publish Verified Review to Live Store
                </button>
              </form>
            </div>

            {/* Reviews List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-stone-900">{rev.author}</span>
                      <div className="flex text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                    </div>
                    <span className="text-[10px] text-stone-400 block">{rev.city} • {rev.date}</span>
                    <p className="text-xs text-stone-600 mt-2 italic leading-relaxed">"{rev.comment}"</p>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      ✓ Verified Buyer
                    </span>

                    <button
                      onClick={() => deleteReview(rev.id)}
                      className="p-1 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Delete review"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* =========================================================================
            TAB: COUPONS & DISCOUNTS MANAGEMENT
        ========================================================================= */}
        {activeTab === 'coupons' && (
          <div className="space-y-6">
            
            {/* Create Coupon Card */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div>
                  <h3 className="font-serif-luxury text-lg font-bold text-stone-900">Create Discount Coupon</h3>
                  <p className="text-xs text-stone-500">Generate promotional voucher codes for campaigns, Eid sales, and customer loyalty</p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-[#7b3e1d]">
                  {coupons.length} Active Vouchers
                </span>
              </div>

              <form onSubmit={handleCreateCoupon} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Coupon Code</label>
                  <input
                    type="text"
                    required
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                    placeholder="e.g. FLASH25"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden font-mono font-bold uppercase"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Discount (% Off)</label>
                  <input
                    type="number"
                    min="1"
                    max="90"
                    required
                    value={newCouponDiscount}
                    onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Min. Order (PKR)</label>
                  <input
                    type="number"
                    min="0"
                    value={newCouponMinOrder}
                    onChange={(e) => setNewCouponMinOrder(Number(e.target.value))}
                    placeholder="0 (No Minimum)"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#7b3e1d] hover:bg-[#622f14] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Voucher</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Coupons Table */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-stone-200/90 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Coupon Code</th>
                      <th className="py-3 px-4">Discount</th>
                      <th className="py-3 px-4">Min Spend Requirement</th>
                      <th className="py-3 px-4">Times Redeemed</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {coupons.map((coupon) => (
                      <tr key={coupon.id} className="hover:bg-amber-50/30 transition-colors">
                        <td className="py-3 px-4">
                          <span className="font-mono font-bold text-stone-900 text-xs px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200">
                            {coupon.code}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <span className="font-bold text-emerald-700 text-sm">
                            {coupon.discountPercentage}% OFF
                          </span>
                        </td>

                        <td className="py-3 px-4 text-stone-600">
                          {coupon.minOrderAmount ? `Rs. ${coupon.minOrderAmount.toLocaleString()}` : 'No minimum spend'}
                        </td>

                        <td className="py-3 px-4">
                          <span className="font-mono font-medium text-stone-600">
                            {coupon.usageCount} orders
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <button
                            onClick={() => toggleCouponStatus(coupon.id)}
                            className={`px-3 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                              coupon.isActive
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                            }`}
                          >
                            {coupon.isActive ? 'Active' : 'Disabled'}
                          </button>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete coupon "${coupon.code}"?`)) {
                                deleteCoupon(coupon.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 transition-colors cursor-pointer"
                            title="Delete Coupon"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* =========================================================================
            TAB 5: STORE SETTINGS, PASSWORD & WHATSAPP
        ========================================================================= */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl mx-auto">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-6">
              
              <div className="pb-4 border-b border-stone-100">
                <h3 className="font-serif-luxury text-xl font-bold text-stone-900">Storefront & Security Configuration</h3>
                <p className="text-xs text-stone-500">
                  Update your official WhatsApp number, announcement banner, secret admin password, and delivery thresholds. Changes take effect on the live website immediately.
                </p>
              </div>

              {settingsSavedToast && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Settings updated and synced with live store!</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="space-y-4">
                
                {/* Admin Secret Password Setting (Client Key Management) */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#7b3e1d]" />
                      <span>Admin Portal Secret Password</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowAdminKeyInSettings(!showAdminKeyInSettings)}
                      className="text-[11px] text-[#7b3e1d] font-bold hover:underline cursor-pointer"
                    >
                      {showAdminKeyInSettings ? 'Hide Key' : 'Reveal Key'}
                    </button>
                  </div>

                  <input
                    type={showAdminKeyInSettings ? 'text' : 'password'}
                    required
                    value={settingsForm.adminPassword || 'dail@2026'}
                    onChange={(e) => setSettingsForm({ ...settingsForm, adminPassword: e.target.value })}
                    placeholder="e.g. dail@2026"
                    className="w-full px-3.5 py-2.5 text-sm font-mono font-bold bg-white border border-amber-300 rounded-xl focus:outline-hidden focus:border-[#7b3e1d]"
                  />
                  <span className="text-[11px] text-stone-600 block">
                    Use this password to log into the Admin Dashboard at <code>/admin</code>. Share this with your store client.
                  </span>
                </div>

                {/* WhatsApp Number (Key User Request) */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Official WhatsApp Helpline Number</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={settingsForm.whatsappNumber}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                    placeholder="03346361218"
                    className="w-full px-3.5 py-2.5 text-sm font-mono font-bold bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#7b3e1d]"
                  />
                  <span className="text-[11px] text-stone-500 block">
                    All WhatsApp buttons ("Order on WhatsApp", Floating button, PDP order, Cart order) connect directly to this number.
                  </span>
                </div>

                {/* Announcement Bar */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800">Top Announcement Banner Text</label>
                  <input
                    type="text"
                    required
                    value={settingsForm.announcementText}
                    onChange={(e) => setSettingsForm({ ...settingsForm, announcementText: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#7b3e1d]"
                  />
                </div>

                {/* Shipping Threshold & Fee */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-800">Free Delivery Minimum (PKR)</label>
                    <input
                      type="number"
                      required
                      value={settingsForm.freeShippingThreshold}
                      onChange={(e) => setSettingsForm({ ...settingsForm, freeShippingThreshold: Number(e.target.value) })}
                      className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-800">Standard Shipping Fee (PKR)</label>
                    <input
                      type="number"
                      required
                      value={settingsForm.flatShippingFee}
                      onChange={(e) => setSettingsForm({ ...settingsForm, flatShippingFee: Number(e.target.value) })}
                      className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Brand Tagline */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800">Brand Tagline</label>
                  <input
                    type="text"
                    value={settingsForm.brandTagline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, brandTagline: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden"
                  />
                </div>

                {/* Official Email */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800">Official Store Email</label>
                  <input
                    type="email"
                    required
                    value={settingsForm.email || 'dailcosmeticscht@gmail.com'}
                    onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden"
                  />
                </div>

                {/* Social Channels (Facebook, Instagram, TikTok) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-800">Facebook Page URL</label>
                    <input
                      type="text"
                      value={settingsForm.facebookUrl || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, facebookUrl: e.target.value })}
                      placeholder="https://facebook.com/..."
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-800">Instagram Profile URL</label>
                    <input
                      type="text"
                      value={settingsForm.instagramUrl || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, instagramUrl: e.target.value })}
                      placeholder="https://instagram.com/..."
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-800">TikTok Profile URL</label>
                    <input
                      type="text"
                      value={settingsForm.tiktokUrl || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, tiktokUrl: e.target.value })}
                      placeholder="https://tiktok.com/@..."
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden font-mono"
                    />
                  </div>
                </div>

                {/* Business Address */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800">Warehouse & Dispatch Address</label>
                  <input
                    type="text"
                    value={settingsForm.businessAddress}
                    onChange={(e) => setSettingsForm({ ...settingsForm, businessAddress: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#7b3e1d] hover:bg-[#622f14] text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer"
                  >
                    Save All Settings & Sync Storefront
                  </button>
                </div>

              </form>

            </div>

            {/* Live FAQs Management Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-100">
                <div>
                  <h3 className="font-serif-luxury text-xl font-bold text-stone-900 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-[#c59b27]" />
                    <span>Frequently Asked Questions (FAQ) Manager</span>
                  </h3>
                  <p className="text-xs text-stone-500">
                    Customize every word of your customer questions & answers displayed on the homepage and support sections.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddFaqModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-[#7b3e1d] hover:bg-[#622f14] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New FAQ</span>
                </button>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div
                    key={faq.id}
                    className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-amber-100 text-[#7b3e1d] font-bold text-[10px] flex items-center justify-center shrink-0">
                          {index + 1}
                        </span>
                        <h4 className="font-bold text-stone-900 text-xs sm:text-sm">
                          {faq.question}
                        </h4>
                      </div>
                      {faq.urduQuestion && (
                        <p className="text-[11px] text-[#c59b27] font-serif pl-7">
                          {faq.urduQuestion}
                        </p>
                      )}
                      <p className="text-xs text-stone-600 pl-7 leading-relaxed line-clamp-2">
                        {faq.answer}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                      <button
                        type="button"
                        onClick={() => setEditingFaq(faq)}
                        className="p-1.5 rounded-lg bg-white hover:bg-[#7b3e1d] hover:text-white text-stone-700 transition-colors cursor-pointer border border-stone-200"
                        title="Edit FAQ"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm('Delete this FAQ question?')) {
                            deleteFaq(faq.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 transition-colors cursor-pointer"
                        title="Delete FAQ"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* =========================================================================
          MODAL: ADD NEW PRODUCT
      ========================================================================= */}
      {isAddProductModalOpen && (
        <ProductFormModal
          categories={categories}
          concerns={concerns}
          onClose={() => setIsAddProductModalOpen(false)}
          onSave={(newProd) => {
            addProduct(newProd);
            setIsAddProductModalOpen(false);
            alert(`Product "${newProd.name}" added successfully!`);
          }}
        />
      )}

      {/* =========================================================================
          MODAL: EDIT EXISTING PRODUCT
      ========================================================================= */}
      {editingProduct && (
        <ProductFormModal
          categories={categories}
          concerns={concerns}
          initialData={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={(updatedProd) => {
            updateProduct(editingProduct.id, updatedProd);
            setEditingProduct(null);
            alert(`Product updated successfully!`);
          }}
        />
      )}

      {/* =========================================================================
          MODAL: ADD NEW BANNER
      ========================================================================= */}
      {isAddBannerModalOpen && (
        <BannerFormModal
          categories={categories}
          onClose={() => setIsAddBannerModalOpen(false)}
          onSave={(newSlide) => {
            addHeroSlide(newSlide);
            setIsAddBannerModalOpen(false);
          }}
        />
      )}

      {/* =========================================================================
          MODAL: EDIT EXISTING BANNER
      ========================================================================= */}
      {editingBanner && (
        <BannerFormModal
          categories={categories}
          initialData={editingBanner}
          onClose={() => setEditingBanner(null)}
          onSave={(updatedSlide) => {
            updateHeroSlide(editingBanner.id, updatedSlide);
            setEditingBanner(null);
          }}
        />
      )}

      {/* =========================================================================
          MODAL: ADD NEW CUSTOM PAGE
      ========================================================================= */}
      {isAddPageModalOpen && (
        <CustomPageFormModal
          onClose={() => setIsAddPageModalOpen(false)}
          onSave={(newPage) => {
            addCustomPage(newPage);
            setIsAddPageModalOpen(false);
          }}
        />
      )}

      {/* =========================================================================
          MODAL: EDIT EXISTING CUSTOM PAGE
      ========================================================================= */}
      {editingPage && (
        <CustomPageFormModal
          initialData={editingPage}
          onClose={() => setEditingPage(null)}
          onSave={(updatedPage) => {
            updateCustomPage(editingPage.id, updatedPage);
            setEditingPage(null);
          }}
        />
      )}

      {/* =========================================================================
          MODAL: ADD NEW FAQ
      ========================================================================= */}
      {isAddFaqModalOpen && (
        <FaqFormModal
          onClose={() => setIsAddFaqModalOpen(false)}
          onSave={(newFaq) => {
            addFaq(newFaq);
            setIsAddFaqModalOpen(false);
          }}
        />
      )}

      {/* =========================================================================
          MODAL: EDIT EXISTING FAQ
      ========================================================================= */}
      {editingFaq && (
        <FaqFormModal
          initialData={editingFaq}
          onClose={() => setEditingFaq(null)}
          onSave={(updatedFaq) => {
            updateFaq(editingFaq.id, updatedFaq);
            setEditingFaq(null);
          }}
        />
      )}

      {/* =========================================================================
          MODAL: COURIER TRACKING UPDATE
      ========================================================================= */}
      {editingTrackingOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="font-serif-luxury text-base font-bold text-stone-900">
                Logistics Dispatch: {editingTrackingOrder.orderId}
              </h3>
              <button onClick={() => setEditingTrackingOrder(null)} className="p-1 text-stone-400 hover:text-stone-700 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateTracking} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Courier Service</label>
                <select
                  value={newCourier}
                  onChange={(e) => setNewCourier(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                >
                  <option value="Trax Logistics Pakistan">Trax Logistics Pakistan</option>
                  <option value="TCS Pakistan Express">TCS Pakistan Express</option>
                  <option value="Leopards Courier">Leopards Courier</option>
                  <option value="Call Courier Pakistan">Call Courier Pakistan</option>
                  <option value="M&P Express">M&P Express</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Consignment / Tracking Number</label>
                <input
                  type="text"
                  required
                  value={newTracking}
                  onChange={(e) => setNewTracking(e.target.value)}
                  placeholder="e.g. TRX-9824102-PK"
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl font-mono font-bold"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#7b3e1d] hover:bg-[#622f14] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Save Consignment & Update Order
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: PRINT OFFICIAL INVOICE & PACKING SLIP
      ========================================================================= */}
      {inspectingOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div className="flex items-center gap-3">
                <img src="/images/dail_logo.png" alt="Dail Logo" className="h-10 w-auto" />
                <div>
                  <h3 className="font-serif-luxury text-lg font-bold text-stone-900">Official Tax Invoice & Dispatch Slip</h3>
                  <span className="text-xs text-stone-500">Order ID: {inspectingOrder.orderId}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-xl bg-stone-900 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button onClick={() => setInspectingOrder(null)} className="p-1.5 text-stone-400 hover:text-stone-700 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Customer & Shipping Details */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <div>
                <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">Ship To Customer</span>
                <span className="font-bold text-stone-900 block mt-0.5">{inspectingOrder.customerName}</span>
                <span className="text-stone-600 block">{inspectingOrder.phone}</span>
                <span className="text-stone-600 block">{inspectingOrder.address}</span>
                <span className="font-bold text-stone-800 block">{inspectingOrder.city}, {inspectingOrder.province}</span>
              </div>

              <div>
                <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">Payment & Fulfillment</span>
                <span className="font-bold text-stone-900 block mt-0.5 uppercase">
                  {inspectingOrder.paymentMethod === 'cod' ? 'Cash On Delivery (COD)' : inspectingOrder.paymentMethod}
                </span>
                <span className="text-stone-600 block">Date: {inspectingOrder.date}</span>
                <span className="text-stone-600 block">Courier: {inspectingOrder.courierName || 'Pending'}</span>
                <span className="font-mono text-[11px] text-[#7b3e1d] block">Tracking: {inspectingOrder.trackingNumber || 'Unassigned'}</span>
              </div>
            </div>

            {/* Items Table */}
            <div className="border border-stone-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-stone-100 text-stone-700 font-bold">
                  <tr>
                    <th className="p-2.5">Item Formulation</th>
                    <th className="p-2.5 text-center">Qty</th>
                    <th className="p-2.5 text-right">Price</th>
                    <th className="p-2.5 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {inspectingOrder.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-2.5 font-medium">{item.name}</td>
                      <td className="p-2.5 text-center font-bold">{item.quantity}</td>
                      <td className="p-2.5 text-right">Rs. {item.price.toLocaleString()}</td>
                      <td className="p-2.5 text-right font-bold">Rs. {(item.price * item.quantity).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="space-y-1 text-xs text-right max-w-xs ml-auto">
              <div className="flex justify-between text-stone-500">
                <span>Subtotal:</span>
                <span>Rs. {inspectingOrder.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Shipping Fee:</span>
                <span>{inspectingOrder.shippingFee === 0 ? 'FREE' : `Rs. ${inspectingOrder.shippingFee}`}</span>
              </div>
              {inspectingOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Discount:</span>
                  <span>- Rs. {inspectingOrder.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>Total Due:</span>
                <span className="text-[#7b3e1d]">Rs. {inspectingOrder.total.toLocaleString()}</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

// =========================================================================
// SUB-COMPONENT: PRODUCT FORM MODAL (ADD / EDIT)
// =========================================================================
interface ProductFormModalProps {
  categories: CategoryItem[];
  concerns: string[];
  initialData?: Product;
  onClose: () => void;
  onSave: (data: Omit<Product, 'id'>) => void;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({
  categories,
  concerns,
  initialData,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState(initialData?.name || '');
  const [urduName, setUrduName] = useState(initialData?.urduName || '');
  const [tagline, setTagline] = useState(initialData?.tagline || '');
  const [category, setCategory] = useState(initialData?.category || 'hair-oil');
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>(initialData?.concern || ['Hair Fall']);
  const [price, setPrice] = useState(initialData?.price || 1850);
  const [originalPrice, setOriginalPrice] = useState(initialData?.originalPrice || 2200);
  const [volume, setVolume] = useState(initialData?.volume || '120 ml / 4.0 fl oz');
  const [badge, setBadge] = useState(initialData?.badge || 'Best Seller');
  const [galleryImages, setGalleryImages] = useState<string[]>(() => {
    if (initialData?.galleryImages && initialData.galleryImages.length > 0) {
      return initialData.galleryImages;
    }
    return initialData?.image ? [initialData.image] : ['/images/dail_beauty_cream_square.jpg'];
  });
  const [image, setImage] = useState(initialData?.image || galleryImages[0] || '/images/dail_beauty_cream_square.jpg');
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [description, setDescription] = useState(initialData?.description || '');
  const [inStock, setInStock] = useState(initialData?.inStock ?? true);

  const presetImages = [
    { label: '✨ Dail Beauty Cream (50g)', src: '/images/dail_beauty_cream_square.jpg' },
    { label: '🧴 Herbal Hair Oil (120ml)', src: '/images/dail_hair_oil_square.jpg' },
    { label: '💛 Hand & Foot Cream', src: '/images/dail_hand_foot_square.jpg' },
    { label: '🎁 3-in-1 Regimen Box', src: '/images/dail_hero_banner_golden.jpg' },
    { label: '🌿 Full Collection Studio', src: '/images/dail_full_collection.jpg' },
  ];

  const handleAddUrlToGallery = () => {
    const url = newGalleryUrl.trim();
    if (!url) return;
    if (!galleryImages.includes(url)) {
      setGalleryImages((prev) => [...prev, url]);
      if (!image) setImage(url);
    }
    setNewGalleryUrl('');
  };

  const handleMultipleFilesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          const res = reader.result as string;
          setGalleryImages((prev) => {
            if (!prev.includes(res)) {
              return [...prev, res];
            }
            return prev;
          });
          if (!image) setImage(res);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSetCoverPhoto = (imgSrc: string) => {
    setImage(imgSrc);
  };

  const handleRemovePhoto = (imgSrc: string) => {
    const updated = galleryImages.filter((img) => img !== imgSrc);
    setGalleryImages(updated);
    if (image === imgSrc) {
      setImage(updated[0] || '');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const finalCover = image || galleryImages[0] || '/images/dail_beauty_cream_square.jpg';
    const finalGallery = galleryImages.length > 0 ? galleryImages : [finalCover];

    onSave({
      name: name.trim(),
      urduName: urduName.trim(),
      tagline: tagline.trim() || '100% Pure Organic Formulation',
      category,
      concern: selectedConcerns.length ? selectedConcerns : ['Hair Fall'],
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      rating: initialData?.rating || 5.0,
      reviewCount: initialData?.reviewCount || 1,
      badge: badge || undefined,
      volume: volume.trim(),
      image: finalCover,
      galleryImages: finalGallery,
      description: description.trim() || `${name} is formulated with 100% pure organic bio-actives strictly without harmful steroids or synthetic bleaches.`,
      benefits: initialData?.benefits || ['Export Quality Batch', '100% Pure Herbal Actives'],
      keyIngredients: initialData?.keyIngredients || [{ name: 'Botanical Actives', description: 'Certified Pure' }],
      howToUse: initialData?.howToUse || ['Apply gently on desired area.'],
      fullIngredients: initialData?.fullIngredients || 'Cold-Pressed Botanical Actives.',
      inStock,
      modelType: initialData?.modelType || (category === 'cream' ? 'jar' : 'bottle'),
    });
  };

  const toggleConcern = (con: string) => {
    if (selectedConcerns.includes(con)) {
      setSelectedConcerns(selectedConcerns.filter((c) => c !== con));
    } else {
      setSelectedConcerns([...selectedConcerns, con]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl p-5 sm:p-8 max-w-2xl w-full max-h-[92vh] overflow-y-auto space-y-5 shadow-2xl">
        
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div>
            <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-stone-900">
              {initialData ? 'Edit Product Formulation' : 'Create New Product Formulation'}
            </h3>
            <span className="text-xs text-stone-500">Live Catalog Management with Multi-Image Gallery</span>
          </div>
          <button onClick={onClose} className="p-1.5 text-stone-400 hover:text-stone-700 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Product Name (English & Urdu) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-stone-800 block mb-1">Product Title (English)</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Dail Organic Rosemary Hair Mist"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#7b3e1d]"
              />
            </div>

            <div>
              <label className="font-bold text-stone-800 block mb-1">Urdu Subtitle (Optional)</label>
              <input
                type="text"
                value={urduName}
                onChange={(e) => setUrduName(e.target.value)}
                placeholder="ڈیل خالص آرگینک روزمیری مسٹ"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#7b3e1d]"
              />
            </div>
          </div>

          {/* Tagline */}
          <div>
            <label className="font-bold text-stone-800 block mb-1">Short Tagline</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. 100% Cold-Pressed Follicle Stimulator with Export Quality Seal"
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden"
            />
          </div>

          {/* Category & Badge */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-stone-800 block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden font-medium"
              >
                {categories.filter((c) => c.slug !== 'all').map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.icon} {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-stone-800 block mb-1">Promotional Badge</label>
              <select
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden font-medium"
              >
                <option value="Best Seller">Best Seller</option>
                <option value="Without Steroid">Without Steroid</option>
                <option value="100% Organic">100% Organic</option>
                <option value="Top Rated">Top Rated</option>
                <option value="New Launch">New Launch</option>
                <option value="">No Badge</option>
              </select>
            </div>
          </div>

          {/* Pricing & Volume */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-stone-800 block mb-1">Selling Price (PKR)</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-bold text-[#7b3e1d]"
              />
            </div>

            <div>
              <label className="font-bold text-stone-800 block mb-1">Original Price (Strike)</label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(Number(e.target.value))}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
              />
            </div>

            <div>
              <label className="font-bold text-stone-800 block mb-1">Volume / Pack Size</label>
              <input
                type="text"
                required
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                placeholder="120 ml / 50g"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
              />
            </div>
          </div>

          {/* Multi-Image Product Gallery Section */}
          <div className="space-y-3 p-4 bg-stone-50 rounded-2xl border border-stone-200">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-bold text-stone-900 block text-xs">Product Image Gallery ({galleryImages.length} Photos)</label>
                <span className="text-[11px] text-stone-500">Upload multiple photos or select presets. The star indicates the main cover photo.</span>
              </div>
            </div>

            {/* Gallery Thumbnails Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
              {galleryImages.map((imgSrc, idx) => {
                const isCover = image === imgSrc || (idx === 0 && !image);
                return (
                  <div
                    key={idx}
                    className={`relative rounded-xl overflow-hidden border-2 bg-white transition-all group ${
                      isCover ? 'border-[#7b3e1d] shadow-sm' : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <img src={imgSrc} alt="" className="w-full h-20 object-cover" />
                    
                    {/* Cover badge */}
                    {isCover ? (
                      <span className="absolute top-1 left-1 bg-[#7b3e1d] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-sm">
                        ★ Cover
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSetCoverPhoto(imgSrc)}
                        className="absolute top-1 left-1 bg-black/60 hover:bg-[#7b3e1d] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        Set Cover
                      </button>
                    )}

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(imgSrc)}
                      className="absolute top-1 right-1 bg-black/60 hover:bg-rose-600 text-white p-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      title="Remove from gallery"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Upload Multiple Images & Presets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-stone-200/80">
              <label className="flex items-center justify-center gap-2 px-3 py-2 bg-white hover:bg-stone-100 text-stone-800 font-bold rounded-xl cursor-pointer border border-stone-300 transition-colors shadow-2xs">
                <span>📁 Upload Photos from Device (Multiple)</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleMultipleFilesUpload}
                />
              </label>

              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={newGalleryUrl}
                  onChange={(e) => setNewGalleryUrl(e.target.value)}
                  placeholder="Or paste image URL..."
                  className="flex-1 px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddUrlToGallery}
                  className="px-3 py-2 bg-stone-800 hover:bg-stone-900 text-white font-bold rounded-xl text-xs cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Preset Image Options */}
            <div className="pt-1">
              <span className="text-[10px] text-stone-500 font-bold block mb-1">Quick Presets:</span>
              <div className="flex flex-wrap gap-1.5">
                {presetImages.map((p, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => {
                      if (!galleryImages.includes(p.src)) {
                        setGalleryImages([...galleryImages, p.src]);
                      }
                      setImage(p.src);
                    }}
                    className="px-2 py-1 bg-white hover:bg-amber-50 text-stone-700 hover:text-[#7b3e1d] border border-stone-200 rounded-lg text-[10px] font-bold cursor-pointer transition-colors"
                  >
                    + {p.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Concerns Checkboxes */}
          <div>
            <label className="font-bold text-stone-800 block mb-1">Target Concerns</label>
            <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-stone-50 border border-stone-200">
              {concerns.filter((c) => c !== 'all').map((con) => (
                <button
                  type="button"
                  key={con}
                  onClick={() => toggleConcern(con)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                    selectedConcerns.includes(con)
                      ? 'bg-[#7b3e1d] text-white shadow-2xs'
                      : 'bg-white text-stone-600 border border-stone-200'
                  }`}
                >
                  {con}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="font-bold text-stone-800 block mb-1">Clinical Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Formulation details, active botanicals, guarantee..."
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden"
            />
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-stone-50 border border-stone-200">
            <input
              type="checkbox"
              id="inStockCheck"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
              className="w-4 h-4 text-[#7b3e1d] rounded-sm cursor-pointer"
            />
            <label htmlFor="inStockCheck" className="font-bold text-stone-800 cursor-pointer">
              Product is In-Stock & available for customer purchase
            </label>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
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
              {initialData ? 'Save Product Updates' : 'Publish Product to Live Store'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
