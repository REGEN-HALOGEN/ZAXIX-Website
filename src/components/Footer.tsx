import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Instagram, Twitter, Youtube, Facebook } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const solutionsLinks = ["Home", "Systems", "About", "Careers", "Contact"];
const servicesLinks: string[] = [];
const companyLinks: string[] = [];

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center">
              <Image
                src="/logo_header.svg"
                alt="Z AXIS Pharmachine Concepts"
                width={200}
                height={55}
                className="h-12 w-auto object-contain dark:hidden"
                unoptimized
              />
              <Image
                src="/logo_header-light.svg"
                alt="Z AXIS Pharmachine Concepts"
                width={200}
                height={55}
                className="h-12 w-auto object-contain hidden dark:block"
                unoptimized
              />
            </div>
            <p className="text-muted-foreground max-w-md">
              Next-edge pharmaceutical processing & packaging systems with a Pharma 4.0, sterile, compliant, automation-first philosophy.
            </p>

            <div className="flex items-center gap-4">
              <Link href="https://linkedin.com" target="_blank" className="p-2 bg-primary/10 rounded-full hover:bg-primary hover:text-white transition-all duration-300">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="https://instagram.com" target="_blank" className="p-2 bg-primary/10 rounded-full hover:bg-primary hover:text-white transition-all duration-300">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="https://twitter.com" target="_blank" className="p-2 bg-primary/10 rounded-full hover:bg-primary hover:text-white transition-all duration-300">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://youtube.com" target="_blank" className="p-2 bg-primary/10 rounded-full hover:bg-primary hover:text-white transition-all duration-300">
                <Youtube className="h-5 w-5" />
              </Link>
              <Link href="https://facebook.com" target="_blank" className="p-2 bg-primary/10 rounded-full hover:bg-primary hover:text-white transition-all duration-300">
                <Facebook className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8">
            <FooterLinkGroup title="Sections" links={solutionsLinks} />
            <div />
            <div />
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-semibold text-lg">Subscribe to our Newsletter</h4>
            <p className="text-muted-foreground text-sm">
              Get the latest updates on new products and upcoming events.
            </p>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder="Email" className="bg-background/50" />
              <Button type="submit">Subscribe</Button>
            </div>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground gap-4">
          <p>&copy; {new Date().getFullYear()} Z AXIS Pharmachine Concepts. All rights reserved.</p>

          <div className="flex space-x-4">
            <Link href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLinkGroup = ({ title, links }: { title: string; links: string[] }) => (
  <div className="space-y-4">
    <h4 className="font-semibold text-lg">{title}</h4>
    <ul className="space-y-2">
      {links.map((link, index) => (
        <li key={index}>
          <Link href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-muted-foreground hover:text-primary transition-colors">
            {link}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
