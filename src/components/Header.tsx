import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { ThemeToggle } from './ThemeToggle';
import { CurrencySelector } from './CurrencySelector';
import {
  Search,
  Menu,
  X,
  Calculator,
  TrendingUp,
  CreditCard,
  Wallet,
  Heart,
  BookOpen,
  PiggyBank,
  Home,
  Landmark,
  ExternalLink,
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from './ui/sheet';
import { cn } from '@/lib/utils';

const toolsMenuItems = [
  { icon: Calculator, label: 'Budget Calculator', href: '/tools?tab=budget', description: 'Plan your monthly budget' },
  { icon: TrendingUp, label: 'Investment Calculator', href: '/tools?tab=investment', description: 'Project investment growth' },
  { icon: CreditCard, label: 'Debt Payoff Calculator', href: '/tools?tab=debt', description: 'Create a debt-free plan' },
  { icon: Wallet, label: 'Retirement Calculator', href: '/tools?tab=retirement', description: 'Plan for retirement' },
  { icon: Landmark, label: 'Net Worth Tracker', href: '/tools?tab=networth', description: 'Track your wealth' },
  { icon: Heart, label: 'Financial Health Quiz', href: '/tools?tab=quiz', description: 'Assess your finances' },
  { icon: BookOpen, label: 'Financial Glossary', href: '/tools?tab=glossary', description: 'Learn key terms' },
];

const learnMenuItems = [
  { icon: PiggyBank, label: 'Personal Finance', href: '/personal-finance', description: 'Budgeting, saving & credit' },
  { icon: TrendingUp, label: 'Investing', href: '/investing', description: 'Stocks, bonds & portfolios' },
  { icon: BookOpen, label: 'Blog', href: '/blog', description: 'Expert articles & guides' },
];

const externalResources = [
  { label: 'Investopedia', href: 'https://www.investopedia.com', description: 'Financial education' },
  { label: 'NerdWallet', href: 'https://www.nerdwallet.com', description: 'Financial tools & advice' },
  { label: 'Yahoo Finance', href: 'https://finance.yahoo.com', description: 'Market news & data' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const ListItem = React.forwardRef<
    React.ElementRef<'a'>,
    React.ComponentPropsWithoutRef<'a'> & { icon: React.ElementType }
  >(({ className, title, children, icon: Icon, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-finance-primary/10">
                <Icon className="h-4 w-4 text-finance-primary" />
              </div>
              <div>
                <div className="text-sm font-medium leading-none text-foreground">{title}</div>
                <p className="line-clamp-1 text-xs leading-snug text-muted-foreground mt-1">
                  {children}
                </p>
              </div>
            </div>
          </a>
        </NavigationMenuLink>
      </li>
    );
  });
  ListItem.displayName = 'ListItem';

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border'
          : 'bg-background'
      )}
    >
      <div className="container-custom py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-bold text-xl sm:text-2xl text-finance-primary font-heading flex items-center gap-2">
          <div className="p-1.5 bg-finance-primary rounded-lg">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <span>Wealthwise</span>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink
                    className={cn(
                      'group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-foreground',
                      location.pathname === '/' && 'bg-accent/50'
                    )}
                  >
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-foreground">Tools</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-1 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {toolsMenuItems.map((item) => (
                      <ListItem
                        key={item.label}
                        title={item.label}
                        href={item.href}
                        icon={item.icon}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-foreground">Learn</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-1 p-4 w-[400px]">
                    {learnMenuItems.map((item) => (
                      <ListItem
                        key={item.label}
                        title={item.label}
                        href={item.href}
                        icon={item.icon}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                    <li className="mt-2 pt-2 border-t border-border">
                      <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase">
                        External Resources
                      </p>
                    </li>
                    {externalResources.map((item) => (
                      <li key={item.label}>
                        <NavigationMenuLink asChild>
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm font-medium leading-none text-foreground">{item.label}</div>
                                <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                              </div>
                              <ExternalLink className="h-3 w-3 text-muted-foreground" />
                            </div>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/about">
                  <NavigationMenuLink
                    className={cn(
                      'group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground text-foreground',
                      location.pathname === '/about' && 'bg-accent/50'
                    )}
                  >
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/contact">
                  <NavigationMenuLink
                    className={cn(
                      'group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground text-foreground',
                      location.pathname === '/contact' && 'bg-accent/50'
                    )}
                  >
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )}

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          <CurrencySelector />
          <ThemeToggle />

          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>

          <Link to="/tools">
            <Button
              className="hidden sm:flex bg-finance-primary hover:bg-finance-primary/90 text-white"
              size="sm"
            >
              Get Started
            </Button>
          </Link>

          {/* Mobile Menu */}
          {isMobile && (
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg text-finance-primary">Menu</span>
                      <SheetClose asChild>
                        <Button variant="ghost" size="icon">
                          <X className="h-5 w-5" />
                        </Button>
                      </SheetClose>
                    </div>
                  </div>

                  <div className="flex-grow overflow-y-auto p-4 space-y-6">
                    {/* Main Nav */}
                    <div>
                      <Link
                        to="/"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                      >
                        <Home className="h-5 w-5 text-finance-primary" />
                        <span className="font-medium text-foreground">Home</span>
                      </Link>
                    </div>

                    {/* Tools Section */}
                    <div>
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">
                        Tools
                      </h3>
                      <div className="space-y-1">
                        {toolsMenuItems.map((item) => (
                          <Link
                            key={item.label}
                            to={item.href}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                          >
                            <item.icon className="h-5 w-5 text-finance-primary" />
                            <span className="text-sm text-foreground">{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Learn Section */}
                    <div>
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">
                        Learn
                      </h3>
                      <div className="space-y-1">
                        {learnMenuItems.map((item) => (
                          <Link
                            key={item.label}
                            to={item.href}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                          >
                            <item.icon className="h-5 w-5 text-finance-primary" />
                            <span className="text-sm text-foreground">{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* External Resources */}
                    <div>
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">
                        External Resources
                      </h3>
                      <div className="space-y-1">
                        {externalResources.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors"
                          >
                            <span className="text-sm text-foreground">{item.label}</span>
                            <ExternalLink className="h-4 w-4 text-muted-foreground" />
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Other Links */}
                    <div>
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">
                        Company
                      </h3>
                      <div className="space-y-1">
                        <Link
                          to="/about"
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                        >
                          <span className="text-sm text-foreground">About Us</span>
                        </Link>
                        <Link
                          to="/contact"
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                        >
                          <span className="text-sm text-foreground">Contact</span>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-t border-border">
                    <Link to="/tools">
                      <Button className="w-full bg-finance-primary hover:bg-finance-primary/90 text-white">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
