import { useState, useEffect } from 'react';
import { DEFAULT_THEME } from '../config/theme';

export const useTheme = () => {
  const [theme, setTheme] = useState(DEFAULT_THEME);

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'bg-dark' : 'bg-light';
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return { theme, toggleTheme };
};