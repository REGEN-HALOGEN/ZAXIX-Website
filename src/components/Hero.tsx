'use client';
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { QuoteModal } from './Modals';

const Hero = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  return (
    <>
      <section id="home" className="relative bg-background pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block bg-primary/10 text-primary font-semibold px-4 py-1 rounded-full text-sm mb-4">
              🚀 Industry Leader Since 1998
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tighter mb-6">
              <span className="block">Transforming</span>
              <span className="text-primary block">Pharmaceutical Manufacturing</span>
              <span className="block">with Precision Technology</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Cutting-edge pharmaceutical machinery solutions trusted by leading companies worldwide. 
              Experience innovation, reliability, and excellence in every product we deliver.
            </p>
            <div className="flex justify-center items-center space-x-4 mb-12">
              <div className="text-center">
                <p className="text-3xl font-bold">25+</p>
                <p className="text-sm text-muted-foreground">Years</p>
              </div>
              <div className="border-l h-10 border-border"></div>
              <div className="text-center">
                <p className="text-3xl font-bold">50+</p>
                <p className="text-sm text-muted-foreground">Countries</p>
              </div>
              <div className="border-l h-10 border-border"></div>
              <div className="text-center">
                <p className="text-3xl font-bold">1000+</p>
                <p className="text-sm text-muted-foreground">Projects</p>
              </div>
            </div>
            <div className="flex justify-center space-x-4">
              <Button size="lg" onClick={() => setIsQuoteModalOpen(true)}>
                Request Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Explore Products
              </Button>
            </div>
          </div>
        </div>
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 -z-10 w-full h-full overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        </div>
      </section>
      <QuoteModal isOpen={isQuoteModalOpen} onOpenChange={setIsQuoteModalOpen} />
    </>
  );
};

export default Hero;
