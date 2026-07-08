import { createContext, useContext, useEffect, useState } from 'react';
import { theme as antdTheme } from 'antd';

const ThemeContext = createContext(null);

const sharedFont =
  "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

export const antdThemeConfig = {
  light: {
    algorithm: antdTheme.defaultAlgorithm,
    token: {
      colorPrimary: '#0a84ff',
      colorBgContainer: 'rgba(255, 255, 255, 0.55)',
      colorBgElevated: 'rgba(255, 255, 255, 0.92)',
      colorBgLayout: 'transparent',
      colorBorder: 'rgba(255, 255, 255, 0.65)',
      colorBorderSecondary: 'rgba(28, 28, 30, 0.08)',
      borderRadius: 14,
      fontFamily: sharedFont,
    },
  },
  dark: {
    algorithm: antdTheme.darkAlgorithm,
    token: {
      colorPrimary: '#409cff',
      colorBgContainer: 'rgba(30, 41, 59, 0.45)',
      colorBgElevated: 'rgba(30, 41, 59, 0.9)',
      colorBgLayout: 'transparent',
      colorBorder: 'rgba(255, 255, 255, 0.08)',
      colorBorderSecondary: 'rgba(255, 255, 255, 0.06)',
      borderRadius: 14,
      fontFamily: sharedFont,
    },
  },
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = window.localStorage.getItem('haupcar-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('haupcar-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}