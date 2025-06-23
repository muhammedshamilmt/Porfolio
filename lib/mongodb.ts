import { MongoClient, Db, Collection } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if (!uri) throw new Error('Missing MONGODB_URI env');
if (!dbName) throw new Error('Missing MONGODB_DB env');

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function getMongoClient(): Promise<MongoClient> {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

export async function getDb(): Promise<Db> {
  if (cachedDb) return cachedDb;
  const client = await getMongoClient();
  const db = client.db(dbName);
  cachedDb = db;
  return db;
}

export async function getCollection<T = any>(collectionName: string): Promise<Collection<T>> {
  const db = await getDb();
  return db.collection<T>(collectionName);
} 