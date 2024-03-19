import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import {
  FrameRequest,
  getFrameMessage,
  getFrameHtmlResponse,
} from '@coinbase/onchainkit';
import { supabase } from '../../lib/supabase';

type ResponseData = {
  message: string;
};

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_APP_URL;

export async function POST(
  req: NextRequest,
  res: NextApiResponse<ResponseData>
) {
  // Input validation
  const body: FrameRequest = await req.json();
  const url = body.untrustedData.url;
  const partAfterFrames = url.split('frames/')[1];
  // Getting frame message
  const { message } = await getFrameMessage(body, {
    neynarApiKey: 'NEYNAR_ONCHAIN_KIT',
  });

  // Validating email
  const inputText = message?.input as string;
  const isEmailValid = validateEmail(inputText);

  if (!isEmailValid) {
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: `Enter a valid email`,
          },
        ],
        image: {
          src: `${NEXT_PUBLIC_URL}/error.png`,
          aspectRatio: '1:1',
        },
        postUrl: `${body.untrustedData.url}/`,
      })
    );
  }

  const { data, error } = await supabase
    .from('subscription')
    .select('fid, event_id')
    .eq('fid', message?.interactor.fid)
    .eq('event_id', partAfterFrames)
    .match({ fid: message?.interactor.fid, event_id: partAfterFrames })
    .single();

  // Storing email in Supabase
  if (data === null) {
    await supabase.from('subscription').insert({
      email: inputText,
      fid: message?.interactor.fid,
      event_id: partAfterFrames,
    });

    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: `Go back: ${inputText}`,
          },
        ],
        image: {
          src: `${NEXT_PUBLIC_URL}/thanks.png`,
          aspectRatio: '1:1',
        },
        postUrl: `${body.untrustedData.url}/`,
      })
    );
  } else {
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: `Go back`,
          },
        ],
        image: {
          src: `${NEXT_PUBLIC_URL}/already.png`,
          aspectRatio: '1:1',
        },
        postUrl: `${body.untrustedData.url}/`,
      })
    );
  }
}

// Function to validate email
function validateEmail(text: string): boolean {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(text);
}
