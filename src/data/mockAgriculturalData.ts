// Mock data for agricultural application
import { 
  Farmer, 
  Crop, 
  Pest, 
  Disease, 
  Query, 
  AIResponse, 
  WeatherData, 
  GovernmentScheme,
  MarketPrice 
} from '../types/agricultural';

export const mockFarmers: Farmer[] = [
  {
    id: '1',
    name: 'Ravi Kumar',
    phoneNumber: '+91-9876543210',
    location: {
      state: 'Kerala',
      district: 'Palakkad',
      village: 'Ottapalam',
      coordinates: {
        latitude: 10.7605,
        longitude: 76.3728
      }
    },
    languages: ['Malayalam', 'English'],
    farmSize: 5.5,
    primaryCrops: ['rice', 'coconut', 'pepper'],
    farmingExperience: 15,
    farmType: 'conventional',
    createdAt: new Date('2024-01-15'),
    lastActive: new Date()
  },
  {
    id: '2',
    name: 'Priya Menon',
    phoneNumber: '+91-9876543211',
    location: {
      state: 'Kerala',
      district: 'Wayanad',
      village: 'Sulthan Bathery',
      coordinates: {
        latitude: 11.6854,
        longitude: 76.2144
      }
    },
    languages: ['Malayalam', 'Hindi'],
    farmSize: 3.2,
    primaryCrops: ['coffee', 'cardamom', 'banana'],
    farmingExperience: 8,
    farmType: 'organic',
    createdAt: new Date('2024-02-20'),
    lastActive: new Date()
  }
];

export const mockCrops: Crop[] = [
  {
    id: 'rice-001',
    name: 'Rice',
    scientificName: 'Oryza sativa',
    category: 'cereals',
    season: 'kharif',
    growthStages: [
      {
        name: 'Germination',
        daysFromSowing: 7,
        description: 'Seeds sprout and develop roots',
        careInstructions: ['Keep soil moist', 'Maintain temperature 25-30°C'],
        commonIssues: ['Poor germination', 'Fungal attack']
      },
      {
        name: 'Tillering',
        daysFromSowing: 45,
        description: 'Plant develops multiple shoots',
        careInstructions: ['Apply nitrogen fertilizer', 'Maintain water level'],
        commonIssues: ['Blast disease', 'Brown plant hopper']
      },
      {
        name: 'Flowering',
        daysFromSowing: 85,
        description: 'Panicles emerge and flowers bloom',
        careInstructions: ['Reduce water level', 'Monitor for pests'],
        commonIssues: ['Sheath blight', 'Stem borer']
      },
      {
        name: 'Maturity',
        daysFromSowing: 120,
        description: 'Grains mature and ready for harvest',
        careInstructions: ['Drain field', 'Prepare for harvest'],
        commonIssues: ['Bird damage', 'Lodging']
      }
    ],
    commonPests: [],
    commonDiseases: [],
    soilRequirements: {
      pH: { min: 5.5, max: 7.0, optimal: 6.0 },
      soilType: ['clay', 'loamy'],
      drainage: 'poor',
      organicMatter: 'Medium to high',
      nutrients: {
        nitrogen: 'high',
        phosphorus: 'medium',
        potassium: 'medium'
      }
    },
    waterRequirements: {
      totalWater: 1200,
      criticalStages: ['Tillering', 'Flowering'],
      irrigationMethods: ['Flood irrigation', 'SRI method'],
      frequency: 'Continuous during growing season',
      droughtTolerance: 'low'
    },
    fertilizers: [
      {
        stage: 'Basal',
        organic: [
          {
            type: 'Farmyard manure',
            quantity: '10 tons/hectare',
            application: 'Apply during land preparation'
          }
        ],
        chemical: [
          {
            type: 'NPK',
            npkRatio: '20:20:0',
            quantity: '100 kg/hectare',
            application: 'Apply before transplanting'
          }
        ]
      }
    ],
    harvestTime: 120
  }
];

