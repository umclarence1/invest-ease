
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1 - About */}
          <div>
            <h3 className="text-xl font-bold mb-4">WealthWise</h3>
            <p className="text-sm text-gray-600 mb-4">
              Empowering you to make smart financial decisions through education, tools, and
              personalized guidance.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-finance-accent">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-finance-accent">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-finance-accent">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-finance-accent">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/personal-finance" className="text-gray-600 hover:text-finance-accent">
                  Personal Finance
                </Link>
              </li>
              <li>
                <Link to="/investing" className="text-gray-600 hover:text-finance-accent">
                  Investing
                </Link>
              </li>
              <li>
                <Link to="/tools" className="text-gray-600 hover:text-finance-accent">
                  Financial Tools
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-finance-accent">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-finance-accent">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-finance-accent">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-finance-accent">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-finance-accent">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-sm text-gray-600 mb-4">
              Get the latest financial tips and insights delivered to your inbox.
            </p>
            <div className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white"
              />
              <Button className="bg-finance-primary hover:bg-finance-primary/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 pt-6 mt-6 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} WealthWise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
