// Agricultural data types and interfaces for Krishi Sahayak

export interface Farmer {
  id: string;
  name: string;
  phoneNumber: string;
  location: {
    state: string;
    district: string;
    village: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  languages: string[]; // ['Malayalam', 'English', 'Hindi']
  farmSize: number; // in acres
  primaryCrops: string[];
  farmingExperience: number; // in years
  farmType: 'organic' | 'conventional' | 'mixed';
  createdAt: Date;
  lastActive: Date;
}

export interface Crop {
  id: string;
  name: string;
  scientificName: string;
  category: 'cereals' | 'pulses' | 'oilseeds' | 'cash_crops' | 'vegetables' | 'fruits' | 'spices';
  season: 'kharif' | 'rabi' | 'zaid' | 'perennial';
  growthStages: CropStage[];
  commonPests: Pest[];
  commonDiseases: Disease[];
  soilRequirements: SoilRequirement;
  waterRequirements: WaterRequirement;
  fertilizers: FertilizerRecommendation[];
  harvestTime: number; // days from sowing
}

export interface CropStage {
  name: string;
  daysFromSowing: number;
  description: string;
  careInstructions: string[];
  commonIssues: string[];
}

export interface Pest {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  symptoms: string[];
  preventiveMeasures: string[];
  organicTreatment: string[];
  chemicalTreatment: string[];
  affectedCrops: string[];
  seasonalOccurrence: string[];
  images: string[];
}

export interface Disease {
  id: string;
  name: string;
  type: 'fungal' | 'bacterial' | 'viral' | 'nutritional';
  description: string;
  symptoms: string[];
  causes: string[];
  preventiveMeasures: string[];
  organicTreatment: string[];
  chemicalTreatment: string[];
  affectedCrops: string[];
  environmentalFactors: string[];
  images: string[];
}

export interface SoilRequirement {
  pH: {
    min: number;
    max: number;
    optimal: number;
  };
  soilType: string[]; // ['loamy', 'sandy', 'clay', 'red soil']
  drainage: 'well-drained' | 'moderate' | 'poor';
  organicMatter: string;
  nutrients: {
    nitrogen: 'low' | 'medium' | 'high';
    phosphorus: 'low' | 'medium' | 'high';
    potassium: 'low' | 'medium' | 'high';
  };
}

export interface WaterRequirement {
  totalWater: number; // mm per season
  criticalStages: string[];
  irrigationMethods: string[];
  frequency: string;
  droughtTolerance: 'low' | 'medium' | 'high';
}

export interface FertilizerRecommendation {
  stage: string;
  organic: {
    type: string;
    quantity: string;
    application: string;
  }[];
  chemical: {
    type: string;
    npkRatio: string;
    quantity: string;
    application: string;
  }[];
}

export interface Query {
  id: string;
  farmerId: string;
  type: 'text' | 'voice' | 'image';
  content: string;
  language: string;
  category: 'general' | 'pest' | 'disease' | 'nutrition' | 'irrigation' | 'harvest' | 'market';
  images?: string[];
  location?: {
    latitude: number;
    longitude: number;
  };
  weather?: WeatherData;
  createdAt: Date;
  status: 'pending' | 'processing' | 'answered' | 'escalated';
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface AIResponse {
  id: string;
  queryId: string;
  content: string;
  language: string;
  confidence: number; // 0-1
  sources: string[];
  recommendations: Recommendation[];
  followUpQuestions: string[];
  estimatedReadTime: number; // minutes
  createdAt: Date;
  feedback?: {
    helpful: boolean;
    rating: number; // 1-5
    comments?: string;
  };
}

export interface Recommendation {
  type: 'immediate' | 'short_term' | 'long_term';
  title: string;
  description: string;
  steps: string[];
  materials?: string[];
  cost?: {
    min: number;
    max: number;
    currency: string;
  };
  timeframe: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
}

export interface WeatherData {
  location: string;
  current: {
    temperature: number;
    humidity: number;
    rainfall: number;
    windSpeed: number;
    conditions: string;
  };
  forecast: {
    date: string;
    minTemp: number;
    maxTemp: number;
    humidity: number;
    rainfall: number;
    conditions: string;
  }[];
  alerts: WeatherAlert[];
}

export interface WeatherAlert {
  type: 'heat_wave' | 'cold_wave' | 'heavy_rain' | 'drought' | 'cyclone' | 'frost';
  severity: 'low' | 'medium' | 'high';
  startDate: Date;
  endDate: Date;
  description: string;
  recommendations: string[];
}

export interface GovernmentScheme {
  id: string;
  name: string;
  description: string;
  eligibility: string[];
  benefits: string[];
  applicationProcess: string[];
  documents: string[];
  deadline?: Date;
  contactInfo: string;
  category: 'subsidy' | 'insurance' | 'loan' | 'training' | 'equipment';
  state?: string;
  district?: string;
}

export interface FarmingTask {
  id: string;
  farmerId: string;
  title: string;
  description: string;
  category: 'sowing' | 'irrigation' | 'fertilization' | 'pest_control' | 'harvest' | 'soil_prep';
  cropId?: string;
  scheduledDate: Date;
  completedDate?: Date;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  reminders: Date[];
  notes?: string;
  attachments?: string[];
}

export interface MarketPrice {
  id: string;
  cropName: string;
  variety?: string;
  market: string;
  state: string;
  district: string;
  date: Date;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}

// Offline data sync interfaces
export interface OfflineQuery {
  id: string;
  data: Query;
  timestamp: Date;
  syncStatus: 'pending' | 'synced' | 'failed';
  retryCount: number;
}

export interface CachedContent {
  id: string;
  type: 'crop_data' | 'pest_data' | 'disease_data' | 'weather_data' | 'scheme_data';
  data: any;
  lastUpdated: Date;
  expiresAt: Date;
  priority: 'low' | 'medium' | 'high';
}

// SMS integration for offline scenarios
export interface SMSAlert {
  id: string;
  farmerId: string;
  type: 'weather_alert' | 'pest_outbreak' | 'scheme_notification' | 'price_update';
  message: string;
  language: string;
  priority: 'low' | 'medium' | 'high';
  scheduledAt: Date;
  sentAt?: Date;
  status: 'pending' | 'sent' | 'delivered' | 'failed';
}