import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface OptionCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  illustration?: ReactNode;
  onClick?: () => void;
  variant?: "default" | "outlined";
  className?: string;
}

export const OptionCard = ({ 
  title, 
  description, 
  icon: Icon, 
  illustration, 
  onClick, 
  variant = "default",
  className = ""
}: OptionCardProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full p-4 rounded-lg border text-left transition-all
        ${variant === "outlined" 
          ? "bg-surface border-card-border hover:bg-surface-secondary" 
          : "bg-card border-card-border hover:bg-surface-secondary"
        }
        ${className}
      `}
    >
      <div className="flex items-center space-x-3">
        
        <div className="flex-1 min-w-0">
           {Icon && (
          <div className="flex-shrink-0 flex gap-2">
            <Icon weight="duotone" size={22} className="text-text-secondary" />
            <h3 className="font-medium text-text-primary text-base">{title}</h3>
            
          </div>
        )}
        
        {illustration && (
          <div className="flex-shrink-0 flex gap-2">
            {illustration}
            <h3 className="font-medium text-text-primary text-base">{title}</h3>
            
          </div>
        )}
          {description && (
            <p className="text-text-muted text-sm mt-1 line-clamp-2">{description}</p>
          )}
        </div>
      </div>
    </button>
  );
};