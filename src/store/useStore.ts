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
  Coupon,
  HeroSlide,
  CustomPage,
  FaqItem
} from '../types';
import { PRODUCTS, REVIEWS } from '../data/products';
import { apiService } from '../services/api';

export const INITIAL_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    badge: 'EXPORT QUALITY 5-DAY BEAUTY PLAN',
    title: 'ORGANIC RADIANCE WITHOUT STEROIDS',
    subtitle: 'Make your skin bright, soft, fresh, healthy & glowing without thinning or harmful mercury.',
    highlight: 'Strictly 0% Clobetasol or Bleach',
    buttonText: 'SHOP BEST SELLERS',
    secondaryButtonText: 'EXPLORE BEAUTY CREAM',
    targetCategory: 'cream',
    productIndex: 1, // Dail Beauty Cream
    image: '/images/dail_hero_banner_golden.jpg',
    bgGradient: 'from-black/85 via-stone-950/70 to-transparent',
    accentColor: '#d0473e'
  },
  {
    id: 'slide-2',
    badge: '100% PURE BOTANICAL INFUSION (120ML)',
    title: 'STOP ACUTE HAIR FALL AT THE ROOT',
    subtitle: 'Powered with cold-pressed rosemary bio-actives, mountain amla & kalonji for rapid regrowth in 14 days.',
    highlight: 'Proven Export Quality Batch',
    buttonText: 'SHOP HAIR CARE',
    secondaryButtonText: 'VIEW HERBAL HAIR OIL',
    targetCategory: 'hair-care',
    productIndex: 0, // Dail Hair Oil
    image: '/images/dail_full_collection.jpg',
    bgGradient: 'from-black/85 via-stone-950/70 to-transparent',
    accentColor: '#c59b27'
  },
  {
    id: 'slide-3',
    badge: 'CRAZY VALUE OFFERS • SAVE ON BUNDLES',
    title: 'COMPLETE 3-IN-1 REGIMEN BOX',
    subtitle: 'Full size Herbal Hair Oil (120ml) + Dail Beauty Cream + Hand & Foot Whitening Cream at special package price PKR 1,499.',
    highlight: 'Free Delivery on Rs. 2,000+ Nationwide',
    buttonText: 'CLAIM BUNDLE DEAL',
    secondaryButtonText: 'VIEW ALL OFFERS',
    targetCategory: 'bundles',
    productIndex: 4, // Complete Trio Set
    image: '/images/dail_hero_banner_golden.jpg',
    bgGradient: 'from-black/85 via-stone-950/70 to-transparent',
    accentColor: '#d0473e'
  }
];

export const INITIAL_CUSTOM_PAGES: CustomPage[] = [
  {
    id: 'page-shipping',
    title: 'Shipping & Delivery Policy',
    slug: 'shipping-policy',
    content: `### Fast Nationwide Cash On Delivery (COD)\n\nAt Dail Cosmetics, we deliver across all cities, towns, and villages of Pakistan through verified premium courier networks (Trax, TCS, Leopard, PostEx).\n\n- **Delivery Time:** Karachi, Lahore, Islamabad & Rawalpindi: 2-3 business days. All other cities & regional towns: 3-5 business days.\n- **Delivery Charges:** FREE Delivery on all orders of PKR 2,000 and above! For orders below PKR 2,000, flat fee of PKR 199 applies.\n- **Order Tracking:** As soon as your parcel is booked, you receive an automated SMS and WhatsApp update with your live tracking number.`,
    showInFooter: true,
    showInNav: false,
    updatedAt: '2026-10-11'
  },
  {
    id: 'page-returns',
    title: '7-Day Return & Exchange Guarantee',
    slug: 'return-policy',
    content: `### 100% Risk-Free Customer Promise\n\nYour satisfaction and skin safety are our highest priorities.\n\n- **7-Day Hassle-Free Exchange:** If your product arrives damaged, leaked, or incorrect, simply notify us on WhatsApp (0313 6361218) within 7 days of receiving your package.\n- **Condition:** Items must be in original condition with product packaging.\n- **Fast Resolution:** We promptly send an immediate free replacement or process a 100% instant refund via JazzCash, EasyPaisa, or Bank Transfer.`,
    showInFooter: true,
    showInNav: false,
    updatedAt: '2026-10-11'
  },
  {
    id: 'page-steroid-free',
    title: 'Our 0% Steroid & Pure Organic Pledge',
    slug: 'steroid-free-promise',
    content: `### Certified Without Steroids & Harmful Mercury\n\nUnlike conventional beauty creams in Pakistan that contain dangerous prescription steroids (Clobetasol, Betamethasone) and toxic mercury, **Dail Beauty Cream** is 100% steroid-free.\n\n- **No Skin Thinning:** Will never cause redness, capillary damage, or facial hair growth.\n- **Pure Botanical Herbs:** Herbal Hair Oil is formulated with mountain amla, kalonji, pure cold-pressed rosemary, and fenugreek bio-actives.\n- **Export Grade Testing:** Rigorously lab-inspected to meet international organic standards.`,
    showInFooter: true,
    showInNav: true,
    updatedAt: '2026-10-11'
  },
  {
    id: 'page-terms',
    title: 'Terms & Conditions',
    slug: 'terms-and-conditions',
    content: `### Store Terms & Conditions\n\nBy placing an order on Dail Cosmetics Pakistan (dailcosmetics.vercel.app or via WhatsApp 0313 6361218), you agree to our standard store terms.\n\n- All prices are listed in Pakistani Rupees (PKR).\n- We reserve the right to verify phone numbers prior to dispatch.\n- Cash on delivery orders require cash payment to the courier rider upon delivery.`,
    showInFooter: true,
    showInNav: false,
    updatedAt: '2026-10-11'
  }
];

