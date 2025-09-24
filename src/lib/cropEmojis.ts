// Crop to emoji mapping for better visual presentation

export const cropEmojiMap: Record<string, string> = {
  // Vegetables
  'tomato': '🍅',
  'potato': '🥔',
  'onion': '🧅',
  'carrot': '🥕',
  'cabbage': '🥬',
  'cauliflower': '🥦',
  'broccoli': '🥦',
  'capsicum': '🫑',
  'bell pepper': '🫑',
  'chilli': '🌶️',
  'green chilli': '🌶️',
  'red chilli': '🌶️',
  'garlic': '🧄',
  'ginger': '🫚',
  'beetroot': '🍠',
  'sweet potato': '🍠',
  'pumpkin': '🎃',
  'cucumber': '🥒',
  'bitter gourd': '🥒',
  'bottle gourd': '🥒',
  'ridge gourd': '🥒',
  'okra': '🌶️',
  'ladyfinger': '🌶️',
  'eggplant': '🍆',
  'brinjal': '🍆',
  'spinach': '🥬',
  'lettuce': '🥬',
  'coriander': '🌿',
  'mint': '🌿',
  'fenugreek': '🌿',
  
  // Fruits
  'apple': '🍎',
  'banana': '🍌',
  'orange': '🍊',
  'mango': '🥭',
  'grapes': '🍇',
  'papaya': '🥭',
  'pineapple': '🍍',
  'pomegranate': '🫐',
  'watermelon': '🍉',
  'muskmelon': '🍈',
  'lemon': '🍋',
  'lime': '🍋',
  'coconut': '🥥',
  'guava': '🥭',
  'strawberry': '🍓',
  'cherry': '🍒',
  'peach': '🍑',
  'pear': '🍐',
  'kiwi': '🥝',
  'avocado': '🥑',
  
  // Cereals & Grains
  'rice': '🍚',
  'wheat': '🌾',
  'barley': '🌾',
  'corn': '🌽',
  'maize': '🌽',
  'bajra': '🌾',
  'jowar': '🌾',
  'ragi': '🌾',
  'oats': '🌾',
  'quinoa': '🌾',
  
  // Pulses & Legumes
  'moong': '🫘',
  'chana': '🫘',
  'toor': '🫘',
  'urad': '🫘',
  'masur': '🫘',
  'kidney beans': '🫘',
  'black gram': '🫘',
  'green gram': '🫘',
  'chickpea': '🫘',
  'lentil': '🫘',
  'pigeon pea': '🫘',
  'soybean': '🫘',
  'groundnut': '🥜',
  'peanut': '🥜',
  
  // Spices
  'turmeric': '🟡',
  'cumin': '🟤',
  'coriander seed': '🟤',
  'black pepper': '⚫',
  'cardamom': '🟤',
  'cinnamon': '🟤',
  'cloves': '🟤',
  'nutmeg': '🟤',
  'red chilli powder': '🌶️',
  
  // Cash Crops
  'cotton': '🌾',
  'sugarcane': '🌾',
  'tea': '🍃',
  'coffee': '☕',
  'rubber': '🌿',
  'jute': '🌾',
  'tobacco': '🌿',
  
  // Oil Seeds
  'mustard': '🌻',
  'sunflower': '🌻',
  'sesame': '🌰',
  'safflower': '🌻',
  'castor': '🌰',
  'coconut oil': '🥥',
  'palm oil': '🌴',
  
  // Flowers
  'rose': '🌹',
  'jasmine': '🌸',
  'marigold': '🌼',
  'chrysanthemum': '🌼',
  'lotus': '🪷',
  
  // Dairy & Poultry
  'milk': '🥛',
  'egg': '🥚',
  'chicken': '🐔',
  'mutton': '🐑',
  'fish': '🐟',
  
  // Others
  'jaggery': '🟤',
  'honey': '🍯',
  'dates': '🫐',
  'dry fruits': '🌰',
  'almonds': '🌰',
  'cashew': '🌰',
  'walnut': '🌰',
  'raisins': '🍇'
};

// Function to get emoji for a crop name
export const getCropEmoji = (cropName: string): string => {
  const normalizedName = cropName.toLowerCase().trim();
  
  // Direct match
  if (cropEmojiMap[normalizedName]) {
    return cropEmojiMap[normalizedName];
  }
  
  // Partial match - check if crop name contains any key
  for (const [key, emoji] of Object.entries(cropEmojiMap)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return emoji;
    }
  }
  
  // Default emoji for unknown crops
  return '🌱';
};

// Function to get formatted crop name with emoji
export const getFormattedCropName = (cropName: string): string => {
  const emoji = getCropEmoji(cropName);
  return `${emoji} ${cropName}`;
};

// Function to check if a crop has a specific emoji (not default)
export const hasSpecificEmoji = (cropName: string): boolean => {
  const emoji = getCropEmoji(cropName);
  return emoji !== '🌱';
};