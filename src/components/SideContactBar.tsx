'use client';

import { useState, useEffect } from 'react';
import { Briefcase, FileText, Mail, Phone } from "lucide-react";
import { BrochureModal } from './Modals';

const ITEMS = [
  {
    key: "services",
    href: "#systems",
    label: "Services",
    icon: Briefcase,
  },
  {
    key: "brochure",
    href: "#",
    label: "Get Brochure",
    icon: FileText,
    isModal: true,
  },
  {
    key: "email",
    href: "mailto:vikram@zaxispharmachine.com",
    label: "vikram@zaxispharmachine.com",
    icon: Mail,
  },
  {
    key: "phone",
    href: "tel:+917945928496",
    label: "+91 79 45928496",
    icon: Phone,
  },
] as const;

export default function SideContactBar() {
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show when scrolling up, hide when scrolling down
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past threshold
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <nav
        aria-label="Quick contact"
        className={`fixed right-0 top-1/2 z-40 -translate-y-1/2 transition-transform duration-300 ease-in-out ${isVisible ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col rounded-l-2xl border border-border/60 bg-primary text-primary-foreground shadow-lg">
          {ITEMS.map((item) => {
            const Icon = item.icon;
            const isModal = 'isModal' in item && item.isModal;

            const handleClick = (e: React.MouseEvent) => {
              if (isModal) {
                e.preventDefault();
                setIsBrochureModalOpen(true);
              }
            };

            return (
              <a
                key={item.key}
                href={item.href}
                onClick={handleClick}
                aria-label={item.key === "services" ? "Services" : item.label}
                className="group relative flex h-14 w-14 items-center justify-center border-b border-primary-foreground/10 last:border-b-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
              >
                <Icon className="h-7 w-7" aria-hidden="true" />

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-full top-1/2 mr-2 -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-full border border-border/60 bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground opacity-0 shadow-lg transition-all duration-150 ease-linear group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                >
                  {item.key === "services" ? "Services" : item.label}
                </span>
              </a>
            );
          })}
        </div>
      </nav>
      <BrochureModal
        isOpen={isBrochureModalOpen}
        onOpenChange={setIsBrochureModalOpen}
      />
    </>
  );
}
