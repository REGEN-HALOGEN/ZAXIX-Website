import type { Metadata } from "next";
import * as React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import StartupLoader from "@/components/StartupLoader";
import SideContactBar from "@/components/SideContactBar";
import { LoadingProvider } from "@/context/LoadingContext";

import StarsBackground from "@/components/ui/StarsBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.zaxispharmachine.com"),
  title: {
    default:
      "Z AXIS Pharmachine – Pharmaceutical Packaging Systems | Ahmedabad, India",
    template: "%s | Z AXIS Pharmachine Concepts India",
  },
  description:
    "Z AXIS Pharmachine Concepts India: Leading manufacturer of pharmaceutical packaging machinery in Ahmedabad, Gujarat. Specialists in sterile fill-finish systems, vial filling machines, ampoule filling, syringe filling lines, and Pharma 4.0 automation. ISO compliant, GMP certified equipment.",
  keywords: [
    // Brand Keywords
    "Z AXIS Pharmachine",
    "Z AXIS Pharmachine Concepts",
    "Z AXIS Pharmachine India",
    // Product Keywords
    "pharmaceutical machinery",
    "pharmaceutical packaging machines",
    "pharma packaging systems",
    "vial filling machine",
    "ampoule filling machine",
    "syringe filling line",
    "sterile fill-finish equipment",
    "liquid filling machine pharmaceutical",
    "injectable filling machine",
    "aseptic filling system",
    // Technology Keywords
    "Pharma 4.0",
    "pharmaceutical automation",
    "GMP compliant machinery",
    "ISO certified pharma equipment",
    "cleanroom filling systems",
    // Location Keywords
    "pharmaceutical machinery Ahmedabad",
    "pharma equipment Gujarat",
    "pharmaceutical machinery India",
    "pharma machinery manufacturer India",
    "Titanium City Center Ahmedabad",
    // Industry Keywords
    "sterile manufacturing",
    "parenteral packaging",
    "biotech equipment",
    "pharmaceutical processing equipment",
  ],
  authors: [{ name: "Z AXIS Pharmachine Concepts India" }],
  creator: "Z AXIS Pharmachine Concepts India",
  publisher: "Z AXIS Pharmachine Concepts India",
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "/",
      "en": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Z AXIS Pharmachine Concepts India",
    title:
      "Z AXIS Pharmachine – Pharmaceutical Packaging Systems | Ahmedabad",
    description:
      "Premier pharmaceutical packaging machinery manufacturer in Ahmedabad, India. Sterile fill-finish, vial/ampoule/syringe filling machines with Pharma 4.0 technology.",
    images: [
      {
        url: "/og_Image.png",
        width: 1200,
        height: 630,
        alt: "Z AXIS Pharmachine Concepts - Pharmaceutical Packaging Systems India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Z AXIS Pharmachine – Pharmaceutical Packaging Systems",
    description:
      "Premier pharmaceutical packaging machinery with Pharma 4.0 technology. Sterile fill-finish, automated packaging systems. Ahmedabad, India.",
    images: ["/og_Image.png"],
    creator: "@zaxispharmachine",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.region": "IN-GJ",
    "geo.placename": "Ahmedabad",
    "geo.position": "23.0225;72.5714",
    "ICBM": "23.0225, 72.5714",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <LoadingProvider>
          <StarsBackground />
          <StartupLoader />
          <SideContactBar />
          {children}
        </LoadingProvider>
      </body>
    </html>
  );
}
