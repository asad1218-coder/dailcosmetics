import type { IncomingMessage, ServerResponse } from 'http';
import { connectToDatabase } from './lib/mongodb';

// Helper to parse JSON body from IncomingMessage
async function parseJsonBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', err => reject(err));
  });
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  try {
    const { db } = await connectToDatabase();
    if (!db) {
      res.statusCode = 200;
      res.end(JSON.stringify({
        ok: false,
        connected: false,
        message: 'MongoDB not connected. Changes saved in local browser storage only.'
      }));
      return;
    }

    const collection = db.collection('store_data');

    if (req.method === 'GET') {
      const doc = await collection.findOne({ _id: 'dail_store_state' as any });
      if (!doc) {
        res.statusCode = 200;
        res.end(JSON.stringify({
          ok: true,
          connected: true,
          data: null,
          message: 'Database is ready and waiting for initial store seed.'
        }));
        return;
      }

      const { _id, ...storeData } = doc;
      res.statusCode = 200;
      res.end(JSON.stringify({
        ok: true,
        connected: true,
        data: storeData,
        updatedAt: (doc as any).updatedAt || null
      }));
      return;
    }

    if (req.method === 'POST') {
      const body = await parseJsonBody(req);
      if (!body || typeof body !== 'object') {
        res.statusCode = 400;
        res.end(JSON.stringify({ ok: false, error: 'Invalid JSON body' }));
        return;
      }

      // Upsert into store_data collection
      const updatedAt = new Date();
      await collection.updateOne(
        { _id: 'dail_store_state' as any },
        { 
          $set: {
            ...body,
            updatedAt
          } 
        },
        { upsert: true }
      );

      res.statusCode = 200;
      res.end(JSON.stringify({
        ok: true,
        connected: true,
        message: 'Store state successfully synchronized with MongoDB Atlas cloud.',
        updatedAt
      }));
      return;
    }

    res.statusCode = 405;
    res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }));
  } catch (error: any) {
    console.error('Error in /api/sync:', error);
    res.statusCode = 500;
    res.end(JSON.stringify({
      ok: false,
      error: error?.message || 'Internal server error'
    }));
  }
}
