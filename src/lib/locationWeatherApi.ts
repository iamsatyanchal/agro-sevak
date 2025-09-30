// Location and weather API utilities
export interface GeolocationCoords {
  lat: number;
  lon: number;
}

export interface WeatherApiResponse {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    windchill_c: number;
    windchill_f: number;
    heatindex_c: number;
    heatindex_f: number;
    dewpoint_c: number;
    dewpoint_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
    air_quality: {
      co: number;
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number;
      pm10: number;
      'us-epa-index': number;
      'gb-defra-index': number;
    };
    short_rad: number;
    diff_rad: number;
    dni: number;
    gti: number;
  };
}

// IP-based location API response interface
interface IPLocationResponse {
  status: string;
  continent: string;
  continentCode: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  district: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  offset: number;
  currency: string;
  isp: string;
  org: string;
  as: string;
  asname: string;
  reverse: string;
  mobile: boolean;
  proxy: boolean;
  hosting: boolean;
  query: string;
}

// Get user location using IP-based geolocation API
export const getUserLocationFromIP = async (): Promise<GeolocationCoords> => {
  try {
    const response = await fetch('https://api-point-ip-details.vercel.app');
    if (!response.ok) {
      throw new Error('Failed to fetch IP-based location');
    }
    
    const data: IPLocationResponse = await response.json();
    
    if (data.status !== 'success') {
      throw new Error('IP location API returned error status');
    }
    
    return {
      lat: data.lat,
      lon: data.lon,
    };
  } catch (error) {
    throw new Error(`IP-based location failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Get user location using browser's geolocation API
export const getUserLocation = (): Promise<GeolocationCoords> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        let errorMessage = 'Unknown geolocation error';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'User denied the request for Geolocation';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'The request to get user location timed out';
            break;
        }
        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  });
};

// Get weather data using coordinates
export const getWeatherFromCoords = async (coords: GeolocationCoords): Promise<WeatherApiResponse | null> => {
  try {
    const { lat, lon } = coords;
    const apiKey = '9a89300b75d9472d916185037252309';
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=yes`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data: WeatherApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
};

// Get both location and weather data using geolocation with IP fallback
export const getLocationAndWeather = async () => {
  try {
    let coords: GeolocationCoords;
    
    try {
      // First, try to get location using GPS
      coords = await getUserLocation();
      console.log('Location obtained via GPS');
    } catch (gpsError) {
      console.log('GPS location failed, trying IP-based location:', gpsError);
      // If GPS fails, fallback to IP-based location
      coords = await getUserLocationFromIP();
      console.log('Location obtained via IP');
    }

    if (!coords) {
      throw new Error('Could not get location data from any source');
    }

    const weatherData = await getWeatherFromCoords(coords);
    
    return {
      coords,
      weather: weatherData
    };
  } catch (error) {
    console.error('Error fetching location and weather:', error);
    return null;
  }
};

// Format location string for display
export const formatLocation = (weather: WeatherApiResponse): string => {
  const { location } = weather;
  const parts = [location.name, location.region, location.country].filter(Boolean);
  return parts.join(', ');
};

// Format weather description
export const formatWeatherDescription = (weather: WeatherApiResponse): string => {
  const { current } = weather;
  return `${current.temp_c}°C, ${current.condition.text}`;
};

// Get air quality status
export const getAirQualityStatus = (index: number): { status: string; color: string } => {
  if (index <= 1) return { status: 'Good', color: 'text-green-600' };
  if (index <= 2) return { status: 'Moderate', color: 'text-yellow-600' };
  if (index <= 3) return { status: 'Unhealthy for Sensitive Groups', color: 'text-orange-600' };
  if (index <= 4) return { status: 'Unhealthy', color: 'text-red-600' };
  if (index <= 5) return { status: 'Very Unhealthy', color: 'text-purple-600' };
  return { status: 'Hazardous', color: 'text-red-800' };
};
