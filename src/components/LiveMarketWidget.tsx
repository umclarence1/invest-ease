import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, TrendingDown, RefreshCw, Activity, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '@/lib/utils';
import { useCurrency } from '@/contexts/CurrencyContext';

interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  data: { time: string; price: number }[];
  source?: string;
}

const LiveMarketWidget = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [selectedMarket, setSelectedMarket] = useState<MarketData | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [error, setError] = useState<string | null>(null);
  const { formatCurrency, currency } = useCurrency();

  // Generate realistic price history
  const generatePriceHistory = useCallback((basePrice: number, volatility: number, trend: number) => {
    const data = [];
    let price = basePrice * (0.99 + Math.random() * 0.02);
    const now = new Date();

    for (let i = 23; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000);
      price = price * (1 + (Math.random() - 0.5 + trend * 0.01) * volatility);
      data.push({
        time: time.getHours().toString().padStart(2, '0') + ':00',
        price: Math.round(price * 100) / 100,
      });
    }
    return data;
  }, []);

  const fetchMarketData = useCallback(async () => {
    setIsRefreshing(true);
    setError(null);

    try {
      // Try to fetch real data from CoinGecko (free, no API key needed)
      const cryptoResponse = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true'
      );

      let cryptoData: any = {};
      if (cryptoResponse.ok) {
        cryptoData = await cryptoResponse.json();
      }

      // Build market data with real crypto prices and simulated stock data
      const markets: MarketData[] = [
        {
          symbol: 'BTC',
          name: 'Bitcoin',
          price: cryptoData.bitcoin?.usd || 98500,
          change: cryptoData.bitcoin?.usd_24h_change ? (cryptoData.bitcoin.usd * cryptoData.bitcoin.usd_24h_change / 100) : 1250,
          changePercent: cryptoData.bitcoin?.usd_24h_change || 1.28,
          data: generatePriceHistory(cryptoData.bitcoin?.usd || 98500, 0.02, cryptoData.bitcoin?.usd_24h_change > 0 ? 1 : -1),
          source: 'CoinGecko',
        },
        {
          symbol: 'ETH',
          name: 'Ethereum',
          price: cryptoData.ethereum?.usd || 3450,
          change: cryptoData.ethereum?.usd_24h_change ? (cryptoData.ethereum.usd * cryptoData.ethereum.usd_24h_change / 100) : 45,
          changePercent: cryptoData.ethereum?.usd_24h_change || 1.32,
          data: generatePriceHistory(cryptoData.ethereum?.usd || 3450, 0.025, cryptoData.ethereum?.usd_24h_change > 0 ? 1 : -1),
          source: 'CoinGecko',
        },
        {
          symbol: 'SOL',
          name: 'Solana',
          price: cryptoData.solana?.usd || 225,
          change: cryptoData.solana?.usd_24h_change ? (cryptoData.solana.usd * cryptoData.solana.usd_24h_change / 100) : 5.2,
          changePercent: cryptoData.solana?.usd_24h_change || 2.36,
          data: generatePriceHistory(cryptoData.solana?.usd || 225, 0.035, cryptoData.solana?.usd_24h_change > 0 ? 1 : -1),
          source: 'CoinGecko',
        },
        // Stock indices (simulated with realistic values)
        {
          symbol: 'SPY',
          name: 'S&P 500 ETF',
          price: 598.45 + (Math.random() - 0.5) * 5,
          change: (Math.random() - 0.3) * 8,
          changePercent: (Math.random() - 0.3) * 1.5,
          data: generatePriceHistory(598, 0.008, 0.5),
        },
        {
          symbol: 'QQQ',
          name: 'Nasdaq 100 ETF',
          price: 525.80 + (Math.random() - 0.5) * 6,
          change: (Math.random() - 0.3) * 10,
          changePercent: (Math.random() - 0.3) * 2,
          data: generatePriceHistory(525, 0.012, 0.3),
        },
        {
          symbol: 'GLD',
          name: 'Gold ETF',
          price: 245.20 + (Math.random() - 0.5) * 2,
          change: (Math.random() - 0.5) * 3,
          changePercent: (Math.random() - 0.5) * 1.2,
          data: generatePriceHistory(245, 0.005, 0.2),
        },
      ];

      // Round values
      markets.forEach(m => {
        m.price = Math.round(m.price * 100) / 100;
        m.change = Math.round(m.change * 100) / 100;
        m.changePercent = Math.round(m.changePercent * 100) / 100;
      });

      setMarketData(markets);
      setSelectedMarket(markets[0]);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching market data:', err);
      setError('Unable to fetch live data. Showing estimated values.');
      // Generate fallback data
      const fallbackData = generateFallbackData();
      setMarketData(fallbackData);
      setSelectedMarket(fallbackData[0]);
    } finally {
      setIsRefreshing(false);
    }
  }, [generatePriceHistory]);

  const generateFallbackData = useCallback((): MarketData[] => {
    return [
      { symbol: 'BTC', name: 'Bitcoin', price: 98500, change: 1250, changePercent: 1.28, data: generatePriceHistory(98500, 0.02, 1) },
      { symbol: 'ETH', name: 'Ethereum', price: 3450, change: 45, changePercent: 1.32, data: generatePriceHistory(3450, 0.025, 1) },
      { symbol: 'SOL', name: 'Solana', price: 225, change: 5.2, changePercent: 2.36, data: generatePriceHistory(225, 0.035, 1) },
      { symbol: 'SPY', name: 'S&P 500 ETF', price: 598, change: 3.2, changePercent: 0.54, data: generatePriceHistory(598, 0.008, 0.5) },
      { symbol: 'QQQ', name: 'Nasdaq 100 ETF', price: 525, change: 4.8, changePercent: 0.92, data: generatePriceHistory(525, 0.012, 0.3) },
      { symbol: 'GLD', name: 'Gold ETF', price: 245, change: -0.8, changePercent: -0.33, data: generatePriceHistory(245, 0.005, -0.2) },
    ];
  }, [generatePriceHistory]);

  useEffect(() => {
    fetchMarketData();
    // Refresh every 60 seconds
    const interval = setInterval(fetchMarketData, 60000);
    return () => clearInterval(interval);
  }, [fetchMarketData]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-2 shadow-lg text-sm">
          <p className="font-medium text-foreground">{payload[0].payload.time}</p>
          <p className="text-finance-primary">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="h-5 w-5 text-finance-primary" />
            Live Markets
            <Badge variant="outline" className="ml-2 text-xs">
              {currency.code}
            </Badge>
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              Updated {lastUpdated.toLocaleTimeString()}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={fetchMarketData}
              disabled={isRefreshing}
              className="h-8 w-8"
            >
              <RefreshCw className={cn('h-4 w-4', isRefreshing && 'animate-spin')} />
            </Button>
          </div>
        </div>
        {error && (
          <p className="text-xs text-finance-warning mt-1">{error}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Market Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {marketData.map((market) => (
            <button
              key={market.symbol}
              onClick={() => setSelectedMarket(market)}
              className={cn(
                'p-3 rounded-lg border text-left transition-all',
                selectedMarket?.symbol === market.symbol
                  ? 'border-finance-primary bg-finance-primary/5'
                  : 'border-border hover:border-finance-primary/50'
              )}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-sm text-foreground">{market.symbol}</span>
                {market.change >= 0 ? (
                  <TrendingUp className="h-3 w-3 text-finance-success" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-finance-danger" />
                )}
              </div>
              <p className="text-xs text-muted-foreground truncate">{market.name}</p>
              <p className="font-medium text-sm mt-1 text-foreground">{formatCurrency(market.price)}</p>
              <Badge
                variant="secondary"
                className={cn(
                  'text-xs mt-1',
                  market.change >= 0
                    ? 'bg-finance-success/10 text-finance-success'
                    : 'bg-finance-danger/10 text-finance-danger'
                )}
              >
                {market.change >= 0 ? '+' : ''}{market.changePercent.toFixed(2)}%
              </Badge>
            </button>
          ))}
        </div>

        {/* Chart */}
        {selectedMarket && (
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">{selectedMarket.name}</h3>
                  {selectedMarket.source && (
                    <Badge variant="outline" className="text-xs">
                      {selectedMarket.source}
                    </Badge>
                  )}
                </div>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(selectedMarket.price)}</p>
              </div>
              <Badge
                className={cn(
                  'text-sm w-fit',
                  selectedMarket.change >= 0
                    ? 'bg-finance-success text-white'
                    : 'bg-finance-danger text-white'
                )}
              >
                {selectedMarket.change >= 0 ? '+' : ''}{formatCurrency(Math.abs(selectedMarket.change), { decimals: 2 })} ({selectedMarket.changePercent.toFixed(2)}%)
              </Badge>
            </div>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={selectedMarket.data}>
                  <XAxis
                    dataKey="time"
                    tick={{ fontSize: 10, fill: 'currentColor' }}
                    stroke="currentColor"
                    className="text-muted-foreground"
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    domain={['dataMin - 1', 'dataMax + 1']}
                    tick={{ fontSize: 10, fill: 'currentColor' }}
                    stroke="currentColor"
                    className="text-muted-foreground"
                    width={70}
                    tickFormatter={(v) => formatCurrency(v, { compact: true })}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke={selectedMarket.change >= 0 ? '#4CAF50' : '#EF4444'}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* External Links */}
        <div className="flex flex-wrap gap-2 pt-2">
          <a
            href="https://www.tradingview.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-finance-primary flex items-center gap-1"
          >
            TradingView <ExternalLink className="h-3 w-3" />
          </a>
          <a
            href="https://www.coingecko.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-finance-primary flex items-center gap-1"
          >
            CoinGecko <ExternalLink className="h-3 w-3" />
          </a>
          <a
            href="https://finance.yahoo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-finance-primary flex items-center gap-1"
          >
            Yahoo Finance <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground text-center">
          Crypto prices from CoinGecko. Stock data is simulated. Not financial advice.
        </p>
      </CardContent>
    </Card>
  );
};

export default LiveMarketWidget;
