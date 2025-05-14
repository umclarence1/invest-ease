
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { PlusCircle, MinusCircle, PieChart } from 'lucide-react';
import { Progress } from './ui/progress';

type ExpenseItem = {
  id: number;
  name: string;
  amount: number;
};

const BudgetCalculator = () => {
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    { id: 1, name: 'Rent/Mortgage', amount: 0 },
    { id: 2, name: 'Utilities', amount: 0 },
    { id: 3, name: 'Groceries', amount: 0 },
  ]);
  const [newExpenseName, setNewExpenseName] = useState<string>('');

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remaining = income - totalExpenses;
  const savingsRate = income > 0 ? ((remaining / income) * 100).toFixed(1) : '0';
  
  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setIncome(value);
  };

  const handleExpenseAmountChange = (id: number, amount: number) => {
    setExpenses(expenses.map(expense => 
      expense.id === id ? { ...expense, amount } : expense
    ));
  };

  const handleExpenseNameChange = (id: number, name: string) => {
    setExpenses(expenses.map(expense => 
      expense.id === id ? { ...expense, name } : expense
    ));
  };

  const addExpense = () => {
    if (newExpenseName.trim()) {
      const newId = expenses.length > 0 ? Math.max(...expenses.map(e => e.id)) + 1 : 1;
      setExpenses([...expenses, { id: newId, name: newExpenseName, amount: 0 }]);
      setNewExpenseName('');
    }
  };

  const removeExpense = (id: number) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  // Calculate percentages for the budget breakdown
  const getExpensePercentage = (amount: number) => {
    return income > 0 ? (amount / income) * 100 : 0;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-finance-primary">Budget Calculator</CardTitle>
        <CardDescription className="text-center">
          Plan your monthly budget by entering your income and expenses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Income and Expenses Input Section */}
          <div className="space-y-6">
            {/* Monthly Income */}
            <div className="space-y-2">
              <Label htmlFor="income" className="text-lg font-medium">
                Monthly Income
              </Label>
              <Input
                id="income"
                type="number"
                placeholder="Enter your monthly income"
                value={income || ''}
                onChange={handleIncomeChange}
                className="text-lg"
              />
            </div>

            {/* Expenses */}
            <div className="space-y-4">
              <Label className="text-lg font-medium">Monthly Expenses</Label>
              
              {/* Expense Items */}
              <div className="space-y-3">
                {expenses.map((expense) => (
                  <div key={expense.id} className="flex items-center space-x-2">
                    <Input
                      value={expense.name}
                      onChange={(e) => handleExpenseNameChange(expense.id, e.target.value)}
                      placeholder="Expense name"
                      className="flex-grow"
                    />
                    <Input
                      type="number"
                      value={expense.amount || ''}
                      onChange={(e) => handleExpenseAmountChange(expense.id, parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      className="w-24"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeExpense(expense.id)}
                    >
                      <MinusCircle className="h-5 w-5 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Add New Expense */}
              <div className="flex items-center space-x-2 mt-2">
                <Input
                  value={newExpenseName}
                  onChange={(e) => setNewExpenseName(e.target.value)}
                  placeholder="New expense name"
                  className="flex-grow"
                />
                <Button 
                  onClick={addExpense} 
                  variant="outline"
                  className="flex items-center"
                >
                  <PlusCircle className="h-5 w-5 mr-1" /> Add
                </Button>
              </div>
            </div>
          </div>

          {/* Summary and Chart Section */}
          <div className="bg-gray-50 p-6 rounded-lg space-y-6">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-finance-primary">Budget Summary</h3>
            </div>

            {/* Summary Values */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Total Income</span>
                  <span className="font-medium">${income.toFixed(2)}</span>
                </div>
                <Progress value={100} className="h-2 bg-gray-200" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Total Expenses</span>
                  <span className="font-medium">${totalExpenses.toFixed(2)}</span>
                </div>
                <Progress 
                  value={income > 0 ? (totalExpenses / income) * 100 : 0} 
                  className="h-2 bg-gray-200" 
                />
              </div>

              <div className={`p-4 rounded-md ${remaining >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                <div className="flex justify-between">
                  <span className="font-medium">Remaining</span>
                  <span className={`font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${remaining.toFixed(2)}
                  </span>
                </div>
                <div className="text-sm mt-1">
                  {remaining >= 0 ? 
                    `You're saving ${savingsRate}% of your income` : 
                    'Your expenses exceed your income'
                  }
                </div>
              </div>
            </div>

            {/* Expenses Breakdown */}
            {income > 0 && expenses.some(e => e.amount > 0) && (
              <div className="mt-6">
                <h4 className="font-medium mb-3 flex items-center">
                  <PieChart className="h-5 w-5 mr-2 text-finance-primary" />
                  Expense Breakdown
                </h4>
                <div className="space-y-2">
                  {expenses
                    .filter(expense => expense.amount > 0)
                    .sort((a, b) => b.amount - a.amount)
                    .map((expense) => (
                      <div key={expense.id}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{expense.name}</span>
                          <span className="font-medium">
                            {getExpensePercentage(expense.amount).toFixed(1)}%
                          </span>
                        </div>
                        <Progress 
                          value={getExpensePercentage(expense.amount)} 
                          className="h-1.5 bg-gray-200" 
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Savings Tips */}
            {remaining < 0 && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-sm">
                <p className="font-medium text-amber-800 mb-1">Budget Alert</p>
                <p className="text-amber-700">
                  Your expenses exceed your income. Consider reducing non-essential expenses or finding ways to increase your income.
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetCalculator;
