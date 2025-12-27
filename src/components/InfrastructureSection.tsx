"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import ScrollFloat from '@/components/ui/ScrollFloat';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

export default function InfrastructureSection() {
  const images = [
    { src: "/Infra/infra2.jpeg", alt: "Z Axis Office - Titanium City Center, Ahmedabad" },
    { src: "/Infra/infra1.jpeg", alt: "Z Axis Office Building" },
  ];
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section id="infrastructure" aria-labelledby="infrastructure-heading" className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <ScrollFloat
            className="text-3xl md:text-4xl lg:text-5xl font-bold italic tracking-tight mb-4"
            highlightWords={[{ word: 'INFRASTRUCTURE', className: 'text-primary' }]}
          >
            INFRASTRUCTURE
          </ScrollFloat>
          <p className="text-lg text-muted-foreground">
            A showcase of our state-of-the-art facilities and manufacturing capabilities.
          </p>
        </div>

        {/* Office Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden border-border/60 bg-background/50 shadow-xl">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Section with Carousel */}
              <div className="relative h-64 md:h-auto min-h-[300px]">
                <Image
                  src={images[currentImage].src}
                  alt={images[currentImage].alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-opacity duration-300"
                  priority={currentImage === 0}
                  loading={currentImage === 0 ? "eager" : "lazy"}
                />
                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                {/* Dots Indicator */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      className={`w-2 h-2 rounded-full transition-colors ${idx === currentImage ? 'bg-primary' : 'bg-white/50'}`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 md:hidden z-10">
                  <h3 className="text-white text-xl font-bold flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Our Office
                  </h3>
                </div>
              </div>

              {/* Content Section */}
              <CardContent className="p-6 md:p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 hidden md:flex">
                  <MapPin className="h-6 w-6 text-primary" />
                  Our Office
                </h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Ahmedabad, and Gujarat at large, known as <strong className="text-foreground">Pharmacy of the World</strong> contributes nearly <strong className="text-primary">33%</strong> of India&apos;s pharmaceutical turnover and <strong className="text-primary">28%</strong> of its pharma exports.
                  </p>
                  <p>
                    <strong className="text-foreground">Titanium City Center</strong> is one of Ahmedabad&apos;s most prestigious business landmarks.
                  </p>
                  <p>
                    <strong className="text-foreground">Accessibility:</strong> Located near the 132 Feet Ring Road and SG Highway, it provides easy transit for international clients arriving via the Sardar Vallabhbhai Patel International Airport.
                  </p>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
