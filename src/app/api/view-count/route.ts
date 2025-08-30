import { NextRequest, NextResponse } from 'next/server';
import { incrementViewCount, getViewCount } from '../../../../lib/supabase';
import { rateLimit } from '../../../../lib/rateLimit';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

// Basic in-memory throttling to reduce abuse (best-effort on serverless)
const postThrottle = new Map<string, number>();
const getThrottle = new Map<string, number>();

export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json();

    if (!slug) {
      return NextResponse.json({ error: 'Slug required' }, { status: 400, headers: corsHeaders });
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
               request.headers.get('x-real-ip') || 'unknown';
    const rl = await rateLimit(['view', ip, slug], 1, 30);
    if (!rl.allowed) {
      const headers = { ...corsHeaders } as Record<string, string>;
      if (rl.resetAt) {
        const sec = Math.max(0, Math.ceil((new Date(rl.resetAt).getTime() - Date.now()) / 1000));
        headers['Retry-After'] = String(sec);
      }
      return NextResponse.json({ success: true, throttled: true }, { status: 200, headers });
    }
    // Fallback in-memory throttle as a safety net if RPC not configured
    const key = `${ip}:${slug}`;
    const now = Date.now();
    const last = postThrottle.get(key) || 0;
    if (now - last < 30_000) {
      return NextResponse.json({ success: true, throttled: true }, { status: 200, headers: corsHeaders });
    }
    postThrottle.set(key, now);

    const result = await incrementViewCount(slug);
    
    return NextResponse.json({ success: true, result }, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error('Error incrementing view count:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: corsHeaders });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Slug required' }, { status: 400, headers: corsHeaders });
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
               request.headers.get('x-real-ip') || 'unknown';
    const key = `${ip}:${slug}`;
    const now = Date.now();
    const last = getThrottle.get(key) || 0;
    // Prevent hammering GET: 1 req/sec per IP+slug
    if (now - last < 1000) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429, headers: corsHeaders });
    }
    getThrottle.set(key, now);

    const count = await getViewCount(slug);
    
    return NextResponse.json({ count }, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error('Error getting view count:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: corsHeaders });
}
}
