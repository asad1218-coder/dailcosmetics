import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  Product, 
  CartItem, 
  OrderDetails, 
  PageView, 
  ProductCategory, 
  ProductReview, 
  CategoryItem, 
  StoreSettings,
  Coupon 
} from '../types';
import { PRODUCTS, REVIEWS } from '../data/products';

export const INITIAL_COUPONS: Coupon[] = [
  { id: 'c-1', code: 'ORGANIC10', discountPercentage: 10, minOrderAmount: 0, isActive: true, usageCount: 42 },
  { id: 'c-2', code: 'DAIL20', discountPercentage: 20, minOrderAmount: 2000, isActive: true, usageCount: 78 },
  { id: 'c-3', code: 'EID15', discountPercentage: 15, minOrderAmount: 1500, isActive: true, usageCount: 31 },
  { id: 'c-4', code: 'GLOW5', discountPercentage: 5, minOrderAmount: 0, isActive: true, usageCount: 15 },
];

export const INITIAL_CATEGORIES: CategoryItem[] = [
  { id: 'cat-all', name: 'All Products', slug: 'all', icon: '🛍️', description: 'Complete organic hair and skincare range' },
  { id: 'cat-creams', name: 'Dail Beauty Cream', slug: 'cream', icon: '🧴', description: 'Steroid-free anti-aging & daily radiance cream (PKR 350)' },
  { id: 'cat-hair', name: 'Herbal Hair Oil', slug: 'hair-care', icon: '🌿', description: '100% natural essential oils & mixed herbs (PKR 999)' },
  { id: 'cat-handfoot', name: 'Hand & Foot Care', slug: 'cream', icon: '🦶', description: '3-Action repair for knuckles and heels (PKR 350)' },
  { id: 'cat-bundles', name: 'Value Bundles & Deals', slug: 'bundles', icon: '🎁', description: 'Exclusive value duo & trio kits with nationwide delivery' },
];

export const INITIAL_CONCERNS: string[] = [
  'all',
  'Hair Fall',
  'Follicle Regrowth',
  'Radiant Glow',
  'Without Steroid',
  'Dark Circles',
  'Dark Knuckles & Heels',
  'Deep Moisture',
  'Uneven Skin Tone'
];

export const INITIAL_SETTINGS: StoreSettings = {
  whatsappNumber: '0313 6361218',
  email: 'dailcosmeticscht@gmail.com',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61563795102913&mibextid=ZbWKwL',
  tiktokUrl: 'https://www.tiktok.com/@dailcosmetics?_t=8olPFWJTJLT&_r=1',
  instagramUrl: 'https://www.instagram.com/dailcosmetics?igsh=ZzYyd29rZ3p3d3c=',
  adminPassword: 'dail@2026',
  announcementText: 'FREE SHIPPING ON ALL ORDERS PKR 2000 AND ABOVE | CASH ON DELIVERY AVAILABLE NATIONWIDE | WHATSAPP: 0313 6361218',
  freeShippingThreshold: 2000,
  flatShippingFee: 199,
  brandTagline: 'Purity, Sustainability & Integrity • 100% Organic & Herbal Care',
  businessAddress: 'Dail Cosmetics Pakistan • DHA Phase 5, Lahore, Pakistan',
};

