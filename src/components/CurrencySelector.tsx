import React from 'react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useCurrency, currencies } from '@/contexts/CurrencyContext';
import { RefreshCw, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CurrencySelector() {
  const { currency, setCurrency, isLoading, lastUpdated, refreshRates } = useCurrency();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 min-w-[100px]">
          <span className="text-base">{currency.flag}</span>
          <span className="font-medium">{currency.code}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 max-h-[400px] overflow-y-auto">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Select Currency</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={(e) => {
              e.preventDefault();
              refreshRates();
            }}
            disabled={isLoading}
          >
            <RefreshCw className={cn('h-3 w-3', isLoading && 'animate-spin')} />
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {currencies.map((curr) => (
          <DropdownMenuItem
            key={curr.code}
            onClick={() => setCurrency(curr)}
            className={cn(
              'flex items-center justify-between cursor-pointer',
              currency.code === curr.code && 'bg-accent'
            )}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{curr.flag}</span>
              <div>
                <p className="font-medium">{curr.code}</p>
                <p className="text-xs text-muted-foreground">{curr.name}</p>
              </div>
            </div>
            {currency.code === curr.code && (
              <Check className="h-4 w-4 text-finance-primary" />
            )}
          </DropdownMenuItem>
        ))}
        {lastUpdated && (
          <>
            <DropdownMenuSeparator />
            <div className="px-2 py-1.5 text-xs text-muted-foreground">
              Rates updated: {lastUpdated.toLocaleTimeString()}
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