export const INITIAL_FAQS: FaqItem[] = [
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
  },
  {
    id: 'faq-4',
    question: 'Kya Cash On Delivery (COD) available hai?',
    urduQuestion: 'کیا کیش آن ڈلیوری کی سہولت موجود ہے؟',
    answer: 'Jee haan! Cash On Delivery (COD) poore Pakistan mein 100% available hai. Aap courier rider se apna tamper-proof parcel receive karein aur doorstep par cash ada karein. Iske ilawa JazzCash, Easypaisa aur Direct Bank Transfer bhi supported hain.'
  },
  {
    id: 'faq-5',
    question: 'Kya main direct WhatsApp par order book karwa sakta hoon?',
    urduQuestion: 'کیا واٹس ایپ پر آرڈر دیا جا سکتا ہے؟',
    answer: 'Jee bilkul! Website par maujood kisi bhi "Order on WhatsApp" button par click karein ya hamari official helpline 0313 6361218 par apna naam, pata aur desired products send karein. Hamara representative foran order confirm karega.'
  },
  {
    id: 'faq-6',
    question: 'Dail Hand & Foot Cream dark knuckles aur rough heels par kab asar karti hai?',
    urduQuestion: 'ہینڈ اینڈ فٹ کریم سے کتنا جلد رزلٹ ملتا ہے؟',
    answer: 'Dail Hand & Foot Cream ka 3-Action Repair formula (Deep Moisture, Multi-Effect, Barrier Repair) 5 se 7 din ke raat ko istemal se dark knuckles, tanned haath paon aur cracked heels ko bohot tezi se naram aur glowing banata hai.'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  { id: 'c-1', code: 'ORGANIC10', discountPercentage: 10, minOrderAmount: 0, isActive: true, usageCount: 42 },
  { id: 'c-2', code: 'DAIL20', discountPercentage: 20, minOrderAmount: 2000, isActive: true, usageCount: 78 },
  { id: 'c-3', code: 'EID15', discountPercentage: 15, minOrderAmount: 1500, isActive: true, usageCount: 31 },
  { id: 'c-4', code: 'GLOW5', discountPercentage: 5, minOrderAmount: 0, isActive: true, usageCount: 15 },
];

