import React, { useEffect, useState } from 'react';
import { Microphone, MicrophoneSlash, Waveform, Info } from '@phosphor-icons/react';
import useSpeechRecognition from '@/hooks/useSpeechRecognition';
import { Button } from './button';
import { cn } from '@/lib/utils';
import { getBrowserInfo, checkSpeechSupport } from '@/lib/speechRecognitionUtils';

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
  const [showMobileHelp, setShowMobileHelp] = useState(false);
  const browser = getBrowserInfo();
  const speechSupport = checkSpeechSupport();

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
    continuous: !browser.isMobile, // Mobile devices work better with non-continuous
    interimResults: !browser.isMobile, // Mobile devices work better without interim results
    onResult: (text, isFinal) => {
      if (isFinal && text.trim()) {
        onTranscript(text.trim());
        resetTranscript();
        if (!browser.isMobile) {
          stopListening();
        }
        setHasInteracted(false);
      }
    },
    onError: (errorMsg) => {
      onError?.(errorMsg);
      setHasInteracted(false);
      setShowMobileHelp(browser.isMobile); // Show mobile help on error
    }
  });

  useEffect(() => {
    changeLanguage(language);
  }, [language, changeLanguage]);

  const handleVoiceToggle = async () => {
    if (!isSupported) {
      const errorMsg = browser.isMobile 
        ? 'Voice input not supported. Please use Chrome or Edge browser.'
        : 'Speech recognition is not supported in this browser';
      onError?.(errorMsg);
      setShowMobileHelp(browser.isMobile);
      return;
    }

    if (disabled) return;

    if (isListening) {
      stopListening();
      setHasInteracted(false);
    } else {
      setHasInteracted(true);
      setShowMobileHelp(false);
      await startListening();
    }
  };

  if (!isSupported) {
    return (
      <div className={cn("flex flex-col gap-2", className)}>
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <MicrophoneSlash size={16} />
          <span>{browser.isMobile ? 'Voice input not supported on this browser' : 'Voice input not supported'}</span>
        </div>
        {browser.isMobile && (
          <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex gap-2">
              <Info size={16} className="text-orange-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-orange-700">
                <p className="font-medium mb-1">Voice input requires a compatible browser</p>
                <div className="space-y-1">
                  {speechSupport.recommendations.map((rec, index) => (
                    <p key={index} className="text-xs">• {rec}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
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
            <span>{browser.isMobile ? 'Tap to Speak' : 'Voice Input'}</span>
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
          {browser.isMobile 
            ? 'Tap microphone to speak. Supports Hindi and English.'
            : 'Click the microphone to start voice input. Supports Hindi and English.'
          }
        </p>
      )}

      {/* Mobile-specific help */}
      {showMobileHelp && browser.isMobile && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex gap-2">
            <Info size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-1">Mobile Voice Input Tips</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Make sure you're using Chrome or Edge browser</li>
                <li>Allow microphone permission when prompted</li>
                <li>Speak clearly and close to your device</li>
                <li>Tap "Tap to Speak" and start speaking immediately</li>
                <li>Try refreshing the page if it still doesn't work</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceInput;