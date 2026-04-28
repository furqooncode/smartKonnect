import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DarkColors, LightColors } from '../theme.tsx';

interface ThemeContextType {
  Toggle: () => void;
  isdarkMode: boolean;
  colors: typeof DarkColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isdarkMode, setisdarkMode] = useState<boolean>(false);
  const colors = isdarkMode ? DarkColors : LightColors;

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const mode = saved === 'dark';
    setisdarkMode(mode);
  }, []);

  function Toggle(): void {
    setisdarkMode((prev) => {
      const Newmode = !prev;
      localStorage.setItem('theme', Newmode ? 'dark' : 'light');
      return Newmode;
    });
  }

  return (
    <ThemeContext.Provider value={{ Toggle, isdarkMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}