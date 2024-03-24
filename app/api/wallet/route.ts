import { errorFrame, parseFrameRequest, getOwnerAddressFromFid, successFrame } from '@/lib/farcaster';
import { FrameRequest } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { createOrFindEmbeddedWalletForFid, createEmbeddedWallet } from '@/lib/embedded-wallet';
import { ChainEnum } from "@dynamic-labs/sdk-api/models/ChainEnum";
import { fetchMetadata } from "frames.js/next";
import { UserResponse } from "@dynamic-labs/sdk-api/models/UserResponse";

export async function POST(req: NextRequest): Promise<Response> {
    let frameRequest: FrameRequest | undefined;
    let newWallets: any[] | undefined;

    // Parse and validate request from Frame for fid
    try {
        frameRequest = await req.json();
        console.log('fist',frameRequest)
        if (!frameRequest) throw new Error('Could not deserialize request from frame');
    } catch {
        return new NextResponse(errorFrame);
    }
    const {fid, isValid} = await parseFrameRequest(frameRequest);
    if (!fid || !isValid) return new NextResponse(errorFrame);
    const inputText = frameRequest.untrustedData.inputText;
    const isValidEmail = frameRequest.untrustedData.inputText
    ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputText)
    : false;

    // Query FC Registry contract to get owner address from fid
    const ownerAddress = await getOwnerAddressFromFid(fid);
    if (!ownerAddress) return new NextResponse(errorFrame);
    
    const embeddedWalletAddress = await createOrFindEmbeddedWalletForFid(fid, ownerAddress);
    if (!embeddedWalletAddress) return new NextResponse(errorFrame);
    // Generate an embedded wallet associated with the fid
    if (isValidEmail && fid) {
    try {
      newWallets = await createEmbeddedWallet(inputText, fid, [
         ChainEnum.Evm
       ]);
        console.log('walledg',newWallets)
     } catch (e) {
        console.log('errorsquared', e);
       return new NextResponse(errorFrame);
     }
   }
    

    return new NextResponse({
    title: "My Page",
    // provide a full URL to your /frames endpoint
    other: await fetchMetadata(
      new URL("/frames", process.env.VERCEL_URL ? `{process.env.NEXT_PUBLIC_BASE_URL}` : "https://far-away-beta.vercel.app")
    ),
  };
});
}

export const dynamic = 'force-dynamic';
