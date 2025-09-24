// Service for fetching real market prices from data.gov.in API

import { getStateForMarketAPI } from './ipLocationApi';
import { handleApiError } from './marketPricesUtils';

// API Configuration
const MARKET_API_CONFIG = {
  baseUrl: 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070',
  apiKey: '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b',
  format: 'json',
  timeout: 10000 // 10 seconds
};

// Types for the API response
export interface MarketRecord {
  state: string;
  district: string;
  market: string;
  commodity: string;
  variety: string;
  grade: string;
  arrival_date: string;
  min_price: string;
  max_price: string;
  modal_price: string;
}

export interface MarketApiResponse {
  created: number;
  updated: number;
  created_date: string;
  updated_date: string;
  active: string;
  index_name: string;
  org: string[];
  org_type: string;
  source: string;
  title: string;
  external_ws_url: string;
  visualizable: string;
  field: Array<{
    name: string;
    id: string;
    type: string;
  }>;
  external_ws: number;
  catalog_uuid: string;
  sector: string[];
  target_bucket: {
    field: string;
    index: string;
    type: string;
  };
  desc: string;
  field_exposed: Array<{
    name: string;
    id: string;
    type: string;
  }>;
  message: string;
  version: string;
  status: string;
  total: number;
  count: number;
  limit: string;
  offset: string;
  records: MarketRecord[];
}

// Transformed market price data for UI
export interface MarketPrice {
  id: string;
  cropName: string;
  variety: string;
  modalPrice: number;
  minPrice: number;
  maxPrice: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  market: string;
  district: string;
  state: string;
  arrivalDate: string;
}

export const fetchMarketPrices = async (state?: string, limit: number = 50): Promise<MarketPrice[]> => {
  try {
    // Get user's state if not provided
    const targetState = state || await getStateForMarketAPI();
    
    // Construct the API URL with state filter
    const url = new URL(MARKET_API_CONFIG.baseUrl);
    url.searchParams.append('api-key', MARKET_API_CONFIG.apiKey);
    url.searchParams.append('format', MARKET_API_CONFIG.format);
    url.searchParams.append('filters[state.keyword]', targetState);
    url.searchParams.append('limit', limit.toString());
    url.searchParams.append('offset', '0');
    
    console.log('Fetching market data from:', url.toString());
    
    // Create a timeout promise
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('API request timeout')), MARKET_API_CONFIG.timeout);
    });
    
    const response = await Promise.race([
      fetch(url.toString()),
      timeoutPromise
    ]);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    const data: MarketApiResponse = await response.json();
    
    if (data.status !== 'ok') {
      throw new Error(`API returned error status: ${data.status}`);
    }
    
    if (!data.records || data.records.length === 0) {
      console.log(`No market data found for state: ${targetState}`);
      return getFallbackMarketData();
    }
    
    // Transform the API data to our format
    const transformedData: MarketPrice[] = data.records.map((record, index) => {
      const modalPrice = parseFloat(record.modal_price) || 0;
      const minPrice = parseFloat(record.min_price) || 0;
      const maxPrice = parseFloat(record.max_price) || 0;
      
      // Simple trend calculation based on modal vs min/max
      let trend: 'up' | 'down' | 'stable' = 'stable';
      const midPoint = (minPrice + maxPrice) / 2;
      if (modalPrice > midPoint * 1.1) {
        trend = 'up';
      } else if (modalPrice < midPoint * 0.9) {
        trend = 'down';
      }
      
      return {
        id: `${record.state}-${record.district}-${record.commodity}-${index}`,
        cropName: record.commodity,
        variety: record.variety || 'Common',
        modalPrice: modalPrice,
        minPrice: minPrice,
        maxPrice: maxPrice,
        unit: 'per quintal', // Standard unit for Indian agricultural markets
        trend: trend,
        market: record.market,
        district: record.district,
        state: record.state,
        arrivalDate: record.arrival_date
      };
    });
    
    console.log(`Successfully fetched ${transformedData.length} market prices for ${targetState}`);
    return transformedData;
    
  } catch (error) {
    console.error('Error fetching market prices:', error);
    const apiError = handleApiError(error);
    
    // For certain types of errors, still return fallback data
    // For others, re-throw to let the component handle it
    if (apiError.code === 'NETWORK_ERROR' || apiError.message.includes('timeout')) {
      console.log('Network error or timeout, returning fallback data');
      return getFallbackMarketData();
    }
    
    throw apiError;
  }
};

// Fallback data in case API fails
const getFallbackMarketData = (): MarketPrice[] => {
  return [
    {
      id: 'fallback-1',
      cropName: 'Wheat',
      variety: 'Lokvan',
      modalPrice: 2250,
      minPrice: 2200,
      maxPrice: 2300,
      unit: 'per quintal',
      trend: 'up',
      market: 'Local Mandi',
      district: 'Unknown',
      state: 'Unknown',
      arrivalDate: new Date().toLocaleDateString('en-IN')
    },
    {
      id: 'fallback-2',
      cropName: 'Rice',
      variety: 'Basmati',
      modalPrice: 4500,
      minPrice: 4400,
      maxPrice: 4600,
      unit: 'per quintal',
      trend: 'stable',
      market: 'Local Mandi',
      district: 'Unknown',
      state: 'Unknown',
      arrivalDate: new Date().toLocaleDateString('en-IN')
    },
    {
      id: 'fallback-3',
      cropName: 'Potato',
      variety: 'Jyoti',
      modalPrice: 1800,
      minPrice: 1700,
      maxPrice: 1900,
      unit: 'per quintal',
      trend: 'down',
      market: 'Local Mandi',
      district: 'Unknown',
      state: 'Unknown',
      arrivalDate: new Date().toLocaleDateString('en-IN')
    }
  ];
};

// Get market prices for specific commodities
export const fetchMarketPricesForCommodities = async (
  commodities: string[], 
  state?: string
): Promise<MarketPrice[]> => {
  const allPrices = await fetchMarketPrices(state, 100);
  
  return allPrices.filter(price => 
    commodities.some(commodity => 
      price.cropName.toLowerCase().includes(commodity.toLowerCase())
    )
  );
};

// Get latest prices for popular crops
export const fetchPopularCropPrices = async (state?: string): Promise<MarketPrice[]> => {
  const popularCrops = ['Wheat', 'Rice', 'Potato', 'Onion', 'Tomato', 'Cotton'];
  return fetchMarketPricesForCommodities(popularCrops, state);
};