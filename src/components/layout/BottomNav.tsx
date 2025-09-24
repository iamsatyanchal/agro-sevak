import { 
  House, 
  HouseFill, 
  ChatCircle, 
  ChatCircleFill, 
  Leaf,
  LeafFill,
  CloudRain,
  CloudRainFill,
  Gear,
  GearFill
} from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";

interface BottomNavProps {
  currentPage: string;
}

export const BottomNav = ({ currentPage }: BottomNavProps) => {
  const navItems = [
    { 
      id: "home", 
      label: "Home",
      icon: House, 
      iconFilled: House, 
      path: "/" 
    },
    { 
      id: "chat", 
      label: "AI Chat",
      icon: ChatCircle, 
      iconFilled: ChatCircle, 
      path: "/chat" 
    },
    { 
      id: "diagnosis", 
      label: "Diagnose",
      icon: Leaf, 
      iconFilled: Leaf, 
      path: "/diagnosis" 
    },
    { 
      id: "weather", 
      label: "Weather",
      icon: CloudRain, 
      iconFilled: CloudRain, 
      path: "/weather" 
    },
    { 
      id: "settings", 
      label: "Settings",
      icon: Gear, 
      iconFilled: Gear, 
      path: "/settings" 
    },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-surface/95 backdrop-blur-md border-t border-border shadow-lg">
      <div className="flex items-center justify-around px-1 py-0.5 safe-area-pb">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          const IconComponent = isActive ? item.iconFilled : item.icon;
          
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 min-w-0 ${
                isActive 
                  ? '' 
                  : 'hover:bg-gray-100/50'
              }`}
            >
              <IconComponent 
                size={isActive ? 24 : 22} 
                className={`transition-colors ${
                  isActive ? "text-primary" : "text-text-secondary"
                }`}
                weight={isActive ? "duotone" : "regular"}
              />
              <span 
                className={`text-[10px] mt-1 font-medium transition-colors ${
                  isActive ? "text-primary" : "text-text-secondary"
                } truncate max-w-[3.5rem] text-center`}
              >
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};