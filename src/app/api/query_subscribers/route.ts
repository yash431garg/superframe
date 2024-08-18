import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../lib/supabase';

type ResponseData = {
  email: any;
  fid: any;
};

export async function GET(req: NextRequest, res: NextApiResponse) {
  const url = new URL(req.url || '');
  const param = new URLSearchParams(url.searchParams);
  const id = param.get('id');

  const registration = await supabase
    .from('registration')
    .select('email, fid, created_at')
    .eq('event_id', id)

  const { data, error } = registration;
  if (error) throw error;
  const subscriptionsData: ResponseData[] = data;
  return NextResponse.json(subscriptionsData);

  return NextResponse.json({ error: 'Error' }, { status: 409 });
}
