import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientWrapper } from "@/components/ui/client-wrapper";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

// Optimize font loading
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Add display swap for better loading performance
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // Add display swap for better loading performance
});

// Next metadata for SEO
export const metadata: Metadata = {
  metadataBase: new URL('https://frontforumfocus.com'),
  title: {
    default: 'Front Forum Focus — Founder OS to align work to your North Star',
    template: '%s — Front Forum Focus'
  },
  description: 'Greta helps founders align meetings, tasks, and ideas to a single North Star. Say no to distractions; build your future.',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#111111',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://frontforumfocus.com/',
    siteName: 'front • forum • focus',
    title: 'Front Forum Focus — Founder OS to align work to your North Star',
    description: 'Greta helps founders align meetings, tasks, and ideas to a single North Star.',
    images: [
      { url: '/frontforumfocus.png', width: 1200, height: 630, alt: 'Front Forum Focus' }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Front Forum Focus — Founder OS to align work to your North Star',
    description: 'Greta helps founders align meetings, tasks, and ideas to a single North Star.',
    images: ['/frontforumfocus.png']
  },
  icons: {
    icon: '/s.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/s.png" />
        <meta name="google-adsense-account" content="ca-pub-5890845623424973" />
        {/* Organization JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Front Forum Focus',
              alternateName: 'frontforumfocus',
              url: 'https://frontforumfocus.com/',
              logo: 'https://frontforumfocus.com/s.png'
            })
          }}
        />
        {/* SoftwareApplication JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Greta',
              applicationCategory: 'ProductivityApplication',
              operatingSystem: 'Web',
              url: 'https://frontforumfocus.com/',
              description: 'The OS for founder focus: align meetings, tasks, and ideas to a single North Star.',
              offers: { '@type': 'Offer', price: '180', priceCurrency: 'USD' }
            })
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#111] text-white`}>
        <ClientWrapper>
          {children}
        </ClientWrapper>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
