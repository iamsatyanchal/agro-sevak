import { useState, useEffect } from 'react';
import { fetchMarketPrices, MarketPrice as ApiMarketPrice } from '../lib/marketPricesApi';
import { handleApiError } from '../lib/marketPricesUtils';

export interface MarketPrice {
  id: string;
  cropName: string;
  variety: string;
  modalPrice: number;
  unit: string;
  market: string;
  trend: 'up' | 'down' | 'stable';
  district: string;
  state: string;
  arrivalDate: string;
}

export const useMarketPrices = () => {
  const [marketPrices, setMarketPrices] = useState<MarketPrice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMarketPrices = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const apiData = await fetchMarketPrices();
      
      // Transform API data to match our interface
      const transformedData: MarketPrice[] = apiData.map(item => ({
        id: item.id,
        cropName: item.cropName,
        variety: item.variety,
        modalPrice: item.modalPrice,
        unit: item.unit,
        market: item.market,
        trend: item.trend,
        district: item.district,
        state: item.state,
        arrivalDate: item.arrivalDate
      }));
      
      setMarketPrices(transformedData);
    } catch (err) {
      console.error('Error loading market prices:', err);
      const apiError = handleApiError(err);
      setError(apiError.message);
      
      // Set empty array on error since API service handles fallbacks
      setMarketPrices([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMarketPrices();
  }, []);

  const refreshPrices = () => {
    loadMarketPrices();
  };

  return {
    marketPrices,
    isLoading,
    error,
    refreshPrices
  };
};