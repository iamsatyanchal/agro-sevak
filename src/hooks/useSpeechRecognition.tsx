import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  getBrowserInfo, 
  getOptimalSpeechSettings, 
  getSpeechErrorMessage, 
  checkSpeechSupport 
} from '@/lib/speechRecognitionUtils';

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
  error?: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionEvent) => void) | null;
  onstart: (() => void) | null;
  onend: (() => void) | null;
}

declare global {
  interface Window {
    webkitSpeechRecognition: new () => SpeechRecognition;
    SpeechRecognition: new () => SpeechRecognition;
  }
}

// Mobile browser detection utility
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Check for proper speech recognition support
const getSpeechRecognitionAPI = () => {
  if (typeof window === 'undefined') return null;
  
  // Try webkit first (better mobile support)
  if (window.webkitSpeechRecognition) {
    return window.webkitSpeechRecognition;
  }
  
  // Fallback to standard API
  if (window.SpeechRecognition) {
    return window.SpeechRecognition;
  }
  
  return null;
};

export interface UseSpeechRecognitionOptions {
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
  onResult?: (transcript: string, isFinal: boolean) => void;
  onError?: (error: string) => void;
}

export const useSpeechRecognition = (options: UseSpeechRecognitionOptions = {}) => {
  const browser = getBrowserInfo();
  const optimalSettings = getOptimalSpeechSettings();
  
  const {
    language = optimalSettings.defaultLanguage,
    continuous = optimalSettings.continuous,
    interimResults = optimalSettings.interimResults,
    onResult,
    onError
  } = options;

  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const finalTranscriptRef = useRef('');
  const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const speechSupport = checkSpeechSupport();
    
    if (!speechSupport.isSupported) {
      setIsSupported(false);
      setError(speechSupport.message);
      return;
    }
    // Check if speech recognition is supported
    const SpeechRecognitionAPI = getSpeechRecognitionAPI();
    
    if (SpeechRecognitionAPI) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognitionAPI();
      
      const recognition = recognitionRef.current;
      // Mobile-specific settings
      recognition.continuous = browser.isMobile ? false : continuous;
      recognition.interimResults = browser.isMobile ? false : interimResults;
      recognition.lang = language;

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        // Clear any existing silence timeout
        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current);
        }

        let interimTranscript = '';
        let finalTranscript = finalTranscriptRef.current;

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
          } else {
            interimTranscript += result[0].transcript;
          }
        }

        finalTranscriptRef.current = finalTranscript;
        const fullTranscript = finalTranscript + interimTranscript;
        
        setTranscript(fullTranscript);
        onResult?.(fullTranscript, !interimTranscript);

        // For mobile devices, auto-stop after getting final result
        if (browser.isMobile && finalTranscript && !interimTranscript) {
          setTimeout(() => {
            if (recognitionRef.current && isListening) {
              recognitionRef.current.stop();
            }
          }, 500);
        }

        // Set silence timeout for continuous listening
        if (!browser.isMobile && continuous) {
          silenceTimeoutRef.current = setTimeout(() => {
            if (recognitionRef.current && isListening) {
              recognitionRef.current.stop();
            }
          }, optimalSettings.silenceTimeout);
        }
      };

      recognition.onerror = (event: SpeechRecognitionEvent) => {
        console.error('Speech recognition error:', event.error);
        
        const errorMessage = getSpeechErrorMessage(event.error || 'unknown', browser);
        
        setError(errorMessage);
        onError?.(errorMessage);
        setIsListening(false);
      };

      recognition.onstart = () => {
        console.log('Speech recognition started');
        setIsListening(true);
        setError(null);
      };

      recognition.onend = () => {
        console.log('Speech recognition ended');
        setIsListening(false);
        
        // Clear timeouts
        if (restartTimeoutRef.current) {
          clearTimeout(restartTimeoutRef.current);
        }
        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current);
        }

        // For mobile devices or when we have a transcript, don't auto-restart
        if (browser.isMobile || finalTranscriptRef.current.trim()) {
          return;
        }

        // Auto-restart for desktop continuous listening
        if (continuous && !error) {
          restartTimeoutRef.current = setTimeout(() => {
            if (recognitionRef.current && !isListening) {
              try {
                recognitionRef.current.start();
              } catch (err) {
                console.log('Failed to restart recognition:', err);
              }
            }
          }, 100);
        }
      };
    } else {
      setIsSupported(false);
      if (browser.isMobile) {
        setError('Voice input not supported on this mobile browser. Try using Chrome or Edge.');
      } else {
        setError('Speech recognition is not supported in this browser');
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
    };
  }, [language, continuous, interimResults, onResult, onError]);

  const startListening = useCallback(async () => {
    if (!isSupported || !recognitionRef.current) {
      const errorMsg = browser.isMobile 
        ? 'Voice input not supported. Please use Chrome or Edge browser.'
        : 'Speech recognition is not supported';
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    if (isListening) {
      console.log('Already listening, ignoring start request');
      return;
    }

    try {
      // For mobile devices, request microphone permission explicitly
      if (browser.isMobile) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          // Close the stream immediately as we just needed permission
          stream.getTracks().forEach(track => track.stop());
        } catch (permErr) {
          throw new Error('Microphone permission required for voice input');
        }
      }
      
      // Reset transcript
      setTranscript('');
      finalTranscriptRef.current = '';
      setError(null);
      
      // Clear any existing timeouts
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
      
      console.log('Starting speech recognition...');
      recognitionRef.current.start();
    } catch (err: any) {
      console.error('Error starting speech recognition:', err);
      let errorMessage = 'Failed to start voice input';
      
      if (err.message?.includes('permission')) {
        errorMessage = 'Microphone permission required. Please allow microphone access and try again.';
      } else if (err.message?.includes('not allowed')) {
        errorMessage = 'Microphone access denied. Please enable microphone in browser settings.';
      } else if (browser.isMobile) {
        errorMessage = 'Voice input failed. Try refreshing the page or use Chrome browser.';
      }
      
      setError(errorMessage);
      onError?.(errorMessage);
    }
  }, [isSupported, isListening, onError]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      console.log('Stopping speech recognition...');
      recognitionRef.current.stop();
    }
    
    // Clear timeouts
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
    }
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
    }
  }, [isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    finalTranscriptRef.current = '';
  }, []);

  const changeLanguage = useCallback((newLang: string) => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = newLang;
    }
  }, []);

  return {
    transcript,
    isListening,
    isSupported,
    error,
    startListening,
    stopListening,
    resetTranscript,
    changeLanguage
  };
};

export default useSpeechRecognition;