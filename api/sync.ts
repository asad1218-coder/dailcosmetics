import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from './lib/mongodb';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { db } = await connectToDatabase();
    if (!db) {
      return res.status(200).json({
        ok: false,
        connected: false,
        message: 'MongoDB not connected. Changes saved in local browser storage only.'
      });
    }

    const collection = db.collection('store_data');

    if (req.method === 'GET') {
      const doc = await collection.findOne({ _id: 'dail_store_state' as any });
      if (!doc) {
        return res.status(200).json({
          ok: true,
          connected: true,
          data: null,
          message: 'Database is ready and waiting for initial store seed.'
        });
      }

      const { _id, ...storeData } = doc;
      return res.status(200).json({
        ok: true,
        connected: true,
        data: storeData,
        updatedAt: (doc as any).updatedAt || null
      });
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      if (!body || typeof body !== 'object') {
        return res.status(400).json({ ok: false, error: 'Invalid JSON body' });
      }

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

      return res.status(200).json({
        ok: true,
        connected: true,
        message: 'Store state successfully synchronized with MongoDB Atlas cloud.',
        updatedAt
      });
    }

    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  } catch (error: any) {
    console.error('Error in /api/sync:', error);
    return res.status(500).json({
      ok: false,
      error: error?.message || 'Internal server error'
    });
  }
}
