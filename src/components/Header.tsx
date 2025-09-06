"use client";
import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { QuoteModal } from './Modals';

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#solutions", label: "Solutions" },
  { href: "#products", label: "Products" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <header className="bg-background/80 backdrop-blur-sm border-b border-border/40 fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-bold text-primary-foreground text-xl">Z</div>
              <div>
                <h1 className="text-2xl font-bold text-primary">ZAXIX</h1>
                <p className="text-xs text-muted-foreground -mt-1">Pharma Solutions</p>
              </div>
            </div>
            
            <div className={`absolute top-full left-0 w-full bg-background border-b md:border-none md:static md:w-auto md:bg-transparent md:flex items-center md:space-x-6 ${isMenuOpen ? 'block' : 'hidden'}`}>
              <div className="flex flex-col md:flex-row items-center md:space-x-6 p-4 md:p-0">
                {navLinks.map(link => (
                  <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="block md:inline-block text-foreground hover:text-primary transition-colors py-2">
                    {link.label}
                  </a>
                ))}
                
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
