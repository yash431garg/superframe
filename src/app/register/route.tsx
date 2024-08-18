
import { Button } from "frames.js/next";
import { frames } from "../frames";
import { supabase } from "../lib/supabase";

import * as fs from "fs";
import { join } from "path";


const fontPath = join(process.cwd(), "Gambarino-Regular.ttf");
const fontData = fs.readFileSync(fontPath);

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

function validateEmail(text: string) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(text);
}


const handleRequest = frames(async (ctx) => {
    const param = new URLSearchParams(ctx.url.searchParams);
    const frameId = param.get('frameId');

    const userEmail = ctx?.message?.inputText || ''

    const isEmailValid = validateEmail(userEmail);

    console.log(isEmailValid, frameId, ctx?.message?.requesterFid)

    if (!isEmailValid) {
        return {
            image: `${APP_URL}/error.png`, imageOptions: {
                dynamic: true,
                headers: {
                    "Cache-Control": "max-age=1",
                },
            },
            buttons: [
                <Button action="post" target={`${APP_URL}/event?id=${frameId}`} >
                    Go Back
                </Button >,
            ],
        };
    }

    if (!ctx?.message?.requesterFid || !frameId) {
        return {
            image: `${APP_URL}/unknown.png`,
            imageOptions: {
                dynamic: true,
                headers: {
                    "Cache-Control": "max-age=1",
                },
            },
            buttons: [
                <Button action="post" target={`${APP_URL}/event?id=${frameId}`} >
                    Go Back
                </Button >,
            ],
        };
    }

    const res = await supabase
        .from('registration').insert({
            fid: ctx?.message?.requesterFid, email: ctx?.message?.inputText, event_id: frameId
        })

    if (res?.error?.code === '23505') {
        return {
            image: `${APP_URL}/already.png`,
            imageOptions: {
                dynamic: true,
                headers: {
                    "Cache-Control": "max-age=1",
                },
            },
            buttons: [
                <Button action="post" target={`${APP_URL}/event?id=${frameId}`} >
                    Go Back
                </Button >,
            ],
        };
    }
    return {
        image: `${APP_URL}/thanks.png`,
        buttons: [
            <Button action="post" target={`${APP_URL}/event?id=${frameId}`} >
                Go Back
            </Button >,
        ],
    };
});

export const GET = handleRequest;
export const POST = handleRequest;