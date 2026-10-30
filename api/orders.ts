import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from './lib/mongodb';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
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
        orders: [],
        message: 'MongoDB not connected. Running in local mode.'
      });
    }

    const collection = db.collection('orders');

    if (req.method === 'GET') {
      const orders = await collection
        .find({})
        .sort({ createdAt: -1 })
        .limit(200)
        .toArray();

      return res.status(200).json({
        ok: true,
        connected: true,
        orders
      });
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    if (req.method === 'POST') {
      if (!body || !body.orderId) {
        return res.status(400).json({ ok: false, error: 'orderId is required' });
      }

      await collection.updateOne(
        { orderId: body.orderId },
        { $set: { ...body, updatedAt: new Date() } },
        { upsert: true }
      );

      return res.status(201).json({
        ok: true,
        connected: true,
        message: 'Order saved to MongoDB Atlas.',
        orderId: body.orderId
      });
    }

    if (req.method === 'PATCH') {
      const { orderId, status, trackingNumber } = body || {};
      if (!orderId) {
        return res.status(400).json({ ok: false, error: 'orderId is required' });
      }

      const updateFields: any = { updatedAt: new Date() };
      if (status) updateFields.status = status;
      if (trackingNumber !== undefined) updateFields.trackingNumber = trackingNumber;

      await collection.updateOne(
        { orderId },
        { $set: updateFields }
      );

      return res.status(200).json({ ok: true, connected: true });
    }

    if (req.method === 'DELETE') {
      const { orderId } = body || {};
      if (orderId) {
        await collection.deleteOne({ orderId });
      }
      return res.status(200).json({ ok: true, connected: true });
    }

    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  } catch (error: any) {
    console.error('Error in /api/orders:', error);
    return res.status(500).json({
      ok: false,
      error: error?.message || 'Internal server error'
    });
  }
}
