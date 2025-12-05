import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  flag: string;
}

export const currencies: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧' },
  { code: 'GHS', symbol: '₵', name: 'Ghanaian Cedi', flag: '🇬🇭' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', flag: '🇳🇬' },
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', flag: '🇰🇪' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand', flag: '🇿🇦' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', flag: '🇨🇳' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', flag: '🇨🇦' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺' },
  { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc', flag: '🇨🇭' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', flag: '🇧🇷' },
  { code: 'MXN', symbol: 'Mex$', name: 'Mexican Peso', flag: '🇲🇽' },
];

interface ExchangeRates {
  [key: string]: number;
}

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  exchangeRates: ExchangeRates;
  convertAmount: (amount: number, fromCurrency?: string) => number;
  formatCurrency: (amount: number, options?: FormatOptions) => string;
  isLoading: boolean;
  lastUpdated: Date | null;
  refreshRates: () => Promise<void>;
}

interface FormatOptions {
  showSymbol?: boolean;
  decimals?: number;
  compact?: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Fallback exchange rates (approximate, as of late 2024)
const fallbackRates: ExchangeRates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  GHS: 15.5,
  NGN: 1550,
  KES: 153,
  ZAR: 18.5,
  INR: 84,
  JPY: 150,
  CNY: 7.25,
  CAD: 1.40,
  AUD: 1.55,
  CHF: 0.88,
  BRL: 6.0,
  MXN: 20.5,
};

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('currency');
      if (saved) {
        const parsed = JSON.parse(saved);
        return currencies.find(c => c.code === parsed.code) || currencies[0];
      }
    }
    return currencies[0]; // Default to USD
  });

  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>(fallbackRates);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchExchangeRates = useCallback(async () => {
    setIsLoading(true);
    try {
      // Using exchangerate-api.com free tier (no API key needed for basic usage)
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      if (response.ok) {
        const data = await response.json();
        setExchangeRates(data.rates);
        setLastUpdated(new Date());
        localStorage.setItem('exchangeRates', JSON.stringify({
          rates: data.rates,
          timestamp: Date.now()
        }));
      }
    } catch (error) {
      console.warn('Failed to fetch exchange rates, using fallback rates');
      // Try to load cached rates
      const cached = localStorage.getItem('exchangeRates');
      if (cached) {
        const { rates } = JSON.parse(cached);
        setExchangeRates(rates);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Check if we have cached rates less than 1 hour old
    const cached = localStorage.getItem('exchangeRates');
    if (cached) {
      const { rates, timestamp } = JSON.parse(cached);
      const hourAgo = Date.now() - (60 * 60 * 1000);
      if (timestamp > hourAgo) {
        setExchangeRates(rates);
        setLastUpdated(new Date(timestamp));
        return;
      }
    }
    fetchExchangeRates();
  }, [fetchExchangeRates]);

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem('currency', JSON.stringify(newCurrency));
  };

  const convertAmount = (amount: number, fromCurrency: string = 'USD'): number => {
    if (fromCurrency === currency.code) return amount;

    const fromRate = exchangeRates[fromCurrency] || 1;
    const toRate = exchangeRates[currency.code] || 1;

    // Convert to USD first, then to target currency
    const usdAmount = amount / fromRate;
    return usdAmount * toRate;
  };

  const formatCurrency = (amount: number, options: FormatOptions = {}): string => {
    const { showSymbol = true, decimals = 2, compact = false } = options;
    const convertedAmount = convertAmount(amount);

    if (compact && Math.abs(convertedAmount) >= 1000000) {
      const formatted = (convertedAmount / 1000000).toFixed(1);
      return showSymbol ? `${currency.symbol}${formatted}M` : `${formatted}M`;
    }

    if (compact && Math.abs(convertedAmount) >= 1000) {
      const formatted = (convertedAmount / 1000).toFixed(1);
      return showSymbol ? `${currency.symbol}${formatted}K` : `${formatted}K`;
    }

    const formatted = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(convertedAmount);

    return showSymbol ? `${currency.symbol}${formatted}` : formatted;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        exchangeRates,
        convertAmount,
        formatCurrency,
        isLoading,
        lastUpdated,
        refreshRates: fetchExchangeRates,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
