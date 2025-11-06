import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientWrapper } from "@/components/ui/client-wrapper";
import AdsConsent from '@/components/ui/ads-consent'
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

// Next metadata for SEO and AEO optimization
export const metadata: Metadata = {
  title: "frontforumfocus - Mission Alignment & Impact Tracking for Founders | Greta",
  description: "frontforumfocus shows founders and teams—step by step—which activities truly advance your mission. Track daily work, measure impact, and build with purpose and clarity. AI-powered mission alignment for mission-driven founders, NGOs, and social enterprises.",
  keywords: [
    "founder productivity",
    "mission alignment",
    "impact tracking",
    "mission-driven founders",
    "social enterprise tools",
    "NGO management",
    "impact measurement",
    "founder focus",
    "purpose-driven business",
    "activity tracking",
    "mission analytics",
    "founder tools",
    "startup productivity",
    "impact reporting",
  ],
  authors: [{ name: "frontforumfocus" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#111111",
  icons: {
    icon: "/s.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://frontforumfocus.com",
    title: "frontforumfocus - Mission Alignment & Impact Tracking for Founders",
    description: "Track daily activities, measure impact, and build with purpose. AI-powered tools for mission-driven founders and teams.",
    siteName: "frontforumfocus",
  },
  twitter: {
    card: "summary_large_image",
    title: "frontforumfocus - Mission Alignment for Founders",
    description: "Track daily activities, measure impact, and build with purpose. AI-powered tools for mission-driven founders.",
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
        
        {/* Structured Data for AEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Greta by frontforumfocus",
              "applicationCategory": "ProductivityApplication",
              "offers": {
                "@type": "Offer",
                "price": "25",
                "priceCurrency": "USD",
                "priceValidUntil": "2025-12-31",
                "billingDuration": "P1M"
              },
              "description": "AI-powered mission alignment and impact tracking tool for founders, teams, and social enterprises. Track daily activities and measure how they advance your core mission.",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "500"
              },
              "featureList": [
                "Daily activity tracking",
                "Real-time mission alignment scoring",
                "Automated impact reporting",
                "Integration with WhatsApp, Slack, Google Calendar, Notion",
                "Team collaboration and progress tracking"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Who is Greta for?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Mission-driven founders, teams, and impact-focused enterprises who want to align their daily activities with their core mission and demonstrate measurable progress."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How does Greta measure impact?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Greta analyzes your daily activities and scores them based on how much they advance your core mission—using real data, not self-reports. Our AI-powered system evaluates alignment with your stated goals and provides actionable insights."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Which tools does Greta integrate with?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "WhatsApp, Slack, Google Calendar, Notion, QuickBooks Africa, and other popular productivity tools."
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#111] text-white`}>
        <ClientWrapper>
          {children}
          <AdsConsent />
        </ClientWrapper>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
