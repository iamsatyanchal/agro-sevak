import { useState } from "react";
import { MobileLayout } from "../components/layout/MobileLayout";
import { ThemeChooser } from "../components/ui/ThemeChooser";
import { useTheme } from "../contexts/ThemeContext";
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Moon,
  Sun,
  MapPin,
  Palette,
  Info,
  ArrowRight,
  Toggle
} from "@phosphor-icons/react";

export const Settings = () => {
  const { isDarkMode, setIsDarkMode } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [weatherAlerts, setWeatherAlerts] = useState(true);
  const [location, setLocation] = useState("Auto-detect");
  const [language, setLanguage] = useState("English");

  const settingsSections = [
    {
      title: "Account",
      icon: User,
      items: [
        { label: "Profile", action: () => {}, hasArrow: true },
        { label: "Personal Information", action: () => {}, hasArrow: true },
        { label: "Change Password", action: () => {}, hasArrow: true },
      ]
    },
    {
      title: "Notifications",
      icon: Bell,
      items: [
        { 
          label: "Push Notifications", 
          toggle: true, 
          value: notifications,
          onChange: setNotifications
        },
        { 
          label: "Weather Alerts", 
          toggle: true, 
          value: weatherAlerts,
          onChange: setWeatherAlerts
        },
        { label: "Notification Settings", action: () => {}, hasArrow: true },
      ]
    },
    // {
    //   title: "Appearance",
    //   icon: Palette,
    //   items: [
    //     { 
    //       label: "Dark Mode", 
    //       toggle: true, 
    //       value: isDarkMode,
    //       onChange: setIsDarkMode
    //     },
    //     { label: "Font Size", action: () => {}, hasArrow: true, value: "Medium" },
    //   ]
    // },
    {
      title: "Location & Weather",
      icon: MapPin,
      items: [
        { label: "Location Settings", action: () => {}, hasArrow: true, value: location },
        { label: "Weather Units", action: () => {}, hasArrow: true, value: "Celsius" },
        { label: "Auto-refresh Weather", action: () => {}, hasArrow: true },
      ]
    },
    {
      title: "Language & Region",
      icon: Globe,
      items: [
        { label: "Language", action: () => {}, hasArrow: true, value: language },
        { label: "Region", action: () => {}, hasArrow: true, value: "India" },
        { label: "Date Format", action: () => {}, hasArrow: true, value: "DD/MM/YYYY" },
      ]
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      items: [
        { label: "Privacy Policy", action: () => {}, hasArrow: true },
        { label: "Terms of Service", action: () => {}, hasArrow: true },
        { label: "Data Management", action: () => {}, hasArrow: true },
        { label: "Clear Cache", action: () => {}, hasArrow: true },
      ]
    },
    {
      title: "About",
      icon: Info,
      items: [
        { label: "App Version", action: () => {}, value: "1.0.0" },
        { label: "Help & Support", action: () => {}, hasArrow: true },
        { label: "Feedback", action: () => {}, hasArrow: true },
        { label: "Rate App", action: () => {}, hasArrow: true },
      ]
    }
  ];

  const SettingItem = ({ item }: { item: any }) => (
    <div 
      className="flex items-center justify-between p-4 bg-surface border-b border-card-border last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={item.action}
    >
      <div className="flex-1">
        <span className="text-text-primary font-medium">{item.label}</span>
        {item.value && (
          <p className="text-text-secondary text-sm mt-1">{item.value}</p>
        )}
      </div>
      
      {item.toggle && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            item.onChange(!item.value);
          }}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            item.value ? 'bg-primary' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              item.value ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      )}
      
      {item.hasArrow && (
        <ArrowRight size={20} className="text-text-secondary ml-2" />
      )}
    </div>
  );

  return (
    <MobileLayout currentPage="settings">
      <div className="p-4">
        {/* <h1 className="text-2xl font-bold text-text-primary mb-6">Settings</h1>
         */}
        <div className="space-y-6">
          {/* Theme Color Chooser
          <ThemeChooser />
           */}
          {settingsSections.map((section, index) => (
            <div key={index} className="bg-surface border border-card-border rounded-lg overflow-hidden">
              <div className="flex items-center gap-3 p-4 bg-gray-50 border-b border-card-border">
                <section.icon size={20} className="text-primary" />
                <h2 className="font-semibold text-text-primary">{section.title}</h2>
              </div>
              
              <div>
                {section.items.map((item, itemIndex) => (
                  <SettingItem key={itemIndex} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* App Info Footer */}
        <div className="mt-8 p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img src="/favicon.ico" alt="App Icon" className="w-8 h-8" />
            <span className="font-semibold text-text-primary">Agro-Sevak</span>
          </div>
          <p className="text-text-secondary text-sm">
            AI-powered agricultural assistant for farmers
          </p>
          <p className="text-text-secondary text-xs mt-2">
            Version 1 • Made with ❤️ for farmers by Team 4O4
          </p>
        </div>
      </div>
    </MobileLayout>
  );
};