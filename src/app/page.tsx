import About from "@/components/About";
import Careers from "@/components/Careers";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import MediaSection from "@/components/MediaSection";
import { SchemaGraph } from "@/components/seo";
import dynamic from 'next/dynamic';

const InfrastructureSection = dynamic(() => import('@/components/InfrastructureSection'), { ssr: false });

export default function Home() {
  return (
    <>
      {/* Structured Data - Organization & WebSite schemas */}
      <SchemaGraph includeOrganization includeWebSite />

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
