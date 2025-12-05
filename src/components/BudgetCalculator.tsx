import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { PlusCircle, MinusCircle, PieChart, Wallet, AlertTriangle, TrendingUp } from 'lucide-react';
import { Progress } from './ui/progress';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Badge } from './ui/badge';

type ExpenseItem = {
  id: number;
  name: string;
  amount: number;
};

const BudgetCalculator = () => {
  const { formatCurrency, currency } = useCurrency();
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    { id: 1, name: 'Rent/Mortgage', amount: 0 },
    { id: 2, name: 'Utilities', amount: 0 },
    { id: 3, name: 'Groceries', amount: 0 },
    { id: 4, name: 'Transportation', amount: 0 },
    { id: 5, name: 'Insurance', amount: 0 },
  ]);
  const [newExpenseName, setNewExpenseName] = useState<string>('');

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remaining = income - totalExpenses;
  const savingsRate = income > 0 ? ((remaining / income) * 100).toFixed(1) : '0';
  const expenseRate = income > 0 ? ((totalExpenses / income) * 100).toFixed(1) : '0';

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

  const getExpensePercentage = (amount: number) => {
    return income > 0 ? (amount / income) * 100 : 0;
  };

  // 50/30/20 rule analysis
  const needs = expenses.slice(0, 3).reduce((sum, e) => sum + e.amount, 0);
  const wants = expenses.slice(3).reduce((sum, e) => sum + e.amount, 0);
  const savings = remaining;

  const needsPercent = income > 0 ? (needs / income) * 100 : 0;
  const wantsPercent = income > 0 ? (wants / income) * 100 : 0;
  const savingsPercent = income > 0 ? (savings / income) * 100 : 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <CardTitle className="text-center sm:text-left text-finance-primary flex items-center gap-2 justify-center sm:justify-start">
              <Wallet className="h-6 w-6" />
              Budget Calculator
            </CardTitle>
            <CardDescription className="text-center sm:text-left">
              Plan your monthly budget and track your spending
            </CardDescription>
          </div>
          <Badge variant="outline" className="w-fit mx-auto sm:mx-0">
            {currency.flag} {currency.code}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Income and Expenses Input Section */}
          <div className="space-y-6">
            {/* Monthly Income */}
            <div className="space-y-2">
              <Label htmlFor="income" className="text-base font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-finance-success" />
                Monthly Income
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {currency.symbol}
                </span>
                <Input
                  id="income"
                  type="number"
                  placeholder="Enter your monthly income"
                  value={income || ''}
                  onChange={handleIncomeChange}
                  className="text-lg pl-8"
                />
              </div>
            </div>

            {/* Expenses */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Monthly Expenses</Label>

              {/* Expense Items */}
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {expenses.map((expense) => (
                  <div key={expense.id} className="flex items-center gap-2">
                    <Input
                      value={expense.name}
                      onChange={(e) => handleExpenseNameChange(expense.id, e.target.value)}
                      placeholder="Expense name"
                      className="flex-grow"
                    />
                    <div className="relative w-28">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        {currency.symbol}
                      </span>
                      <Input
                        type="number"
                        value={expense.amount || ''}
                        onChange={(e) => handleExpenseAmountChange(expense.id, parseFloat(e.target.value) || 0)}
                        placeholder="0"
                        className="pl-6"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeExpense(expense.id)}
                      className="text-destructive hover:text-destructive flex-shrink-0"
                    >
                      <MinusCircle className="h-5 w-5" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Add New Expense */}
              <div className="flex items-center gap-2 pt-2">
                <Input
                  value={newExpenseName}
                  onChange={(e) => setNewExpenseName(e.target.value)}
                  placeholder="New expense name"
                  className="flex-grow"
                  onKeyPress={(e) => e.key === 'Enter' && addExpense()}
                />
                <Button
                  onClick={addExpense}
                  variant="outline"
                  className="flex items-center gap-1 flex-shrink-0"
                >
                  <PlusCircle className="h-4 w-4" /> Add
                </Button>
              </div>
            </div>
          </div>

          {/* Summary and Chart Section */}
          <div className="bg-muted/50 p-6 rounded-xl border border-border space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-finance-primary">Budget Summary</h3>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-card rounded-lg p-3 text-center border border-border">
                <p className="text-xs text-muted-foreground">Income</p>
                <p className="font-bold text-foreground">{formatCurrency(income, { compact: true })}</p>
              </div>
              <div className="bg-card rounded-lg p-3 text-center border border-border">
                <p className="text-xs text-muted-foreground">Expenses</p>
                <p className="font-bold text-foreground">{formatCurrency(totalExpenses, { compact: true })}</p>
              </div>
              <div className={`rounded-lg p-3 text-center ${remaining >= 0 ? 'bg-finance-success/10' : 'bg-finance-danger/10'}`}>
                <p className="text-xs text-muted-foreground">Remaining</p>
                <p className={`font-bold ${remaining >= 0 ? 'text-finance-success' : 'text-finance-danger'}`}>
                  {formatCurrency(remaining, { compact: true })}
                </p>
              </div>
            </div>

            {/* Progress Bars */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Expenses</span>
                  <span className="font-medium text-foreground">{expenseRate}% of income</span>
                </div>
                <Progress
                  value={Math.min(parseFloat(expenseRate), 100)}
                  className="h-2"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Savings Rate</span>
                  <span className={`font-medium ${parseFloat(savingsRate) >= 20 ? 'text-finance-success' : 'text-finance-warning'}`}>
                    {savingsRate}%
                  </span>
                </div>
                <Progress
                  value={Math.max(parseFloat(savingsRate), 0)}
                  className="h-2"
                />
              </div>
            </div>

            {/* Expenses Breakdown */}
            {income > 0 && expenses.some(e => e.amount > 0) && (
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2 text-foreground">
                  <PieChart className="h-5 w-5 text-finance-primary" />
                  Expense Breakdown
                </h4>
                <div className="space-y-2 max-h-[150px] overflow-y-auto">
                  {expenses
                    .filter(expense => expense.amount > 0)
                    .sort((a, b) => b.amount - a.amount)
                    .map((expense) => (
                      <div key={expense.id}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground truncate max-w-[60%]">{expense.name}</span>
                          <span className="font-medium text-foreground">
                            {getExpensePercentage(expense.amount).toFixed(1)}%
                          </span>
                        </div>
                        <Progress
                          value={getExpensePercentage(expense.amount)}
                          className="h-1.5"
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Alerts */}
            {remaining < 0 && (
              <div className="p-3 bg-finance-danger/10 border border-finance-danger/30 rounded-lg text-sm">
                <p className="font-medium text-finance-danger mb-1 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Budget Alert
                </p>
                <p className="text-muted-foreground">
                  Your expenses exceed your income by {formatCurrency(Math.abs(remaining))}. Consider reducing non-essential expenses.
                </p>
              </div>
            )}

            {remaining >= 0 && parseFloat(savingsRate) >= 20 && (
              <div className="p-3 bg-finance-success/10 border border-finance-success/30 rounded-lg text-sm">
                <p className="font-medium text-finance-success mb-1">Excellent!</p>
                <p className="text-muted-foreground">
                  You're saving {savingsRate}% of your income. Keep up the great work!
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
