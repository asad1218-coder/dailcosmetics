import type { VercelRequest, VercelResponse } from '@vercel/node';
import { cloudStorage } from './lib/storage.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const orders = await cloudStorage.getOrders();
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

      const saved = await cloudStorage.saveOrder(body);
      return res.status(201).json({
        ok: saved,
        connected: saved,
        message: saved ? 'Order saved to Cloud Database.' : 'Could not save order.',
        orderId: body.orderId
      });
    }

    if (req.method === 'PATCH') {
      const { orderId, status, trackingNumber } = body || {};
      if (!orderId || !status) {
        return res.status(400).json({ ok: false, error: 'orderId and status are required' });
      }

      const updated = await cloudStorage.updateOrderStatus(orderId, status, trackingNumber);
      return res.status(200).json({ ok: updated });
    }

    if (req.method === 'DELETE') {
      const orderId = (req.query?.orderId as string) || body?.orderId;
      if (!orderId) {
        return res.status(400).json({ ok: false, error: 'orderId is required' });
      }

      const deleted = await cloudStorage.deleteOrder(orderId);
      return res.status(200).json({ ok: deleted });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error: any) {
    return res.status(500).json({
      ok: false,
      error: error?.message || 'Orders Server Error'
    });
  }
}
