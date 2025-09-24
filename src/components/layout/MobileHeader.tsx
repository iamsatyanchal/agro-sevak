import { List, User } from "@phosphor-icons/react";

export const MobileHeader = () => {
  return (
    <header className="bg-nav-bg border-b border-nav-border px-4 py-2 flex items-center justify-between">
      <button className="p-1.5 -ml-1.5 hover:bg-secondary rounded-lg transition-colors">
        <List size={22} className="text-text-primary" />
      </button>
      
      <div className="flex items-center space-x-1">
        <span className="text-text-primary font-medium text-base">Agro-Sevak</span>
      </div>
      
      <button className="p-1 hover:bg-secondary rounded-full transition-colors">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <User size={18} className="text-primary-foreground" />
        </div>
      </button>
    </header>
  );
};