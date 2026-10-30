import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from './lib/mongodb.js';

declare const process: any;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { db } = await connectToDatabase();
    if (!db) {
      const isConfigured = Boolean(typeof process !== 'undefined' && process.env?.MONGODB_URI);
      return res.status(200).json({
        connected: false,
        configured: isConfigured,
        message: isConfigured
          ? 'MongoDB URI is configured but connection failed. Please verify Network Access IP whitelist (allow 0.0.0.0/0).'
          : 'MONGODB_URI is not set in Vercel Environment Variables. Running in local offline mode.'
      });
    }

    await db.command({ ping: 1 });

    return res.status(200).json({
      connected: true,
      configured: true,
      database: db.databaseName,
      message: 'MongoDB Atlas is successfully connected and online!'
    });
  } catch (error: any) {
    return res.status(500).json({
      connected: false,
      error: error?.message || 'Database error'
    });
  }
}
