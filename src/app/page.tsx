import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { SchemaGraph } from "@/components/seo";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// CMS-enabled components (server components that fetch CMS data)
import MediaSectionWithCMS from "@/components/MediaSectionWithCMS";
import ServicesWithCMS from "@/components/ServicesWithCMS";

// Dynamic imports for below-the-fold components to improve initial load
const About = dynamic(() => import('@/components/About'), {
  loading: () => <div className="min-h-screen" />,
});

const InfrastructureSection = dynamic(() => import('@/components/InfrastructureSection'), {
  ssr: false,
  loading: () => <div className="min-h-[400px]" />,
});

const Careers = dynamic(() => import('@/components/Careers'), {
  loading: () => <div className="min-h-[400px]" />,
});

const Contact = dynamic(() => import('@/components/Contact'), {
  loading: () => <div className="min-h-[600px]" />,
});

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="min-h-[200px]" />,
});

export default function Home() {
  return (
    <>
      {/* Structured Data - Organization, WebSite & LocalBusiness schemas */}
      <SchemaGraph includeOrganization includeWebSite includeLocalBusiness />

      <Header />
      <main>
        {/* Hero loads immediately - above the fold */}
        <Hero />

        {/* Below-the-fold sections loaded dynamically */}
        <Suspense fallback={<div className="min-h-screen" />}>
          <About />
        </Suspense>

        {/* Services/Systems Section - CMS enabled */}
        <Suspense fallback={<div className="min-h-[600px]" />}>
          <ServicesWithCMS />
        </Suspense>

        <Suspense fallback={<div className="min-h-[400px]" />}>
          <InfrastructureSection />
        </Suspense>

        {/* Media Section - CMS enabled */}
        <Suspense fallback={<div className="min-h-[300px]" />}>
          <MediaSectionWithCMS />
        </Suspense>

        <Suspense fallback={<div className="min-h-[400px]" />}>
          <Careers />
        </Suspense>

        <Suspense fallback={<div className="min-h-[600px]" />}>
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={<div className="min-h-[200px]" />}>
        <Footer />
      </Suspense>
    </>
  );
}
