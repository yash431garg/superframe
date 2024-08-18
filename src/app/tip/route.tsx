import { frames } from "../frames";
import { transaction } from "frames.js/core";
import { base, baseSepolia } from 'viem/chains';
import { supabase } from "../lib/supabase";
import { parseGwei } from 'viem';

export const POST = frames(async (ctx) => {
    const param = new URLSearchParams(ctx.url.searchParams);
    const frameId = param.get('id');

    const frame = await supabase
    .from('frame')
    .select()
    .eq('id', frameId);

  const userAddress = frame?.data?.[0].user_address

  const amount = Number(ctx?.message?.inputText) * 40000 || 400000
 
  return transaction({
    chainId: `eip155:${base.id}`,
    method: 'eth_sendTransaction',
    params: {
        abi: [],
        to: userAddress,
        value: parseGwei(String(amount)).toString(),
      },
  });
});