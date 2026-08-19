'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { QuoteModal } from './Modals';
import { motion } from 'framer-motion';
import ScrollingImages from './ScrollingImages';
import { useLoading } from '@/context/LoadingContext';

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
  const { isLoaded } = useLoading();

  const sanskritText =
    'यन्त्राणि देवतासदृशानि, यतः प्राणरक्षा भवति।\nऔषधं यथोचितं रक्ष्यते, तेन लोकः सुखी भवेत्॥';

  const sanskritGraphemes = useMemo(() => splitGraphemes(sanskritText), [sanskritText]);
  const [typedCount, setTypedCount] = useState(prefersReducedMotion ? sanskritGraphemes.length : 0);

  // English translation with line break
  const translationText =
    '"The machines are like divine aids, for they safeguard life.\nBy protecting medicines appropriately, they bring well-being to the world."';
  const translationGraphemes = useMemo(() => splitGraphemes(translationText), [translationText]);
  const [translationTypedCount, setTranslationTypedCount] = useState(prefersReducedMotion ? translationGraphemes.length : 0);

  useEffect(() => {
    if (prefersReducedMotion || !isLoaded) {
      if (prefersReducedMotion) setTypedCount(sanskritGraphemes.length);
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
  }, [prefersReducedMotion, sanskritGraphemes.length, isLoaded]);

  // Translation typing effect - starts after Sanskrit is done, slower speed
  useEffect(() => {
    if (prefersReducedMotion || !isLoaded) {
      if (prefersReducedMotion) setTranslationTypedCount(translationGraphemes.length);
      return;
    }

    // Wait for Sanskrit to finish before starting translation
    if (typedCount < sanskritGraphemes.length) {
      return;
    }

    const interval = window.setInterval(() => {
      setTranslationTypedCount((c) => {
        if (c >= translationGraphemes.length) return c;
        return c + 1;
      });
    }, 50); // Faster speed - 50ms

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion, translationGraphemes.length, isLoaded, typedCount, sanskritGraphemes.length]);

  const typedSanskrit = prefersReducedMotion
    ? sanskritText
    : sanskritGraphemes.slice(0, typedCount).join('');

  // Split the typed text into two lines so we can force each line to stay on a single line
  const typedLines = typedSanskrit.split('\n');

  // Translation typed text
  const typedTranslation = prefersReducedMotion
    ? translationText
    : translationGraphemes.slice(0, translationTypedCount).join('');
  const translationLines = typedTranslation.split('\n');

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
          <ScrollingImages
            images={scrollingImages}
            speedMs={26000}
            ribbonText="Pharma 4.0 | Sterile | Compliant | Automation-first"
          />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.h1
              className="font-bold italic tracking-tighter leading-tight mb-8 text-center"
              style={{ fontFamily: 'Verdana, Geneva, Tahoma, sans-serif' }}
              initial={{ opacity: 0, x: -100, scale: 0.8 }}
              animate={isLoaded ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -100, scale: 0.8 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Single line: Z AXIS PHARMACHINE CONCEPTS INDIA */}
              <span className="block md:whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-2xl xl:text-3xl">
                <span
                  className="text-primary"
                >Z</span> AXIS PHARMACHINE CONCEPTS (INDIA)
              </span>
            </motion.h1>
            {/* Welcome video - lightweight autoplay loop */}
            <motion.div
              className="flex justify-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <video
                className="w-full max-w-xl h-auto rounded-2xl shadow-lg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Welcome animation"
              >
                <source src="/welcome.mp4" type="video/mp4" />
              </video>
            </motion.div>
            <p className="text-primary font-bold leading-relaxed tracking-wide text-lg sm:text-2xl lg:text-4xl max-w-5xl mx-auto mb-6 px-2">
              <span className="sr-only">{sanskritText}</span>
              <span aria-hidden="true" className="block text-center mx-auto">
                <span className="block md:whitespace-nowrap leading-tight text-center">{typedLines[0] ?? ''}</span>
                <span className="block md:whitespace-nowrap leading-tight text-center">
                  {typedLines[1] ?? ''}
                  {!prefersReducedMotion && typedCount < sanskritGraphemes.length && (
                    <span className="inline-block w-[0.6ch] animate-pulse">|</span>
                  )}
                </span>
              </span>
            </p>
            <p
              className="text-lg lg:text-xl text-primary max-w-4xl mx-auto mb-8 text-balance leading-relaxed italic font-bold"
            >
              <span className="sr-only">{translationText}</span>
              <span aria-hidden="true" className="block text-center mx-auto">
                <span className="block leading-tight text-center">{translationLines[0] ?? ''}</span>
                <span className="block leading-tight text-center">
                  {translationLines[1] ?? ''}
                  {!prefersReducedMotion && translationTypedCount < translationGraphemes.length && typedCount >= sanskritGraphemes.length && (
                    <span className="inline-block w-[0.5ch] animate-pulse">|</span>
                  )}
                </span>
              </span>
            </p>
            {/* Animated tagline */}
            <motion.p
              className="text-xl lg:text-2xl font-bold max-w-4xl mx-auto mb-10 text-center gradient-text-animate"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
            >
              OFFERING NEW DIAMENTIONAL 4.0 PHARMACEUTICAL FILL FINISH MACHINES
            </motion.p>
            <div
              className="flex flex-wrap justify-center items-center gap-4 lg:gap-8 mb-16"
            >
              <div className="text-center px-4">
                <p className="text-2xl sm:text-3xl font-bold">20+</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Years pharma expertise</p>
              </div>
              <div className="hidden sm:block border-l h-10 border-border"></div>
              <div className="text-center px-4">
                <p className="text-2xl sm:text-3xl font-bold">Sterile</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Processing focus</p>
              </div>
              <div className="hidden sm:block border-l h-10 border-border"></div>
              <div className="text-center px-4">
                <p className="text-2xl sm:text-3xl font-bold">Compliant</p>
                <p className="text-xs sm:text-sm text-muted-foreground">GMP / EU Annex 1 ready</p>
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
