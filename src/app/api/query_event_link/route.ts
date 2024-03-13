import type { NextApiRequest, NextApiResponse } from 'next';
import * as cheerio from 'cheerio';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../lib/supabase';
import { getFrameHtmlResponse } from '@coinbase/onchainkit';

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

    return NextResponse.json({
      img: imageLink,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
