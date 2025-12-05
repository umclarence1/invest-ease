import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import {
  CreditCard,
  Plus,
  Trash2,
  Calendar,
  Zap,
  Snowflake,
  ArrowRight,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useCurrency } from '@/contexts/CurrencyContext';

interface Debt {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
}

interface PayoffResult {
  debtId: string;
  name: string;
  monthsToPayoff: number;
  totalInterest: number;
  payoffOrder: number;
}

const COLORS = ['#7E69AB', '#1EAEDB', '#4CAF50', '#F97316', '#EF4444', '#6B7280'];

const DebtPayoffCalculator = () => {
  const { formatCurrency } = useCurrency();
  const [debts, setDebts] = useState<Debt[]>([
    { id: '1', name: 'Credit Card 1', balance: 5000, interestRate: 19.99, minimumPayment: 150 },
    { id: '2', name: 'Credit Card 2', balance: 3000, interestRate: 22.99, minimumPayment: 90 },
    { id: '3', name: 'Car Loan', balance: 15000, interestRate: 6.5, minimumPayment: 350 },
  ]);
  const [extraPayment, setExtraPayment] = useState(200);
  const [strategy, setStrategy] = useState<'avalanche' | 'snowball'>('avalanche');

  const addDebt = () => {
    const newId = (Math.max(...debts.map(d => parseInt(d.id)), 0) + 1).toString();
    setDebts([...debts, {
      id: newId,
      name: `Debt ${newId}`,
      balance: 0,
      interestRate: 0,
      minimumPayment: 0,
    }]);
  };

  const removeDebt = (id: string) => {
    setDebts(debts.filter(d => d.id !== id));
  };

  const updateDebt = (id: string, field: keyof Debt, value: string | number) => {
    setDebts(debts.map(d =>
      d.id === id ? { ...d, [field]: typeof value === 'string' ? value : Number(value) } : d
    ));
  };

  const calculations = useMemo(() => {
    if (debts.length === 0) return { results: [], totalMonths: 0, totalInterest: 0, monthlyPayment: 0 };

    const sortedDebts = [...debts].sort((a, b) => {
      if (strategy === 'avalanche') {
        return b.interestRate - a.interestRate;
      } else {
        return a.balance - b.balance;
      }
    });

    let debtBalances = sortedDebts.map(d => ({ ...d, currentBalance: d.balance }));
    let totalInterestPaid = 0;
    let months = 0;
    const maxMonths = 600;
    const results: PayoffResult[] = [];
    let payoffOrder = 1;

    const totalMinPayments = debts.reduce((sum, d) => sum + d.minimumPayment, 0);
    const monthlyPayment = totalMinPayments + extraPayment;

    while (debtBalances.some(d => d.currentBalance > 0) && months < maxMonths) {
      months++;
      let availableExtra = extraPayment;

      debtBalances = debtBalances.map(debt => {
        if (debt.currentBalance <= 0) return debt;

        const monthlyInterest = (debt.interestRate / 100 / 12) * debt.currentBalance;
        totalInterestPaid += monthlyInterest;

        let newBalance = debt.currentBalance + monthlyInterest - debt.minimumPayment;

        if (newBalance < 0) {
          availableExtra += Math.abs(newBalance);
          newBalance = 0;
        }

        return { ...debt, currentBalance: Math.max(0, newBalance) };
      });

      for (let i = 0; i < debtBalances.length && availableExtra > 0; i++) {
        const debt = debtBalances[i];
        if (debt.currentBalance > 0) {
          const payment = Math.min(availableExtra, debt.currentBalance);
          debtBalances[i] = { ...debt, currentBalance: debt.currentBalance - payment };
          availableExtra -= payment;

          if (debtBalances[i].currentBalance <= 0 && !results.find(r => r.debtId === debt.id)) {
            results.push({
              debtId: debt.id,
              name: debt.name,
              monthsToPayoff: months,
              totalInterest: 0,
              payoffOrder: payoffOrder++,
            });
          }
        }
      }
    }

    debtBalances.forEach(debt => {
      if (!results.find(r => r.debtId === debt.id)) {
        results.push({
          debtId: debt.id,
          name: debt.name,
          monthsToPayoff: months,
          totalInterest: 0,
          payoffOrder: payoffOrder++,
        });
      }
    });

    return {
      results,
      totalMonths: months,
      totalInterest: Math.round(totalInterestPaid * 100) / 100,
      monthlyPayment,
    };
  }, [debts, extraPayment, strategy]);

  const formatMonths = (months: number) => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years === 0) return `${remainingMonths}mo`;
    if (remainingMonths === 0) return `${years}yr`;
    return `${years}y ${remainingMonths}m`;
  };

  const totalDebt = debts.reduce((sum, d) => sum + d.balance, 0);

  const chartData = debts.map((debt, index) => ({
    name: debt.name.length > 12 ? debt.name.substring(0, 12) + '...' : debt.name,
    balance: debt.balance,
    rate: debt.interestRate,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-center text-finance-primary flex items-center justify-center gap-2 text-xl md:text-2xl">
          <CreditCard className="h-5 w-5 md:h-6 md:w-6" />
          Debt Payoff Calculator
        </CardTitle>
        <CardDescription className="text-center text-sm">
          Create a strategic plan to become debt-free
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Strategy Selection */}
        <div className="mb-6">
          <Label className="text-sm font-semibold mb-2 block">Payoff Strategy</Label>
          <Tabs value={strategy} onValueChange={(v) => setStrategy(v as 'avalanche' | 'snowball')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="avalanche" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                <Zap className="h-3 w-3 md:h-4 md:w-4" />
                Avalanche
              </TabsTrigger>
              <TabsTrigger value="snowball" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                <Snowflake className="h-3 w-3 md:h-4 md:w-4" />
                Snowball
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <p className="text-xs text-muted-foreground mt-2">
            {strategy === 'avalanche'
              ? 'Pays highest interest first. Saves the most money.'
              : 'Pays smallest balances first. Quick wins for motivation.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Debt Input Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Your Debts</Label>
              <Button onClick={addDebt} variant="outline" size="sm" className="flex items-center gap-1 h-8 text-xs">
                <Plus className="h-3 w-3" /> Add
              </Button>
            </div>

            <div className="space-y-3 max-h-[300px] md:max-h-[400px] overflow-y-auto pr-1">
              {debts.map((debt, index) => (
                <div key={debt.id} className="p-3 border border-border rounded-lg bg-card space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <Input
                      value={debt.name}
                      onChange={(e) => updateDebt(debt.id, 'name', e.target.value)}
                      className="flex-grow font-medium h-8 text-sm"
                      placeholder="Debt name"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeDebt(debt.id)}
                      className="text-destructive hover:text-destructive h-8 w-8"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <Label className="text-xs text-muted-foreground">Balance</Label>
                      <Input
                        type="number"
                        value={debt.balance || ''}
                        onChange={(e) => updateDebt(debt.id, 'balance', e.target.value)}
                        placeholder="$0"
                        className="mt-1 h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">APR %</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={debt.interestRate || ''}
                        onChange={(e) => updateDebt(debt.id, 'interestRate', e.target.value)}
                        placeholder="0%"
                        className="mt-1 h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Min Pay</Label>
                      <Input
                        type="number"
                        value={debt.minimumPayment || ''}
                        onChange={(e) => updateDebt(debt.id, 'minimumPayment', e.target.value)}
                        placeholder="$0"
                        className="mt-1 h-8 text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Extra Payment */}
            <div className="p-3 border border-finance-primary/30 rounded-lg bg-finance-primary/5">
              <Label className="flex items-center gap-2 font-semibold text-sm">
                <DollarSign className="h-4 w-4 text-finance-primary" />
                Extra Monthly Payment
              </Label>
              <Input
                type="number"
                value={extraPayment || ''}
                onChange={(e) => setExtraPayment(Number(e.target.value))}
                placeholder="Extra payment amount"
                className="mt-2 h-9"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Amount above minimum payments
              </p>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-4 md:space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-2 md:gap-4">
              <div className="bg-gradient-to-br from-finance-primary to-finance-primary/80 text-white rounded-lg p-3 md:p-4 text-center">
                <p className="text-xs md:text-sm opacity-90">Total Debt</p>
                <p className="text-lg md:text-xl font-bold">{formatCurrency(totalDebt, { decimals: 0 })}</p>
              </div>
              <div className="bg-gradient-to-br from-finance-accent to-finance-accent/80 text-white rounded-lg p-3 md:p-4 text-center">
                <p className="text-xs md:text-sm opacity-90">Debt-Free In</p>
                <p className="text-lg md:text-xl font-bold">{formatMonths(calculations.totalMonths)}</p>
              </div>
              <div className="bg-gradient-to-br from-finance-warning to-finance-warning/80 text-white rounded-lg p-3 md:p-4 text-center">
                <p className="text-xs md:text-sm opacity-90">Total Interest</p>
                <p className="text-lg md:text-xl font-bold">{formatCurrency(calculations.totalInterest, { decimals: 0 })}</p>
              </div>
              <div className="bg-gradient-to-br from-finance-success to-finance-success/80 text-white rounded-lg p-3 md:p-4 text-center">
                <p className="text-xs md:text-sm opacity-90">Monthly Pay</p>
                <p className="text-lg md:text-xl font-bold">{formatCurrency(calculations.monthlyPayment, { decimals: 0 })}</p>
              </div>
            </div>

            {/* Debt Breakdown Chart */}
            {chartData.length > 0 && (
              <div className="h-[150px] md:h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis type="number" tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} tick={{ fontSize: 10 }} />
                    <YAxis type="category" dataKey="name" width={70} tick={{ fontSize: 10 }} />
                    <Tooltip
                      formatter={(value: number) => formatCurrency(value, { decimals: 0 })}
                      contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
                    />
                    <Bar dataKey="balance" radius={[0, 4, 4, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Payoff Order */}
            <div className="bg-muted/50 rounded-lg p-3 md:p-4 border border-border">
              <h4 className="font-semibold text-foreground mb-2 md:mb-3 flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                Payoff Order
              </h4>
              <div className="space-y-2">
                {calculations.results.map((result) => (
                  <div key={result.debtId} className="flex items-center gap-2 md:gap-3">
                    <div className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-finance-primary/10 text-finance-primary text-xs font-medium">
                      {result.payoffOrder}
                    </div>
                    <ArrowRight className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                    <span className="flex-grow text-xs md:text-sm truncate">{result.name}</span>
                    <span className="text-xs md:text-sm text-muted-foreground">
                      {formatMonths(result.monthsToPayoff)}
                    </span>
                    <CheckCircle2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-finance-success flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Tip */}
            <div className="bg-finance-success/10 border border-finance-success/30 rounded-lg p-3">
              <p className="text-xs md:text-sm text-foreground">
                <span className="font-semibold">Pro Tip:</span> Paying {formatCurrency(extraPayment, { decimals: 0 })} extra monthly
                saves ~{formatCurrency(calculations.totalInterest * 0.3, { decimals: 0 })} in interest!
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DebtPayoffCalculator;
