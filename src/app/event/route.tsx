
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

    const frame = await supabase
        .from('frame')
        .select()
        .eq('id', frameId);

        if(!frame.data || frame.data.length === 0){
            return {
                image: `${APP_URL}/unknown.png`,
                 imageOptions: {
                    dynamic: true,
                    headers: {
                        "Cache-Control": "max-age=1",
                    },
                },
            };

        }

    const {
        title,
        description,
        start_date_time,
        end_date_time,
        theme_color,
        user_address
    } = frame?.data[0]

    return {
        image: (
            <div tw={`flex w-full h-full rounded-md justify-between  text-white p-6 bg-[${theme_color}]`}>
                <div tw="flex flex-col items-baseline mt-auto w-3/5">
                    <h1 tw="text-[50px] mb-2 font-extrabold">
                        {title}
                    </h1>
                    <p tw="text-[25px] mt-0">
                        {description}
                    </p>
                </div>
                <div tw="flex flex-col items-end">
                    <p tw="text-2xl mb-0">{start_date_time}</p>
                    <p tw="text-2xl mt-0">{end_date_time}</p>
                </div>
            </div>
        ), imageOptions: {
            dynamic: true,
            headers: {
                "Cache-Control": "max-age=1",
            },
        },
        textInput: "Enter you email or $eth amount",
        buttons: [
            <Button action="post" target={`${APP_URL}/register?frameId=${frameId}`} >
                Register
            </Button >,
            <Button action="tx" target={`${APP_URL}/tip?id=${frameId}`} >
                Tip
            </Button >,
            <Button action="post" target={`${APP_URL}/venue?id=${frameId}`} >
                Venue
            </Button >,
        ],
    };
});

export const GET = handleRequest;
export const POST = handleRequest;