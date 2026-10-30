import { MongoClient, Db } from 'mongodb';

declare const process: any;

const uri: string = (typeof process !== 'undefined' && process.env?.MONGODB_URI) || '';
const dbName: string = (typeof process !== 'undefined' && process.env?.MONGODB_DB) || 'dail_cosmetics';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<{ client: MongoClient | null; db: Db | null }> {
  if (!uri) {
    return { client: null, db: null };
  }

  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    const client = new MongoClient(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    } as any);

    await client.connect();
    const db = client.db(dbName);

    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error('Failed to connect to MongoDB Atlas:', error);
    return { client: null, db: null };
  }
}
