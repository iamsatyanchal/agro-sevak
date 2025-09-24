import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { GeolocationCoords, WeatherApiResponse, getLocationAndWeather } from '../lib/locationWeatherApi';

interface LocationWeatherContextType {
  coords: GeolocationCoords | null;
  weather: WeatherApiResponse | null;
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const LocationWeatherContext = createContext<LocationWeatherContextType | undefined>(undefined);

interface LocationWeatherProviderProps {
  children: ReactNode;
}

export const LocationWeatherProvider = ({ children }: LocationWeatherProviderProps) => {
  const [coords, setCoords] = useState<GeolocationCoords | null>(null);
  const [weather, setWeather] = useState<WeatherApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await getLocationAndWeather();
      
      if (data) {
        setCoords(data.coords);
        setWeather(data.weather);
      } else {
        setError('Failed to fetch location and weather data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = async () => {
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const value: LocationWeatherContextType = {
    coords,
    weather,
    isLoading,
    error,
    refreshData
  };

  return (
    <LocationWeatherContext.Provider value={value}>
      {children}
    </LocationWeatherContext.Provider>
  );
};

export const useLocationWeather = (): LocationWeatherContextType => {
  const context = useContext(LocationWeatherContext);
  if (context === undefined) {
    throw new Error('useLocationWeather must be used within a LocationWeatherProvider');
  }
  return context;
};