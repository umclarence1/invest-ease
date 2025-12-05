import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BudgetCalculator from '../components/BudgetCalculator';
import InvestmentCalculator from '../components/InvestmentCalculator';
import DebtPayoffCalculator from '../components/DebtPayoffCalculator';
import RetirementCalculator from '../components/RetirementCalculator';
import NetWorthTracker from '../components/NetWorthTracker';
import FinancialHealthQuiz from '../components/FinancialHealthQuiz';
import FinancialGlossary from '../components/FinancialGlossary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, TrendingUp, CreditCard, Wallet, Landmark, Heart, BookOpen } from 'lucide-react';

const Tools = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('budget');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['budget', 'investment', 'debt', 'retirement', 'networth', 'quiz', 'glossary'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const tabs = [
    { id: 'budget', label: 'Budget', icon: Calculator, shortLabel: 'Budget' },
    { id: 'investment', label: 'Investment', icon: TrendingUp, shortLabel: 'Invest' },
    { id: 'debt', label: 'Debt Payoff', icon: CreditCard, shortLabel: 'Debt' },
    { id: 'retirement', label: 'Retirement', icon: Wallet, shortLabel: 'Retire' },
    { id: 'networth', label: 'Net Worth', icon: Landmark, shortLabel: 'Worth' },
    { id: 'quiz', label: 'Health Quiz', icon: Heart, shortLabel: 'Quiz' },
    { id: 'glossary', label: 'Glossary', icon: BookOpen, shortLabel: 'Terms' },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Page Header */}
        <section className="bg-gradient-to-br from-finance-primary/10 via-background to-finance-accent/10 py-12 md:py-16">
          <div className="container-custom">
            <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Financial Tools & Calculators
            </h1>
            <p className="text-lg md:text-xl text-center text-muted-foreground max-w-3xl mx-auto mt-4">
              Use our interactive calculators to help you plan, budget, and achieve your financial goals
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-8 md:py-12">
          <div className="container-custom">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Desktop Tabs */}
              <TabsList className="hidden md:grid w-full grid-cols-7 mb-8 h-auto p-1">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex items-center gap-2 py-3 data-[state=active]:bg-finance-primary data-[state=active]:text-white"
                  >
                    <tab.icon className="h-4 w-4" />
                    <span className="hidden lg:inline">{tab.label}</span>
                    <span className="lg:hidden">{tab.shortLabel}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Mobile Tabs - Scrollable */}
              <div className="md:hidden mb-6 -mx-4 px-4">
                <TabsList className="inline-flex w-max gap-1 p-1 overflow-x-auto">
                  {tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="flex items-center gap-1.5 px-3 py-2 whitespace-nowrap data-[state=active]:bg-finance-primary data-[state=active]:text-white"
                    >
                      <tab.icon className="h-4 w-4" />
                      <span className="text-sm">{tab.shortLabel}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <TabsContent value="budget" className="mt-0">
                <BudgetCalculator />
              </TabsContent>

              <TabsContent value="investment" className="mt-0">
                <InvestmentCalculator />
              </TabsContent>

              <TabsContent value="debt" className="mt-0">
                <DebtPayoffCalculator />
              </TabsContent>

              <TabsContent value="retirement" className="mt-0">
                <RetirementCalculator />
              </TabsContent>

              <TabsContent value="networth" className="mt-0">
                <NetWorthTracker />
              </TabsContent>

              <TabsContent value="quiz" className="mt-0">
                <FinancialHealthQuiz />
              </TabsContent>

              <TabsContent value="glossary" className="mt-0">
                <FinancialGlossary />
              </TabsContent>
            </Tabs>

            {/* Tool Descriptions */}
            <div className="mt-16 bg-muted/30 rounded-xl p-6 md:p-8 border border-border">
              <h2 className="text-center text-2xl md:text-3xl font-bold mb-8">About Our Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: Calculator,
                    title: 'Budget Calculator',
                    description: 'Track income and expenses to understand where your money goes and identify savings opportunities.',
                  },
                  {
                    icon: TrendingUp,
                    title: 'Investment Calculator',
                    description: 'Project how your investments can grow with compound interest over time with different scenarios.',
                  },
                  {
                    icon: CreditCard,
                    title: 'Debt Payoff Calculator',
                    description: 'Compare avalanche vs snowball methods to create the best strategy to become debt-free.',
                  },
                  {
                    icon: Wallet,
                    title: 'Retirement Calculator',
                    description: 'Plan for retirement by projecting savings growth and estimating if you\'re on track.',
                  },
                  {
                    icon: Landmark,
                    title: 'Net Worth Tracker',
                    description: 'Track all your assets and liabilities to calculate and monitor your total net worth.',
                  },
                  {
                    icon: Heart,
                    title: 'Financial Health Quiz',
                    description: 'Answer questions to get a score and personalized recommendations for your finances.',
                  },
                ].map((tool, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="p-3 bg-finance-primary/10 rounded-lg h-fit">
                      <tool.icon className="h-5 w-5 text-finance-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{tool.title}</h3>
                      <p className="text-sm text-muted-foreground">{tool.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Tools;
