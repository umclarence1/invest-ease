
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BudgetCalculator from '../components/BudgetCalculator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, TrendingUp, CreditCard, PiggyBank } from 'lucide-react';

const Tools = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Page Header */}
        <section className="bg-gray-50 py-12">
          <div className="container-custom">
            <h1 className="text-center">Financial Tools & Calculators</h1>
            <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
              Use our interactive calculators to help you plan, budget, and achieve your financial goals
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="section">
          <div className="container-custom">
            <Tabs defaultValue="budget" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                <TabsTrigger value="budget" className="flex items-center gap-2">
                  <Calculator className="h-4 w-4" /> Budget
                </TabsTrigger>
                <TabsTrigger value="investment" disabled className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" /> Investment
                </TabsTrigger>
                <TabsTrigger value="debt" disabled className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" /> Debt Payoff
                </TabsTrigger>
                <TabsTrigger value="savings" disabled className="flex items-center gap-2">
                  <PiggyBank className="h-4 w-4" /> Savings
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="budget" className="p-4">
                <BudgetCalculator />
              </TabsContent>
              
              <TabsContent value="investment">
                <Card>
                  <CardHeader>
                    <CardTitle>Investment Growth Calculator</CardTitle>
                    <CardDescription>Coming soon! Check back later for this calculator.</CardDescription>
                  </CardHeader>
                  <CardContent className="h-96 flex items-center justify-center bg-gray-50">
                    <p className="text-gray-500">This calculator will be available in a future update.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="debt">
                <Card>
                  <CardHeader>
                    <CardTitle>Debt Payoff Calculator</CardTitle>
                    <CardDescription>Coming soon! Check back later for this calculator.</CardDescription>
                  </CardHeader>
                  <CardContent className="h-96 flex items-center justify-center bg-gray-50">
                    <p className="text-gray-500">This calculator will be available in a future update.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="savings">
                <Card>
                  <CardHeader>
                    <CardTitle>Savings Goal Calculator</CardTitle>
                    <CardDescription>Coming soon! Check back later for this calculator.</CardDescription>
                  </CardHeader>
                  <CardContent className="h-96 flex items-center justify-center bg-gray-50">
                    <p className="text-gray-500">This calculator will be available in a future update.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* How to use the calculators */}
            <div className="mt-16">
              <h2 className="text-center">How to Use Our Financial Calculators</h2>
              <div className="max-w-3xl mx-auto mt-8">
                <div className="space-y-8">
                  <div>
                    <h3 className="font-semibold">Budget Calculator</h3>
                    <p className="text-gray-700">
                      Enter your monthly income and all your expenses to see a comprehensive breakdown 
                      of where your money goes. The calculator will show you how much you have left 
                      for savings or other goals, and highlight areas where you might be overspending.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold">Investment Growth Calculator (Coming Soon)</h3>
                    <p className="text-gray-700">
                      This calculator will help you estimate how your investments might grow over time. 
                      You'll be able to enter your initial investment, monthly contributions, expected 
                      rate of return, and time horizon to see potential growth scenarios.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold">Debt Payoff Calculator (Coming Soon)</h3>
                    <p className="text-gray-700">
                      Enter information about your debts, including balances, interest rates, and minimum 
                      payments. This calculator will help you create a strategic payoff plan, showing you 
                      how different payment strategies could affect your timeline to becoming debt-free.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold">Savings Goal Calculator (Coming Soon)</h3>
                    <p className="text-gray-700">
                      Whether you're saving for a home, vacation, or emergency fund, this calculator will 
                      help you determine how much you need to save each month to reach your goal by a 
                      specific date, accounting for expected interest earnings.
                    </p>
                  </div>
                </div>
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
