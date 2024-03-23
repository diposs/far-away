import { NextRequest, NextResponse } from 'next/server';
import {FrameImageUrls} from '@/lib/farcaster';
export async function GET (req: NextRequest): Promise<NextResponse> {
  return new NextResponse(`<!DOCTYPE html><html><head>
    <title>This is frame 7</title>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/Qme4FXhoxHHfyzTfRxSpASbMF8kajLEPkRQWhwWu9pkUjm/7.png" />
    <meta property="fc:frame:input:text" content="Enter your email." />
    <meta property="fc:frame:button:1" content="Sign-in/Sign-up" />
    <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/wallet" />
  </head></html>`);
}


export const dynamic = 'force-dynamic';
