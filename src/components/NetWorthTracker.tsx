import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Label } from './ui/label';
import {
  Wallet,
  Car,
  CreditCard,
  Home,
  TrendingUp,
  Plus,
  Trash2,
  PieChart,
  Landmark,
  Briefcase,
  Gem,
  DollarSign,
} from 'lucide-react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import { useCurrency } from '@/contexts/CurrencyContext';

interface Asset {
  id: string;
  name: string;
  value: number;
  category: 'cash' | 'investments' | 'property' | 'vehicles' | 'other';
}

interface Liability {
  id: string;
  name: string;
  value: number;
  category: 'mortgage' | 'loans' | 'credit' | 'other';
}

const ASSET_COLORS: Record<string, string> = {
  cash: '#4CAF50',
  investments: '#7E69AB',
  property: '#1EAEDB',
  vehicles: '#F97316',
  other: '#6B7280',
};

const LIABILITY_COLORS: Record<string, string> = {
  mortgage: '#EF4444',
  loans: '#F97316',
  credit: '#DC2626',
  other: '#9CA3AF',
};

const CATEGORY_ICONS: Record<string, any> = {
  cash: Wallet,
  investments: TrendingUp,
  property: Home,
  vehicles: Car,
  other: Gem,
  mortgage: Home,
  loans: Briefcase,
  credit: CreditCard,
};

