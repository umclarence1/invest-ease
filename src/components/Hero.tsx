import { Button } from './ui/button';
import { ArrowRight, BarChart3, Check, TrendingUp, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Badge } from './ui/badge';

const Hero = () => {
  const { formatCurrency, currency } = useCurrency();

  // Sample financial data (base values in USD)
  const dashboardStats = [
    { label: 'Savings', value: 12580, change: '+12%' },
    { label: 'Investments', value: 45920, change: '+8.5%' },
    { label: 'Net Worth', value: 125430, change: '+15%' }
  ];

  const transactions = [
    { name: 'Deposit', date: 'Dec 3', amount: 2500, type: 'credit' },
    { name: 'Stock Purchase', date: 'Dec 1', amount: -1250, type: 'debit' },
    { name: 'Dividend', date: 'Nov 28', amount: 320, type: 'credit' }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-finance-primary via-finance-accent to-finance-secondary"></div>
      <div className="absolute -z-10 top-20 right-10 w-72 h-72 bg-finance-secondary/10 rounded-full blur-3xl"></div>
      <div className="absolute -z-10 bottom-10 left-10 w-80 h-80 bg-finance-accent/10 rounded-full blur-3xl"></div>

      <div className="container-custom pt-12 pb-16 md:pt-20 md:pb-24 lg:pt-24 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Hero Content */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8">
            <div className="inline-flex items-center rounded-full bg-finance-primary/10 px-4 py-1.5 text-sm text-finance-primary">
              <Sparkles className="h-4 w-4 mr-2" />
              <span>Financial insights for everyone</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
              Master Your Money <span className="text-finance-primary">&</span> Build Wealth
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
              Expert-backed strategies to help you save money, invest wisely, and achieve financial freedom. Join over 10,000 readers already on their path to wealth.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/tools">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-finance-primary hover:bg-finance-primary/90 text-white px-6 py-6 text-lg shadow-lg shadow-finance-primary/30"
                >
                  Try Our Free Tools
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/blog">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-finance-primary text-finance-primary hover:bg-finance-primary/10 px-6 py-6 text-lg"
                >
                  Read Latest Guides
                </Button>
              </Link>
            </div>

            {/* Benefits list */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {['Personalized advice', 'Interactive calculators', 'Expert strategies', 'Community support'].map((benefit) => (
                <div key={benefit} className="flex items-center">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-finance-success/20 flex items-center justify-center">
                    <Check className="h-3 w-3 text-finance-success" />
                  </div>
                  <p className="ml-2 text-sm text-muted-foreground">{benefit}</p>
                </div>
              ))}
            </div>

            {/* Social proof */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-finance-primary to-finance-accent border-2 border-background flex items-center justify-center text-white text-xs font-bold"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Trusted by 10,000+ readers</span>
                <span className="hidden sm:inline"> • Featured in top finance publications</span>
              </p>
            </div>
          </div>

          {/* Hero Visualization - Financial Dashboard Mockup */}
          <div className="lg:col-span-6 relative mt-8 lg:mt-0">
            <div className="relative z-10">
              <Card className="overflow-hidden border-0 shadow-2xl bg-card">
                <CardContent className="p-0">
                  <div className="p-4 md:p-5 bg-gradient-to-r from-finance-primary to-finance-primary/90">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold text-white">Financial Dashboard</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-white/20 text-white text-xs border-0">
                          {currency.flag} {currency.code}
                        </Badge>
                        <BarChart3 className="text-white h-5 w-5" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 md:gap-3">
                      {dashboardStats.map((stat) => (
                        <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-3">
                          <p className="text-white/70 text-xs">{stat.label}</p>
                          <p className="text-white font-bold text-sm md:text-base">
                            {formatCurrency(stat.value, { compact: true })}
                          </p>
                          <p className="text-green-300 text-xs">{stat.change}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 md:p-5 bg-card">
                    <div className="mb-4">
                      <h4 className="text-foreground font-medium mb-2 text-sm">Portfolio Allocation</h4>
                      <div className="flex w-full h-3 md:h-4 rounded-full overflow-hidden bg-muted">
                        <div className="bg-finance-primary h-full" style={{ width: '45%' }}></div>
                        <div className="bg-finance-accent h-full" style={{ width: '30%' }}></div>
                        <div className="bg-finance-secondary h-full" style={{ width: '15%' }}></div>
                        <div className="bg-finance-success h-full" style={{ width: '10%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
                        <span>Stocks</span>
                        <span>Bonds</span>
                        <span>Real Estate</span>
                        <span>Cash</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-foreground font-medium text-sm">Recent Transactions</h4>
                      {transactions.map((tx, i) => (
                        <div key={i} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                          <div>
                            <p className="font-medium text-sm text-foreground">{tx.name}</p>
                            <p className="text-muted-foreground text-xs">{tx.date}</p>
                          </div>
                          <p className={`font-medium text-sm ${tx.type === 'credit' ? 'text-finance-success' : 'text-foreground'}`}>
                            {tx.type === 'credit' ? '+' : '-'}{formatCurrency(Math.abs(tx.amount))}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-0 -bottom-8 -right-8 w-48 md:w-64 h-48 md:h-64 rounded-full bg-finance-secondary/20 blur-xl"></div>
            <div className="absolute -z-0 -top-4 -left-4 w-24 md:w-32 h-24 md:h-32 rounded-full bg-finance-accent/20 blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
