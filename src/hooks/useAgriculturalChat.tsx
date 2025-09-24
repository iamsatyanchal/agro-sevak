import { useState } from 'react';
import GroqAgriculturalService, { WeatherData } from '../lib/groqApi';
import { useLocationWeather } from './useLocationWeather';

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isStreaming?: boolean;
}

export interface AIResponse {
  id: string;
  query: string;
  response: string;
  confidence: number;
  category: string;
  timestamp: string;
}

export const useAgriculturalChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hello! I'm your AI agricultural assistant powered by advanced AI. I can help you with farming questions, pest management, fertilization, irrigation, weather-based advice, and more. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { weather } = useLocationWeather();

  const sendMessage = async (text: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Prepare weather data for Groq API
      const weatherData: WeatherData | undefined = weather ? {
        temperature: weather.current?.temp_c,
        humidity: weather.current?.humidity,
        condition: weather.current?.condition?.text,
        location: `${weather.location?.name}, ${weather.location?.country}`,
        windSpeed: weather.current?.wind_kph,
        pressure: weather.current?.pressure_mb
      } : undefined;

      // Create placeholder AI message for streaming
      const aiMessageId = (Date.now() + 1).toString();
      const placeholderAiMessage: ChatMessage = {
        id: aiMessageId,
        text: "",
        isUser: false,
        timestamp: new Date(),
        isStreaming: true
      };

      setMessages(prev => [...prev, placeholderAiMessage]);
      
      // Set loading to false as soon as streaming starts
      setIsLoading(false);

      // Use streaming response for better UX
      await GroqAgriculturalService.generateStreamingResponse(
        text,
        weatherData,
        (chunk: string) => {
          setMessages(prev => prev.map(msg => 
            msg.id === aiMessageId 
              ? { ...msg, text: msg.text + chunk }
              : msg
          ));
        }
      );

      // Mark streaming as complete
      setMessages(prev => prev.map(msg => 
        msg.id === aiMessageId 
          ? { ...msg, isStreaming: false }
          : msg
      ));

    } catch (error) {
      console.error('Error in agricultural chat:', error);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm experiencing some technical difficulties. Please try again in a moment. In the meantime, I can still provide basic agricultural guidance on topics like crop management, pest control, irrigation, and soil health.",
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
    // Remove finally block since we handle setIsLoading(false) above when streaming starts
  };

  const sendMessageWithoutStreaming = async (text: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Prepare weather data for Groq API
      const weatherData: WeatherData | undefined = weather ? {
        temperature: weather.current?.temp_c,
        humidity: weather.current?.humidity,
        condition: weather.current?.condition?.text,
        location: `${weather.location?.name}, ${weather.location?.country}`,
        windSpeed: weather.current?.wind_kph,
        pressure: weather.current?.pressure_mb
      } : undefined;

      const response = await GroqAgriculturalService.generateResponse(text, weatherData);

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error('Error in agricultural chat:', error);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm experiencing some technical difficulties. Please try again in a moment.",
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        text: "Hello! I'm your AI agricultural assistant powered by advanced AI. How can I help you today?",
        isUser: false,
        timestamp: new Date()
      }
    ]);
  };

  return {
    messages,
    isLoading,
    sendMessage,
    sendMessageWithoutStreaming,
    clearChat,
    weather: weather // Expose weather data if needed
  };
};