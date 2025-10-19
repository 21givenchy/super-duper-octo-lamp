import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientWrapper } from "@/components/ui/client-wrapper";
import ConsentBanner from '@/components/ui/consent-banner'
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
  title: "F^3",
  description: "The OS for founder focus",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#111111",
  icons: {
    icon: "/s.png",
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
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#111] text-white`}>
        <ClientWrapper>
          {children}
          <ConsentBanner />
        </ClientWrapper>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
