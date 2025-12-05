import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Progress } from './ui/progress';
import {
  Wallet,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Target,
  Sparkles,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { useCurrency } from '@/contexts/CurrencyContext';

const RetirementCalculator = () => {
  const { formatCurrency } = useCurrency();
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentSavings, setCurrentSavings] = useState(50000);
  const [monthlyContribution, setMonthlyContribution] = useState(1000);
  const [expectedReturn, setExpectedReturn] = useState(7);
  const [desiredIncome, setDesiredIncome] = useState(60000);
  const [inflationRate, setInflationRate] = useState(3);
  const [lifeExpectancy, setLifeExpectancy] = useState(90);

  const calculations = useMemo(() => {
    const yearsToRetirement = retirementAge - currentAge;
    const yearsInRetirement = lifeExpectancy - retirementAge;

    if (yearsToRetirement <= 0 || yearsInRetirement <= 0) {
      return null;
    }

    const monthlyRate = expectedReturn / 100 / 12;
    const months = yearsToRetirement * 12;

    const fvCurrentSavings = currentSavings * Math.pow(1 + expectedReturn / 100, yearsToRetirement);
    const fvContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    const totalAtRetirement = fvCurrentSavings + fvContributions;

    const inflationAdjustedIncome = desiredIncome * Math.pow(1 + inflationRate / 100, yearsToRetirement);
    const neededForRetirement = inflationAdjustedIncome * 25;

    const safeWithdrawalRate = 0.04;
    const annualWithdrawal = totalAtRetirement * safeWithdrawalRate;
    const monthlyWithdrawal = annualWithdrawal / 12;

    const projectionData = [];
    let balance = currentSavings;

    for (let age = currentAge; age <= lifeExpectancy; age++) {
      if (age < retirementAge) {
        balance = balance * (1 + expectedReturn / 100) + (monthlyContribution * 12);
      } else {
        const yearsRetired = age - retirementAge;
        const adjustedWithdrawal = inflationAdjustedIncome * Math.pow(1 + inflationRate / 100, yearsRetired);
        balance = balance * (1 + (expectedReturn - 2) / 100) - adjustedWithdrawal;
        if (balance < 0) balance = 0;
      }

      projectionData.push({
        age,
        balance: Math.round(balance),
        phase: age < retirementAge ? 'accumulation' : 'retirement',
      });
    }

    const percentageToGoal = (totalAtRetirement / neededForRetirement) * 100;
    const onTrack = percentageToGoal >= 100;

    let additionalNeeded = 0;
    if (!onTrack) {
      const shortfall = neededForRetirement - totalAtRetirement;
      additionalNeeded = shortfall / ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    }

    return {
      totalAtRetirement,
      neededForRetirement,
      inflationAdjustedIncome,
      annualWithdrawal,
      monthlyWithdrawal,
      percentageToGoal: Math.min(percentageToGoal, 150),
      onTrack,
      additionalNeeded: Math.max(0, additionalNeeded),
      projectionData,
      yearsToRetirement,
      yearsInRetirement,
    };
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, expectedReturn, desiredIncome, inflationRate, lifeExpectancy]);

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

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const isRetirement = payload[0]?.payload?.phase === 'retirement';
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold">Age {label}</p>
          <p className={isRetirement ? 'text-finance-warning' : 'text-finance-primary'}>
            Balance: {formatCurrency(payload[0]?.value || 0, { decimals: 0 })}
          </p>
          <p className="text-xs text-muted-foreground">
            {isRetirement ? 'Retirement Phase' : 'Accumulation Phase'}
          </p>
        </div>
      );
    }
    return null;
  };

  if (!calculations) {
    return (
      <Card className="w-full">
        <CardContent className="p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-finance-warning mx-auto mb-4" />
          <p className="text-muted-foreground">Please ensure retirement age is greater than current age.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-center text-finance-primary flex items-center justify-center gap-2 text-xl md:text-2xl">
          <Wallet className="h-5 w-5 md:h-6 md:w-6" />
          Retirement Calculator
        </CardTitle>
        <CardDescription className="text-center text-sm">
          Plan your retirement and see if you're on track
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Input Section */}
          <div className="space-y-4 md:space-y-5">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-finance-primary" />
                  Current Age
                </Label>
                <div className="flex items-center gap-2">
                  <Slider
                    value={[currentAge]}
                    onValueChange={(v) => setCurrentAge(v[0])}
                    min={18}
                    max={70}
                    step={1}
                    className="flex-grow"
                  />
                  <span className="w-10 text-right font-medium text-sm">{currentAge}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm">
                  <Target className="h-4 w-4 text-finance-primary" />
                  Retire At
                </Label>
                <div className="flex items-center gap-2">
                  <Slider
                    value={[retirementAge]}
                    onValueChange={(v) => setRetirementAge(v[0])}
                    min={currentAge + 1}
                    max={80}
                    step={1}
                    className="flex-grow"
                  />
                  <span className="w-10 text-right font-medium text-sm">{retirementAge}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Current Retirement Savings</Label>
                <span className="text-sm font-semibold text-finance-primary">
                  {formatCurrency(currentSavings, { decimals: 0 })}
                </span>
              </div>
              <Slider
                value={[currentSavings]}
                onValueChange={(v) => setCurrentSavings(v[0])}
                min={0}
                max={1000000}
                step={5000}
              />
              <Input
                type="number"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(Number(e.target.value))}
                className="h-9"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Monthly Contribution</Label>
                <span className="text-sm font-semibold text-finance-primary">
                  {formatCurrency(monthlyContribution, { decimals: 0 })}
                </span>
              </div>
              <Slider
                value={[monthlyContribution]}
                onValueChange={(v) => setMonthlyContribution(v[0])}
                min={0}
                max={5000}
                step={100}
              />
              <Input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="h-9"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Desired Annual Retirement Income</Label>
                <span className="text-sm font-semibold text-finance-primary">
                  {formatCurrency(desiredIncome, { decimals: 0 })}
                </span>
              </div>
              <Slider
                value={[desiredIncome]}
                onValueChange={(v) => setDesiredIncome(v[0])}
                min={20000}
                max={200000}
                step={5000}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 md:gap-4 p-3 md:p-4 bg-muted/50 rounded-lg">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Return %</Label>
                <Input
                  type="number"
                  step="0.5"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="text-sm h-8"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Inflation %</Label>
                <Input
                  type="number"
                  step="0.5"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  className="text-sm h-8"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Life Exp.</Label>
                <Input
                  type="number"
                  value={lifeExpectancy}
                  onChange={(e) => setLifeExpectancy(Number(e.target.value))}
                  className="text-sm h-8"
                />
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-4 md:space-y-6">
            <div className={`p-3 md:p-4 rounded-lg flex items-center gap-3 ${
              calculations.onTrack
                ? 'bg-finance-success/10 border border-finance-success/30'
                : 'bg-finance-warning/10 border border-finance-warning/30'
            }`}>
              {calculations.onTrack ? (
                <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-finance-success flex-shrink-0" />
              ) : (
                <AlertTriangle className="h-5 w-5 md:h-6 md:w-6 text-finance-warning flex-shrink-0" />
              )}
              <div>
                <p className="font-semibold text-foreground text-sm md:text-base">
                  {calculations.onTrack ? "You're on track!" : "You may need to save more"}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {calculations.onTrack
                    ? `You'll have ${formatCompact(calculations.totalAtRetirement)} at retirement.`
                    : `Consider saving ${formatCurrency(calculations.additionalNeeded, { decimals: 0 })} more per month.`}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to Goal</span>
                <span className="font-semibold">{Math.round(calculations.percentageToGoal)}%</span>
              </div>
              <Progress value={calculations.percentageToGoal} className="h-2 md:h-3" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Projected: {formatCompact(calculations.totalAtRetirement)}</span>
                <span>Goal: {formatCompact(calculations.neededForRetirement)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 md:gap-4">
              <div className="bg-finance-primary/10 rounded-lg p-3 md:p-4 text-center">
                <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-finance-primary mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">At Retirement</p>
                <p className="text-base md:text-lg font-bold text-finance-primary">
                  {formatCompact(calculations.totalAtRetirement)}
                </p>
              </div>
              <div className="bg-finance-accent/10 rounded-lg p-3 md:p-4 text-center">
                <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-finance-accent mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Monthly Income</p>
                <p className="text-base md:text-lg font-bold text-finance-accent">
                  {formatCurrency(calculations.monthlyWithdrawal, { decimals: 0 })}
                </p>
              </div>
              <div className="bg-muted rounded-lg p-3 md:p-4 text-center">
                <Calendar className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Years to Retire</p>
                <p className="text-base md:text-lg font-bold">{calculations.yearsToRetirement}</p>
              </div>
              <div className="bg-muted rounded-lg p-3 md:p-4 text-center">
                <Wallet className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Years in Retirement</p>
                <p className="text-base md:text-lg font-bold">{calculations.yearsInRetirement}</p>
              </div>
            </div>

            <div className="h-[180px] md:h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={calculations.projectionData}>
                  <defs>
                    <linearGradient id="colorRetirement" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7E69AB" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#7E69AB" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="age" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => formatCompact(v)} width={50} />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine
                    x={retirementAge}
                    stroke="#F97316"
                    strokeDasharray="5 5"
                    label={{ value: 'Retire', fill: '#F97316', fontSize: 10 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="balance"
                    stroke="#7E69AB"
                    fillOpacity={1}
                    fill="url(#colorRetirement)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RetirementCalculator;
