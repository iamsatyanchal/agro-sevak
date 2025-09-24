import React from 'react';
import { Check, Palette } from '@phosphor-icons/react';
import { useTheme, ThemeColor } from '../../contexts/ThemeContext';

const themeOptions: { color: ThemeColor; name: string; preview: string }[] = [
  { color: 'green', name: 'Forest Green', preview: '#2d7c2d' },
  { color: 'blue', name: 'Ocean Blue', preview: '#1e40af' },
  { color: 'purple', name: 'Royal Purple', preview: '#7c3aed' },
  { color: 'orange', name: 'Sunset Orange', preview: '#ea580c' },
  { color: 'red', name: 'Cherry Red', preview: '#dc2626' },
  { color: 'pink', name: 'Blossom Pink', preview: '#db2777' },
  { color: 'gray', name: 'Neutral Gray', preview: '#4b5563' },
  { color: 'slate', name: 'Cool Slate', preview: '#475569' },
];

export const ThemeChooser: React.FC = () => {
  const { themeColor, setThemeColor } = useTheme();

  return (
    <div className="bg-surface border border-card-border rounded-lg overflow-hidden">
      <div className="flex items-center gap-3 p-4 bg-gray-50 border-b border-card-border">
        <Palette size={20} className="text-primary" />
        <h3 className="font-semibold text-text-primary">Theme Colors</h3>
      </div>
      
      <div className="p-4">
        <p className="text-text-secondary text-sm mb-4">
          Choose your preferred color theme for the app
        </p>
        
        <div className="grid grid-cols-2 gap-3">
          {themeOptions.map((option) => (
            <button
              key={option.color}
              onClick={() => setThemeColor(option.color)}
              className={`
                relative flex items-center gap-3 p-3 rounded-lg border-2 transition-all
                ${themeColor === option.color 
                  ? 'border-primary bg-primary/5' 
                  : 'border-gray-200 hover:border-gray-300 bg-white'
                }
              `}
            >
              <div 
                className="w-6 h-6 rounded-full border-2 border-white shadow-sm flex items-center justify-center"
                style={{ backgroundColor: option.preview }}
              >
                {themeColor === option.color && (
                  <Check size={12} className="text-white" weight="bold" />
                )}
              </div>
              
              <div className="flex-1 text-left">
                <div className="font-medium text-text-primary text-sm">
                  {option.name}
                </div>
              </div>
            </button>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500 mt-0.5 flex-shrink-0"></div>
            <div>
              <p className="text-blue-800 text-sm font-medium">
                Preview Mode
              </p>
              <p className="text-blue-600 text-xs mt-1">
                Colors will apply instantly. Choose the one that feels right for your farming needs!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};