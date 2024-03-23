import { NEXT_PUBLIC_BASE_URL } from '@/lib/farcaster';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<Response> {
    return NextResponse.redirect(NEXT_PUBLIC_BASE_URL, {status: 302});
}

export const dynamic = 'force-dynamic';