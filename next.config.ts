import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== 'production';

// Production CSP (relaxed to allow inline scripts used by Next.js and JSON-LD)
// TODO: Replace 'unsafe-inline' with nonces/hashes once we wire nonce through App Router.
const prodCsp = [
  "default-src 'self'",
  "style-src 'self' 'unsafe-inline' https:",
  "img-src 'self' https: data: https://i3.ytimg.com",
  // Allow inline scripts and external scripts for Meta Pixel, YouTube, and cookie consent
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://connect.facebook.net https://cdn.jsdelivr.net https://unpkg.com",
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.brevo.com https://www.facebook.com https://graph.facebook.com",
  "frame-src https://www.youtube-nocookie.com https://www.youtube.com",
  "font-src 'self' https: data:",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

// Development CSP (loose) – report-only to avoid blocking boot
const devCsp = [
  "default-src 'self'",
  "style-src 'self' 'unsafe-inline' https:",
  "img-src 'self' https: data: blob: https://i3.ytimg.com",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://connect.facebook.net https://cdn.jsdelivr.net https://unpkg.com",
  "script-src-elem 'self' 'unsafe-inline' 'unsafe-eval' blob: https://connect.facebook.net https://cdn.jsdelivr.net https://unpkg.com",
  "script-src-attr 'unsafe-inline'",
  "connect-src 'self' ws: wss: https: http:",
  "frame-src https://www.youtube-nocookie.com https://www.youtube.com",
  "font-src 'self' https: data:",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: true,
  },
  images: {
    // Project currently not using next/image extensively; avoid wildcard
    domains: ['localhost'],
  },
  // Disable static optimization for dynamic content
  trailingSlash: false,
  
  // Do not expose env via next.config unless strictly needed
  
  // Webpack configuration for MDX
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
  
  // Headers for better SEO and performance
  async headers() {
    return [
      {
        source: '/((?!api).*)',
        headers: [
          // In development, send CSP as Report-Only to avoid blocking Next dev runtime
          ...(isDev
            ? [{ key: 'Content-Security-Policy-Report-Only', value: devCsp }]
            : [{ key: 'Content-Security-Policy', value: prodCsp }]
          ),
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ];
  },
  
  // Redirects for old paths
  async redirects() {
    return [
      {
        source: '/articles/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
