import React, { useEffect, useState } from 'react';
import { Microphone, MicrophoneSlash, Waveform } from '@phosphor-icons/react';
import useSpeechRecognition from '@/hooks/useSpeechRecognition';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  onError?: (error: string) => void;
  placeholder?: string;
  className?: string;
  language?: string;
  disabled?: boolean;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({
  onTranscript,
  onError,
  placeholder = "Click to speak...",
  className = "",
  language = 'hi-IN',
  disabled = false
}) => {
  const [hasInteracted, setHasInteracted] = useState(false);

  const {
    transcript,
    isListening,
    isSupported,
    error,
    startListening,
    stopListening,
    resetTranscript,
    changeLanguage
  } = useSpeechRecognition({
    language,
    continuous: true,
    interimResults: true,
    onResult: (text, isFinal) => {
      if (isFinal && text.trim()) {
        onTranscript(text.trim());
        resetTranscript();
        stopListening();
        setHasInteracted(false);
      }
    },
    onError: (errorMsg) => {
      onError?.(errorMsg);
      setHasInteracted(false);
    }
  });

  useEffect(() => {
    changeLanguage(language);
  }, [language, changeLanguage]);

  const handleVoiceToggle = async () => {
    if (!isSupported) {
      onError?.('Speech recognition is not supported in this browser');
      return;
    }

    if (disabled) return;

    if (isListening) {
      stopListening();
      setHasInteracted(false);
    } else {
      setHasInteracted(true);
      await startListening();
    }
  };

  if (!isSupported) {
    return (
      <div className={cn("flex items-center gap-2 text-muted-foreground text-sm", className)}>
        <MicrophoneSlash size={16} />
        <span>Voice input not supported</span>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {/* Voice Button */}
      <Button
        variant={isListening ? "destructive" : "default"}
        size="sm"
        onClick={handleVoiceToggle}
        disabled={disabled}
        className={cn(
          "flex items-center gap-2 transition-all duration-200",
          isListening && "animate-pulse",
          !isListening && hasInteracted && "bg-orange-500 hover:bg-orange-600"
        )}
      >
        {isListening ? (
          <>
            <Waveform size={16} className="animate-bounce" />
            <span>Stop Recording</span>
          </>
        ) : (
          <>
            <Microphone size={16} />
            <span>Voice Input</span>
          </>
        )}
      </Button>

      {/* Live Transcript Display */}
      {(isListening || transcript) && (
        <div className="p-4 bg-muted rounded-lg border-2 border-dashed border-primary/30 w-full">
          <div className="flex items-start gap-3">
            <div className={cn(
              "w-2 h-2 rounded-full mt-2 flex-shrink-0",
              isListening ? "bg-red-500 animate-pulse" : "bg-green-500"
            )} />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-2">
                {isListening ? "Listening..." : "Recorded:"}
              </p>
              <div className="text-sm max-h-24 overflow-y-auto break-words leading-relaxed bg-background/50 p-2 rounded border">
                {transcript || placeholder}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="p-2 bg-destructive/10 text-destructive text-sm rounded border-l-4 border-destructive">
          {error}
        </div>
      )}

      {/* Help Text */}
      {!isListening && !hasInteracted && !transcript && (
        <p className="text-xs text-muted-foreground">
          Click the microphone to start voice input. Supports Hindi and English.
        </p>
      )}
    </div>
  );
};

export default VoiceInput;