import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import cryptoRandomString from 'crypto-random-string';
import { supabase } from '../../lib/supabase';
import { getServerSession } from 'next-auth';
import { authConfig } from '../../lib/auth';

type ResponseData = {
  id: number;
  blog: string;
  created_at: string;
};

export async function POST(req: NextRequest) {
  const data = await req?.json(); // This contains the data sent in the POST request
  const session = await getServerSession(authConfig);
  const id = cryptoRandomString({ length: 6, type: 'distinguishable' });
  const res = await supabase.from('events').insert({
    id: id,
    event: data.blogLink,
    image_link: data.linkResult.img,
    user_email: session?.user?.email,
  });
  if (res.error) {
    // Handle other errors
    return NextResponse.json({ error: res.error }, { status: 409 });
  }
  return NextResponse.json({
    id: id,
    message: res.statusText,
  });
}

export async function GET(req: NextRequest, res: NextApiResponse) {
  const session = await getServerSession(authConfig);
  const blogsDataQuery = await supabase
    .from('events')
    .select()
    .eq('user_email', session?.user?.email);

  const { data, error } = blogsDataQuery;
  if (error) throw error;
  const blogsData: ResponseData[] = data;

  return NextResponse.json(blogsData);
}
