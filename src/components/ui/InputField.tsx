import { forwardRef } from "react";
import { Microphone } from "@phosphor-icons/react";

interface InputFieldProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onVoiceInput?: () => void;
  className?: string;
  multiline?: boolean;
}

export const InputField = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputFieldProps>(
  ({ placeholder = "Tell us...", value, onChange, onVoiceInput, className = "", multiline = false }, ref) => {
    const baseClasses = `
      w-full px-4 py-3 pr-12 bg-input border border-input-border rounded-lg
      text-text-primary placeholder-text-muted text-base
      focus:outline-none focus:border-input-focus focus:ring-1 focus:ring-input-focus
      transition-colors resize-none
      ${className}
    `;

    return (
      <div className="relative">
        {multiline ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            className={`${baseClasses} min-h-[44px] max-h-32`}
            rows={1}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            type="text"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            className={baseClasses}
          />
        )}
        
        {onVoiceInput && (
          <button
            type="button"
            onClick={onVoiceInput}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-primary hover:bg-primary-hover transition-colors"
          >
            <Microphone size={18} className="text-primary-foreground" />
          </button>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";