/**
 * JSON-LD Structured Data Components
 * Server-rendered schema.org structured data for SEO
 */

import {
    SITE_NAME,
    SITE_URL,
    SITE_DESCRIPTION,
    ORGANIZATION,
    LOCATION,
    CONTACT,
    SERVICES,
} from "@/lib/seo.config";

// Types for JSON-LD schemas
interface BreadcrumbItem {
    name: string;
    url: string;
}

interface OrganizationSchemaProps {
    name?: string;
    url?: string;
    logo?: string;
    description?: string;
}

interface WebSiteSchemaProps {
    name?: string;
    url?: string;
}

interface BreadcrumbSchemaProps {
    items: BreadcrumbItem[];
}

// Organization Schema
export function OrganizationSchema({
    name = ORGANIZATION.name,
    url = ORGANIZATION.url,
    logo = ORGANIZATION.logo,
    description = ORGANIZATION.description,
}: OrganizationSchemaProps = {}) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name,
        url,
        logo: {
            "@type": "ImageObject",
            url: logo,
            width: 512,
            height: 512,
        },
        description,
        address: ORGANIZATION.address,
        contactPoint: ORGANIZATION.contactPoint,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// LocalBusiness Schema - Critical for local SEO
export function LocalBusinessSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#localbusiness`,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        logo: ORGANIZATION.logo,
        image: `${SITE_URL}/og_Image.png`,
        telephone: CONTACT.telephone,
        email: CONTACT.email,
        address: {
            "@type": "PostalAddress",
            streetAddress: LOCATION.streetAddress,
            addressLocality: LOCATION.addressLocality,
            addressRegion: LOCATION.addressRegion,
            postalCode: LOCATION.postalCode,
            addressCountry: LOCATION.addressCountry,
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: LOCATION.geo.latitude,
            longitude: LOCATION.geo.longitude,
        },
        openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "09:00",
            closes: "18:00",
        },
        priceRange: "$$$",
        areaServed: [
            { "@type": "Country", name: "India" },
            { "@type": "State", name: "Gujarat" },
            { "@type": "City", name: "Ahmedabad" },
        ],
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Pharmaceutical Packaging Systems",
            itemListElement: SERVICES.map((service, index) => ({
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: service.name,
                    description: service.description,
                },
                position: index + 1,
            })),
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// WebSite Schema with SearchAction
export function WebSiteSchema({
    name = SITE_NAME,
    url = SITE_URL,
}: WebSiteSchemaProps = {}) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name,
        url,
        description: SITE_DESCRIPTION,
        publisher: {
            "@id": `${SITE_URL}/#organization`,
        },
        inLanguage: "en-IN",
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: `${url}/?search={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Breadcrumb Schema
export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// FAQPage Schema - Great for featured snippets
interface FAQItem {
    question: string;
    answer: string;
}

interface FAQSchemaProps {
    faqs: FAQItem[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Combined Schema Graph (for pages that need multiple schemas)
interface SchemaGraphProps {
    includeOrganization?: boolean;
    includeWebSite?: boolean;
    includeLocalBusiness?: boolean;
    breadcrumbs?: BreadcrumbItem[];
    customSchemas?: object[];
}

export function SchemaGraph({
    includeOrganization = true,
    includeWebSite = true,
    includeLocalBusiness = true,
    breadcrumbs,
    customSchemas = [],
}: SchemaGraphProps) {
    const graph: object[] = [];

    if (includeOrganization) {
        graph.push({
            "@type": "Organization",
            "@id": `${SITE_URL}/#organization`,
            name: ORGANIZATION.name,
            legalName: ORGANIZATION.legalName,
            url: ORGANIZATION.url,
            logo: {
                "@type": "ImageObject",
                url: ORGANIZATION.logo,
                width: 512,
                height: 512,
            },
            description: ORGANIZATION.description,
            foundingDate: ORGANIZATION.foundingDate,
            address: ORGANIZATION.address,
            geo: ORGANIZATION.geo,
            contactPoint: ORGANIZATION.contactPoint,
            sameAs: ORGANIZATION.sameAs,
        });
    }

    if (includeLocalBusiness) {
        graph.push({
            "@type": "LocalBusiness",
            "@id": `${SITE_URL}/#localbusiness`,
            name: SITE_NAME,
            description: SITE_DESCRIPTION,
            url: SITE_URL,
            logo: ORGANIZATION.logo,
            image: `${SITE_URL}/og_Image.png`,
            telephone: CONTACT.telephone,
            email: CONTACT.email,
            address: {
                "@type": "PostalAddress",
                streetAddress: LOCATION.streetAddress,
                addressLocality: LOCATION.addressLocality,
                addressRegion: LOCATION.addressRegion,
                postalCode: LOCATION.postalCode,
                addressCountry: LOCATION.addressCountry,
            },
            geo: {
                "@type": "GeoCoordinates",
                latitude: LOCATION.geo.latitude,
                longitude: LOCATION.geo.longitude,
            },
            areaServed: [
                { "@type": "Country", name: "India" },
                { "@type": "State", name: "Gujarat" },
            ],
        });
    }

    if (includeWebSite) {
        graph.push({
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            name: SITE_NAME,
            url: SITE_URL,
            description: SITE_DESCRIPTION,
            publisher: {
                "@id": `${SITE_URL}/#organization`,
            },
            inLanguage: "en-IN",
        });
    }

    if (breadcrumbs && breadcrumbs.length > 0) {
        graph.push({
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbs.map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: item.name,
                item: item.url,
            })),
        });
    }

    graph.push(...customSchemas);

    const schema = {
        "@context": "https://schema.org",
        "@graph": graph,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Export default combined component for easy use
export default SchemaGraph;
