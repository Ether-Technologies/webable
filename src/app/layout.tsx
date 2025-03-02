import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "EtherTech Prayer Times",
  description: "Stay connected with accurate prayer times. Get real-time updates for Fajr, Dhuhr, Asr, Maghrib, and Isha prayers with precise calculations based on your location.",
  keywords: ["prayer times", "islamic prayer", "salah times", "muslim prayer schedule", "prayer calculator", "islamic worship"],
  authors: [{ name: "EtherTech" }],
  creator: "EtherTech",
  publisher: "EtherTech",
  applicationName: "EtherTech Prayer Times",
  generator: "Next.js",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://prayer.ethertech.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "EtherTech Prayer Times",
    description: "Stay connected with accurate prayer times. Get real-time updates for Fajr, Dhuhr, Asr, Maghrib, and Isha prayers.",
    url: 'https://prayer.ethertech.io',
    siteName: 'EtherTech Prayer Times',
    images: [
      {
        url: '/cover.png',
        width: 1200,
        height: 630,
        alt: 'EtherTech Prayer Times App Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EtherTech Prayer Times',
    description: 'Stay connected with accurate prayer times. Get real-time updates for Fajr, Dhuhr, Asr, Maghrib, and Isha prayers.',
    images: ['/cover.png'],
    creator: '@ethertech',
    site: '@ethertech',
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
    google: 'your-google-site-verification', // Add your Google verification code
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
  }
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
