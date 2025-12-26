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
      "Z AXIS Pharmachine – Pharmaceutical Packaging Systems",
    template: "%s | Z AXIS Pharmachine Concepts",
  },
  description:
    "Premier pharmaceutical packaging machinery with Pharma 4.0 technology. Sterile fill-finish, automated packaging, and compliant systems for modern pharma.",
  keywords: [
    "pharmaceutical machinery",
    "pharma packaging",
    "packaging systems",
    "Pharma 4.0",
    "sterile fill-finish",
    "pharmaceutical equipment",
    "Z AXIS Pharmachine",
  ],
  authors: [{ name: "Z AXIS Pharmachine Concepts" }],
  creator: "Z AXIS Pharmachine Concepts",
  publisher: "Z AXIS Pharmachine Concepts",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Z AXIS Pharmachine Concepts",
    title:
      "Z AXIS Pharmachine – Pharmaceutical Packaging Systems",
    description:
      "Premier pharmaceutical packaging machinery with Pharma 4.0 technology. Sterile fill-finish, automated packaging, and compliant systems for modern pharma.",
    images: [
      {
        url: "/og_Image.png",
        width: 1200,
        height: 630,
        alt: "Z AXIS Pharmachine Concepts - Pharmaceutical Packaging Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Z AXIS Pharmachine – Pharmaceutical Packaging Systems",
    description:
      "Premier pharmaceutical packaging machinery with Pharma 4.0 technology. Sterile fill-finish, automated packaging, and compliant systems for modern pharma.",
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

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
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
