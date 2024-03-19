import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authConfig } from '../../lib/auth';
import { supabase } from '../../lib/supabase';

type ResponseData = {
  fid: number;
  event_id: string;
  created_at: string;
  email: string;
  uuid: string;
};

export async function GET(
  req: NextApiRequest & { url: string },
  res: NextApiResponse
) {
  const url = new URL(req.url || '');
  const param = new URLSearchParams(url.searchParams);
  const id = param.get('id');

  const session = await getServerSession(authConfig);
  //   const { id } = req.query;
  const userSession = await supabase
    .from('events')
    .select('user_email, id')
    .eq('id', id)
    .eq('user_email', session?.user?.email)
    .match({ user_email: session?.user?.email, id: id })
    .single();

  if (userSession) {
    const subscriptionDataQuery = await supabase
      .from('subscription')
      .select()
      .eq('event_id', id);

    const { data, error } = subscriptionDataQuery;
    if (error) throw error;
    const subscriptionsData: ResponseData[] = data;
    return NextResponse.json(subscriptionsData);
  }
  return NextResponse.json({ error: 'Error' }, { status: 409 });
}
