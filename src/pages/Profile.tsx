import { useLocationWeather } from "../hooks/useLocationWeather";
import { MobileLayout } from "../components/layout/MobileLayout";
import { formatLocation } from "../lib/locationWeatherApi";
import { 
  User, 
  MapPin, 
  Phone, 
  Mailbox,
  Briefcase, 
  Calendar, 
  Globe,
  ChartBar,
  GearSix,
  Bell,
  Shield,
  Question
} from "@phosphor-icons/react";

export const Profile = () => {
  const { coords, weather, isLoading } = useLocationWeather();

  // Mock farmer data - in a real app, this would come from user authentication
  const farmerData = {
    name: "Ravi Kumar",
    phone: "+91 9876543210",
    email: "ravi.kumar@email.com",
    farmSize: "5.2 hectares",
    primaryCrops: ["Rice", "Wheat", "Cotton"],
    farmingExperience: "15 years",
    joinedDate: "January 2024",
    totalQueries: 47,
    cropsDiagnosed: 12,
    adviceReceived: 35
  };

  const menuItems = [
    {
      title: "Farm Details",
      icon: Briefcase,
      description: "Manage your farm information",
      action: () => console.log("Farm details")
    },
    {
      title: "Crop History",
      icon: ChartBar,
      description: "View your crop records",
      action: () => console.log("Crop history")
    },
    {
      title: "Settings",
      icon: GearSix,
      description: "App preferences and language",
      action: () => console.log("GearSix")
    },
    {
      title: "Notifications",
      icon: Bell,
      description: "Manage alerts and reminders",
      action: () => console.log("Notifications")
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      description: "Account security settings",
      action: () => console.log("Privacy")
    },
    {
      title: "Help & Support",
      icon: Question,
      description: "Get help and contact support",
      action: () => console.log("Help")
    }
  ];

  return (
    <MobileLayout currentPage="profile">
      <div className="p-4 space-y-6">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-green-400 to-green-600 text-white rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{farmerData.name}</h1>
              <div className="flex items-center gap-2 text-green-100">
                <MapPin size={16} />
                <span className="text-sm">
                  {isLoading ? "Getting location..." : weather ? formatLocation(weather) : "Location unavailable"}
                </span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-green-100 text-sm">
            <div>
              <p className="opacity-80">Farm Size</p>
              <p className="font-semibold text-white">{farmerData.farmSize}</p>
            </div>
            <div>
              <p className="opacity-80">Experience</p>
              <p className="font-semibold text-white">{farmerData.farmingExperience}</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-surface border border-card-border rounded-lg p-4">
          <h2 className="font-semibold text-text-primary mb-3">Contact Information</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone size={20} className="text-text-secondary" />
              <span className="text-text-primary">{farmerData.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mailbox  size={20} className="text-text-secondary" />
              <span className="text-text-primary">{farmerData.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-text-secondary" />
              <span className="text-text-primary">Joined {farmerData.joinedDate}</span>
            </div>
          </div>
        </div>

        {/* Farm Details */}
        <div className="bg-surface border border-card-border rounded-lg p-4">
          <h2 className="font-semibold text-text-primary mb-3">Farm Information</h2>
          <div className="space-y-3">
            <div>
              <p className="text-text-secondary text-sm">Primary Crops</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {farmerData.primaryCrops.map((crop, index) => (
                  <span 
                    key={index}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                  >
                    {crop}
                  </span>
                ))}
              </div>
            </div>
            <div className="pt-2 border-t border-border-light">
              <p className="text-text-secondary text-sm">Location Details</p>
              {weather && (
                <div className="mt-2 text-text-primary text-sm space-y-1">
                  <p><span className="font-medium">Region:</span> {weather.location.region}</p>
                  <p><span className="font-medium">City:</span> {weather.location.name}</p>
                  <p><span className="font-medium">Coordinates:</span> {weather.location.lat.toFixed(4)}, {weather.location.lon.toFixed(4)}</p>
                  <p><span className="font-medium">Timezone:</span> {weather.location.tz_id}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Usage Statistics */}
        <div className="bg-surface border border-card-border rounded-lg p-4">
          <h2 className="font-semibold text-text-primary mb-3">Your Activity</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">{farmerData.totalQueries}</p>
              <p className="text-text-secondary text-xs">Total Queries</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary">{farmerData.cropsDiagnosed}</p>
              <p className="text-text-secondary text-xs">Crops Diagnosed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{farmerData.adviceReceived}</p>
              <p className="text-text-secondary text-xs">Advice Received</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="w-full bg-surface border border-card-border rounded-lg p-4 flex items-center gap-4 hover:bg-surface-secondary transition-colors"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <item.icon size={20} className="text-primary" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium text-text-primary">{item.title}</h3>
                <p className="text-text-secondary text-sm">{item.description}</p>
              </div>
              <div className="w-6 h-6 text-text-secondary">
                →
              </div>
            </button>
          ))}
        </div>

        {/* Weather Information */}
        {weather && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <Globe size={20} />
              Current Weather
            </h3>
            <div className="text-sm text-blue-700 space-y-1">
              <p><span className="font-medium">Temperature:</span> {weather.current.temp_c}°C (feels like {weather.current.feelslike_c}°C)</p>
              <p><span className="font-medium">Condition:</span> {weather.current.condition.text}</p>
              <p><span className="font-medium">Humidity:</span> {weather.current.humidity}%</p>
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};