export const INITIAL_CATEGORIES: CategoryItem[] = [
  { id: 'cat-all', name: 'All Products', slug: 'all', icon: '🛍️', description: 'Complete organic hair and skincare range' },
  { id: 'cat-creams', name: 'Dail Beauty Cream', slug: 'cream', icon: '🧴', description: 'Steroid-free anti-aging & daily radiance cream (PKR 350)', image: '/images/cat_tile_beauty_cream.jpg' },
  { id: 'cat-hair', name: 'Herbal Hair Oil', slug: 'hair-care', icon: '🌿', description: '100% natural essential oils & mixed herbs (PKR 999)', image: '/images/cat_tile_hair_oil.jpg' },
  { id: 'cat-handfoot', name: 'Hand & Foot Care', slug: 'cream', icon: '🦶', description: '3-Action repair for knuckles and heels (PKR 350)', image: '/images/cat_tile_hand_foot.jpg' },
  { id: 'cat-bundles', name: 'Value Bundles & Deals', slug: 'bundles', icon: '🎁', description: 'Exclusive value duo & trio kits with nationwide delivery', image: '/images/cat_tile_trio.jpg' },
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
  tiktokUrl1: 'https://www.tiktok.com/@dailcosmetics?_t=8olPFWJTJLT&_r=1',
  tiktokUrl2: 'https://www.tiktok.com/@dailcosmetics',
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

  // Hero Banners & Slider Management
  heroSlides: HeroSlide[];
  addHeroSlide: (slide: Omit<HeroSlide, 'id'>) => void;
  updateHeroSlide: (id: string, updates: Partial<HeroSlide>) => void;
  deleteHeroSlide: (id: string) => void;
  resetHeroSlidesToDefault: () => void;

  // Custom Pages Management
  customPages: CustomPage[];
  activeCustomPageSlug: string | null;
  setActiveCustomPageSlug: (slug: string | null) => void;
  addCustomPage: (page: Omit<CustomPage, 'id' | 'updatedAt'>) => void;
  updateCustomPage: (id: string, updates: Partial<CustomPage>) => void;
  deleteCustomPage: (id: string) => void;
  navigateToCustomPage: (slug: string) => void;

  // Store FAQs Management
  faqs: FaqItem[];
  addFaq: (faq: Omit<FaqItem, 'id'>) => void;
  updateFaq: (id: string, updates: Partial<FaqItem>) => void;
  deleteFaq: (id: string) => void;

  // Store Configuration & Settings
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
  updateCategory: (idOrSlug: string, updates: Partial<CategoryItem>) => void;
  deleteCategory: (idOrSlug: string) => void;
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

  // Cloud Database Sync (MongoDB Atlas)
  cloudConnected: boolean;
  cloudConfigured: boolean;
  isSyncing: boolean;
  lastSyncedAt: string | null;
  cloudMessage: string;
  checkCloudStatus: () => Promise<void>;
  syncFromCloud: () => Promise<void>;
  syncToCloud: () => Promise<void>;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cloud Database Sync (MongoDB Atlas)
      cloudConnected: false,
      cloudConfigured: false,
      isSyncing: false,
      lastSyncedAt: null,
      cloudMessage: 'Connecting to MongoDB Atlas...',

      checkCloudStatus: async () => {
        const health = await apiService.checkHealth();
        set({
          cloudConnected: health.connected,
          cloudConfigured: health.configured,
          cloudMessage: health.message,
        });
      },

      syncFromCloud: async () => {
        set({ isSyncing: true });
        try {
          const health = await apiService.checkHealth();
          set({
            cloudConnected: health.connected,
            cloudConfigured: health.configured,
            cloudMessage: health.message,
          });

          if (health.connected) {
            const result = await apiService.fetchStoreData();
            if (result.ok) {
              if (result.data) {
                set((state) => ({
                  products: result.data?.products?.length ? result.data.products : state.products,
                  categories: result.data?.categories?.length ? result.data.categories : state.categories,
                  storeSettings: result.data?.storeSettings ? result.data.storeSettings : state.storeSettings,
                  heroSlides: result.data?.heroSlides?.length ? result.data.heroSlides : state.heroSlides,
                  coupons: result.data?.coupons?.length ? result.data.coupons : state.coupons,
                  reviews: result.data?.reviews?.length ? result.data.reviews : state.reviews,
                  faqs: result.data?.faqs?.length ? result.data.faqs : state.faqs,
                  customPages: result.data?.customPages?.length ? result.data.customPages : state.customPages,
                  lastSyncedAt: new Date().toLocaleTimeString(),
                }));
              } else {
                // Empty database: initial seed
                const current = get();
                await apiService.pushStoreData({
                  products: current.products,
                  categories: current.categories,
                  storeSettings: current.storeSettings,
                  heroSlides: current.heroSlides,
                  coupons: current.coupons,
                  reviews: current.reviews,
                  faqs: current.faqs,
                  customPages: current.customPages,
                });
                set({ lastSyncedAt: new Date().toLocaleTimeString() });
              }
            }

            // Sync orders from MongoDB
            const cloudOrders = await apiService.fetchOrders();
            if (cloudOrders && cloudOrders.length > 0) {
              set({ orders: cloudOrders });
            }
          }
        } catch (err) {
          console.warn('Sync failed:', err);
        } finally {
          set({ isSyncing: false });
        }
      },

      syncToCloud: async () => {
        set({ isSyncing: true });
        try {
          const current = get();
          const res = await apiService.pushStoreData({
            products: current.products,
            categories: current.categories,
            storeSettings: current.storeSettings,
            heroSlides: current.heroSlides,
            coupons: current.coupons,
            reviews: current.reviews,
            faqs: current.faqs,
            customPages: current.customPages,
            orders: current.orders,
          });
          if (res.connected) {
            set({
              cloudConnected: true,
              lastSyncedAt: new Date().toLocaleTimeString(),
            });
          }
        } finally {
          set({ isSyncing: false });
        }
      },
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

      // Hero Banners & Slider Management
      heroSlides: INITIAL_HERO_SLIDES,
      addHeroSlide: (slide) => {
        const newSlide: HeroSlide = {
          ...slide,
          id: `slide-${Date.now()}`
        };
        set((state) => ({ heroSlides: [...state.heroSlides, newSlide] }));
      },
      updateHeroSlide: (id, updates) => {
        set((state) => ({
          heroSlides: state.heroSlides.map((s) => (s.id === id ? { ...s, ...updates } : s))
        }));
      },
      deleteHeroSlide: (id) => {
        set((state) => ({
          heroSlides: state.heroSlides.filter((s) => s.id !== id)
        }));
      },
      resetHeroSlidesToDefault: () => {
        set({ heroSlides: INITIAL_HERO_SLIDES });
      },

      // Custom Pages Management
      customPages: INITIAL_CUSTOM_PAGES,
      activeCustomPageSlug: null,
      setActiveCustomPageSlug: (slug) => set({ activeCustomPageSlug: slug }),
      addCustomPage: (page) => {
        const newPage: CustomPage = {
          ...page,
          id: `page-${Date.now()}`,
          updatedAt: new Date().toISOString().split('T')[0]
        };
        set((state) => ({ customPages: [...state.customPages, newPage] }));
      },
      updateCustomPage: (id, updates) => {
        set((state) => ({
          customPages: state.customPages.map((p) =>
            p.id === id
              ? { ...p, ...updates, updatedAt: new Date().toISOString().split('T')[0] }
              : p
          )
        }));
      },
      deleteCustomPage: (id) => {
        set((state) => ({
          customPages: state.customPages.filter((p) => p.id !== id)
        }));
      },
      navigateToCustomPage: (slug) => {
        set({ activeCustomPageSlug: slug, currentPage: 'custom-page' });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },

      // FAQs Management
      faqs: INITIAL_FAQS,
      addFaq: (faq) => {
        const newFaq: FaqItem = {
          ...faq,
          id: `faq-${Date.now()}`
        };
        set((state) => ({ faqs: [...state.faqs, newFaq] }));
      },
      updateFaq: (id, updates) => {
        set((state) => ({
          faqs: state.faqs.map((f) => (f.id === id ? { ...f, ...updates } : f))
        }));
      },
      deleteFaq: (id) => {
        set((state) => ({
          faqs: state.faqs.filter((f) => f.id !== id)
        }));
      },

      // Store Settings
      storeSettings: INITIAL_SETTINGS,
      updateStoreSettings: (updates) => {
        set((state) => {
          const newSettings = {
            ...state.storeSettings,
            ...updates,
            tiktokUrl: updates.tiktokUrl1 || updates.tiktokUrl || state.storeSettings.tiktokUrl,
            tiktokUrl1: updates.tiktokUrl1 !== undefined ? updates.tiktokUrl1 : (state.storeSettings.tiktokUrl1 || state.storeSettings.tiktokUrl),
            tiktokUrl2: updates.tiktokUrl2 !== undefined ? updates.tiktokUrl2 : (state.storeSettings.tiktokUrl2 || '')
          };
          apiService.debouncedPushStoreData({ storeSettings: newSettings });
          return { storeSettings: newSettings };
        });
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

        set((state) => {
          const newProducts = [newProduct, ...state.products];
          apiService.debouncedPushStoreData({ products: newProducts });
          return { products: newProducts };
        });
        return newProduct;
      },

      updateProduct: (id, updates) => {
        set((state) => {
          const updatedProducts = state.products.map((p) => (p.id === id ? { ...p, ...updates } : p));
          apiService.debouncedPushStoreData({ products: updatedProducts });
          return {
            products: updatedProducts,
            selectedProduct: state.selectedProduct?.id === id ? { ...state.selectedProduct, ...updates } : state.selectedProduct
          };
        });
      },

      deleteProduct: (id) => {
        set((state) => {
          const remainingProducts = state.products.filter((p) => p.id !== id);
          apiService.debouncedPushStoreData({ products: remainingProducts });
          return {
            products: remainingProducts,
            cart: state.cart.filter((item) => item.product.id !== id),
            wishlist: state.wishlist.filter((wId) => wId !== id),
            selectedProduct: state.selectedProduct?.id === id ? remainingProducts[0] || null : state.selectedProduct,
            quickViewProduct: state.quickViewProduct?.id === id ? null : state.quickViewProduct
          };
        });
      },

      toggleProductStock: (id) => {
        set((state) => {
          const updated = state.products.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p));
          apiService.debouncedPushStoreData({ products: updated });
          return { products: updated };
        });
      },

      resetProductsToDefault: () => {
        set({
          products: PRODUCTS,
          categories: INITIAL_CATEGORIES,
          concerns: INITIAL_CONCERNS,
          storeSettings: INITIAL_SETTINGS
        });
        apiService.debouncedPushStoreData({
          products: PRODUCTS,
          categories: INITIAL_CATEGORIES,
          storeSettings: INITIAL_SETTINGS
        });
      },

      // Categories & Concerns
      categories: INITIAL_CATEGORIES,
      addCategory: (cat) => {
        const slug = cat.slug || cat.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
        const newCat: CategoryItem = {
          ...cat,
          slug,
          id: `cat-${Date.now()}`
        };
        set((state) => {
          const updated = [...state.categories, newCat];
          apiService.debouncedPushStoreData({ categories: updated });
          return { categories: updated };
        });
      },
      updateCategory: (idOrSlug, updates) => {
        set((state) => {
          const updated = state.categories.map((c) =>
            c.id === idOrSlug || c.slug === idOrSlug ? { ...c, ...updates } : c
          );
          apiService.debouncedPushStoreData({ categories: updated });
          return { categories: updated };
        });
      },
      deleteCategory: (idOrSlug) => {
        if (idOrSlug === 'all' || idOrSlug === 'cat-all') return;
        set((state) => {
          const target = state.categories.find((c) => c.id === idOrSlug || c.slug === idOrSlug);
          const targetSlug = target ? target.slug : idOrSlug;
          const updated = state.categories.filter((c) => c.id !== idOrSlug && c.slug !== idOrSlug);
          apiService.debouncedPushStoreData({ categories: updated });
          return {
            categories: updated,
            selectedCategory: state.selectedCategory === targetSlug ? 'all' : state.selectedCategory
          };
        });
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

        // Persist order to MongoDB Atlas cloud database
        apiService.saveOrder(newOrder);

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

        // Update in MongoDB Atlas
        apiService.updateOrderStatus(orderId, status, trackingNumber);
      },

      deleteOrder: (orderId) => {
        set((state) => ({
          orders: state.orders.filter((o) => o.orderId !== orderId),
          currentOrder: state.currentOrder?.orderId === orderId ? null : state.currentOrder
        }));

        // Delete from MongoDB Atlas
        apiService.deleteOrder(orderId);
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
      name: 'dail_cosmetics_store_v6',
      partialize: (state) => ({
        products: state.products,
        categories: state.categories,
        concerns: state.concerns,
        coupons: state.coupons,
        storeSettings: state.storeSettings,
        heroSlides: state.heroSlides,
        customPages: state.customPages,
        faqs: state.faqs,
        orders: state.orders,
        reviews: state.reviews,
        wishlist: state.wishlist,
        cart: state.cart,
      }),
    }
  )
);

// Auto-connect and sync with MongoDB Atlas on client load
if (typeof window !== 'undefined') {
  setTimeout(() => {
    useStore.getState().syncFromCloud();
  }, 350);

  // Sync on tab focus so updates from client or another admin show immediately
  window.addEventListener('focus', () => {
    useStore.getState().syncFromCloud();
  });
}