export const mockPests: Pest[] = [
  {
    id: 'pest-001',
    name: 'Brown Plant Hopper',
    scientificName: 'Nilaparvata lugens',
    description: 'Small brown insects that suck plant sap from rice plants',
    symptoms: [
      'Yellow to brown patches in rice fields',
      'Stunted plant growth',
      'Hopperburn symptoms',
      'Presence of sooty mold'
    ],
    preventiveMeasures: [
      'Use resistant varieties',
      'Avoid excessive nitrogen fertilizer',
      'Maintain proper plant spacing',
      'Remove alternate hosts'
    ],
    organicTreatment: [
      'Neem oil spray',
      'Soap water solution',
      'Encourage natural predators',
      'Use yellow sticky traps'
    ],
    chemicalTreatment: [
      'Imidacloprid 17.8% SL',
      'Thiamethoxam 25% WG',
      'Clothianidin 50% WDG'
    ],
    affectedCrops: ['rice'],
    seasonalOccurrence: ['Monsoon', 'Post-monsoon'],
    images: []
  }
];

export const mockDiseases: Disease[] = [
  {
    id: 'disease-001',
    name: 'Rice Blast',
    type: 'fungal',
    description: 'Fungal disease affecting rice leaves, nodes, and panicles',
    symptoms: [
      'Diamond-shaped lesions on leaves',
      'Gray center with brown margins',
      'Node infection causing lodging',
      'Panicle blast causing empty grains'
    ],
    causes: [
      'High humidity',
      'Temperature 20-25°C',
      'Excessive nitrogen fertilizer',
      'Dense planting'
    ],
    preventiveMeasures: [
      'Use resistant varieties',
      'Proper field sanitation',
      'Balanced fertilization',
      'Adequate plant spacing'
    ],
    organicTreatment: [
      'Neem oil application',
      'Trichoderma spray',
      'Copper oxychloride',
      'Proper crop rotation'
    ],
    chemicalTreatment: [
      'Tricyclazole 75% WP',
      'Propiconazole 25% EC',
      'Azoxystrobin 23% SC'
    ],
    affectedCrops: ['rice'],
    environmentalFactors: ['High humidity', 'Moderate temperature'],
    images: []
  }
];

export const mockQueries: Query[] = [
  {
    id: 'query-001',
    farmerId: '1',
    type: 'text',
    content: 'My rice plants are showing yellow patches. What could be the problem?',
    language: 'English',
    category: 'disease',
    createdAt: new Date('2024-03-15T10:30:00'),
    status: 'answered',
    priority: 'medium'
  },
  {
    id: 'query-002',
    farmerId: '2',
    type: 'image',
    content: 'Coffee leaves are turning brown with spots',
    language: 'Malayalam',
    category: 'disease',
    images: ['coffee-leaf-spot.jpg'],
    createdAt: new Date('2024-03-16T14:20:00'),
    status: 'processing',
    priority: 'high'
  }
];

export const mockAIResponses: AIResponse[] = [
  {
    id: 'response-001',
    queryId: 'query-001',
    content: 'The yellow patches on your rice plants could indicate Brown Plant Hopper damage or nutrient deficiency. Based on the symptoms, I recommend checking for small brown insects under the leaves and applying neem oil spray immediately.',
    language: 'English',
    confidence: 0.85,
    sources: ['Rice IPM Guidelines', 'Kerala Agricultural University'],
    recommendations: [
      {
        type: 'immediate',
        title: 'Apply Neem Oil Spray',
        description: 'Spray neem oil solution to control Brown Plant Hopper',
        steps: [
          'Mix 5ml neem oil in 1 liter water',
          'Add 1ml liquid soap as emulsifier',
          'Spray in evening hours',
          'Repeat after 7 days if needed'
        ],
        materials: ['Neem oil', 'Liquid soap', 'Sprayer'],
        cost: { min: 50, max: 100, currency: 'INR' },
        timeframe: 'Apply within 24 hours',
        priority: 'high',
        category: 'pest_control'
      }
    ],
    followUpQuestions: [
      'Have you noticed any small brown insects under the leaves?',
      'When did you last apply fertilizer?',
      'Is this affecting the entire field or just patches?'
    ],
    estimatedReadTime: 3,
    createdAt: new Date('2024-03-15T11:00:00'),
    feedback: {
      helpful: true,
      rating: 4,
      comments: 'Very helpful, the neem oil worked!'
    }
  }
];

