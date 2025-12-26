/**
 * JSON-LD Structured Data Components
 * Server-rendered schema.org structured data for SEO
 */

import {
    SITE_NAME,
    SITE_URL,
    SITE_DESCRIPTION,
    ORGANIZATION,
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

// WebSite Schema
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
        publisher: {
            "@id": `${SITE_URL}/#organization`,
        },
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: `${url}/search?q={search_term_string}`,
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

// Combined Schema Graph (for pages that need multiple schemas)
interface SchemaGraphProps {
    includeOrganization?: boolean;
    includeWebSite?: boolean;
    breadcrumbs?: BreadcrumbItem[];
    customSchemas?: object[];
}

export function SchemaGraph({
    includeOrganization = true,
    includeWebSite = true,
    breadcrumbs,
    customSchemas = [],
}: SchemaGraphProps) {
    const graph: object[] = [];

    if (includeOrganization) {
        graph.push({
            "@type": "Organization",
            "@id": `${SITE_URL}/#organization`,
            name: ORGANIZATION.name,
            url: ORGANIZATION.url,
            logo: {
                "@type": "ImageObject",
                url: ORGANIZATION.logo,
                width: 512,
                height: 512,
            },
            description: ORGANIZATION.description,
            address: ORGANIZATION.address,
            contactPoint: ORGANIZATION.contactPoint,
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
