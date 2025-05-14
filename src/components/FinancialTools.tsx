
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Link } from 'react-router-dom';
import { Calculator, TrendingUp, CreditCard, PiggyBank } from 'lucide-react';

interface ToolCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  path: string;
}

const ToolCard = ({ icon, title, description, path }: ToolCardProps) => {
  return (
    <Card className="finance-card h-full flex flex-col">
      <CardHeader>
        <div className="mb-4 p-3 bg-finance-secondary rounded-full w-fit">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600">{description}</p>
      </CardContent>
      <CardFooter>
        <Link 
          to={path} 
          className="text-finance-accent hover:underline font-medium"
        >
          Use this tool
        </Link>
      </CardFooter>
    </Card>
  );
};

const FinancialTools = () => {
  const tools = [
    {
      icon: <Calculator className="h-6 w-6 text-finance-primary" />,
      title: "Budget Calculator",
      description: "Create a personalized budget based on your income and expenses to help you manage your money more effectively.",
      path: "/tools/budget-calculator"
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-finance-primary" />,
      title: "Investment Growth Calculator",
      description: "See how your investments could grow over time with different contribution amounts and interest rates.",
      path: "/tools/investment-calculator"
    },
    {
      icon: <CreditCard className="h-6 w-6 text-finance-primary" />,
      title: "Debt Payoff Calculator",
      description: "Create a plan to become debt-free by calculating how different payment strategies affect your timeline.",
      path: "/tools/debt-calculator"
    },
    {
      icon: <PiggyBank className="h-6 w-6 text-finance-primary" />,
      title: "Savings Goal Calculator",
      description: "Determine how much you need to save each month to reach your financial goals by a specific date.",
      path: "/tools/savings-calculator"
    }
  ];

  return (
    <section className="section bg-gray-50">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h2 className="mb-4">Financial Tools</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Use our interactive calculators to plan your financial future and make smarter decisions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <ToolCard key={index} {...tool} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FinancialTools;
