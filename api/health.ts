import type { IncomingMessage, ServerResponse } from 'http';
import { connectToDatabase } from './lib/mongodb';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
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
        connected: false,
        configured: Boolean(process.env.MONGODB_URI),
        message: process.env.MONGODB_URI 
          ? 'MongoDB URI is configured but connection failed. Please check IP access whitelist (allow 0.0.0.0/0).'
          : 'MONGODB_URI is not set in Vercel Environment Variables. Currently running in local offline mode.'
      }));
      return;
    }

    // Ping the database
    await db.command({ ping: 1 });

    res.statusCode = 200;
    res.end(JSON.stringify({
      connected: true,
      configured: true,
      database: db.databaseName,
      message: 'MongoDB Atlas is successfully connected and online!'
    }));
  } catch (error: any) {
    res.statusCode = 500;
    res.end(JSON.stringify({
      connected: false,
      error: error?.message || 'Database error'
    }));
  }
}
