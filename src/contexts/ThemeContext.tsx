import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeColor = 'green' | 'blue' | 'purple' | 'orange' | 'red' | 'pink' | 'gray' | 'slate';

interface ThemeContextType {
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeColorMap: Record<ThemeColor, Record<string, string>> = {
  green: {
    primary: '120 55% 25%',
    primaryHover: '120 55% 20%',
    secondary: '100 30% 45%',
    accent: '120 25% 92%',
    background: '120 50% 97%',
    surface: '120 30% 98%',
  },
  blue: {
    primary: '210 98% 35%',
    primaryHover: '210 98% 30%',
    secondary: '200 80% 50%',
    accent: '210 25% 92%',
    background: '210 40% 97%',
    surface: '210 30% 98%',
  },
  purple: {
    primary: '270 70% 35%',
    primaryHover: '270 70% 30%',
    secondary: '260 60% 50%',
    accent: '270 25% 92%',
    background: '270 40% 97%',
    surface: '270 30% 98%',
  },
  orange: {
    primary: '25 95% 35%',
    primaryHover: '25 95% 30%',
    secondary: '35 85% 50%',
    accent: '25 25% 92%',
    background: '25 40% 97%',
    surface: '25 30% 98%',
  },
  red: {
    primary: '0 85% 35%',
    primaryHover: '0 85% 30%',
    secondary: '10 75% 50%',
    accent: '0 25% 92%',
    background: '0 40% 97%',
    surface: '0 30% 98%',
  },
  pink: {
    primary: '330 80% 35%',
    primaryHover: '330 80% 30%',
    secondary: '320 70% 50%',
    accent: '330 25% 92%',
    background: '330 40% 97%',
    surface: '330 30% 98%',
  },
  gray: {
    primary: '220 10% 25%',
    primaryHover: '220 10% 20%',
    secondary: '220 8% 45%',
    accent: '220 10% 92%',
    background: '220 5% 97%',
    surface: '220 8% 98%',
  },
  slate: {
    primary: '215 25% 25%',
    primaryHover: '215 25% 20%',
    secondary: '215 20% 45%',
    accent: '215 20% 92%',
    background: '215 15% 97%',
    surface: '215 20% 98%',
  },
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeColor, setThemeColor] = useState<ThemeColor>('green');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme-color') as ThemeColor;
    const savedDarkMode = localStorage.getItem('dark-mode') === 'true';
    
    if (savedTheme && themeColorMap[savedTheme]) {
      setThemeColor(savedTheme);
    }
    setIsDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    // Apply theme colors to CSS variables
    const colors = themeColorMap[themeColor];
    const root = document.documentElement;

    if (isDarkMode) {
      // Dark mode color adjustments
      root.style.setProperty('--primary', colors.primary);
      root.style.setProperty('--primary-hover', colors.primaryHover);
      root.style.setProperty('--secondary', colors.secondary);
      root.style.setProperty('--background', '0 0% 5%');
      root.style.setProperty('--surface', '0 0% 8%');
      root.style.setProperty('--text-primary', '0 0% 95%');
      root.style.setProperty('--text-secondary', '0 0% 70%');
      root.style.setProperty('--border', '0 0% 15%');
      root.style.setProperty('--nav-bg', '0 0% 8%');
      root.style.setProperty('--card-bg', '0 0% 10%');
    } else {
      // Light mode colors
      Object.entries(colors).forEach(([key, value]) => {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        root.style.setProperty(`--${cssKey}`, value);
      });
      
      // Reset other colors to light mode
      root.style.setProperty('--text-primary', '120 60% 12%');
      root.style.setProperty('--text-secondary', '100 25% 35%');
      root.style.setProperty('--border', '120 25% 85%');
      root.style.setProperty('--nav-bg', '0 0% 100%');
      root.style.setProperty('--card-bg', '0 0% 100%');
    }

    // Save to localStorage
    localStorage.setItem('theme-color', themeColor);
    localStorage.setItem('dark-mode', isDarkMode.toString());
  }, [themeColor, isDarkMode]);

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor, isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};