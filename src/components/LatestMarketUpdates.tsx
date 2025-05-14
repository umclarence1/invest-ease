
import React from 'react';
import { Card, CardContent } from './ui/card';
import { TrendingUp, TrendingDown, Percent, DollarSign, BarChart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MarketUpdate {
  name: string;
  change: number;
  value: string;
  icon: React.ReactNode;
}

const LatestMarketUpdates = () => {
  const updates: MarketUpdate[] = [
    { 
      name: 'S&P 500', 
      change: 0.68, 
      value: '4,932.41', 
      icon: <TrendingUp className="text-finance-success" />
    },
    { 
      name: 'Nasdaq', 
      change: 1.14, 
      value: '17,113.29', 
      icon: <TrendingUp className="text-finance-success" />
    },
    { 
      name: 'Dow Jones', 
      change: -0.23, 
      value: '38,529.54', 
      icon: <TrendingDown className="text-finance-warning" /> 
    },
    { 
      name: '10-Year Treasury', 
      change: 0.05, 
      value: '4.28%', 
      icon: <Percent className="text-finance-accent" /> 
    },
    { 
      name: 'Bitcoin', 
      change: 2.73, 
      value: '$62,950', 
      icon: <DollarSign className="text-finance-primary" /> 
    }
  ];

  return (
    <section className="py-8 bg-gray-50">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Latest Market Updates</h2>
          <div className="flex items-center text-finance-accent">
            <BarChart size={18} className="mr-2" />
            <span className="text-sm font-medium">Live data</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {updates.map((item) => (
            <Card key={item.name} className="border border-gray-200 hover:shadow-md transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">{item.name}</span>
                  {item.icon}
                </div>
                <div className="text-lg font-bold">{item.value}</div>
                <div className={cn(
                  "text-sm font-medium",
                  item.change > 0 ? "text-finance-success" : "text-finance-warning"
                )}>
                  {item.change > 0 ? "+" : ""}{item.change}%
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestMarketUpdates;
