import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { clientConfig } from "@/config/client";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: clientConfig.name,
  description: clientConfig.description,
  keywords: ["barcode scanner", "product lookup", "product information", "barcode reader", "product scanner", "inventory management"],
  authors: [{ name: clientConfig.name.split(" ")[0] }],
  creator: clientConfig.name.split(" ")[0],
  publisher: clientConfig.name.split(" ")[0],
  applicationName: clientConfig.name,
  generator: "Next.js",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(clientConfig.url),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: clientConfig.name,
    description: clientConfig.description,
    url: clientConfig.url,
    siteName: clientConfig.name,
    images: [
      {
        url: '/cover.png',
        width: 1200,
        height: 630,
        alt: `${clientConfig.name} App Preview`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: clientConfig.name,
    description: clientConfig.description,
    images: ['/cover.png'],
    creator: clientConfig.twitter,
    site: clientConfig.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
  category: 'technology',
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png' }
    ],
    other: [
      { url: '/favicon/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
    ]
  },
  themeColor: clientConfig.themeColor,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
