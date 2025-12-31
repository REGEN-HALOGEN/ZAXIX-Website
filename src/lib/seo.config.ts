/**
 * SEO Configuration
 * Centralized SEO constants and utilities for the Z-Axis Pharmachine website
 */

// Site Information
export const SITE_NAME = "Z AXIS Pharmachine Concepts India";
export const SITE_URL = "https://www.zaxispharmachine.com";
export const SITE_DESCRIPTION =
    "Z AXIS Pharmachine Concepts India: Leading manufacturer of pharmaceutical packaging machinery in Ahmedabad, Gujarat. Specialists in sterile fill-finish systems, vial filling machines, ampoule filling, syringe filling lines, and Pharma 4.0 automation.";

// Social Media
export const TWITTER_HANDLE = "@zaxispharmachine";

// Default OG Image
export const DEFAULT_OG_IMAGE = "/og_Image.png";
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

// Location Details
export const LOCATION = {
    streetAddress: "Titanium City Center, 100 Feet Anand Nagar Road",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    postalCode: "380015",
    addressCountry: "IN",
    geo: {
        latitude: 23.0225,
        longitude: 72.5714,
    },
};

// Contact Details
export const CONTACT = {
    email: "info@zaxispharmachine.com",
    telephone: "+91-XXXXXXXXXX", // Update with actual phone
    url: SITE_URL,
};

// Organization Details for Structured Data
export const ORGANIZATION = {
    name: SITE_NAME,
    legalName: "Z AXIS Pharmachine Concepts India Private Limited",
    url: SITE_URL,
    logo: `${SITE_URL}/publiclogo512.png`,
    description: SITE_DESCRIPTION,
    foundingDate: "2024",
    address: {
        "@type": "PostalAddress" as const,
        streetAddress: LOCATION.streetAddress,
        addressLocality: LOCATION.addressLocality,
        addressRegion: LOCATION.addressRegion,
        postalCode: LOCATION.postalCode,
        addressCountry: LOCATION.addressCountry,
    },
    geo: {
        "@type": "GeoCoordinates" as const,
        latitude: LOCATION.geo.latitude,
        longitude: LOCATION.geo.longitude,
    },
    contactPoint: {
        "@type": "ContactPoint" as const,
        contactType: "customer service",
        email: CONTACT.email,
        availableLanguage: ["English", "Hindi", "Gujarati"],
    },
    sameAs: [
        // Add social media URLs here when available
        // "https://www.linkedin.com/company/zaxispharmachine",
        // "https://twitter.com/zaxispharmachine",
    ],
};

// Services/Products offered
export const SERVICES = [
    {
        name: "Vial Filling Machine",
        description: "High-precision vial filling systems for pharmaceutical liquids with aseptic processing capabilities.",
    },
    {
        name: "Ampoule Filling Machine",
        description: "Automated ampoule filling and sealing systems for injectable pharmaceuticals.",
    },
    {
        name: "Syringe Filling Line",
        description: "Pre-filled syringe filling systems with sterile processing and inspection.",
    },
    {
        name: "Sterile Fill-Finish Systems",
        description: "Complete sterile fill-finish solutions for parenteral drug manufacturing.",
    },
    {
        name: "Pharma 4.0 Automation",
        description: "Industry 4.0 enabled pharmaceutical manufacturing automation and integration.",
    },
];

// Page-specific SEO configurations
export const PAGE_SEO = {
    home: {
        title: "Z AXIS Pharmachine – Pharmaceutical Packaging Systems | Ahmedabad, India",
        description:
            "Leading manufacturer of pharmaceutical packaging machinery in Ahmedabad, Gujarat. Sterile fill-finish, vial/ampoule/syringe filling machines with Pharma 4.0 technology.",
    },
    infrastructure: {
        title: "Infrastructure & Manufacturing Facility | Ahmedabad",
        description:
            "State-of-the-art manufacturing infrastructure for pharmaceutical machinery at Titanium City Center, Ahmedabad. Precision engineering and advanced production capabilities.",
    },
    about: {
        title: "About Us – Our Vision, Mission & Values",
        description:
            "Learn about Z AXIS Pharmachine Concepts India, our commitment to pharmaceutical innovation, and the team driving next-generation packaging solutions from Gujarat.",
    },
    services: {
        title: "Pharmaceutical Packaging Systems & Services",
        description:
            "Explore our range of pharmaceutical packaging systems: vial filling, ampoule filling, syringe filling, sterile fill-finish, and Pharma 4.0 automation solutions.",
    },
    careers: {
        title: "Careers – Join Our Team in Ahmedabad",
        description:
            "Build your career at Z AXIS Pharmachine Concepts India. Explore opportunities in pharmaceutical machinery engineering, sales, and operations in Ahmedabad, Gujarat.",
    },
    contact: {
        title: "Contact Us – Titanium City Center, Ahmedabad",
        description:
            "Get in touch with Z AXIS Pharmachine Concepts for pharmaceutical machinery inquiries. Located at Titanium City Center, Ahmedabad, Gujarat, India.",
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
