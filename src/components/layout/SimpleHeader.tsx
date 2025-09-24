import { useNavigate } from "react-router-dom";
import { CaretLeft } from "@phosphor-icons/react";

interface SimpleHeaderProps {
  title: string;
  onBack?: () => void;
}

export const SimpleHeader = ({ title, onBack }: SimpleHeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-border px-4 py-2 flex items-center justify-between align-center items-center mt-0.5">
      <button 
        onClick={handleBack}
        className="p-2 -ml-2 hover:bg-secondary/10 rounded-full transition-colors"
      >
        <CaretLeft size={20} weight="bold" className="text-text-primary" />
      </button>
      
      <div className="flex-1 flex justify-center">
        <h1 className="text-text-primary font-semibold text-lg">{title}</h1>
      </div>
      
      {/* Empty div for proper centering */}
      <div className="w-8"></div>
    </header>
  );
};