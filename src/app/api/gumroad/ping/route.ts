import { NextRequest, NextResponse } from 'next/server';
import { siteConfig } from '../../../../../config/site.config';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

// Gumroad Ping webhook: https://gumroad.com/ping
// Expects form-encoded body with at least 'email' and 'product_id'.
export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let email = '';
    let productId = '';

    if (contentType.includes('application/json')) {
      const data = await request.json();
      email = (data.email || '').toString();
      productId = (data.product_id || '').toString();
    } else {
      const form = await request.formData();
      email = (form.get('email') as string) || '';
      productId = (form.get('product_id') as string) || '';
    }

    if (!email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400, headers: corsHeaders });
    }

    // Optional shared secret: add ?secret=... to the webhook URL
    const url = new URL(request.url);
    const secret = url.searchParams.get('secret');
    const expected = process.env.GUMROAD_WEBHOOK_SECRET || '';
    if (expected && secret !== expected) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });
    }

    // Tag buyer in Brevo: CASE_STUDY_TIER = 'pro', LEAD_MAGNET = 'pro'
    const res = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
      method: 'PUT',
      headers: {
        'accept': 'application/json',
        'api-key': siteConfig.newsletter.brevoApiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        attributes: {
          CASE_STUDY_TIER: 'pro',
          LEAD_MAGNET: 'pro',
          LAST_PURCHASED_PRODUCT: productId || 'caso_studio_pro',
        }
      })
    });

    if (!res.ok) {
      const t = await res.text();
      console.error('Brevo update error (Gumroad Ping):', res.status, t);
      return NextResponse.json({ error: 'Brevo update failed' }, { status: 500, headers: corsHeaders });
    }

    return NextResponse.json({ ok: true }, { status: 200, headers: corsHeaders });
  } catch (err) {
    console.error('Gumroad Ping error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500, headers: corsHeaders });
  }
}

