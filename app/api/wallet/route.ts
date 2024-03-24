import { errorFrame, parseFrameRequest, getOwnerAddressFromFid, successFrame } from '@/lib/farcaster';
import { FrameRequest } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { createOrFindEmbeddedWalletForFid, createEmbeddedWallet } from '@/lib/embedded-wallet';
import { ChainEnum } from "@dynamic-labs/sdk-api/models/ChainEnum";
import { UserResponse } from "@dynamic-labs/sdk-api/models/UserResponse";
import { generate } from 'text-to-image';

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
    console.log('checker', embeddedWalletAddress)
    // Generate an embedded wallet associated with the fid
    if (isValidEmail && fid) {
    try {
      newWallets = await createEmbeddedWallet(inputText, fid, [
         ChainEnum.Evm
       ]);
     } catch (e) {
        console.log('errorsquared', e);
       return new NextResponse(errorFrame);
     }
   }
    var walletD:string = newWallets[0]?.toString() || 'lo';
    var walletP:string = embeddedWalletAddress?.toString() \| 'glop';
    console.log('walledg',newWallets);
    console.log('yes', await generate('Dynamic ETH Wallet: ' + walletD + ' and Privy ETH Wallet: ' + walletP  ,{fontSize:18, fontFamily: 'Arial', bgColor: 'grey', textColor: 'red'}));

    return new NextResponse(errorFrame);
}

export const dynamic = 'force-dynamic';