export const mockWeatherData: WeatherData = {
  location: 'Palakkad, Kerala',
  current: {
    temperature: 28,
    humidity: 78,
    rainfall: 5.2,
    windSpeed: 12,
    conditions: 'Partly cloudy'
  },
  forecast: [
    {
      date: '2024-03-17',
      minTemp: 24,
      maxTemp: 32,
      humidity: 75,
      rainfall: 2.1,
      conditions: 'Light rain'
    },
    {
      date: '2024-03-18',
      minTemp: 23,
      maxTemp: 30,
      humidity: 82,
      rainfall: 15.5,
      conditions: 'Moderate rain'
    }
  ],
  alerts: [
    {
      type: 'heavy_rain',
      severity: 'medium',
      startDate: new Date('2024-03-18'),
      endDate: new Date('2024-03-20'),
      description: 'Heavy rainfall expected in Palakkad district',
      recommendations: [
        'Ensure proper drainage in fields',
        'Postpone spraying activities',
        'Cover harvested crops'
      ]
    }
  ]
};

export const mockGovernmentSchemes: GovernmentScheme[] = [
  {
    id: 'scheme-001',
    name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    description: 'Direct income support to farmer families',
    eligibility: [
      'Small and marginal farmers',
      'Landholding up to 2 hectares',
      'Valid Aadhaar card',
      'Bank account linked to Aadhaar'
    ],
    benefits: [
      'Rs. 6000 per year in 3 installments',
      'Direct bank transfer',
      'No collateral required'
    ],
    applicationProcess: [
      'Visit PM-KISAN portal',
      'Fill farmer registration form',
      'Upload required documents',
      'Submit application'
    ],
    documents: [
      'Aadhaar card',
      'Bank account details',
      'Land ownership documents',
      'Mobile number'
    ],
    contactInfo: 'PM-KISAN Helpline: 155261',
    category: 'subsidy',
    state: 'Kerala'
  },
  {
    id: 'scheme-002',
    name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    description: 'Crop insurance scheme for farmers',
    eligibility: [
      'All farmers growing notified crops',
      'Sharecroppers and tenant farmers',
      'Compulsory for loanee farmers'
    ],
    benefits: [
      'Coverage for yield losses',
      'Premium subsidy by government',
      'Quick settlement of claims',
      'Technology-based loss assessment'
    ],
    applicationProcess: [
      'Contact bank or insurance company',
      'Submit application before cut-off date',
      'Pay farmer share of premium',
      'Get insurance certificate'
    ],
    documents: [
      'Aadhaar card',
      'Bank account details',
      'Land records',
      'Sowing certificate'
    ],
    deadline: new Date('2024-06-30'),
    contactInfo: 'PMFBY Helpline: 14447',
    category: 'insurance'
  }
];

export const mockMarketPrices: MarketPrice[] = [
  {
    id: 'price-001',
    cropName: 'Rice',
    variety: 'Basmati',
    market: 'Palakkad APMC',
    state: 'Kerala',
    district: 'Palakkad',
    date: new Date('2024-03-16'),
    minPrice: 2800,
    maxPrice: 3200,
    modalPrice: 3000,
    unit: 'quintal',
    trend: 'up'
  },
  {
    id: 'price-002',
    cropName: 'Coffee',
    variety: 'Arabica',
    market: 'Wayanad Coffee Market',
    state: 'Kerala',
    district: 'Wayanad',
    date: new Date('2024-03-16'),
    minPrice: 8500,
    maxPrice: 9200,
    modalPrice: 8800,
    unit: 'quintal',
    trend: 'stable'
  },
  {
    id: 'price-003',
    cropName: 'Pepper',
    variety: 'Black Pepper',
    market: 'Kochi Spice Market',
    state: 'Kerala',
    district: 'Ernakulam',
    date: new Date('2024-03-16'),
    minPrice: 45000,
    maxPrice: 48000,
    modalPrice: 46500,
    unit: 'quintal',
    trend: 'down'
  }
];

// Sample agricultural advice data
export const sampleAdvice = {
  seasonal: {
    march: [
      'Prepare land for summer planting',
      'Apply pre-monsoon fertilizers',
      'Check irrigation systems',
      'Monitor for early pest outbreaks'
    ],
    june: [
      'Begin monsoon crop sowing',
      'Ensure proper drainage',
      'Monitor weather for heavy rains',
      'Apply organic mulch'
    ]
  },
  crops: {
    rice: [
      'Maintain water level at 2-3 cm during tillering',
      'Apply potassium during flowering stage',
      'Monitor for blast disease during humid weather'
    ],
    coffee: [
      'Prune coffee plants after harvest',
      'Apply organic compost during monsoon',
      'Monitor for white stem borer'
    ]
  }
};