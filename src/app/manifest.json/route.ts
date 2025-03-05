import { clientConfig } from '@/config/client';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    name: clientConfig.name,
    short_name: clientConfig.shortName,
    description: clientConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: clientConfig.backgroundColor,
    theme_color: clientConfig.themeColor,
    orientation: 'portrait',
    icons: [
      {
        src: '/favicon/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png'
      },
      {
        src: '/favicon/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png'
      },
      {
        src: '/favicon/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable'
      },
      {
        src: '/favicon/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      }
    ]
  });
} 