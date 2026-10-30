import type { IncomingMessage, ServerResponse } from 'http';
import { connectToDatabase } from './lib/mongodb';

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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
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
        orders: [],
        message: 'MongoDB not connected. Running in local mode.'
      }));
      return;
    }

    const collection = db.collection('orders');

    if (req.method === 'GET') {
      const orders = await collection
        .find({})
        .sort({ createdAt: -1 })
        .limit(200)
        .toArray();

      res.statusCode = 200;
      res.end(JSON.stringify({
        ok: true,
        connected: true,
        orders
      }));
      return;
    }

    if (req.method === 'POST') {
      const order = await parseJsonBody(req);
      if (!order || !order.orderId) {
        res.statusCode = 400;
        res.end(JSON.stringify({ ok: false, error: 'orderId is required' }));
        return;
      }

      await collection.updateOne(
        { orderId: order.orderId },
        { $set: { ...order, updatedAt: new Date() } },
        { upsert: true }
      );

      res.statusCode = 201;
      res.end(JSON.stringify({
        ok: true,
        connected: true,
        message: 'Order saved to MongoDB Atlas.',
        orderId: order.orderId
      }));
      return;
    }

    if (req.method === 'PATCH') {
      const { orderId, status, trackingNumber } = await parseJsonBody(req);
      if (!orderId) {
        res.statusCode = 400;
        res.end(JSON.stringify({ ok: false, error: 'orderId is required' }));
        return;
      }

      const updateFields: any = { updatedAt: new Date() };
      if (status) updateFields.status = status;
      if (trackingNumber !== undefined) updateFields.trackingNumber = trackingNumber;

      await collection.updateOne(
        { orderId },
        { $set: updateFields }
      );

      res.statusCode = 200;
      res.end(JSON.stringify({ ok: true, connected: true }));
      return;
    }

    if (req.method === 'DELETE') {
      const { orderId } = await parseJsonBody(req);
      if (orderId) {
        await collection.deleteOne({ orderId });
      }
      res.statusCode = 200;
      res.end(JSON.stringify({ ok: true, connected: true }));
      return;
    }

    res.statusCode = 405;
    res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }));
  } catch (error: any) {
    console.error('Error in /api/orders:', error);
    res.statusCode = 500;
    res.end(JSON.stringify({
      ok: false,
      error: error?.message || 'Internal server error'
    }));
  }
}
