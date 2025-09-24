import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "../components/layout/MobileLayout";
import { OptionCard } from "../components/ui/OptionCard";
import { InputField } from "../components/ui/InputField";
import { 
  Plant, 
  CloudRain, 
  Camera, 
  User, 
  Bug,
  Leaf,
  TrendUp,
  Phone,
  MapPin
} from "@phosphor-icons/react";
import { mockWeatherData, mockMarketPrices } from "../data/mockAgriculturalData";

export const AgriculturalHome = () => {
  const navigate = useNavigate();
  const [queryText, setQueryText] = useState("");

  const quickActions = [
    { 
      title: "Ask AI", 
      icon: Plant,
      description: "Get instant farming advice",
      action: () => navigate("/chat")
    },
    { 
      title: "Diagnose", 
      icon: Camera,
      description: "Upload crop photos",
      action: () => navigate("/diagnosis")
    },
    { 
      title: "Weather", 
      icon: CloudRain,
      description: "Check forecast",
      action: () => navigate("/weather")
    },
    { 
      title: "Profile", 
      icon: User,
      description: "Farmer details",
      action: () => navigate("/profile")
    },
  ];

  const handleQuickQuery = () => {
    if (queryText.trim()) {
      navigate(`/chat?query=${encodeURIComponent(queryText)}`);
    }
  };

  return (
    <MobileLayout currentPage="home">
      <div className="px-4 py-6 space-y-6">
        {/* Greeting Section */}
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-semibold text-text-primary">नमस्ते Ravi जी,</h1>
            <p className="text-text-secondary text-base mt-1 flex items-center gap-2">
              <MapPin size={16} />
              Ottapalam, Palakkad
            </p>
          </div>
          
          <InputField
            value={queryText}
            onChange={setQueryText}
            placeholder="अपनी खेती की समस्या बताएं... (Tell about your farming problem...)"
            onVoiceInput={() => console.log("Voice input")}
          />
          
          {queryText && (
            <button
              onClick={handleQuickQuery}
              className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium"
            >
              समाधान पाएं (Get Solution)
            </button>
          )}
        </div>

        {/* Weather Alert */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-medium text-blue-900 text-base mb-1 flex items-center gap-2">
                <CloudRain size={20} className="text-blue-600" />
                मौसम अलर्ट (Weather Alert)
              </h3>
              <p className="text-blue-700 text-sm leading-relaxed">
                अगले 2 दिन भारी बारिश का अनुमान। खेत में पानी की निकासी सुनिश्चित करें।
              </p>
              <p className="text-blue-600 text-xs mt-1">
                Heavy rain expected in next 2 days. Ensure field drainage.
              </p>
            </div>
            <div className="ml-3 text-blue-600 text-lg font-bold">
              {mockWeatherData.current.temperature}°C
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-3">तुरंत सहायता (Quick Help)</h2>
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
              <TrendUp size={20} className="text-green-600" />
              आज के बाजार भाव (Today's Market Prices)
            </h3>
          </div>
          <div className="space-y-2">
            {mockMarketPrices.slice(0, 3).map((price) => (
              <div key={price.id} className="flex justify-between items-center py-2 border-b border-border-light last:border-b-0">
                <div>
                  <span className="font-medium text-text-primary">{price.cropName}</span>
                  <span className="text-text-secondary text-sm ml-2">({price.variety})</span>
                </div>
                <div className="text-right">
                  <div className="font-medium text-text-primary">₹{price.modalPrice}</div>
                  <div className={`text-xs ${price.trend === 'up' ? 'text-green-600' : price.trend === 'down' ? 'text-red-600' : 'text-text-secondary'}`}>
                    {price.trend === 'up' ? '↗' : price.trend === 'down' ? '↘' : '→'} {price.unit}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Common Issues */}
        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-3">आम समस्याएं (Common Issues)</h2>
          <div className="space-y-2">
            <OptionCard
              title="पत्तियों पर धब्बे (Leaf Spots)"
              description="रोग की पहचान और इलाज"
              icon={Leaf}
              onClick={() => navigate("/chat?query=leaf spots disease treatment")}
              className="bg-surface border border-card-border"
            />
            <OptionCard
              title="कीट प्रकोप (Pest Attack)"
              description="कीड़ों की रोकथाम और नियंत्रण"
              icon={Bug}
              onClick={() => navigate("/chat?query=pest control methods")}
              className="bg-surface border border-card-border"
            />
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Phone size={20} className="text-red-600" />
            <div>
              <h3 className="font-medium text-red-900">आपातकालीन सहायता (Emergency Help)</h3>
              <p className="text-red-700 text-sm">कृषि हेल्पलाइन: 1800-180-1551</p>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};