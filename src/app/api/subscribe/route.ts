import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import {
  FrameRequest,
  getFrameMessage,
  getFrameHtmlResponse,
} from '@coinbase/onchainkit';
import { supabase } from '../../lib/supabase';
import { getServerSession } from 'next-auth';
import { authConfig } from '../../lib/auth';

type ResponseData = {
  message: string;
};

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_APP_URL;

export async function POST(
  req: NextRequest,
  res: NextApiResponse<ResponseData>
) {
  // const session = await getServerSession(authConfig);

  const body: FrameRequest = await req.json();
  const url = body.untrustedData.url;
  const partAfterFrames = url.split('frames/')[1];
  const blogDataQuery = await supabase
    .from('events')
    .select()
    .eq('id', partAfterFrames);

  const { data, error } = blogDataQuery;

  const { message } = await getFrameMessage(body, {
    neynarApiKey: 'NEYNAR_ONCHAIN_KIT',
  });

  if (message?.input) {
    const inputText = message.input;

    // Validate if the input is a valid email
    const isEmailValid = validateEmail(inputText);
    // console.log(res, session);
    if (isEmailValid) {
      // Store the email in the Supabase database'
      const res = await supabase.from('subscription').insert({
        email: inputText,
        fid: message.interactor.fid,
        user_email: data?.[0].user_email,
      });

      if (res.error) {
        return new NextResponse(
          getFrameHtmlResponse({
            buttons: [
              {
                label: `Go back: ${res.error?.details}`,
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
    }
  }
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

// Function to validate email
function validateEmail(text: string) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(text);
}
