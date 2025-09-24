import * as React from "react";
import { cn } from "@/lib/utils";
import VoiceButton from "./VoiceButton";

export interface VoiceTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onVoiceInput?: (transcript: string) => void;
  onVoiceError?: (error: string) => void;
  language?: string;
  showVoiceButton?: boolean;
}

const VoiceTextarea = React.forwardRef<HTMLTextAreaElement, VoiceTextareaProps>(
  ({ className, onVoiceInput, onVoiceError, language = "hi-IN", showVoiceButton = true, value, onChange, ...props }, ref) => {
    const [displayValue, setDisplayValue] = React.useState(value || "");
    const [isListening, setIsListening] = React.useState(false);

    // Update display value when value prop changes
    React.useEffect(() => {
      if (!isListening) {
        setDisplayValue(value || "");
      }
    }, [value, isListening]);

    const handleInterimResult = (interimText: string) => {
      setIsListening(true);
      const currentValue = typeof value === 'string' ? value : "";
      const newValue = currentValue + (currentValue && !currentValue.endsWith(" ") ? " " : "") + interimText;
      setDisplayValue(newValue);
    };

    const handleFinalResult = (finalText: string) => {
      setIsListening(false);
      const currentValue = typeof value === 'string' ? value : "";
      const newValue = currentValue + (currentValue && !currentValue.endsWith(" ") ? " " : "") + finalText;
      
      // Create synthetic event for onChange
      const syntheticEvent = {
        target: { value: newValue }
      } as React.ChangeEvent<HTMLTextAreaElement>;
      
      onChange?.(syntheticEvent);
      setDisplayValue(newValue);
      onVoiceInput?.(finalText);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isListening) {
        setDisplayValue(e.target.value);
        onChange?.(e);
      }
    };
    return (
      <div className="relative">
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            showVoiceButton && "pr-12", // Add padding for voice button
            className
          )}
          ref={ref}
          value={displayValue}
          onChange={handleInputChange}
          {...props}
        />
        {showVoiceButton && onVoiceInput && (
          <div className="absolute top-3 right-3">
            <VoiceButton
              onTranscript={handleFinalResult}
              onInterimResult={handleInterimResult}
              onError={onVoiceError}
              language={language}
              size="sm"
              variant="ghost"
            />
          </div>
        )}
      </div>
    );
  }
);
VoiceTextarea.displayName = "VoiceTextarea";

export { VoiceTextarea };