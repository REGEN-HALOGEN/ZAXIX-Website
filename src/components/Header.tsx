"use client";
import React, { useEffect, useState, useCallback } from 'react';
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

// Map subsection IDs to their parent section for nav highlighting
const getParentSection = (id: string): string => {
  if (id.startsWith('about')) return 'about';
  if (id.startsWith('systems')) return 'systems';
  return id;
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [quotePrefill, setQuotePrefill] = useState<
    { productInterest?: SystemKey; product?: string } | undefined
  >(undefined);
  const [activeSection, setActiveSection] = useState<string>("home");

  // Scroll to element with retry for dynamically loaded sections
  // Uses CSS scroll-margin-top for offset (already in globals.css)
  const scrollToSection = useCallback((id: string) => {
    const tryScroll = (attempts: number) => {
      const el = document.getElementById(id);
      if (el) {
        // Scroll first with smooth behavior
        el.scrollIntoView({ behavior: 'smooth' });
        // Then update hash after a delay to trigger hashchange for Services component
        // without interfering with smooth scroll
        setTimeout(() => {
          if (window.location.hash !== `#${id}`) {
            window.history.pushState(null, '', `#${id}`);
            // Dispatch hashchange event manually since pushState doesn't trigger it
            window.dispatchEvent(new HashChangeEvent('hashchange'));
          }
        }, 100);
        return;
      }
      // Element not found - retry for dynamic imports
      if (attempts > 0) {
        setTimeout(() => tryScroll(attempts - 1), 100);
      }
    };
    tryScroll(20); // 2 seconds max wait
  }, []);

  // Dark mode detection
  useEffect(() => {
    const media = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!media) return;

    setIsDarkMode(media.matches);

    const onChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', onChange);
      return () => media.removeEventListener('change', onChange);
    }

    media.addListener(onChange);
    return () => media.removeListener(onChange);
  }, []);

  // Apply dark mode class
  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  // Quote modal event listener
  useEffect(() => {
    const onOpenQuote = (event: Event) => {
      const custom = event as CustomEvent<{ productInterest?: SystemKey; product?: string }>;
      setQuotePrefill(custom.detail);
      setIsQuoteModalOpen(true);
    };

    window.addEventListener('zaxis:open-quote', onOpenQuote as EventListener);
    return () => window.removeEventListener('zaxis:open-quote', onOpenQuote as EventListener);
  }, []);

  // Scroll-based active section detection (only updates after scroll stops)
  useEffect(() => {
    const mainSectionIds = navLinks.map(l => l.href.replace('#', ''));
    const headerHeight = 96;
    let scrollTimeout: NodeJS.Timeout | null = null;

    const updateActiveSection = () => {
      let currentSection = 'home';

      for (const id of mainSectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= headerHeight + 100) {
          currentSection = id;
        }
      }

      setActiveSection(currentSection);
    };

    // Debounced scroll handler - only updates after scroll stops
    const onScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateActiveSection, 100);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Handle hash navigation (both initial load and click)
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setActiveSection(getParentSection(hash));
      scrollToSection(hash);
    }

    // MutationObserver to detect when dynamic sections load
    // This fixes navigation on first load before sections exist
    const observer = new MutationObserver(() => {
      const currentHash = window.location.hash.replace('#', '');
      if (currentHash) {
        const el = document.getElementById(currentHash);
        if (el) {
          // Section just appeared - scroll to it
          el.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(getParentSection(currentHash));
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initial check after a brief delay
    setTimeout(updateActiveSection, 200);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      observer.disconnect();
    };
  }, [scrollToSection]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Click handler with retry logic for dynamic sections
  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');

    // If not on home page, navigate with hash
    if (window.location.pathname !== '/') {
      window.location.href = `/${href}`;
      return;
    }

    setIsMenuOpen(false);
    setActiveSection(getParentSection(id));
    scrollToSection(id);
  };

  return (
    <>
      <header className="bg-background/80 backdrop-blur-sm border-b border-border/40 fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-20">
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-4">
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

                  if (link.hasDropdown && link.subsections) {
                    return (
                      <div key={link.href} className="relative group">
                        <button
                          className={`relative flex items-center gap-1 transition-colors py-2 px-2 ${isActive ? 'text-primary' : 'text-foreground hover:text-primary'}`}
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

                        <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                          <div className="bg-background border border-border/60 rounded-lg shadow-lg py-2 min-w-[180px] backdrop-blur-sm">
                            {link.subsections.map((sub) => (
                              <a
                                key={sub.href}
                                href={sub.href}
                                onClick={(e) => handleNavClick(e, sub.href)}
                                className="block px-4 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                              >
                                {sub.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`relative block md:inline-block transition-colors py-2 px-2 ${isActive ? 'text-primary' : 'text-foreground hover:text-primary'}`}
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
                  <Button variant="outline" onClick={() => setIsBrochureModalOpen(true)}>
                    Get Brochure
                  </Button>
                  <Button onClick={() => { setQuotePrefill(undefined); setIsQuoteModalOpen(true); }}>
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
