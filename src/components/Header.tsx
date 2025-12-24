"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { QuoteModal } from './Modals';

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#systems", label: "Systems" },
  { href: "#about", label: "About" },
  { href: "#careers", label: "Careers" },
  { href: "#contact", label: "Contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

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
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  useEffect(() => {
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash) setActiveSection(initialHash);

    const sectionIds = navLinks.map((l) => l.href.replace('#', ''));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection((entry.target as HTMLElement).id);
          }
        }
      },
      {
        root: null,
        rootMargin: '-35% 0px -60% 0px',
        threshold: 0.01,
      }
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <header className="bg-background/80 backdrop-blur-sm border-b border-border/40 fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-20">
            <a href="#home" className="flex items-center gap-2 sm:gap-3">
              <Image
                src="/logo.svg"
                alt="Z AXIS"
                width={56}
                height={56}
                className="h-12 w-12 sm:h-14 sm:w-14 object-contain"
                priority
                unoptimized
              />
              <div className="leading-none">
                <div className="inline-block border-b-[3px] border-primary pb-1">
                  <span className="text-xl sm:text-2xl font-extrabold tracking-tight">
                    <span className="text-primary">Z</span>
                    <span className="text-foreground">AXIS</span>
                  </span>
                </div>
                <div className="mt-1 text-[9px] sm:text-[10px] font-bold italic tracking-wide text-foreground/80">
                  PHARMACHINE CONCEPTS(INDIA)
                </div>
              </div>
            </a>
            
            <div className={`absolute top-full left-0 w-full bg-background border-b md:border-none md:static md:w-auto md:bg-transparent md:flex items-center md:space-x-6 ${isMenuOpen ? 'block' : 'hidden'}`}>
              <div className="flex flex-col md:flex-row items-center md:space-x-6 p-4 md:p-0">
                {navLinks.map((link) => {
                  const sectionId = link.href.replace('#', '');
                  const isActive = activeSection === sectionId;

                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={() => {
                        setActiveSection(sectionId);
                        setIsMenuOpen(false);
                      }}
                      className={`relative block md:inline-block transition-colors py-2 px-2 ${
                        isActive ? 'text-primary' : 'text-foreground hover:text-primary'
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
                  <Button onClick={() => setIsQuoteModalOpen(true)}>
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
      <QuoteModal isOpen={isQuoteModalOpen} onOpenChange={setIsQuoteModalOpen} />
    </>
  );
};

export default Header;
