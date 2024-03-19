import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json(); // This contains the data sent in the POST request
    const response = await fetch(data);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const html = await response.text();
    const $ = cheerio.load(html);
    const imageLink = $('meta[property="og:image"]').attr('content');
    if (!imageLink) {
      throw new Error('No image link found');
    }
    return NextResponse.json({
      img: imageLink,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
