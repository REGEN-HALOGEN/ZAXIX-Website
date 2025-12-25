'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { QuoteModal } from './Modals';
import { motion } from 'framer-motion';
import ScrollingImages from './ScrollingImages';

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!media) return;

    setReduced(media.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', onChange);
      return () => media.removeEventListener('change', onChange);
    }

    // Safari fallback
    media.addListener(onChange);
    return () => media.removeListener(onChange);
  }, []);

  return reduced;
};

const splitGraphemes = (text: string) => {
  try {
    // Segment by user-perceived characters to avoid breaking conjuncts.
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
    return Array.from(segmenter.segment(text), (s) => s.segment);
  } catch {
    return Array.from(text);
  }
};

const Hero = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const sanskritText =
    'यन्त्राणि देवतासदृशानि, यतः प्राणरक्षा भवति।\nऔषधं यथोचितं रक्ष्यते, तेन लोकः सुखी भवेत्॥';

  const sanskritGraphemes = useMemo(() => splitGraphemes(sanskritText), [sanskritText]);
  const [typedCount, setTypedCount] = useState(prefersReducedMotion ? sanskritGraphemes.length : 0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setTypedCount(sanskritGraphemes.length);
      return;
    }

    setTypedCount(0);
    const interval = window.setInterval(() => {
      setTypedCount((c) => {
        if (c >= sanskritGraphemes.length) return c;
        return c + 1;
      });
    }, 60);

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion, sanskritGraphemes.length]);

  const typedSanskrit = prefersReducedMotion
    ? sanskritText
    : sanskritGraphemes.slice(0, typedCount).join('');

  // Split the typed text into two lines so we can force each line to stay on a single line
  const typedLines = typedSanskrit.split('\n');

  const scrollingImages = useMemo(
    () => [
      { src: '/ScrollingImg/Picture1.jpg', alt: 'Showcase image 1' },
      { src: '/ScrollingImg/Picture2.png', alt: 'Showcase image 2' },
      { src: '/ScrollingImg/Picture3.jpg', alt: 'Showcase image 3' },
      { src: '/ScrollingImg/Picture4.jpg', alt: 'Showcase image 4' },
    ],
    []
  );

  return (
    <>
      <section id="home" className="relative bg-background bg-aura pt-0 pb-16 lg:pb-24">
        <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] pt-20 mb-10">
          <ScrollingImages images={scrollingImages} speedMs={26000} />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div 
              className="inline-block bg-primary/10 text-primary font-semibold px-4 py-1 rounded-full text-sm mb-4"
            >
              Pharma 4.0 | Sterile | Compliant | Automation-first
            </div>
            <h1
              className="text-4xl lg:text-6xl font-bold italic tracking-tighter leading-tight mb-4"
              style={{ fontFamily: 'Verdana, Geneva, Tahoma, sans-serif' }}
            >
              <span className="block">WELCOME TO Z AXIS</span>
            </h1>
            <p className="text-primary font-bold leading-relaxed tracking-wide text-2xl sm:text-3xl lg:text-4xl max-w-5xl mx-auto mb-8">
              <span className="sr-only">{sanskritText}</span>
              <span aria-hidden="true" className="block text-center mx-auto">
                <span className="block whitespace-nowrap leading-tight text-center">{typedLines[0] ?? ''}</span>
                <span className="block whitespace-nowrap leading-tight text-center">
                  {typedLines[1] ?? ''}
                  {!prefersReducedMotion && typedCount < sanskritGraphemes.length && (
                    <span className="inline-block w-[0.6ch] animate-pulse">|</span>
                  )}
                </span>
              </span>
            </p>
            <p 
              className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto mb-8 text-balance leading-relaxed"
            >
              The machines are like divine aids, for they safeguard life. By protecting medicines appropriately, they bring well-being to the world.
            </p>
            <div 
              className="flex justify-center items-center space-x-4 mb-12"
            >
              <div className="text-center">
                <p className="text-3xl font-bold">20+</p>
                <p className="text-sm text-muted-foreground">Years pharma expertise</p>
              </div>
              <div className="border-l h-10 border-border"></div>
              <div className="text-center">
                <p className="text-3xl font-bold">Sterile</p>
                <p className="text-sm text-muted-foreground">Processing focus</p>
              </div>
              <div className="border-l h-10 border-border"></div>
              <div className="text-center">
                <p className="text-3xl font-bold">Compliant</p>
                <p className="text-sm text-muted-foreground">GMP / EU Annex 1 ready</p>
              </div>
            </div>
            <div 
              className="flex justify-center space-x-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" onClick={() => setIsQuoteModalOpen(true)}>
                  Request Quote <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" asChild>
                  <a href="#systems">Explore Systems</a>
                </Button>
              </motion.div>
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
