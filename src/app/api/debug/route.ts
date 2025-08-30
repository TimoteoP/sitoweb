import { NextResponse } from 'next/server';
import { siteConfig } from '../../../../config/site.config';

// Development-only endpoint to check configuration
export async function GET() {
  // Only work in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 404 });
  }

  return NextResponse.json({
    environment: process.env.NODE_ENV,
    brevoApiKey: siteConfig.newsletter.brevoApiKey ? '✅ Configured' : '❌ Missing',
    brevoApiKeyLength: siteConfig.newsletter.brevoApiKey?.length || 0,
    siteUrl: siteConfig.url,
    authorEmail: siteConfig.author.email,
    supabaseUrl: siteConfig.database.supabaseUrl ? '✅ Configured' : '❌ Missing',
    supabaseKey: siteConfig.database.supabaseAnonKey ? '✅ Configured' : '❌ Missing',
  });
}