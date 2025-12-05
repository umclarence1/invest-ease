import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Facebook, Twitter, Instagram, Linkedin, TrendingUp, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1 - About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-finance-primary rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-finance-primary font-heading">WealthWise</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6">
              Empowering you to make smart financial decisions through education, tools, and
              personalized guidance.
            </p>
            <div className="flex space-x-3">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Linkedin, label: 'LinkedIn' },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="p-2 rounded-lg bg-muted hover:bg-finance-primary hover:text-white text-muted-foreground transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'Personal Finance', href: '/personal-finance' },
                { name: 'Investing', href: '/investing' },
                { name: 'Financial Tools', href: '/tools' },
                { name: 'Blog', href: '/blog' },
                { name: 'Financial Glossary', href: '/tools?tab=glossary' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-finance-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Company</h3>
            <ul className="space-y-3">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Contact', href: '/contact' },
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Terms of Service', href: '/terms' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-finance-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="mt-6 space-y-2">
              <a href="mailto:hello@wealthwise.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-finance-primary">
                <Mail className="h-4 w-4" />
                hello@wealthwise.com
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-finance-primary">
                <Phone className="h-4 w-4" />
                (123) 456-7890
              </a>
            </div>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest financial tips and insights delivered to your inbox weekly.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-background"
              />
              <Button className="w-full bg-finance-primary hover:bg-finance-primary/90 text-white">
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-3">
              By subscribing, you agree to our Privacy Policy.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              &copy; {currentYear} WealthWise. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/privacy" className="text-muted-foreground hover:text-finance-primary transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-finance-primary transition-colors">
                Terms
              </Link>
              <Link to="/sitemap" className="text-muted-foreground hover:text-finance-primary transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
