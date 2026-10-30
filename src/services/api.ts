import type { 
  Product, 
  CategoryItem, 
  StoreSettings, 
  HeroSlide, 
  Coupon, 
  ProductReview, 
  FaqItem, 
  CustomPage, 
  OrderDetails 
} from '../types';

export interface CloudStorePayload {
  products?: Product[];
  categories?: CategoryItem[];
  storeSettings?: StoreSettings;
  heroSlides?: HeroSlide[];
  coupons?: Coupon[];
  reviews?: ProductReview[];
  faqs?: FaqItem[];
  customPages?: CustomPage[];
  orders?: OrderDetails[];
}

export interface CloudHealthStatus {
  connected: boolean;
  configured: boolean;
  database?: string;
  message: string;
}

// In-flight sync debounce timer
let syncDebounceTimer: ReturnType<typeof setTimeout> | null = null;
let pendingPayload: CloudStorePayload = {};

export const apiService = {
  // Check MongoDB connection status
  async checkHealth(): Promise<CloudHealthStatus> {
    try {
      const res = await fetch('/api/health');
      if (!res.ok) {
        return {
          connected: false,
          configured: false,
          message: `Server returned status ${res.status}`
        };
      }
      return await res.json();
    } catch {
      return {
        connected: false,
        configured: false,
        message: 'Could not reach serverless API (Running in local offline mode)'
      };
    }
  },

  // Pull latest synchronized store data from MongoDB Atlas
  async fetchStoreData(): Promise<{ ok: boolean; connected: boolean; data?: CloudStorePayload; updatedAt?: string }> {
    try {
      const res = await fetch('/api/sync');
      if (!res.ok) return { ok: false, connected: false };
      return await res.json();
    } catch (err) {
      console.warn('Could not sync with MongoDB Atlas:', err);
      return { ok: false, connected: false };
    }
  },

  // Push immediate update to MongoDB Atlas
  async pushStoreData(payload: CloudStorePayload): Promise<{ ok: boolean; connected: boolean }> {
    try {
      const res = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) return { ok: false, connected: false };
      return await res.json();
    } catch (err) {
      console.warn('Failed to save to MongoDB Atlas:', err);
      return { ok: false, connected: false };
    }
  },

  // Debounced push for frequent edits (e.g. typing in forms)
  debouncedPushStoreData(payload: CloudStorePayload, delay = 1000): Promise<void> {
    pendingPayload = { ...pendingPayload, ...payload };
    return new Promise((resolve) => {
      if (syncDebounceTimer) clearTimeout(syncDebounceTimer);
      syncDebounceTimer = setTimeout(async () => {
        const toSend = { ...pendingPayload };
        pendingPayload = {};
        await this.pushStoreData(toSend);
        resolve();
      }, delay);
    });
  },

  // Orders API
  async fetchOrders(): Promise<OrderDetails[]> {
    try {
      const res = await fetch('/api/orders');
      if (!res.ok) return [];
      const json = await res.json();
      return json.orders || [];
    } catch {
      return [];
    }
  },

  async saveOrder(order: OrderDetails): Promise<boolean> {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  async updateOrderStatus(orderId: string, status: OrderDetails['status'], trackingNumber?: string): Promise<boolean> {
    try {
      const res = await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status, trackingNumber })
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  async deleteOrder(orderId: string): Promise<boolean> {
    try {
      const res = await fetch('/api/orders', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId })
      });
      return res.ok;
    } catch {
      return false;
    }
  }
};
