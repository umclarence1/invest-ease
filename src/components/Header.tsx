
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Search, Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Personal Finance', path: '/personal-finance' },
    { name: 'Investing', path: '/investing' },
    { name: 'Tools', path: '/tools' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 bg-white shadow-sm z-50">
      <div className="container-custom py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-bold text-2xl text-finance-primary">
          WealthWise
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-600 hover:text-finance-accent transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}

        {/* Search & Mobile Menu Toggle */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search size={20} />
          </Button>

          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobile && isMenuOpen && (
        <nav className="bg-white border-t animate-fade-in">
          <div className="container-custom py-4 flex flex-col">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="py-2 text-gray-600 hover:text-finance-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 flex">
              <Button className="w-full bg-finance-primary hover:bg-finance-primary/90">
                Subscribe
              </Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
