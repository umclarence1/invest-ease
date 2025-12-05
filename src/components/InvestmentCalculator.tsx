import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { TrendingUp, Calendar, Percent, Info, DollarSign } from 'lucide-react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  Legend,
} from 'recharts';
import { useCurrency } from '@/contexts/CurrencyContext';

interface CalculationResult {
  year: number;
  balance: number;
  contributions: number;
  interest: number;
}

const InvestmentCalculator = () => {
  const { formatCurrency } = useCurrency();
  const [initialInvestment, setInitialInvestment] = useState(10000);

  // Format large numbers compactly
  const formatCompact = (value: number) => {
    if (value >= 1000000) {
      return formatCurrency(value / 1000000, { decimals: 1 }) + 'M';
    }
    if (value >= 1000) {
      return formatCurrency(value / 1000, { decimals: 0 }) + 'K';
    }
    return formatCurrency(value, { decimals: 0 });
  };
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [years, setYears] = useState(20);
  const [compoundFrequency, setCompoundFrequency] = useState<'monthly' | 'quarterly' | 'annually'>('monthly');

  const calculations = useMemo((): CalculationResult[] => {
    const results: CalculationResult[] = [];
    let balance = initialInvestment;
    let totalContributions = initialInvestment;

    const periodsPerYear = compoundFrequency === 'monthly' ? 12 : compoundFrequency === 'quarterly' ? 4 : 1;
    const ratePerPeriod = annualReturn / 100 / periodsPerYear;
    const contributionPerPeriod = monthlyContribution * (12 / periodsPerYear);

    for (let year = 0; year <= years; year++) {
      if (year === 0) {
        results.push({
          year,
          balance: initialInvestment,
          contributions: initialInvestment,
          interest: 0,
        });
      } else {
        for (let period = 0; period < periodsPerYear; period++) {
          balance = balance * (1 + ratePerPeriod) + contributionPerPeriod;
          totalContributions += contributionPerPeriod;
        }
        results.push({
          year,
          balance: Math.round(balance * 100) / 100,
          contributions: Math.round(totalContributions * 100) / 100,
          interest: Math.round((balance - totalContributions) * 100) / 100,
        });
      }
    }
    return results;
  }, [initialInvestment, monthlyContribution, annualReturn, years, compoundFrequency]);

  const finalResult = calculations[calculations.length - 1];
  const totalContributed = initialInvestment + (monthlyContribution * 12 * years);
  const totalInterest = finalResult.balance - totalContributed;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-4 shadow-lg">
          <p className="font-semibold text-foreground">Year {label}</p>
          <p className="text-finance-primary">
            Balance: {formatCurrency(payload[0]?.value || 0)}
          </p>
          <p className="text-finance-accent">
            Contributions: {formatCurrency(payload[1]?.value || 0)}
          </p>
          <p className="text-finance-success">
            Interest Earned: {formatCurrency((payload[0]?.value || 0) - (payload[1]?.value || 0))}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-center text-finance-primary flex items-center justify-center gap-2 text-xl md:text-2xl">
          <TrendingUp className="h-5 w-5 md:h-6 md:w-6" />
          Investment Growth Calculator
        </CardTitle>
        <CardDescription className="text-center text-sm">
          See how your investments grow with compound interest
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Input Section */}
          <div className="space-y-4 md:space-y-5">
            {/* Initial Investment */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-finance-primary" />
                  Initial Investment
                </Label>
                <span className="text-sm font-semibold text-finance-primary">
                  {formatCurrency(initialInvestment, { decimals: 0 })}
                </span>
              </div>
              <Slider
                value={[initialInvestment]}
                onValueChange={(value) => setInitialInvestment(value[0])}
                max={100000}
                min={0}
                step={1000}
              />
              <Input
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(Number(e.target.value))}
                className="h-9"
              />
            </div>

            {/* Monthly Contribution */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-finance-primary" />
                  Monthly Contribution
                </Label>
                <span className="text-sm font-semibold text-finance-primary">
                  {formatCurrency(monthlyContribution, { decimals: 0 })}
                </span>
              </div>
              <Slider
                value={[monthlyContribution]}
                onValueChange={(value) => setMonthlyContribution(value[0])}
                max={5000}
                min={0}
                step={50}
              />
              <Input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="h-9"
              />
            </div>

            {/* Annual Return & Investment Period */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm flex items-center gap-1">
                    <Percent className="h-3.5 w-3.5 text-finance-primary" />
                    Return %
                  </Label>
                  <span className="text-sm font-semibold text-finance-primary">
                    {annualReturn}%
                  </span>
                </div>
                <Slider
                  value={[annualReturn]}
                  onValueChange={(value) => setAnnualReturn(value[0])}
                  max={15}
                  min={1}
                  step={0.5}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-finance-primary" />
                    Years
                  </Label>
                  <span className="text-sm font-semibold text-finance-primary">
                    {years}
                  </span>
                </div>
                <Slider
                  value={[years]}
                  onValueChange={(value) => setYears(value[0])}
                  max={50}
                  min={1}
                  step={1}
                />
              </div>
            </div>

            {/* Compound Frequency */}
            <div className="space-y-2">
              <Label className="text-sm">Compound Frequency</Label>
              <Tabs value={compoundFrequency} onValueChange={(v) => setCompoundFrequency(v as any)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="monthly" className="text-xs md:text-sm">Monthly</TabsTrigger>
                  <TabsTrigger value="quarterly" className="text-xs md:text-sm">Quarterly</TabsTrigger>
                  <TabsTrigger value="annually" className="text-xs md:text-sm">Annually</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-4 md:space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              <div className="bg-gradient-to-br from-finance-primary to-finance-primary/80 text-white rounded-lg p-2.5 md:p-4 text-center">
                <p className="text-xs md:text-sm opacity-90">Final Balance</p>
                <p className="text-base md:text-xl font-bold">{formatCompact(finalResult.balance)}</p>
              </div>
              <div className="bg-gradient-to-br from-finance-accent to-finance-accent/80 text-white rounded-lg p-2.5 md:p-4 text-center">
                <p className="text-xs md:text-sm opacity-90">Contributed</p>
                <p className="text-base md:text-xl font-bold">{formatCompact(totalContributed)}</p>
              </div>
              <div className="bg-gradient-to-br from-finance-success to-finance-success/80 text-white rounded-lg p-2.5 md:p-4 text-center">
                <p className="text-xs md:text-sm opacity-90">Interest</p>
                <p className="text-base md:text-xl font-bold">{formatCompact(totalInterest)}</p>
              </div>
            </div>

            {/* Chart */}
            <div className="h-[200px] md:h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={calculations}>
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7E69AB" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#7E69AB" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorContributions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1EAEDB" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#1EAEDB" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={(value) => formatCompact(value)} width={50} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Area
                    type="monotone"
                    dataKey="balance"
                    stroke="#7E69AB"
                    fillOpacity={1}
                    fill="url(#colorBalance)"
                    name="Balance"
                  />
                  <Area
                    type="monotone"
                    dataKey="contributions"
                    stroke="#1EAEDB"
                    fillOpacity={1}
                    fill="url(#colorContributions)"
                    name="Contributed"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Growth Insight */}
            <div className="bg-muted/50 rounded-lg p-3 md:p-4 border border-border">
              <h4 className="font-semibold text-foreground mb-1 md:mb-2 text-sm md:text-base">Investment Insight</h4>
              <p className="text-xs md:text-sm text-muted-foreground">
                Investing {formatCurrency(monthlyContribution, { decimals: 0 })} monthly for {years} years at {annualReturn}% return
                grows to <span className="text-finance-primary font-semibold">{formatCompact(finalResult.balance)}</span> -
                a <span className="text-finance-success font-semibold">{((totalInterest / totalContributed) * 100).toFixed(0)}%</span> return!
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentCalculator;