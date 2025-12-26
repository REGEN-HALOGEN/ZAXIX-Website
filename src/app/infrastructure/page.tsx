import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InfrastructureSection from "@/components/InfrastructureSection";
import { SchemaGraph } from "@/components/seo";

const BASE_URL = "https://www.zaxispharmachine.com";

// Page-specific SEO metadata
export const metadata: Metadata = {
    title: "Infrastructure & Manufacturing Facility",
    description:
        "State-of-the-art manufacturing infrastructure for pharmaceutical machinery. Precision engineering, quality control, and advanced production capabilities at Z AXIS.",
    alternates: {
        canonical: "/infrastructure",
    },
    openGraph: {
        title: "Infrastructure & Manufacturing Facility | Z AXIS Pharmachine",
        description:
            "State-of-the-art manufacturing infrastructure for pharmaceutical machinery. Precision engineering, quality control, and advanced production capabilities.",
        url: "/infrastructure",
        images: [
            {
                url: "/og_Image.png",
                width: 1200,
                height: 630,
                alt: "Z AXIS Pharmachine Infrastructure",
            },
        ],
    },
    twitter: {
        title: "Infrastructure & Manufacturing Facility | Z AXIS Pharmachine",
        description:
            "State-of-the-art manufacturing infrastructure for pharmaceutical machinery. Precision engineering and quality control.",
        images: ["/og_Image.png"],
    },
};

// Breadcrumbs for this page
const breadcrumbs = [
    { name: "Home", url: BASE_URL },
    { name: "Infrastructure", url: `${BASE_URL}/infrastructure` },
];

export default function InfrastructurePage() {
    return (
        <>
            {/* Structured Data with Breadcrumbs */}
            <SchemaGraph
                includeOrganization
                includeWebSite
                breadcrumbs={breadcrumbs}
            />

            <Header />
            <main>
                <InfrastructureSection />
            </main>
            <Footer />
        </>
    );
}
