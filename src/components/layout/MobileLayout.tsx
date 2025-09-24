import { ReactNode } from "react";
import { SimpleHeader } from "./SimpleHeader";
import { BottomNav } from "./BottomNav";

interface MobileLayoutProps {
  children: ReactNode;
  currentPage: string;
  pageTitle?: string;
}

export const MobileLayout = ({ children, currentPage, pageTitle }: MobileLayoutProps) => {
  // Page title mapping
  const getPageTitle = () => {
    switch (currentPage) {
      case "home":
        return "Agro-Sevak";
      case "chat":
        return "Agro-Sevak Assistant";
      case "diagnosis":
        return "Crop AI Diagnosis";
      case "weather":
        return "Weather Report";
      case "profile":
        return "Profile";
      case "settings":
        return "Settings";
      default:
        return pageTitle || "Agro-Sevak";
    }
  };

  const showHeader = currentPage !== "home";

  return (
    <div className="min-h-screen bg-background flex flex-col mx-auto border-x border-border shadow-lg">
      {showHeader && <SimpleHeader title={getPageTitle()} />}
      
      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>
      
      <BottomNav currentPage={currentPage} />
    </div>
  );
};