// Initial realistic demo orders
const INITIAL_ORDERS: OrderDetails[] = [
  {
    orderId: 'DAIL-PK-9824',
    date: '2026-10-11',
    customerName: 'Ayesha Tariq',
    email: 'ayesha.tariq@gmail.com',
    phone: '03346361218',
    address: 'House 42, Sector Y, DHA Phase 5',
    city: 'Lahore',
    province: 'Punjab',
    paymentMethod: 'cod',
    items: [
      {
        productId: 'dail-premium-herbal-hair-oil',
        name: 'Dail Premium Herbal Hair Oil (100% Organic)',
        price: 1850,
        quantity: 1,
        image: '/images/dail_hair_oil.jpg'
      },
      {
        productId: 'dail-beauty-cream',
        name: 'Dail Beauty Cream (Without Steroid)',
        price: 1450,
        quantity: 1,
        image: '/images/dail_beauty_cream.jpg'
      }
    ],
    subtotal: 3300,
    shippingFee: 0,
    discount: 0,
    total: 3300,
    status: 'dispatched',
    courierName: 'Trax Logistics Pakistan',
    trackingNumber: 'TRX-9824102-PK'
  },
  {
    orderId: 'DAIL-PK-7821',
    date: '2026-10-10',
    customerName: 'Muhammad Hamza',
    email: 'm.hamza@gmail.com',
    phone: '03214567890',
    address: 'Apartment 4B, Clifton Block 2',
    city: 'Karachi',
    province: 'Sindh',
    paymentMethod: 'jazzcash',
    transactionId: 'JC-884192048',
    items: [
      {
        productId: 'dail-premium-herbal-hair-oil',
        name: 'Dail Premium Herbal Hair Oil (100% Organic)',
        price: 1850,
        quantity: 2,
        image: '/images/dail_hair_oil.jpg'
      }
    ],
    subtotal: 3700,
    shippingFee: 0,
    discount: 370,
    total: 3330,
    status: 'delivered',
    courierName: 'TCS Pakistan',
    trackingNumber: 'TCS-7821903-PK'
  }
];

interface StoreState {
  // Navigation & Page State
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  // Quick View Modal
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Global Search Modal
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Wishlist State
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  addAllWishlistToCart: () => void;

  // Cart State
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // Promo / Voucher State
  appliedVoucher: string | null;
  discountPercentage: number;
  applyVoucher: (code: string) => { success: boolean; message: string };
  removeVoucher: () => void;
  coupons: Coupon[];
  addCoupon: (coupon: Omit<Coupon, 'id' | 'usageCount'>) => void;
  deleteCoupon: (id: string) => void;
  toggleCouponStatus: (id: string) => void;

  // Store Configuration & Settings (Shopify Grade)
  storeSettings: StoreSettings;
  updateStoreSettings: (updates: Partial<StoreSettings>) => void;
  getWhatsAppCleanNumber: () => string;
  getWhatsAppUrl: (customMessage?: string) => string;

