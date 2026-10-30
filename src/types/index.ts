export type ProductCategory = string;

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  description?: string;
  image?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercentage: number;
  minOrderAmount?: number;
  isActive: boolean;
  usageCount: number;
}

export interface StoreSettings {
  whatsappNumber: string; // "0313 6361218"
  email: string; // "dailcosmeticscht@gmail.com"
  facebookUrl?: string;
  tiktokUrl?: string;
  tiktokUrl1?: string;
  tiktokUrl2?: string;
  instagramUrl?: string;
  adminPassword?: string; // "dail@2026"
  announcementText: string;
  freeShippingThreshold: number;
  flatShippingFee: number;
  brandTagline: string;
  businessAddress: string;
}

export interface ProductReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  verified: boolean;
  comment: string;
  helpfulCount: number;
}

export interface Product {
  id: string;
  name: string;
  urduName?: string;
  tagline: string;
  category: ProductCategory;
  concern: string[];
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: 'Best Seller' | 'New' | '100% Organic' | 'Top Rated' | 'Without Steroid' | string;
  volume: string;
  image: string;
  galleryImages: string[];
  description: string;
  benefits: string[];
  keyIngredients: {
    name: string;
    description: string;
    icon?: string;
  }[];
  howToUse: string[];
  fullIngredients: string;
  inStock: boolean;
  modelType: 'oil' | 'beauty-cream' | 'hand-foot' | 'bottle' | 'jar' | 'spray';
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVolume?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderDetails {
  orderId: string;
  date: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  paymentMethod: 'cod' | 'jazzcash' | 'easypaisa' | 'bank_transfer';
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  status: 'confirmed' | 'processing' | 'dispatched' | 'delivered' | 'cancelled';
  courierName?: string;
  trackingNumber?: string;
  transactionId?: string;
}

export interface VideoTestimonial {
  id: string;
  title: string;
  author: string;
  city: string;
  productName: string;
  duration: string;
  thumbnailUrl: string;
  quote: string;
}

export interface HeroSlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  highlight: string;
  buttonText: string;
  secondaryButtonText: string;
  targetCategory: string;
  productIndex?: number;
  image: string;
  bgGradient?: string;
  accentColor?: string;
}

export interface CustomPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  showInFooter: boolean;
  showInNav: boolean;
  updatedAt: string;
}

export interface FaqItem {
  id: string;
  question: string;
  urduQuestion?: string;
  answer: string;
}

export type PageView = 
  | 'home' 
  | 'shop' 
  | 'product-detail' 
  | 'checkout' 
  | 'track-order' 
  | 'wishlist' 
  | 'about' 
  | 'contact' 
  | 'admin'
  | 'custom-page';
