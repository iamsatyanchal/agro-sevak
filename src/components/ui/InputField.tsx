import { forwardRef, useState, useEffect } from "react";
import { Microphone } from "@phosphor-icons/react";
import VoiceButton from "./VoiceButton";

interface InputFieldProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onVoiceInput?: (transcript: string) => void;
  onVoiceError?: (error: string) => void;
  onEnter?: () => void;
  className?: string;
  multiline?: boolean;
  language?: string;
}

export const InputField = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputFieldProps>(
  ({ placeholder = "Tell us...", value, onChange, onVoiceInput, onVoiceError, onEnter, className = "", multiline = false, language = "hi-IN" }, ref) => {
    const [displayValue, setDisplayValue] = useState(value || "");
    const [originalValue, setOriginalValue] = useState("");
    const [isListening, setIsListening] = useState(false);

    // Update display value when value prop changes
    useEffect(() => {
      if (!isListening) {
        setDisplayValue(value || "");
      }
    }, [value, isListening]);

    const handleInterimResult = (interimText: string) => {
      setIsListening(true);
      setOriginalValue(value || "");
      const newValue = (value || "") + (value && !value.endsWith(" ") ? " " : "") + interimText;
      setDisplayValue(newValue);
    };

    const handleFinalResult = (finalText: string) => {
      setIsListening(false);
      const newValue = (value || "") + (value && !value.endsWith(" ") ? " " : "") + finalText;
      onChange?.(newValue);
      setDisplayValue(newValue);
      onVoiceInput?.(finalText);
    };

    const handleInputChange = (newValue: string) => {
      if (!isListening) {
        setDisplayValue(newValue);
        onChange?.(newValue);
      }
    };
    const baseClasses = `
      w-full px-4 py-3 pr-12 bg-input rounded-lg
      text-text-primary placeholder-text-muted text-base
      focus:outline-none focus:border-input-focus focus:ring-0 focus:ring-input-focus
      transition-colors resize-none
      ${className}
    `;

    return (
      <div className="relative">
        {multiline ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            value={displayValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onEnter?.();
              }
            }}
            placeholder={placeholder}
            className={`${baseClasses} min-h-[44px] max-h-32`}
            rows={1}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            type="text"
            value={displayValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onEnter?.();
              }
            }}
            placeholder={placeholder}
            className={baseClasses}
          />
        )}
        
        {onVoiceInput && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <VoiceButton
              onTranscript={handleFinalResult}
              onInterimResult={handleInterimResult}
              onError={onVoiceError}
              language={language}
              size="sm"
              variant="primary"
            />
          </div>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";
