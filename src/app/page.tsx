import About from "@/components/About";
import Careers from "@/components/Careers";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import MediaSection from "@/components/MediaSection";
import dynamic from 'next/dynamic';

const InfrastructureSection = dynamic(() => import('@/components/InfrastructureSection'), { ssr: false });

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const description =
    "Z AXIS Pharmachine Concepts (India): next-edge pharmaceutical processing & packaging systems with a Pharma 4.0, sterile, compliant, automation-first philosophy.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Z AXIS Pharmachine Concepts",
        url: siteUrl,
        logo: `${siteUrl}/logo.svg`,
        description,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "Z AXIS Pharmachine Concepts",
        url: siteUrl,
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        {/* Infrastructure section embedded after Systems */}
        <InfrastructureSection />
        {/* Media section with Coming Soon */}
        <MediaSection />
        <Careers />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
