import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import cryptoRandomString from 'crypto-random-string';
import { supabase } from '../../lib/supabase';
import { getJwtPayload } from '@/app/actions/validate';

type ResponseData = {
  id: number;
  blog: string;
  created_at: string;
};

export async function POST(req: NextRequest) {
  const data = await req?.json(); 
  const token = await getJwtPayload()
  const id = cryptoRandomString({ length: 6, type: 'distinguishable' });
  const res = await supabase.from('frame').insert({
    id: id,
    title: data?.title,
    description: data?.description,
    start_date_time: data?.startDateTime,
    end_date_time: data?.endDateTime,
    theme_color: data?.color,
    user_address: token?.verified_credentials[0].address,
    location: data?.location
  });
  if (res.error) {
    console.log(res.error)
    // Handle other errors
    return NextResponse.json({ error: 'error' }, { status: 409 });
  }
  return NextResponse.json({
    id: id,
    message: res.statusText,
  });
}

export async function GET(req: NextRequest, res: NextApiResponse) {
  const token = await getJwtPayload()
  const blogsDataQuery = await supabase
    .from('frame')
    .select()
    .eq('user_address', token?.verified_credentials[0].address);

  const { data, error } = blogsDataQuery;
  if (error) throw error;
  const blogsData: ResponseData[] = data;

  return NextResponse.json(blogsData);
}
