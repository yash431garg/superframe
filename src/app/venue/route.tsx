
import { Button } from "frames.js/next";
import { frames } from "../frames";
import { supabase } from "../lib/supabase";

import * as fs from "fs";
import { join } from "path";


const fontPath = join(process.cwd(), "Gambarino-Regular.ttf");
const fontData = fs.readFileSync(fontPath);

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

const handleRequest = frames(async (ctx) => {
    const param = new URLSearchParams(ctx.url.searchParams);
    const frameId = param.get('id');
    const userId = ctx?.message?.requesterFid
    const registration = await supabase
        .from('registration')
        .select()
        .eq('fid', userId)
        .eq('event_id', frameId);


    if (registration.data?.length === 0) {
        return {
            image: `${APP_URL}/register.png`,
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

    const frame = await supabase
        .from('frame')
        .select()
        .eq('id', frameId);

    const {
        theme_color,
        location
    } = frame?.data?.[0]

    console.log(location)

    return {
        image: (
            <div tw={`flex w-full h-full rounded-md justify-between  text-white p-6 bg-[${theme_color}]`}>
                <div tw="flex flex-col items-baseline mt-auto w-3/5">
                    <img src={`${APP_URL}/location.svg`} tw="w-10 h-10" />
                    <p tw="text-[35px] mt-0 w-3/5 ">{location}  </p>
                </div>
            </div>
        ), imageOptions: {
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
});

export const GET = handleRequest;
export const POST = handleRequest;