  // Catalog Products Management
  products: Product[];
  addProduct: (productData: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleProductStock: (id: string) => void;
  resetProductsToDefault: () => void;

  // Categories & Concerns Management
  categories: CategoryItem[];
  addCategory: (cat: Omit<CategoryItem, 'id'>) => void;
  deleteCategory: (slug: string) => void;
  concerns: string[];
  addConcern: (concern: string) => void;
  deleteConcern: (concern: string) => void;

  // Cart Calculations
  getCartSubtotal: () => number;
  getCartDiscount: () => number;
  getShippingFee: () => number;
  getCartTotal: () => number;
  getTotalItemsCount: () => number;

  // Search & Filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: ProductCategory;
  setSelectedCategory: (cat: ProductCategory) => void;
  selectedConcern: string;
  setSelectedConcern: (concern: string) => void;
  maxPriceFilter: number;
  setMaxPriceFilter: (price: number) => void;

  // Customer Reviews Management
  reviews: ProductReview[];
  addReview: (review: Omit<ProductReview, 'id' | 'date' | 'helpfulCount'>) => void;
  deleteReview: (reviewId: string) => void;

  // Orders Management & Fulfillment
  currentOrder: OrderDetails | null;
  orders: OrderDetails[];
  createOrder: (orderData: Omit<OrderDetails, 'orderId' | 'date' | 'status'>) => OrderDetails;
  updateOrderStatus: (orderId: string, status: OrderDetails['status'], courierName?: string, trackingNumber?: string) => void;
  deleteOrder: (orderId: string) => void;
  trackOrderById: (orderIdOrPhone: string) => OrderDetails | null;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Navigation
      currentPage: 'home',
      setCurrentPage: (page) => {
        set({ currentPage: page });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      selectedProduct: PRODUCTS[0],
      setSelectedProduct: (product) => set({ selectedProduct: product }),

      quickViewProduct: null,
      setQuickViewProduct: (product) => set({ quickViewProduct: product }),

      isSearchOpen: false,
      setIsSearchOpen: (open) => set({ isSearchOpen: open }),

      // Wishlist
      wishlist: [PRODUCTS[0].id, PRODUCTS[1].id],
      toggleWishlist: (productId) => {
        const { wishlist } = get();
        if (wishlist.includes(productId)) {
          set({ wishlist: wishlist.filter((id) => id !== productId) });
        } else {
          set({ wishlist: [...wishlist, productId] });
        }
      },
      isInWishlist: (productId) => get().wishlist.includes(productId),
      clearWishlist: () => set({ wishlist: [] }),
      addAllWishlistToCart: () => {
        const { wishlist, addToCart, products } = get();
        wishlist.forEach((id) => {
          const prod = products.find((p) => p.id === id);
          if (prod) addToCart(prod, 1);
        });
      },

      // Cart
      cart: [
        {
          product: PRODUCTS[0],
          quantity: 1,
        }
      ],
      isCartOpen: false,
      setIsCartOpen: (open) => set({ isCartOpen: open }),

      addToCart: (product, quantity = 1) => {
        const { cart } = get();
        const existingIndex = cart.findIndex((item) => item.product.id === product.id);

        if (existingIndex > -1) {
          const updated = [...cart];
          updated[existingIndex].quantity += quantity;
          set({ cart: updated, isCartOpen: true });
        } else {
          set({ cart: [...cart, { product, quantity }], isCartOpen: true });
        }
      },

      removeFromCart: (productId) => {
        set({ cart: get().cart.filter((item) => item.product.id !== productId) });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        const updated = get().cart.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        );
        set({ cart: updated });
      },

      clearCart: () => set({ cart: [], appliedVoucher: null, discountPercentage: 0 }),

      // Coupons & Discounts
      coupons: INITIAL_COUPONS,
      appliedVoucher: null,
      discountPercentage: 0,
      applyVoucher: (code) => {
        const cleanCode = code.trim().toUpperCase();
        const found = get().coupons.find((c) => c.code.toUpperCase() === cleanCode && c.isActive);
        if (found) {
          const subtotal = get().getCartSubtotal();
          if (found.minOrderAmount && subtotal < found.minOrderAmount) {
            return {
              success: false,
              message: `Coupon "${found.code}" requires minimum order of Rs. ${found.minOrderAmount.toLocaleString()}`
            };
          }
          // Increment usage
          set((state) => ({
            appliedVoucher: found.code,
            discountPercentage: found.discountPercentage,
            coupons: state.coupons.map((c) => c.id === found.id ? { ...c, usageCount: c.usageCount + 1 } : c)
          }));
          return { success: true, message: `Voucher applied! ${found.discountPercentage}% discount added.` };
        }
        return { success: false, message: 'Invalid or inactive voucher code. Check available coupons in your cart.' };
      },
      removeVoucher: () => set({ appliedVoucher: null, discountPercentage: 0 }),
      addCoupon: (newCoupon) => {
        const coupon: Coupon = {
          ...newCoupon,
          id: `coupon-${Date.now()}`,
          code: newCoupon.code.trim().toUpperCase(),
          usageCount: 0,
        };
        set((state) => ({ coupons: [coupon, ...state.coupons] }));
      },
      deleteCoupon: (id) => {
        set((state) => ({ coupons: state.coupons.filter((c) => c.id !== id) }));
      },
      toggleCouponStatus: (id) => {
        set((state) => ({
          coupons: state.coupons.map((c) => c.id === id ? { ...c, isActive: !c.isActive } : c)
        }));
      },

      // Store Settings
      storeSettings: INITIAL_SETTINGS,
      updateStoreSettings: (updates) => {
        set((state) => ({
          storeSettings: { ...state.storeSettings, ...updates }
        }));
      },
      getWhatsAppCleanNumber: () => {
        const raw = get().storeSettings.whatsappNumber || '03346361218';
        const digits = raw.replace(/\D/g, '');
        if (digits.startsWith('92')) return digits;
        if (digits.startsWith('0')) return '92' + digits.substring(1);
        return '92' + digits;
      },
      getWhatsAppUrl: (customMessage) => {
        const cleanNumber = get().getWhatsAppCleanNumber();
        const defaultMsg = 'Hello Dail Cosmetics! I want to inquire about your 100% Organic Hair Oil & Steroid-Free Skincare.';
        const msg = encodeURIComponent(customMessage || defaultMsg);
        return `https://wa.me/${cleanNumber}?text=${msg}`;
      },

      // Products Management
      products: PRODUCTS,
      addProduct: (productData) => {
        const newProduct: Product = {
          ...productData,
          id: `dail-custom-${Date.now()}`,
          rating: productData.rating || 5.0,
          reviewCount: productData.reviewCount || 1,
          galleryImages: productData.galleryImages?.length ? productData.galleryImages : [productData.image, '/images/dail_packaging.jpg'],
          benefits: productData.benefits?.length ? productData.benefits : ['100% Pure Organic Cold-Pressed Active', 'Export Quality Seal Guarantee'],
          keyIngredients: productData.keyIngredients?.length ? productData.keyIngredients : [{ name: 'Pure Botanical Actives', description: 'Certified Organic Extracts' }],
          howToUse: productData.howToUse?.length ? productData.howToUse : ['Apply gently and massage for optimal absorption.'],
          fullIngredients: productData.fullIngredients || '100% Botanical Extracts and Cold-Pressed Herbal Oils.',
          inStock: productData.inStock !== false,
          modelType: productData.modelType || 'bottle',
        };

        set((state) => ({
          products: [newProduct, ...state.products]
        }));
        return newProduct;
      },

      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
          selectedProduct: state.selectedProduct?.id === id ? { ...state.selectedProduct, ...updates } : state.selectedProduct
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
          cart: state.cart.filter((item) => item.product.id !== id),
          wishlist: state.wishlist.filter((wId) => wId !== id)
        }));
      },

      toggleProductStock: (id) => {
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p))
        }));
      },

      resetProductsToDefault: () => {
        set({
          products: PRODUCTS,
          categories: INITIAL_CATEGORIES,
          concerns: INITIAL_CONCERNS,
          storeSettings: INITIAL_SETTINGS
        });
      },

      // Categories & Concerns
      categories: INITIAL_CATEGORIES,
      addCategory: (cat) => {
        const newCat: CategoryItem = {
          ...cat,
          id: `cat-${Date.now()}`
        };
        set((state) => ({ categories: [...state.categories, newCat] }));
      },
      deleteCategory: (slug) => {
        if (slug === 'all') return;
        set((state) => ({
          categories: state.categories.filter((c) => c.slug !== slug),
          selectedCategory: state.selectedCategory === slug ? 'all' : state.selectedCategory
        }));
      },

      concerns: INITIAL_CONCERNS,
      addConcern: (concern) => {
        if (!concern.trim() || get().concerns.includes(concern.trim())) return;
        set((state) => ({ concerns: [...state.concerns, concern.trim()] }));
      },
      deleteConcern: (concern) => {
        if (concern === 'all') return;
        set((state) => ({
          concerns: state.concerns.filter((c) => c !== concern),
          selectedConcern: state.selectedConcern === concern ? 'all' : state.selectedConcern
        }));
      },

      // Cart Calculations
      getCartSubtotal: () => {
        return get().cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      },

      getCartDiscount: () => {
        const subtotal = get().getCartSubtotal();
        return Math.round((subtotal * get().discountPercentage) / 100);
      },

      getShippingFee: () => {
        const subtotal = get().getCartSubtotal();
        if (subtotal === 0) return 0;
        return subtotal >= get().storeSettings.freeShippingThreshold ? 0 : get().storeSettings.flatShippingFee;
      },

      getCartTotal: () => {
        const subtotal = get().getCartSubtotal();
        const discount = get().getCartDiscount();
        const shipping = get().getShippingFee();
        return Math.max(0, subtotal - discount + shipping);
      },

      getTotalItemsCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0);
      },

      // Search & Filter
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      selectedCategory: 'all',
      setSelectedCategory: (cat) => set({ selectedCategory: cat }),
      selectedConcern: 'all',
      setSelectedConcern: (concern) => set({ selectedConcern: concern }),
      maxPriceFilter: 5000,
      setMaxPriceFilter: (price) => set({ maxPriceFilter: price }),

      // Reviews
      reviews: REVIEWS,
      addReview: (review) => {
        const newRev: ProductReview = {
          ...review,
          id: `rev-${Date.now()}`,
          date: 'Just now',
          helpfulCount: 1,
        };
        set((state) => ({ reviews: [newRev, ...state.reviews] }));
      },
      deleteReview: (reviewId) => {
        set((state) => ({ reviews: state.reviews.filter((r) => r.id !== reviewId) }));
      },

      // Orders
      currentOrder: null,
      orders: INITIAL_ORDERS,

      createOrder: (orderData) => {
        const randNum = Math.floor(1000 + Math.random() * 9000);
        const newOrderId = `DAIL-PK-${randNum}`;
        const newOrder: OrderDetails = {
          ...orderData,
          orderId: newOrderId,
          date: new Date().toISOString().split('T')[0],
          status: 'confirmed',
          courierName: 'Trax Express / TCS Pakistan',
          trackingNumber: `TRX-${Math.floor(1000000 + Math.random() * 9000000)}-PK`
        };

        set((state) => ({
          orders: [newOrder, ...state.orders],
          currentOrder: newOrder,
          cart: [],
          appliedVoucher: null,
          discountPercentage: 0
        }));

        return newOrder;
      },

      updateOrderStatus: (orderId, status, courierName, trackingNumber) => {
        set((state) => ({
          orders: state.orders.map((o) => {
            if (o.orderId === orderId) {
              return {
                ...o,
                status,
                ...(courierName ? { courierName } : {}),
                ...(trackingNumber ? { trackingNumber } : {})
              };
            }
            return o;
          }),
          currentOrder: state.currentOrder?.orderId === orderId
            ? {
                ...state.currentOrder,
                status,
                ...(courierName ? { courierName } : {}),
                ...(trackingNumber ? { trackingNumber } : {})
              }
            : state.currentOrder
        }));
      },

      deleteOrder: (orderId) => {
        set((state) => ({
          orders: state.orders.filter((o) => o.orderId !== orderId),
          currentOrder: state.currentOrder?.orderId === orderId ? null : state.currentOrder
        }));
      },

      trackOrderById: (orderIdOrPhone) => {
        const search = orderIdOrPhone.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
        if (!search) return null;
        const found = get().orders.find((o) => {
          const cleanOrderId = o.orderId.toUpperCase().replace(/[^A-Z0-9]/g, '');
          const cleanPhone = o.phone.replace(/[^0-9]/g, '');
          return cleanOrderId.includes(search) || cleanPhone.includes(search);
        });
        return found || null;
      }
    }),
    {
      name: 'dail_cosmetics_store_v5',
      partialize: (state) => ({
        products: state.products,
        categories: state.categories,
        concerns: state.concerns,
        coupons: state.coupons,
        storeSettings: state.storeSettings,
        orders: state.orders,
        reviews: state.reviews,
        wishlist: state.wishlist,
        cart: state.cart,
      }),
    }
  )
);
