import React, { createContext, useContext, useState, ReactNode } from 'react';
import { darkTheme } from './darkmode';
import { lightTheme } from './lightmode';

export type ThemeMode = 'light' | 'dark';

interface ThemeContextProps {
  mode: ThemeMode;
  theme: typeof darkTheme | typeof lightTheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>('light');
  const theme = mode === 'light' ? lightTheme : darkTheme;
  const toggleTheme = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ mode, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 