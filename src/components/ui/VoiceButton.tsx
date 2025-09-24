import React, { useState } from 'react';
import { Microphone, MicrophoneSlash, Stop, Waveform } from '@phosphor-icons/react';
import useSpeechRecognition from '@/hooks/useSpeechRecognition';
import { cn } from '@/lib/utils';

interface VoiceButtonProps {
  onTranscript: (text: string) => void;
  onInterimResult?: (text: string) => void;
  onError?: (error: string) => void;
  className?: string;
  language?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'ghost' | 'primary';
}

export const VoiceButton: React.FC<VoiceButtonProps> = ({
  onTranscript,
  onInterimResult,
  onError,
  className = "",
  language = 'auto',
  disabled = false,
  size = 'md',
  variant = 'default'
}) => {
  // Smart language detection based on user's locale and preferences
  const getSmartLanguage = () => {
    if (language === 'auto') {
      // Get user's preferred language from browser
      const userLang = navigator.language.toLowerCase();
      
      // Map common language codes to speech recognition codes
      const languageMap: { [key: string]: string } = {
        'hi': 'hi-IN',
        'hi-in': 'hi-IN',
        'en': 'en-IN',
        'en-us': 'en-US',
        'en-gb': 'en-GB',
        'en-in': 'en-IN',
        'zh': 'zh-CN',
        'zh-cn': 'zh-CN',
        'ja': 'ja-JP',
        'ja-jp': 'ja-JP',
        'es': 'es-ES',
        'fr': 'fr-FR',
        'de': 'de-DE',
        'ru': 'ru-RU',
        'ar': 'ar-SA',
        'pt': 'pt-BR',
        'it': 'it-IT',
        'ko': 'ko-KR',
        'th': 'th-TH'
      };

      // Try to match user's language
      if (languageMap[userLang]) {
        return languageMap[userLang];
      }
      
      // Try partial match (e.g., 'en-us' -> 'en')
      const langPrefix = userLang.split('-')[0];
      if (languageMap[langPrefix]) {
        return languageMap[langPrefix];
      }
      
      // Default fallback - try Hindi first (for Indian context), then English
      return 'hi-IN';
    }
    return language;
  };

  const {
    transcript,
    isListening,
    isSupported,
    error,
    startListening,
    stopListening,
    resetTranscript
  } = useSpeechRecognition({
    language: getSmartLanguage(),
    continuous: true,
    interimResults: true,
    onResult: (text, isFinal) => {
      if (text.trim()) {
        if (isFinal) {
          // Final result - send via onTranscript callback
          onTranscript(text.trim());
          resetTranscript();
        } else {
          // Interim result - show in input field for real-time feedback
          onInterimResult?.(text.trim());
        }
      }
    },
    onError: (errorMsg) => {
      onError?.(errorMsg);
    }
  });

  const handleVoiceToggle = async () => {
    if (!isSupported) {
      onError?.('Voice input not supported in this browser');
      return;
    }

    if (disabled) return;

    if (isListening) {
      stopListening();
    } else {
      await startListening();
    }
  };

  const sizeClasses = {
    sm: 'p-2',
    md: 'p-2',
    lg: 'p-3'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  const variantClasses = {
    default: 'bg-surface-secondary text-text-secondary/80 hover:text-text-primary',
    ghost: 'text-text-secondary/80 hover:text-text-primary hover:bg-surface-secondary',
    primary: 'bg-primary text-primary-foreground hover:bg-primary-hover'
  };

  if (!isSupported) {
    return (
      <button
        disabled
        className={cn(
          "rounded-lg flex-shrink-0 opacity-50 cursor-not-allowed",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        title="Voice input not supported"
      >
        <MicrophoneSlash weight="duotone" size={iconSizes[size]} />
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={handleVoiceToggle}
        disabled={disabled}
        className={cn(
          "rounded-lg flex-shrink-0 transition-all duration-200",
          sizeClasses[size],
          isListening 
            ? "bg-red-500 text-white animate-pulse hover:bg-red-600" 
            : variantClasses[variant],
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        title={isListening ? "Stop recording" : "Start voice input"}
      >
        {isListening ? (
          <Waveform weight="duotone" size={iconSizes[size]} />
        ) : (
          <Microphone weight="duotone" size={iconSizes[size]} />
        )}
      </button>



      {/* Error tooltip */}
      {error && (
        <div className={cn(
          "absolute right-0 bg-destructive text-destructive-foreground p-2 rounded text-xs max-w-xs z-50 top-full mt-2"
        )}>
          {error}
        </div>
      )}
    </div>
  );
};

export default VoiceButton;