const NetWorthTracker = () => {
  const { formatCurrency } = useCurrency();
  const [assets, setAssets] = useState<Asset[]>([
    { id: '1', name: 'Checking Account', value: 5000, category: 'cash' },
    { id: '2', name: 'Savings Account', value: 15000, category: 'cash' },
    { id: '3', name: '401(k)', value: 75000, category: 'investments' },
    { id: '4', name: 'Brokerage Account', value: 25000, category: 'investments' },
    { id: '5', name: 'Primary Residence', value: 350000, category: 'property' },
    { id: '6', name: 'Car', value: 20000, category: 'vehicles' },
  ]);

  const [liabilities, setLiabilities] = useState<Liability[]>([
    { id: '1', name: 'Mortgage', value: 280000, category: 'mortgage' },
    { id: '2', name: 'Car Loan', value: 12000, category: 'loans' },
    { id: '3', name: 'Credit Card', value: 3000, category: 'credit' },
    { id: '4', name: 'Student Loans', value: 25000, category: 'loans' },
  ]);

  const [activeTab, setActiveTab] = useState('overview');

  // Format large numbers compactly
  const formatCompact = (value: number) => {
    const absValue = Math.abs(value);
    const sign = value < 0 ? '-' : '';
    if (absValue >= 1000000) {
      return sign + formatCurrency(absValue / 1000000, { decimals: 1 }) + 'M';
    }
    if (absValue >= 1000) {
      return sign + formatCurrency(absValue / 1000, { decimals: 0 }) + 'K';
    }
    return formatCurrency(value, { decimals: 0 });
  };

  const addAsset = (category: Asset['category']) => {
    const newId = (Math.max(...assets.map(a => parseInt(a.id)), 0) + 1).toString();
    setAssets([...assets, { id: newId, name: 'New Asset', value: 0, category }]);
  };

  const addLiability = (category: Liability['category']) => {
    const newId = (Math.max(...liabilities.map(l => parseInt(l.id)), 0) + 1).toString();
    setLiabilities([...liabilities, { id: newId, name: 'New Liability', value: 0, category }]);
  };

  const updateAsset = (id: string, field: keyof Asset, value: string | number) => {
    setAssets(assets.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const updateLiability = (id: string, field: keyof Liability, value: string | number) => {
    setLiabilities(liabilities.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  const removeAsset = (id: string) => setAssets(assets.filter(a => a.id !== id));
  const removeLiability = (id: string) => setLiabilities(liabilities.filter(l => l.id !== id));

  const calculations = useMemo(() => {
    const totalAssets = assets.reduce((sum, a) => sum + a.value, 0);
    const totalLiabilities = liabilities.reduce((sum, l) => sum + l.value, 0);
    const netWorth = totalAssets - totalLiabilities;
    const debtToAssetRatio = totalAssets > 0 ? (totalLiabilities / totalAssets) * 100 : 0;

    const assetsByCategory = Object.entries(ASSET_COLORS).map(([category, color]) => ({
      name: category.charAt(0).toUpperCase() + category.slice(1),
      value: assets.filter(a => a.category === category).reduce((sum, a) => sum + a.value, 0),
      color,
    })).filter(c => c.value > 0);

    const liabilitiesByCategory = Object.entries(LIABILITY_COLORS).map(([category, color]) => ({
      name: category.charAt(0).toUpperCase() + category.slice(1),
      value: liabilities.filter(l => l.category === category).reduce((sum, l) => sum + l.value, 0),
      color,
    })).filter(c => c.value > 0);

    return { totalAssets, totalLiabilities, netWorth, debtToAssetRatio, assetsByCategory, liabilitiesByCategory };
  }, [assets, liabilities]);

  const renderItemList = (items: (Asset | Liability)[], type: 'asset' | 'liability', category: string) => {
    const filtered = items.filter(item => item.category === category);
    const Icon = CATEGORY_ICONS[category] || Wallet;
    const colors = type === 'asset' ? ASSET_COLORS : LIABILITY_COLORS;
    const color = colors[category];

    return (
      <div className="space-y-2 md:space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 md:p-2 rounded-lg" style={{ backgroundColor: `${color}20` }}>
              <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" style={{ color }} />
            </div>
            <span className="font-medium capitalize text-sm md:text-base">{category}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 md:h-8"
            onClick={() => type === 'asset'
              ? addAsset(category as Asset['category'])
              : addLiability(category as Liability['category'])
            }
          >
            <Plus className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </Button>
        </div>
        {filtered.map(item => (
          <div key={item.id} className="flex items-center gap-1.5 md:gap-2 pl-8 md:pl-10">
            <Input
              value={item.name}
              onChange={(e) => type === 'asset'
                ? updateAsset(item.id, 'name', e.target.value)
                : updateLiability(item.id, 'name', e.target.value)
              }
              className="flex-grow h-8 text-sm"
              placeholder="Name"
            />
            <div className="relative w-24 md:w-32">
              <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                type="number"
                value={item.value || ''}
                onChange={(e) => type === 'asset'
                  ? updateAsset(item.id, 'value', Number(e.target.value))
                  : updateLiability(item.id, 'value', Number(e.target.value))
                }
                className="pl-6 md:pl-7 h-8 text-sm"
                placeholder="0"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => type === 'asset' ? removeAsset(item.id) : removeLiability(item.id)}
              className="text-destructive hover:text-destructive h-7 w-7 md:h-8 md:w-8"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-xs md:text-sm text-muted-foreground pl-8 md:pl-10">No items yet</p>
        )}
      </div>
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-2 md:p-3 shadow-lg">
          <p className="font-semibold text-sm">{payload[0].name}</p>
          <p className="text-finance-primary text-sm">{formatCurrency(payload[0].value, { decimals: 0 })}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-center text-finance-primary flex items-center justify-center gap-2 text-xl md:text-2xl">
          <Landmark className="h-5 w-5 md:h-6 md:w-6" />
          Net Worth Tracker
        </CardTitle>
        <CardDescription className="text-center text-sm">
          Track your assets and liabilities
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
          <div className="bg-gradient-to-br from-finance-success to-finance-success/80 text-white rounded-lg p-3 md:p-5 text-center">
            <TrendingUp className="h-5 w-5 md:h-6 md:w-6 mx-auto mb-1 md:mb-2 opacity-90" />
            <p className="text-xs md:text-sm opacity-90">Total Assets</p>
            <p className="text-xl md:text-2xl font-bold">{formatCompact(calculations.totalAssets)}</p>
          </div>
          <div className="bg-gradient-to-br from-red-500 to-red-500/80 text-white rounded-lg p-3 md:p-5 text-center">
            <CreditCard className="h-5 w-5 md:h-6 md:w-6 mx-auto mb-1 md:mb-2 opacity-90" />
            <p className="text-xs md:text-sm opacity-90">Total Liabilities</p>
            <p className="text-xl md:text-2xl font-bold">{formatCompact(calculations.totalLiabilities)}</p>
          </div>
          <div className={`rounded-lg p-3 md:p-5 text-center text-white ${
            calculations.netWorth >= 0
              ? 'bg-gradient-to-br from-finance-primary to-finance-primary/80'
              : 'bg-gradient-to-br from-finance-warning to-finance-warning/80'
          }`}>
            <Wallet className="h-5 w-5 md:h-6 md:w-6 mx-auto mb-1 md:mb-2 opacity-90" />
            <p className="text-xs md:text-sm opacity-90">Net Worth</p>
            <p className="text-xl md:text-2xl font-bold">{formatCompact(calculations.netWorth)}</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-4 md:mb-6">
            <TabsTrigger value="overview" className="text-xs md:text-sm">
              <PieChart className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Overview</span>
              <span className="sm:hidden">View</span>
            </TabsTrigger>
            <TabsTrigger value="assets" className="text-xs md:text-sm">
              <TrendingUp className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1 md:mr-2" />
              Assets
            </TabsTrigger>
            <TabsTrigger value="liabilities" className="text-xs md:text-sm">
              <CreditCard className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Liabilities</span>
              <span className="sm:hidden">Debts</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              <div>
                <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-center">Assets Breakdown</h3>
                {calculations.assetsByCategory.length > 0 ? (
                  <div className="h-[200px] md:h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={calculations.assetsByCategory}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={70}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {calculations.assetsByCategory.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ fontSize: '12px' }} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-[200px] md:h-[250px] flex items-center justify-center text-muted-foreground text-sm">
                    No assets to display
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-center">Liabilities Breakdown</h3>
                {calculations.liabilitiesByCategory.length > 0 ? (
                  <div className="h-[200px] md:h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={calculations.liabilitiesByCategory}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={70}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {calculations.liabilitiesByCategory.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ fontSize: '12px' }} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-[200px] md:h-[250px] flex items-center justify-center text-muted-foreground text-sm">
                    No liabilities - Great job!
                  </div>
                )}
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-3 md:p-4 border border-border">
              <h4 className="font-semibold mb-2 md:mb-3 text-sm md:text-base">Financial Health</h4>
              <div className="space-y-2 md:space-y-3">
                <div>
                  <div className="flex justify-between text-xs md:text-sm mb-1">
                    <span>Debt-to-Asset Ratio</span>
                    <span className={`font-medium ${
                      calculations.debtToAssetRatio < 50 ? 'text-finance-success' : 'text-finance-warning'
                    }`}>
                      {calculations.debtToAssetRatio.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={Math.min(calculations.debtToAssetRatio, 100)} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {calculations.debtToAssetRatio < 30
                      ? 'Excellent! Your debt level is low.'
                      : calculations.debtToAssetRatio < 50
                      ? 'Good. Consider reducing debt further.'
                      : 'High debt level. Focus on debt reduction.'}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="assets" className="space-y-4 md:space-y-6">
            {Object.keys(ASSET_COLORS).map(category => (
              <div key={category} className="border border-border rounded-lg p-3 md:p-4">
                {renderItemList(assets, 'asset', category)}
              </div>
            ))}
          </TabsContent>

          <TabsContent value="liabilities" className="space-y-4 md:space-y-6">
            {Object.keys(LIABILITY_COLORS).map(category => (
              <div key={category} className="border border-border rounded-lg p-3 md:p-4">
                {renderItemList(liabilities, 'liability', category)}
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NetWorthTracker;
