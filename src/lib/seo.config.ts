/**
 * SEO Configuration
 * Centralized SEO constants and utilities for the Z-Axis Pharmachine website
 */

// Site Information
export const SITE_NAME = "Z AXIS Pharmachine Concepts";
export const SITE_URL = "https://www.zaxispharmachine.com";
export const SITE_DESCRIPTION =
    "Z AXIS Pharmachine Concepts (India): next-edge pharmaceutical packaging systems with a Pharma 4.0, sterile, compliant, automation-first philosophy.";

// Social Media
export const TWITTER_HANDLE = "@zaxispharmachine";

// Default OG Image
export const DEFAULT_OG_IMAGE = "/og_Image.png";
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

// Organization Details for Structured Data
export const ORGANIZATION = {
    name: SITE_NAME,
    legalName: "Z AXIS Pharmachine Concepts India Private Limited",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    description: SITE_DESCRIPTION,
    foundingDate: "2024",
    address: {
        "@type": "PostalAddress" as const,
        addressCountry: "IN",
        addressRegion: "India",
    },
    contactPoint: {
        "@type": "ContactPoint" as const,
        contactType: "customer service",
        email: "info@zaxispharmachine.com",
    },
};

// Page-specific SEO configurations
export const PAGE_SEO = {
    home: {
        title: "Z AXIS Pharmachine – Pharmaceutical Packaging Systems",
        description:
            "Premier pharmaceutical packaging machinery with Pharma 4.0 technology. Sterile fill-finish, automated packaging, and compliant systems for modern pharma.",
    },
    infrastructure: {
        title: "Infrastructure & Manufacturing Facility",
        description:
            "State-of-the-art manufacturing infrastructure for pharmaceutical machinery. Precision engineering, quality control, and advanced production capabilities.",
    },
    about: {
        title: "About Us – Our Vision, Mission & Values",
        description:
            "Learn about Z AXIS Pharmachine Concepts, our commitment to pharmaceutical innovation, and the team driving next-generation packaging solutions.",
    },
    services: {
        title: "Our Systems & Services",
        description:
            "Explore our range of pharmaceutical packaging systems. From sterile filling to automated inspection, discover solutions for your needs.",
    },
    careers: {
        title: "Careers – Join Our Team",
        description:
            "Build your career at Z AXIS Pharmachine Concepts. Explore opportunities in pharmaceutical machinery engineering, sales, and operations.",
    },
    contact: {
        title: "Contact Us",
        description:
            "Get in touch with Z AXIS Pharmachine Concepts for pharmaceutical machinery inquiries, quotes, and support. We're here to help.",
    },
} as const;

// Helper to generate full page title with template
export function getPageTitle(pageTitle: string): string {
    return `${pageTitle} | ${SITE_NAME}`;
}

// Helper to generate canonical URL
export function getCanonicalUrl(path: string = "/"): string {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${SITE_URL}${cleanPath}`;
}

// Helper to generate OG image URL
export function getOgImageUrl(imagePath?: string): string {
    const path = imagePath || DEFAULT_OG_IMAGE;
    return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}
