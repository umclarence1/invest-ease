import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { BookOpen, Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Term {
  term: string;
  definition: string;
  category: string;
  related?: string[];
}

const glossaryTerms: Term[] = [
  { term: 'Asset Allocation', definition: 'The strategy of dividing investments among different asset categories like stocks, bonds, and cash to balance risk and reward.', category: 'Investing', related: ['Diversification', 'Portfolio'] },
  { term: 'Bond', definition: 'A fixed-income investment where you lend money to an entity that pays you back with interest over a specified period.', category: 'Investing', related: ['Fixed Income', 'Yield'] },
  { term: 'Compound Interest', definition: 'Interest calculated on both the initial principal and the accumulated interest from previous periods.', category: 'Investing', related: ['APY', 'Interest Rate'] },
  { term: 'Diversification', definition: 'Spreading investments across various assets to reduce risk. "Don\'t put all your eggs in one basket."', category: 'Investing', related: ['Asset Allocation', 'Risk Management'] },
  { term: 'Dividend', definition: 'A portion of a company\'s earnings distributed to shareholders, typically paid quarterly.', category: 'Investing', related: ['Yield', 'Stock'] },
  { term: 'ETF', definition: 'Exchange-Traded Fund - A basket of securities that trades on an exchange like a stock.', category: 'Investing', related: ['Index Fund', 'Mutual Fund'] },
  { term: 'Index Fund', definition: 'A fund designed to track a specific market index like the S&P 500, offering broad market exposure at low cost.', category: 'Investing', related: ['ETF', 'Passive Investing'] },
  { term: 'P/E Ratio', definition: 'Price-to-Earnings ratio measures a company\'s share price relative to its earnings per share.', category: 'Investing', related: ['Valuation', 'Stock'] },
  { term: 'Portfolio', definition: 'A collection of investments owned by an individual, including stocks, bonds, and other assets.', category: 'Investing', related: ['Asset Allocation', 'Diversification'] },
  { term: 'Stock', definition: 'A share of ownership in a company. Stockholders may benefit from price appreciation and dividends.', category: 'Investing', related: ['Equity', 'Dividend'] },
  { term: 'APR', definition: 'Annual Percentage Rate - The yearly cost of borrowing money, including interest and fees.', category: 'Banking', related: ['APY', 'Interest Rate'] },
  { term: 'APY', definition: 'Annual Percentage Yield - The total interest earned on a deposit in one year, including compound interest.', category: 'Banking', related: ['Compound Interest', 'Savings Account'] },
  { term: 'CD', definition: 'Certificate of Deposit - A savings product that earns interest on a lump sum for a fixed period.', category: 'Banking', related: ['Savings Account', 'Fixed Income'] },
  { term: 'FDIC Insurance', definition: 'Federal protection covering deposits up to $250,000 per depositor, per bank.', category: 'Banking', related: ['Savings Account'] },
  { term: 'Credit Score', definition: 'A number (300-850) representing your creditworthiness based on credit history and debt levels.', category: 'Credit', related: ['Credit Report', 'FICO'] },
  { term: 'Credit Utilization', definition: 'The percentage of available credit you\'re using. Keep below 30% for a healthy score.', category: 'Credit', related: ['Credit Score', 'Credit Limit'] },
  { term: 'Debt-to-Income Ratio', definition: 'Monthly debt payments divided by gross monthly income. Used by lenders to evaluate loan eligibility.', category: 'Credit', related: ['Credit Score', 'Mortgage'] },
  { term: '401(k)', definition: 'An employer-sponsored retirement savings plan with tax advantages and often employer matching.', category: 'Retirement', related: ['IRA', 'Employer Match'] },
  { term: 'IRA', definition: 'Individual Retirement Account - A tax-advantaged account for retirement savings.', category: 'Retirement', related: ['401(k)', 'Roth IRA'] },
  { term: 'Roth IRA', definition: 'A retirement account funded with after-tax dollars where qualified withdrawals are tax-free.', category: 'Retirement', related: ['IRA', 'Traditional IRA'] },
  { term: 'Vesting', definition: 'The process of earning full ownership of employer contributions to your retirement account.', category: 'Retirement', related: ['401(k)', 'Employer Match'] },
  { term: 'Budget', definition: 'A financial plan that allocates income toward expenses, savings, and debt repayment.', category: 'Personal Finance', related: ['Emergency Fund', 'Savings Rate'] },
  { term: 'Emergency Fund', definition: 'Savings for unexpected expenses. Experts recommend 3-6 months of expenses.', category: 'Personal Finance', related: ['Budget', 'Savings Account'] },
  { term: 'Net Worth', definition: 'Total assets minus total liabilities. A measure of overall financial health.', category: 'Personal Finance', related: ['Assets', 'Liabilities'] },
  { term: 'Capital Gains', definition: 'Profit from selling an asset for more than you paid. Short and long-term gains are taxed differently.', category: 'Taxes', related: ['Investment', 'Tax Bracket'] },
  { term: 'Tax Bracket', definition: 'Income ranges that determine the tax rate applied to your earnings.', category: 'Taxes', related: ['Marginal Tax Rate', 'Effective Tax Rate'] },
  { term: 'Tax-Deferred', definition: 'Investment earnings not taxed until withdrawn, typically in retirement.', category: 'Taxes', related: ['401(k)', 'Traditional IRA'] },
];

const categories = [...new Set(glossaryTerms.map(t => t.category))].sort();

const FinancialGlossary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter(term => {
      const matchesSearch = term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || term.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }).sort((a, b) => a.term.localeCompare(b.term));
  }, [searchQuery, selectedCategory]);

  const groupedTerms = useMemo(() => {
    const groups: Record<string, Term[]> = {};
    filteredTerms.forEach(term => {
      const firstLetter = term.term[0].toUpperCase();
      if (!groups[firstLetter]) groups[firstLetter] = [];
      groups[firstLetter].push(term);
    });
    return groups;
  }, [filteredTerms]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-finance-primary flex items-center justify-center gap-2">
          <BookOpen className="h-6 w-6" />
          Financial Glossary
        </CardTitle>
        <CardDescription className="text-center">
          Learn essential financial terms and concepts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search terms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedCategory === null ? 'default' : 'outline'}
            className={cn('cursor-pointer transition-colors', selectedCategory === null && 'bg-finance-primary')}
            onClick={() => setSelectedCategory(null)}
          >
            <Filter className="h-3 w-3 mr-1" />
            All
          </Badge>
          {categories.map(category => (
            <Badge
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className={cn('cursor-pointer transition-colors', selectedCategory === category && 'bg-finance-primary')}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        <p className="text-sm text-muted-foreground">
          Showing {filteredTerms.length} of {glossaryTerms.length} terms
        </p>

        <ScrollArea className="h-[500px] pr-4">
          {Object.keys(groupedTerms).length > 0 ? (
            <Accordion type="single" collapsible className="space-y-2">
              {Object.entries(groupedTerms).map(([letter, terms]) => (
                <div key={letter}>
                  <div className="sticky top-0 bg-background py-2 z-10">
                    <span className="text-lg font-bold text-finance-primary">{letter}</span>
                  </div>
                  {terms.map((term) => (
                    <AccordionItem key={term.term} value={term.term} className="border rounded-lg mb-2 px-4">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-left">{term.term}</span>
                          <Badge variant="secondary" className="text-xs">{term.category}</Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground mb-3">{term.definition}</p>
                        {term.related && term.related.length > 0 && (
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs text-muted-foreground">Related:</span>
                            {term.related.map((related) => (
                              <Badge
                                key={related}
                                variant="outline"
                                className="text-xs cursor-pointer hover:bg-finance-primary/10"
                                onClick={() => setSearchQuery(related)}
                              >
                                {related}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </div>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No terms found matching your search.</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default FinancialGlossary;