/**
 * Speech Recognition utilities for handling mobile browser compatibility
 */

export interface BrowserInfo {
  isMobile: boolean;
  isAndroid: boolean;
  isIOS: boolean;
  isChrome: boolean;
  isEdge: boolean;
  isSafari: boolean;
  isFirefox: boolean;
  supportsSpeechRecognition: boolean;
  browserName: string;
}

/**
 * Get detailed browser information
 */
export const getBrowserInfo = (): BrowserInfo => {
  const userAgent = navigator.userAgent.toLowerCase();
  
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  const isAndroid = /android/i.test(userAgent);
  const isIOS = /iphone|ipad|ipod/i.test(userAgent);
  const isChrome = /chrome/i.test(userAgent) && !/edg/i.test(userAgent);
  const isEdge = /edg/i.test(userAgent);
  const isSafari = /safari/i.test(userAgent) && !/chrome/i.test(userAgent);
  const isFirefox = /firefox/i.test(userAgent);

  let browserName = 'Unknown';
  if (isChrome) browserName = 'Chrome';
  else if (isEdge) browserName = 'Edge';
  else if (isSafari) browserName = 'Safari';
  else if (isFirefox) browserName = 'Firefox';

  // Check for speech recognition support
  const supportsSpeechRecognition = !!(
    (window as any).webkitSpeechRecognition || 
    (window as any).SpeechRecognition
  );

  return {
    isMobile,
    isAndroid,
    isIOS,
    isChrome,
    isEdge,
    isSafari,
    isFirefox,
    supportsSpeechRecognition,
    browserName
  };
};

/**
 * Get optimal speech recognition settings for current browser
 */
export const getOptimalSpeechSettings = () => {
  const browser = getBrowserInfo();

  return {
    // Mobile devices work better with non-continuous recognition
    continuous: !browser.isMobile,
    
    // Interim results can cause issues on mobile
    interimResults: !browser.isMobile,
    
    // Language preference based on region
    defaultLanguage: getDefaultLanguage(),
    
    // Recommended timeout for mobile
    silenceTimeout: browser.isMobile ? 2000 : 3000,
    
    // Auto-restart settings
    autoRestart: !browser.isMobile,
  };
};

/**
 * Get default language based on user's locale
 */
export const getDefaultLanguage = (): string => {
  const userLang = navigator.language.toLowerCase();
  
  // Language mapping for speech recognition
  const languageMap: { [key: string]: string } = {
    'hi': 'hi-IN',
    'hi-in': 'hi-IN',
    'en': 'en-IN', // Default to Indian English for agricultural context
    'en-us': 'en-US',
    'en-gb': 'en-GB',
    'en-in': 'en-IN',
    'bn': 'bn-IN',
    'bn-in': 'bn-IN',
    'te': 'te-IN',
    'ta': 'ta-IN',
    'mr': 'mr-IN',
    'gu': 'gu-IN',
    'kn': 'kn-IN',
    'ml': 'ml-IN',
    'pa': 'pa-IN',
    'or': 'or-IN',
  };

  // Try exact match first
  if (languageMap[userLang]) {
    return languageMap[userLang];
  }
  
  // Try prefix match
  const langPrefix = userLang.split('-')[0];
  if (languageMap[langPrefix]) {
    return languageMap[langPrefix];
  }
  
  // Default to Hindi for Indian agricultural context
  return 'hi-IN';
};

/**
 * Get user-friendly error messages for speech recognition errors
 */
export const getSpeechErrorMessage = (error: string, browser: BrowserInfo): string => {
  switch (error) {
    case 'not-allowed':
    case 'permission-denied':
      return 'Microphone permission denied. Please allow microphone access in your browser settings and try again.';
    
    case 'no-speech':
      if (browser.isAndroid) {
        return 'No speech detected. Please speak clearly and close to your device microphone.';
      }
      return 'No speech was detected. Please try again.';
    
    case 'audio-capture':
      return 'Microphone not found. Please check your device microphone settings.';
    
    case 'network':
      return 'Network error occurred. Please check your internet connection and try again.';
    
    case 'service-not-allowed':
      if (browser.isAndroid) {
        return 'Speech service not available. Please use Chrome or Edge browser.';
      }
      return 'Speech recognition service not available.';
    
    case 'bad-grammar':
      return 'Speech recognition grammar error. Please try again.';
    
    case 'language-not-supported':
      return 'Selected language not supported. Switching to English.';
    
    default:
      if (browser.isMobile) {
        return `Voice input failed. Please use Chrome or Edge browser, or try refreshing the page.`;
      }
      return `Speech recognition error: ${error}`;
  }
};

/**
 * Check if current environment supports speech recognition with helpful feedback
 */
export const checkSpeechSupport = (): { 
  isSupported: boolean; 
  message: string; 
  recommendations: string[] 
} => {
  const browser = getBrowserInfo();
  
  if (!browser.supportsSpeechRecognition) {
    const recommendations: string[] = [];
    
    if (browser.isMobile) {
      recommendations.push('Use Chrome or Edge browser for voice features');
      if (browser.isAndroid) {
        recommendations.push('Update your Chrome browser to latest version');
        recommendations.push('Check if microphone permission is granted');
      }
    } else {
      recommendations.push('Try using Chrome, Edge, or Safari browser');
      recommendations.push('Ensure your browser is up to date');
    }
    
    return {
      isSupported: false,
      message: `Voice input not supported in ${browser.browserName}`,
      recommendations
    };
  }

  return {
    isSupported: true,
    message: 'Voice input is supported',
    recommendations: []
  };
};