// Service to get user's state from IP address for data.gov.in API filtering

interface IPLocationResponse {
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
}

interface UserLocation {
  state: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
}

// Map English state names to names that work with data.gov.in API
const stateNameMap: Record<string, string> = {
  'Andhra Pradesh': 'Andhra Pradesh',
  'Arunachal Pradesh': 'Arunachal Pradesh',
  'Assam': 'Assam',
  'Bihar': 'Bihar',
  'Chhattisgarh': 'Chhattisgarh',
  'Goa': 'Goa',
  'Gujarat': 'Gujarat',
  'Haryana': 'Haryana',
  'Himachal Pradesh': 'Himachal Pradesh',
  'Jharkhand': 'Jharkhand',
  'Karnataka': 'Karnataka',
  'Kerala': 'Kerala',
  'Madhya Pradesh': 'Madhya Pradesh',
  'Maharashtra': 'Maharashtra',
  'Manipur': 'Manipur',
  'Meghalaya': 'Meghalaya',
  'Mizoram': 'Mizoram',
  'Nagaland': 'Nagaland',
  'Odisha': 'Odisha',
  'Punjab': 'Punjab',
  'Rajasthan': 'Rajasthan',
  'Sikkim': 'Sikkim',
  'Tamil Nadu': 'Tamil Nadu',
  'Telangana': 'Telangana',
  'Tripura': 'Tripura',
  'Uttar Pradesh': 'Uttar Pradesh',
  'Uttarakhand': 'Uttarakhand',
  'West Bengal': 'West Bengal',
  'Delhi': 'Delhi',
  'Jammu and Kashmir': 'Jammu and Kashmir',
  'Ladakh': 'Ladakh',
  'Puducherry': 'Puducherry',
  'Chandigarh': 'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu': 'Dadra and Nagar Haveli and Daman and Diu',
  'Lakshadweep': 'Lakshadweep',
  'Andaman and Nicobar Islands': 'Andaman and Nicobar Islands'
};

export const getUserLocationFromIP = async (): Promise<UserLocation | null> => {
  try {
    // Using ip-api.com which is free and doesn't require API key
    const response = await fetch('http://ip-api.com/json/?fields=status,country,countryCode,region,regionName,city,lat,lon,timezone,isp,org,as,query');
    
    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }
    
    const data: IPLocationResponse = await response.json();
    
    if (data.status !== 'success') {
      throw new Error('Location service returned error status');
    }
    
    // Map the region name to a standardized state name
    const mappedState = stateNameMap[data.regionName] || data.regionName;
    
    return {
      state: mappedState,
      city: data.city,
      country: data.country,
      lat: data.lat,
      lon: data.lon
    };
  } catch (error) {
    console.error('Error fetching user location from IP:', error);
    
    // Fallback to a default state (Bihar as shown in your example)
    return {
      state: 'Bihar',
      city: 'Unknown',
      country: 'India',
      lat: 25.0961,
      lon: 85.3131
    };
  }
};

export const getStateForMarketAPI = async (): Promise<string> => {
  const location = await getUserLocationFromIP();
  return location?.state || 'Bihar';
};