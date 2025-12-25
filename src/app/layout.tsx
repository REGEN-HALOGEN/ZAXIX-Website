import type { Metadata } from "next";
import * as React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import StartupLoader from "@/components/StartupLoader";
import SideContactBar from "@/components/SideContactBar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default:
      "Z AXIS Pharmachine Concepts – Pharmaceutical Processing & Packaging Systems",
    template: "%s | Z AXIS Pharmachine Concepts",
  },
  description:
    "Z AXIS Pharmachine Concepts (India): next-edge pharmaceutical processing & packaging systems with a Pharma 4.0, sterile, compliant, automation-first philosophy.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Z AXIS Pharmachine Concepts",
    title:
      "Z AXIS Pharmachine Concepts – Pharmaceutical Processing & Packaging Systems",
    description:
      "Z AXIS Pharmachine Concepts (India): next-edge pharmaceutical processing & packaging systems with a Pharma 4.0, sterile, compliant, automation-first philosophy.",
    images: [
      {
        url: "/logo.svg",
      },
    ],
  },
  twitter: {
    card: "summary",
    title:
      "Z AXIS Pharmachine Concepts – Pharmaceutical Processing & Packaging Systems",
    description:
      "Z AXIS Pharmachine Concepts (India): next-edge pharmaceutical processing & packaging systems with a Pharma 4.0, sterile, compliant, automation-first philosophy.",
    images: ["/logo.svg"],
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
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    apple: [{ url: "/logo.svg", type: "image/svg+xml" }],
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
        <StartupLoader />
        <SideContactBar />
        {children}
      </body>
    </html>
  );
}
