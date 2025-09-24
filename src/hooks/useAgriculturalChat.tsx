import { useState } from 'react';

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface AIResponse {
  id: string;
  query: string;
  response: string;
  confidence: number;
  category: string;
  timestamp: string;
}

// Simple AI responses for agricultural queries
const getAIResponse = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('pest') || lowerQuery.includes('insect') || lowerQuery.includes('bug')) {
    return "For pest management, I recommend integrated pest management (IPM) practices. First, identify the specific pest affecting your crop. Common solutions include neem oil spray, beneficial insects, or targeted pesticides as a last resort. Would you like specific advice for a particular pest?";
  }
  
  if (lowerQuery.includes('fertilizer') || lowerQuery.includes('nutrient')) {
    return "For optimal fertilizer application, conduct a soil test first. Generally, NPK fertilizers work well for most crops. Organic options like compost and vermicompost are excellent for soil health. Apply fertilizers based on your crop's growth stage and soil requirements.";
  }
  
  if (lowerQuery.includes('disease') || lowerQuery.includes('fungus') || lowerQuery.includes('infection')) {
    return "Plant diseases often require quick action. Remove affected plant parts immediately and dispose properly. Copper-based fungicides or neem oil can help with fungal infections. Ensure proper spacing for air circulation and avoid overhead watering. What symptoms are you observing?";
  }
  
  if (lowerQuery.includes('irrigation') || lowerQuery.includes('water')) {
    return "Proper irrigation is crucial for crop health. Water early morning or evening to reduce evaporation. Check soil moisture before watering - insert your finger 2-3 inches deep. Most crops need 1-1.5 inches of water weekly, including rainfall. Consider drip irrigation for water efficiency.";
  }
  
  if (lowerQuery.includes('soil') || lowerQuery.includes('organic')) {
    return "Healthy soil is the foundation of good farming. Test soil pH regularly (6.0-7.0 is ideal for most crops). Add organic matter like compost to improve soil structure. Practice crop rotation to maintain soil fertility and reduce disease. Cover crops can also help during off-seasons.";
  }
  
  if (lowerQuery.includes('weather') || lowerQuery.includes('rain') || lowerQuery.includes('temperature')) {
    return "Weather planning is essential for farming success. Monitor local weather forecasts daily. Protect crops from extreme weather using shade nets or row covers. Adjust irrigation based on rainfall. Plan planting and harvesting around weather patterns.";
  }
  
  return "Thank you for your agricultural question! For the best advice, please provide more specific details about your crop, location, and the issue you're facing. I can help with pest management, fertilization, irrigation, soil health, and general farming practices.";
};

export const useAgriculturalChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hello! I'm your AI agricultural assistant. I can help you with farming questions, pest management, fertilization, irrigation, and more. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (text: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(text),
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000); // 1-2 second delay
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        text: "Hello! I'm your AI agricultural assistant. How can I help you today?",
        isUser: false,
        timestamp: new Date()
      }
    ]);
  };

  return {
    messages,
    isLoading,
    sendMessage,
    clearChat
  };
};