import React from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ theme, onToggle }) => (
  <button
    className="btn btn-link"
    onClick={onToggle}
    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
  >
    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
  </button>
);

export default ThemeToggle;