import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { SchemaGraph } from "@/components/seo";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamic imports for below-the-fold components to improve initial load
const About = dynamic(() => import('@/components/About'), {
  loading: () => <div className="min-h-screen" />,
});

const Services = dynamic(() => import('@/components/Services'), {
  loading: () => <div className="min-h-[600px]" />,
});

const InfrastructureSection = dynamic(() => import('@/components/InfrastructureSection'), {
  ssr: false,
  loading: () => <div className="min-h-[400px]" />,
});

const MediaSection = dynamic(() => import('@/components/MediaSection'), {
  loading: () => <div className="min-h-[300px]" />,
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

        <Suspense fallback={<div className="min-h-[600px]" />}>
          <Services />
        </Suspense>

        <Suspense fallback={<div className="min-h-[400px]" />}>
          <InfrastructureSection />
        </Suspense>

        <Suspense fallback={<div className="min-h-[300px]" />}>
          <MediaSection />
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
