import React from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Input } from './ui/input';

const solutionsLinks = ["Tablet Manufacturing", "Capsule Equipment", "Liquid Processing", "Processing Equipment"];
const servicesLinks = ["Installation", "Maintenance", "Consultation", "Training"];
const companyLinks = ["About Us", "Contact", "Catalogue", "Careers"];

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-2xl font-bold">ZAXIX</h3>
            <p className="text-muted-foreground max-w-md">
              Advanced Pharmaceutical Manufacturing Solutions driving innovation and efficiency in global healthcare.
            </p>
            <div className="flex space-x-4">
              <div className="text-center">
                <p className="font-bold text-lg">25+</p>
                <p className="text-sm text-muted-foreground">Years</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-lg">50+</p>
                <p className="text-sm text-muted-foreground">Countries</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-lg">1000+</p>
                <p className="text-sm text-muted-foreground">Projects</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8">
            <FooterLinkGroup title="Solutions" links={solutionsLinks} />
            <FooterLinkGroup title="Services" links={servicesLinks} />
            <FooterLinkGroup title="Company" links={companyLinks} />
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-semibold text-lg">Subscribe to our Newsletter</h4>
            <p className="text-muted-foreground text-sm">
              Get the latest updates on new products and upcoming events.
            </p>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder="Email" className="bg-background/50"/>
              <Button type="submit">Subscribe</Button>
            </div>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ZAXIX Pharma Solutions. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
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
