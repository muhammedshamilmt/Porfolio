import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';

const COLLECTION_NAME = 'messages';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, subject, message } = data;
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    let collection;
    try {
      collection = await getCollection(COLLECTION_NAME);
    } catch (err: any) {
      return NextResponse.json({ error: err.message || 'Database connection error.' }, { status: 500 });
    }

    const newMessage = {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
      status: 'new',
      priority: 'medium',
    };

    await collection.insertOne(newMessage);

    return NextResponse.json({ success: true, message: 'Message stored successfully.' });
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const collection = await getCollection(COLLECTION_NAME);
    const messages = await collection.find({}).sort({ timestamp: -1 }).toArray();
    return NextResponse.json({ messages });
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error.' }, { status: 500 });
  }
}

export async function OPTIONS() {
  // Allow CORS preflight
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
} 