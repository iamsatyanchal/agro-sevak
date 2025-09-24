import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "../components/layout/MobileLayout";
import { OptionCard } from "../components/ui/OptionCard";
import { InputField } from "../components/ui/InputField";
import { useLocationWeather } from "../hooks/useLocationWeather";
import { formatLocation, formatWeatherDescription } from "../lib/locationWeatherApi";
import { getFormattedCropName } from "../lib/cropEmojis";
import { 
  Plant, 
  CloudRain, 
  Camera, 
  Gear, 
  Bug,
  Leaf,
  TrendUp,
  Phone,
  MapPin,
  CircleNotch
} from "@phosphor-icons/react";
import { useMarketPrices } from "../hooks/useMarketPrices";

export const Home = () => {
  const navigate = useNavigate();
  const [queryText, setQueryText] = useState("");
  const { coords, weather, isLoading } = useLocationWeather();
  const { marketPrices, isLoading: marketLoading, error: marketError, refreshPrices } = useMarketPrices();

  const quickActions = [
    { 
      title: "Ask AI", 
      icon: Plant,
      description: "Get instant advice",
      action: () => navigate("/chat")
    },
    { 
      title: "Diagnose", 
      icon: Camera,
      description: "Upload crop photo",
      action: () => navigate("/diagnosis")
    },
    { 
      title: "Weather", 
      icon: CloudRain,
      description: "Check forecast",
      action: () => navigate("/weather")
    },
    { 
      title: "Settings", 
      icon: Gear,
      description: "App preferences",
      action: () => navigate("/settings")
    },
  ];

  const handleQuickQuery = () => {
    if (queryText.trim()) {
      navigate(`/chat?query=${encodeURIComponent(queryText)}`);
    }
  };

  const handleVoiceInput = (transcript: string) => {
    if (transcript.trim()) {
      setQueryText(transcript);
      // Auto-navigate after a brief delay
      setTimeout(() => {
        navigate(`/chat?query=${encodeURIComponent(transcript)}`);
      }, 1000);
    }
  };

  const handleVoiceError = (error: string) => {
    console.error("Voice input error:", error);
  };

  return (
    <MobileLayout currentPage="home">
      <div className="px-4 py-6 space-y-6">
        {/* Greeting Section */}
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-semibold text-text-primary">Hello Satya,</h1>
            <p className="text-text-secondary text-base mt-1 flex items-center gap-2">
              <MapPin weight="duotone" size={16} />
              {isLoading ? "Getting location..." : weather ? formatLocation(weather) : "Location unavailable"}
            </p>
          </div>
          
          <InputField
            value={queryText}
            onChange={setQueryText}
            placeholder="Tell about your farming problem..."
            onVoiceInput={handleVoiceInput}
            onVoiceError={handleVoiceError}
            language="hi-IN"
            className="border border-input-border focus:ring-1"
          />
          
          {queryText && (
            <button
              onClick={handleQuickQuery}
              className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium"
            >
              Get Solution
            </button>
          )}
        </div>

        {/* Weather Alert
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-medium text-blue-900 text-base mb-1 flex items-center gap-2">
                <CloudRain weight="duotone" size={20} className="text-blue-600" />
                Weather Alert
              </h3>
              <p className="text-blue-700 text-sm leading-relaxed">
                {weather 
                  ? formatWeatherDescription(weather)
                  : isLoading 
                    ? "Loading weather data..." 
                    : "Weather data unavailable"}
              </p>
            </div>
            <div className="ml-3 text-blue-600 text-lg font-bold">
              {weather ? `${weather.current.temp_c}°C` : '--°C'}
            </div>
          </div>
        </div> */}

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-3">Quick Help</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <OptionCard
                key={index}
                title={action.title}
                description={action.description}
                icon={action.icon}
                onClick={action.action}
                className="bg-surface border border-card-border hover:bg-surface-secondary"
              />
            ))}
          </div>
        </div>

        {/* Market Prices */}
        <div className="bg-surface rounded-lg p-4 border border-card-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-text-primary text-base flex items-center gap-2">
              <TrendUp weight="duotone" size={20} className="text-green-600" />
              Today's Market Prices
            </h3>
            {marketLoading && (
              <CircleNotch size={16} className="animate-spin text-text-secondary" />
            )}
          </div>
          
          {marketError ? (
            <div className="text-center py-4">
              <p className="text-red-600 text-sm mb-2">Failed to load market data</p>
              <button 
                onClick={refreshPrices}
                className="text-primary text-sm underline"
              >
                Try again
              </button>
            </div>
          ) : marketLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-border-light last:border-b-0">
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
                  </div>
                  <div className="w-16">
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {marketPrices.slice(0, 5).map((price) => (
                <div key={price.id} className="flex justify-between items-center py-2 border-b border-border-light last:border-b-0">
                  <div>
                    <span className="font-medium text-text-primary">{getFormattedCropName(price.cropName)}</span>
                    <span className="text-text-secondary text-sm ml-2">({price.variety})</span>
                    <div className="text-xs text-text-secondary mt-1">
                      {price.market}, {price.district}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-text-primary">₹{price.modalPrice}</div>
                    <div className={`text-xs ${price.trend === 'up' ? 'text-green-600' : price.trend === 'down' ? 'text-red-600' : 'text-text-secondary'}`}>
                      {price.trend === 'up' ? '↗' : price.trend === 'down' ? '↘' : '→'} {price.unit}
                    </div>
                  </div>
                </div>
              ))}
              {marketPrices.length === 0 && !marketLoading && (
                <p className="text-text-secondary text-sm text-center py-4">
                  No market data available for your area
                </p>
              )}
            </div>
          )}
        </div>

        {/* Common Issues */}
        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-3">Common Issues</h2>
          <div className="space-y-2">
            <OptionCard
              title="Leaf Spots"
              description="Disease identification and treatment"
              icon={Leaf}
              onClick={() => navigate("/chat?query=leaf spots disease treatment")}
              className="bg-surface border border-card-border"
            />
            <OptionCard
              title="Pest Attack"
              description="Pest prevention and control"
              icon={Bug}
              onClick={() => navigate("/chat?query=pest control methods")}
              className="bg-surface border border-card-border"
            />
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Phone weight="duotone" size={20} className="text-red-600" />
            <div>
              <h3 className="font-medium text-red-900">Emergency Help</h3>
              <p className="text-red-700 text-sm">Agriculture Helpline: 1800-180-1551</p>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};
