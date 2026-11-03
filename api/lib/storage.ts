import { connectToDatabase } from './mongodb.js';

declare const process: any;

interface CloudStorageResult<T = any> {
  ok: boolean;
  connected: boolean;
  data?: T;
  type?: 'vercel-kv' | 'mongodb' | 'none';
  message?: string;
  updatedAt?: string | null;
}

// ---------------------------------------------------------------------------
// Vercel KV / Upstash REST Helpers
// ---------------------------------------------------------------------------
function getKvConfig() {
  const url = (typeof process !== 'undefined' && process.env?.KV_REST_API_URL) || '';
  const token = (typeof process !== 'undefined' && process.env?.KV_REST_API_TOKEN) || '';
  return url && token ? { url, token } : null;
}

async function kvGet<T>(key: string): Promise<T | null> {
  const kv = getKvConfig();
  if (!kv) return null;
  try {
    const res = await fetch(`${kv.url}/get/${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${kv.token}` },
      cache: 'no-store'
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (json.result === null || json.result === undefined) return null;
    return typeof json.result === 'string' ? JSON.parse(json.result) : json.result;
  } catch (err) {
    console.error('Vercel KV GET error:', err);
    return null;
  }
}

async function kvSet(key: string, value: any): Promise<boolean> {
  const kv = getKvConfig();
  if (!kv) return false;
  try {
    const serialized = JSON.stringify(value);
    const res = await fetch(`${kv.url}/set/${encodeURIComponent(key)}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${kv.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(serialized)
    });
    return res.ok;
  } catch (err) {
    console.error('Vercel KV SET error:', err);
    return false;
  }
}

// ---------------------------------------------------------------------------
// Unified Cloud Storage Interface
// ---------------------------------------------------------------------------
export const cloudStorage = {
  // Check health and active database type
  async checkHealth(): Promise<{ connected: boolean; configured: boolean; type: string; message: string }> {
    const kv = getKvConfig();
    if (kv) {
      try {
        const res = await fetch(`${kv.url}/ping`, {
          headers: { Authorization: `Bearer ${kv.token}` }
        });
        if (res.ok) {
          return {
            connected: true,
            configured: true,
            type: 'Vercel KV (Upstash Redis)',
            message: 'Vercel KV Cloud Database is active, fast, and multi-device synced!'
          };
        }
      } catch (err: any) {
        return {
          connected: false,
          configured: true,
          type: 'Vercel KV',
          message: `Vercel KV ping failed: ${err?.message}`
        };
      }
    }

    // Fallback check: MongoDB
    const isMongoConfigured = Boolean(typeof process !== 'undefined' && process.env?.MONGODB_URI);
    if (isMongoConfigured) {
      try {
        const { db } = await connectToDatabase();
        if (db) {
          await db.command({ ping: 1 });
          return {
            connected: true,
            configured: true,
            type: 'MongoDB Atlas',
            message: 'MongoDB Atlas is successfully connected and online!'
          };
        }
        return {
          connected: false,
          configured: true,
          type: 'MongoDB Atlas',
          message: 'MongoDB URI is configured but connection failed (Check Network Access 0.0.0.0/0).'
        };
      } catch (err: any) {
        return {
          connected: false,
          configured: true,
          type: 'MongoDB Atlas',
          message: `MongoDB error: ${err?.message}`
        };
      }
    }

    return {
      connected: false,
      configured: false,
      type: 'none',
      message: 'No cloud database configured. Connect 1-click Vercel KV or add MONGODB_URI in Vercel settings.'
    };
  },

  // Get Store Data
  async getStoreData(): Promise<CloudStorageResult> {
    const kv = getKvConfig();
    if (kv) {
      const doc = await kvGet<any>('dail_store_state');
      return {
        ok: true,
        connected: true,
        type: 'vercel-kv',
        data: doc || null,
        updatedAt: doc?.updatedAt || null
      };
    }

    const { db } = await connectToDatabase();
    if (db) {
      const collection = db.collection('store_data');
      const doc = await collection.findOne({ _id: 'dail_store_state' as any });
      if (!doc) {
        return { ok: true, connected: true, type: 'mongodb', data: null };
      }
      const { _id, ...storeData } = doc;
      return {
        ok: true,
        connected: true,
        type: 'mongodb',
        data: storeData,
        updatedAt: (doc as any).updatedAt || null
      };
    }

    return {
      ok: false,
      connected: false,
      type: 'none',
      message: 'No cloud database connected.'
    };
  },

  // Save Store Data
  async setStoreData(payload: any): Promise<CloudStorageResult> {
    const updatedAt = new Date().toISOString();
    const toSave = { ...payload, updatedAt };

    const kv = getKvConfig();
    if (kv) {
      const success = await kvSet('dail_store_state', toSave);
      return {
        ok: success,
        connected: success,
        type: 'vercel-kv',
        message: success ? 'Saved to Vercel KV' : 'Failed to save to Vercel KV'
      };
    }

    const { db } = await connectToDatabase();
    if (db) {
      const collection = db.collection('store_data');
      await collection.updateOne(
        { _id: 'dail_store_state' as any },
        { $set: toSave },
        { upsert: true }
      );
      return { ok: true, connected: true, type: 'mongodb' };
    }

    return { ok: false, connected: false, type: 'none' };
  },

  // Get Orders
  async getOrders(): Promise<any[]> {
    const kv = getKvConfig();
    if (kv) {
      const orders = await kvGet<any[]>('dail_orders');
      return Array.isArray(orders) ? orders : [];
    }

    const { db } = await connectToDatabase();
    if (db) {
      const collection = db.collection('orders');
      return await collection.find({}).sort({ createdAt: -1 }).limit(200).toArray();
    }

    return [];
  },

  // Save Order
  async saveOrder(order: any): Promise<boolean> {
    const kv = getKvConfig();
    if (kv) {
      const existing = (await kvGet<any[]>('dail_orders')) || [];
      const updated = [order, ...existing.filter((o) => o.orderId !== order.orderId)];
      return await kvSet('dail_orders', updated);
    }

    const { db } = await connectToDatabase();
    if (db) {
      const collection = db.collection('orders');
      await collection.updateOne(
        { orderId: order.orderId },
        { $set: { ...order, updatedAt: new Date() } },
        { upsert: true }
      );
      return true;
    }

    return false;
  },

  // Update Order Status
  async updateOrderStatus(orderId: string, status: string, trackingNumber?: string): Promise<boolean> {
    const kv = getKvConfig();
    if (kv) {
      const existing = (await kvGet<any[]>('dail_orders')) || [];
      const updated = existing.map((o) =>
        o.orderId === orderId ? { ...o, status, ...(trackingNumber ? { trackingNumber } : {}) } : o
      );
      return await kvSet('dail_orders', updated);
    }

    const { db } = await connectToDatabase();
    if (db) {
      const collection = db.collection('orders');
      await collection.updateOne(
        { orderId },
        { $set: { status, ...(trackingNumber ? { trackingNumber } : {}), updatedAt: new Date() } }
      );
      return true;
    }

    return false;
  },

  // Delete Order
  async deleteOrder(orderId: string): Promise<boolean> {
    const kv = getKvConfig();
    if (kv) {
      const existing = (await kvGet<any[]>('dail_orders')) || [];
      const updated = existing.filter((o) => o.orderId !== orderId);
      return await kvSet('dail_orders', updated);
    }

    const { db } = await connectToDatabase();
    if (db) {
      const collection = db.collection('orders');
      await collection.deleteOne({ orderId });
      return true;
    }

    return false;
  }
};
