import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Lightbulb, TrendingUp, Shield, Wallet, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Tip {
  id: number;
  category: string;
  title: string;
  content: string;
  icon: React.ReactNode;
  color: string;
}

const tips: Tip[] = [
  {
    id: 1,
    category: 'Saving',
    title: 'Pay Yourself First',
    content: 'Set up automatic transfers to savings as soon as you get paid. Treat savings like a non-negotiable bill.',
    icon: <Wallet className="h-8 w-8" />,
    color: 'from-green-500 to-emerald-600',
  },
  {
    id: 2,
    category: 'Investing',
    title: 'Start Early, Benefit from Compound Interest',
    content: 'Even small investments grow significantly over time. Starting 10 years earlier can double your retirement savings.',
    icon: <TrendingUp className="h-8 w-8" />,
    color: 'from-finance-primary to-purple-600',
  },
  {
    id: 3,
    category: 'Emergency Fund',
    title: 'Build Your Safety Net',
    content: 'Aim for 3-6 months of expenses in an easily accessible savings account before aggressive investing.',
    icon: <Shield className="h-8 w-8" />,
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: 4,
    category: 'Budgeting',
    title: 'Follow the 50/30/20 Rule',
    content: '50% for needs, 30% for wants, 20% for savings and debt repayment. A simple framework for balanced finances.',
    icon: <Target className="h-8 w-8" />,
    color: 'from-finance-warning to-amber-600',
  },
  {
    id: 5,
    category: 'Debt',
    title: 'Tackle High-Interest Debt First',
    content: 'Credit card debt at 20%+ APR costs more than investment returns. Pay it off before investing beyond employer match.',
    icon: <Lightbulb className="h-8 w-8" />,
    color: 'from-red-500 to-rose-600',
  },
  {
    id: 6,
    category: 'Retirement',
    title: 'Never Leave Free Money on the Table',
    content: 'Always contribute enough to get your full employer 401(k) match. It\'s an instant 50-100% return on your money.',
    icon: <Wallet className="h-8 w-8" />,
    color: 'from-indigo-500 to-violet-600',
  },
  {
    id: 7,
    category: 'Credit',
    title: 'Keep Credit Utilization Below 30%',
    content: 'Using more than 30% of your available credit can hurt your score. Keep balances low relative to limits.',
    icon: <TrendingUp className="h-8 w-8" />,
    color: 'from-teal-500 to-cyan-600',
  },
  {
    id: 8,
    category: 'Investing',
    title: 'Diversification Reduces Risk',
    content: 'Don\'t put all eggs in one basket. Spread investments across stocks, bonds, and asset classes.',
    icon: <Shield className="h-8 w-8" />,
    color: 'from-finance-accent to-blue-600',
  },
];

interface FinancialTipsCarouselProps {
  autoPlay?: boolean;
  interval?: number;
}

const FinancialTipsCarousel: React.FC<FinancialTipsCarouselProps> = ({
  autoPlay = true,
  interval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!autoPlay || isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tips.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, isHovered]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + tips.length) % tips.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % tips.length);
  };

  const currentTip = tips[currentIndex];

  return (
    <div
      className="w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden border-0 shadow-lg">
        <CardContent className="p-0">
          <div className={cn('bg-gradient-to-r text-white p-6 sm:p-8 transition-all duration-500', currentTip.color)}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                {currentTip.icon}
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
                    {currentTip.category}
                  </span>
                  <span className="text-xs opacity-75">Tip of the Day</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2">{currentTip.title}</h3>
                <p className="text-white/90 text-sm sm:text-base">{currentTip.content}</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goToPrevious}
                  className="h-8 w-8 bg-white/20 hover:bg-white/30 text-white rounded-full"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goToNext}
                  className="h-8 w-8 bg-white/20 hover:bg-white/30 text-white rounded-full"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Dots */}
              <div className="flex gap-1.5">
                {tips.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      'w-2 h-2 rounded-full transition-all',
                      index === currentIndex ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60'
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialTipsCarousel;