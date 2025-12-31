"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Moon, Sun, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { QuoteModal, BrochureModal } from './Modals';
import type { SystemKey } from "@/lib/zaxis-systems";

// About section subsections for dropdown
const aboutSubsections = [
  { href: "#about", label: "Overview" },
  { href: "#about-why", label: "Why Z Axis?" },
  { href: "#about-values", label: "Vision & Mission" },
  { href: "#about-team", label: "Team Z Axis" },
];

// Systems section subsections for dropdown
const systemsSubsections = [
  { href: "#systems-pro", label: "ZAxis PRO" },
  { href: "#systems-pre", label: "ZAxis PRE" },
  { href: "#systems-core", label: "ZAxis CORE" },
];

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About", hasDropdown: true, subsections: aboutSubsections },
  { href: "#systems", label: "Systems", hasDropdown: true, subsections: systemsSubsections },
  { href: "#infrastructure", label: "Infrastructure" },
  { href: "#media", label: "Media" },
  { href: "#careers", label: "Careers" },
  { href: "#contact", label: "Contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
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
                width={200}
                height={56}
                className="h-12 sm:h-14 md:h-16 w-auto object-contain"
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

                  // Render dropdown for items with subsections
                  if (link.hasDropdown && link.subsections) {
                    return (
                      <div key={link.href} className="relative group">
                        <button
                          className={`relative flex items-center gap-1 transition-colors py-2 px-2 ${isActive ? 'text-primary' : 'text-foreground hover:text-primary'
                            }`}
                        >
                          <span className="relative">
                            {link.label}
                            {isActive && (
                              <>
                                <span className="pointer-events-none absolute left-0 right-0 -bottom-2.5 h-1 rounded-full bg-primary/40 blur-sm" />
                                <span className="pointer-events-none absolute left-0 right-0 -bottom-2.5 h-1 rounded-full bg-primary" />
                              </>
                            )}
                          </span>
                          <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                        </button>

                        {/* Dropdown menu */}
                        <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                          <div className="bg-background border border-border/60 rounded-lg shadow-lg py-2 min-w-[180px] backdrop-blur-sm">
                            {link.subsections.map((sub) => {
                              const subId = sub.href.replace('#', '');
                              const subOnClick = (e: React.MouseEvent) => {
                                e.preventDefault();
                                setIsMenuOpen(false);
                                if (window.location.pathname === '/') {
                                  const el = document.getElementById(subId);
                                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                  setActiveSection(sectionId);
                                  window.history.replaceState(null, '', sub.href);
                                  // Dispatch hashchange event so other components react to the change
                                  window.dispatchEvent(new HashChangeEvent('hashchange'));
                                } else {
                                  window.location.href = `/${sub.href}`;
                                }
                              };
                              return (
                                <a
                                  key={sub.href}
                                  href={sub.href}
                                  onClick={subOnClick}
                                  className="block px-4 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                                >
                                  {sub.label}
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  // Regular nav link
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
                    variant="outline"
                    onClick={() => setIsBrochureModalOpen(true)}
                  >
                    Get Brochure
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
      <BrochureModal
        isOpen={isBrochureModalOpen}
        onOpenChange={setIsBrochureModalOpen}
      />
    </>
  );
};

export default Header;
