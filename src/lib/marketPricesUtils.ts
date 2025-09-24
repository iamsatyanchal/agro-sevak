// Utility functions for market prices API and error handling

import { MarketPrice } from '../lib/marketPricesApi';

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

export const createApiError = (message: string, code?: string, details?: any): ApiError => ({
  message,
  code,
  details
});

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof Error) {
    return createApiError(error.message, 'NETWORK_ERROR', error);
  }
  
  if (typeof error === 'string') {
    return createApiError(error, 'STRING_ERROR');
  }
  
  return createApiError('An unknown error occurred', 'UNKNOWN_ERROR', error);
};

// Format price for display
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

// Format date for display
export const formatMarketDate = (dateString: string): string => {
  try {
    // Handle DD/MM/YYYY format from API
    const [day, month, year] = dateString.split('/');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    
    if (isNaN(date.getTime())) {
      return dateString; // Return original if parsing fails
    }
    
    const today = new Date();
    const diffTime = today.getTime() - date.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-IN');
    }
  } catch {
    return dateString;
  }
};

// Get trend color class
export const getTrendColorClass = (trend: 'up' | 'down' | 'stable'): string => {
  switch (trend) {
    case 'up':
      return 'text-green-600';
    case 'down':
      return 'text-red-600';
    default:
      return 'text-text-secondary';
  }
};

// Get trend icon
export const getTrendIcon = (trend: 'up' | 'down' | 'stable'): string => {
  switch (trend) {
    case 'up':
      return '↗';
    case 'down':
      return '↘';
    default:
      return '→';
  }
};

// Group market prices by commodity
export const groupPricesByCommodity = (prices: MarketPrice[]): Record<string, MarketPrice[]> => {
  return prices.reduce((groups, price) => {
    const key = price.cropName;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(price);
    return groups;
  }, {} as Record<string, MarketPrice[]>);
};

// Get best price for a commodity (highest modal price)
export const getBestPriceForCommodity = (prices: MarketPrice[]): MarketPrice | null => {
  if (prices.length === 0) return null;
  
  return prices.reduce((best, current) => 
    current.modalPrice > best.modalPrice ? current : best
  );
};

// Filter prices by recency (within last N days)
export const getRecentPrices = (prices: MarketPrice[], maxDaysOld: number = 7): MarketPrice[] => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - maxDaysOld);
  
  return prices.filter(price => {
    try {
      const [day, month, year] = price.arrivalDate.split('/');
      const priceDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      return priceDate >= cutoffDate;
    } catch {
      // If date parsing fails, include the price
      return true;
    }
  });
};