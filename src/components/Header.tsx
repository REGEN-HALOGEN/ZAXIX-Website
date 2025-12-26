"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { QuoteModal } from './Modals';
import type { SystemKey } from "@/lib/zaxis-systems";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#systems", label: "Systems" },
  { href: "#infrastructure", label: "Infrastructure" },
  { href: "#careers", label: "Careers" },
  { href: "#contact", label: "Contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quotePrefill, setQuotePrefill] = useState<
    { productInterest?: SystemKey; product?: string } | undefined
  >(undefined);
  const [activeSection, setActiveSection] = useState<string>("home");

  const activeSectionRef = useRef(activeSection);
  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!media) return;

    setIsDarkMode(media.matches);

    const onChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', onChange);
      return () => media.removeEventListener('change', onChange);
    }

    // Safari fallback
    media.addListener(onChange);
    return () => media.removeListener(onChange);
  }, []);

  useEffect(() => {
    const onOpenQuote = (event: Event) => {
      const custom = event as CustomEvent<{ productInterest?: SystemKey; product?: string }>;
      setQuotePrefill(custom.detail);
      setIsQuoteModalOpen(true);
    };

    window.addEventListener('zaxis:open-quote', onOpenQuote as EventListener);
    return () => window.removeEventListener('zaxis:open-quote', onOpenQuote as EventListener);
  }, []);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  useEffect(() => {
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash) setActiveSection(initialHash);

    const sectionIds = navLinks.map((l) => l.href.replace('#', ''));

    const setActiveIfChanged = (id: string) => {
      if (!id) return;
      if (activeSectionRef.current === id) return;
      activeSectionRef.current = id;
      setActiveSection(id);
    };

    // More stable approach than IntersectionObserver for mixed-height sections:
    // Choose the LAST section whose top has passed a scroll anchor.
    // This prevents "skipping" and removes jitter near boundaries.
    const getScrollAnchorY = () => {
      // fixed header height is h-20 (80px). Add a bit of padding.
      return window.scrollY + 96;
    };

    let sectionTops: Array<{ id: string; top: number }> = [];

    const recomputeSectionTops = () => {
      sectionTops = sectionIds
        .map((id) => {
          const el = document.getElementById(id);
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          return { id, top: rect.top + window.scrollY };
        })
        .filter(Boolean) as Array<{ id: string; top: number }>;

      sectionTops.sort((a, b) => a.top - b.top);
    };

    const detectActiveFromScroll = () => {
      if (sectionTops.length === 0) return;
      const anchorY = getScrollAnchorY();

      // If we're at/near bottom, force last section
      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (nearBottom) {
        setActiveIfChanged(sectionTops[sectionTops.length - 1].id);
        return;
      }

      let activeId = sectionTops[0].id;
      for (const s of sectionTops) {
        if (s.top <= anchorY) activeId = s.id;
        else break;
      }
      setActiveIfChanged(activeId);
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        // Recompute occasionally because dynamic content/images can shift layout.
        recomputeSectionTops();
        detectActiveFromScroll();
        ticking = false;
      });
    };

    // Initial compute (also after images load)
    const onLoad = () => {
      recomputeSectionTops();
      detectActiveFromScroll();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onLoad);
    window.addEventListener('load', onLoad);

    onLoad();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onLoad);
      window.removeEventListener('load', onLoad);
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <header className="bg-background/80 backdrop-blur-sm border-b border-border/40 fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-20">
            <a href="#home" className="flex items-center gap-4">
              <Image
                src={isDarkMode ? '/logo_header-light.svg' : '/logo_header.svg'}
                alt="Z AXIS logo"
                width={160}
                height={44}
                className="h-10 sm:h-11 md:h-12 w-auto object-contain"
                priority
                unoptimized
              />
              <span className="sr-only">Z AXIS Pharmachine Concepts</span>
            </a>

            <div className={`absolute top-full left-0 w-full bg-background border-b md:border-none md:static md:w-auto md:bg-transparent md:flex items-center md:space-x-6 ${isMenuOpen ? 'block' : 'hidden'}`}>
              <div className="flex flex-col md:flex-row items-center md:space-x-6 p-4 md:p-0">
                {navLinks.map((link) => {
                  const sectionId = link.href.replace('#', '');
                  const isActive = activeSection === sectionId;

                  const onClick = (e: React.MouseEvent) => {
                    // Anchor link behavior: smooth scroll if on same page, otherwise navigate to home with hash
                    if (link.href.startsWith('#')) {
                      e.preventDefault();
                      setIsMenuOpen(false);
                      const id = sectionId;
                      if (window.location.pathname === '/') {
                        const el = document.getElementById(id);
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        setActiveSection(id);
                        // update hash without jumping
                        window.history.replaceState(null, '', `#${id}`);
                      } else {
                        // navigate to home with hash
                        window.location.href = `/${link.href}`;
                      }
                    }

                    // For non-hash links default behavior happens
                  };

                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={onClick}
                      className={`relative block md:inline-block transition-colors py-2 px-2 ${isActive ? 'text-primary' : 'text-foreground hover:text-primary'
                        }`}
                    >
                      {link.label}
                      {isActive && (
                        <>
                          <span className="pointer-events-none absolute left-2 right-2 -bottom-0.5 h-1 rounded-full bg-primary/40 blur-sm" />
                          <span className="pointer-events-none absolute left-2 right-2 -bottom-0.5 h-1 rounded-full bg-primary" />
                        </>
                      )}
                    </a>
                  );
                })}

                <div className="flex items-center space-x-4 mt-4 md:mt-0 md:ml-6">
                  <Button onClick={toggleTheme} variant="ghost" size="icon">
                    {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </Button>
                  <Button
                    onClick={() => {
                      setQuotePrefill(undefined);
                      setIsQuoteModalOpen(true);
                    }}
                  >
                    Get Quote
                  </Button>
                </div>
              </div>
            </div>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </nav>
        </div>
      </header>
      <QuoteModal
        isOpen={isQuoteModalOpen}
        prefill={quotePrefill}
        onOpenChange={(open) => {
          setIsQuoteModalOpen(open);
          if (!open) setQuotePrefill(undefined);
        }}
      />
    </>
  );
};

export default Header;
