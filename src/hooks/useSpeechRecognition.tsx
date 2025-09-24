import { useState, useEffect, useRef, useCallback } from 'react';

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

export interface UseSpeechRecognitionOptions {
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
  onResult?: (transcript: string, isFinal: boolean) => void;
  onError?: (error: string) => void;
}

export const useSpeechRecognition = (options: UseSpeechRecognitionOptions = {}) => {
  const {
    language = 'hi-IN', // Default to Hindi for Indian agricultural context
    continuous = true,
    interimResults = true,
    onResult,
    onError
  } = options;

  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const finalTranscriptRef = useRef('');

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognitionAPI = window.webkitSpeechRecognition || window.SpeechRecognition;
    
    if (SpeechRecognitionAPI) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognitionAPI();
      
      const recognition = recognitionRef.current;
      recognition.continuous = continuous;
      recognition.interimResults = interimResults;
      recognition.lang = language;

      recognition.onresult = (event: SpeechRecognitionEvent) => {
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
      };

      recognition.onerror = (event: SpeechRecognitionEvent) => {
        const errorMessage = event.error || 'Speech recognition error';
        setError(errorMessage);
        onError?.(errorMessage);
        setIsListening(false);
      };

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    } else {
      setIsSupported(false);
      setError('Speech recognition is not supported in this browser');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [language, continuous, interimResults, onResult, onError]);

  const startListening = useCallback(async () => {
    if (!isSupported || !recognitionRef.current) {
      setError('Speech recognition is not supported');
      return;
    }

    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Reset transcript
      setTranscript('');
      finalTranscriptRef.current = '';
      setError(null);
      
      recognitionRef.current.start();
    } catch (err) {
      const errorMessage = 'Microphone permission denied or not available';
      setError(errorMessage);
      onError?.(errorMessage);
    }
  }, [isSupported, onError]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
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