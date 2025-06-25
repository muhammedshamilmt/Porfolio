import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://muhammedshamilmt.vercel.app/'; // Change to your actual domain
  const pages = [
    '', // homepage
    'gallery',
    'projects',
    'contact',
  ];

  const urls = pages.map(
    (page) => `  <url>\n    <loc>${baseUrl}/${page}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${page === '' ? '1.0' : '0.7'}</priority>\n  </url>`
  ).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  });
} 