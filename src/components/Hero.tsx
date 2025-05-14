
import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, BarChart3, Check, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AspectRatio } from './ui/aspect-ratio';
import { Card, CardContent } from './ui/card';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-1 hero-gradient"></div>
      <div className="absolute -z-10 top-20 right-10 w-72 h-72 bg-finance-secondary/10 rounded-full blur-3xl"></div>
      <div className="absolute -z-10 bottom-10 left-10 w-80 h-80 bg-finance-accent/5 rounded-full blur-3xl"></div>
      
      <div className="container-custom pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content */}
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center rounded-full bg-finance-primary/10 px-3 py-1 text-sm text-finance-primary mb-4">
              <TrendingUp className="h-3.5 w-3.5 mr-2" />
              <span>Financial insights for everyone</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
              Master Your Money <span className="text-finance-primary">&</span> Build Wealth
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Expert-backed strategies to help you save money, invest wisely, and achieve financial freedom. Join over 10,000 readers already on their path to wealth.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button className="bg-finance-primary hover:bg-finance-primary/90 text-white px-6 py-6 text-lg shadow-lg shadow-finance-primary/30">
                <Link to="/tools" className="flex items-center">
                  Try Our Free Tools
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" className="border-finance-primary text-finance-primary hover:bg-finance-primary/10 px-6 py-6 text-lg">
                <Link to="/blog">Read Latest Guides</Link>
              </Button>
            </div>
            
            {/* Benefits list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              {['Personalized advice', 'Interactive calculators', 'Expert strategies', 'Community support'].map((benefit) => (
                <div key={benefit} className="flex items-center">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-finance-success/20 flex items-center justify-center">
                    <Check className="h-3 w-3 text-finance-success" />
                  </div>
                  <p className="ml-2 text-sm text-gray-600">{benefit}</p>
                </div>
              ))}
            </div>
            
            {/* Social proof */}
            <div className="flex items-center pt-4 space-x-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center overflow-hidden">
                    <span className="text-xs font-medium text-gray-600">{i}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Trusted by 10,000+ readers</span> • Featured in top finance publications
              </p>
            </div>
          </div>

          {/* Hero Visualization - Financial Dashboard Mockup */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10">
              <Card className="overflow-hidden border-0 shadow-2xl bg-white">
                <CardContent className="p-0">
                  <div className="p-5 bg-finance-primary">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold text-white">Financial Dashboard</h3>
                      <BarChart3 className="text-white h-5 w-5" />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: 'Savings', value: '$12,580', change: '+12%' },
                        { label: 'Investments', value: '$45,920', change: '+8.5%' },
                        { label: 'Net Worth', value: '$125,430', change: '+15%' }
                      ].map((stat) => (
                        <div key={stat.label} className="bg-white/10 rounded-lg p-3">
                          <p className="text-white/70 text-xs">{stat.label}</p>
                          <p className="text-white font-bold">{stat.value}</p>
                          <p className="text-green-300 text-xs">{stat.change}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="mb-4">
                      <h4 className="text-gray-700 font-medium mb-2">Portfolio Allocation</h4>
                      <div className="flex w-full h-4 rounded-full overflow-hidden bg-gray-100">
                        <div className="bg-finance-primary h-full" style={{ width: '45%' }}></div>
                        <div className="bg-finance-accent h-full" style={{ width: '30%' }}></div>
                        <div className="bg-finance-secondary h-full" style={{ width: '15%' }}></div>
                        <div className="bg-finance-success h-full" style={{ width: '10%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600 mt-1">
                        <span>Stocks</span>
                        <span>Bonds</span>
                        <span>Real Estate</span>
                        <span>Cash</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-gray-700 font-medium">Recent Transactions</h4>
                      {[
                        { name: 'Deposit', date: 'May 12', amount: '+$2,500' },
                        { name: 'Stock Purchase', date: 'May 10', amount: '-$1,250' },
                        { name: 'Dividend', date: 'May 5', amount: '+$320' }
                      ].map((tx, i) => (
                        <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100">
                          <div>
                            <p className="font-medium text-sm">{tx.name}</p>
                            <p className="text-gray-500 text-xs">{tx.date}</p>
                          </div>
                          <p className={`font-medium ${tx.amount.startsWith('+') ? 'text-finance-success' : 'text-gray-700'}`}>{tx.amount}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -z-0 -bottom-8 -right-8 w-64 h-64 rounded-full bg-finance-secondary/20 blur-md"></div>
            <div className="absolute -z-0 -top-4 -left-4 w-32 h-32 rounded-full bg-finance-accent/15 blur-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
