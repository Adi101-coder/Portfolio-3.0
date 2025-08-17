import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

// This component toggles between light and dark themes.
function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'dark' ? (
        <i className="fas fa-moon"></i>
      ) : (
        <i className="fas fa-sun"></i>
      )}
    </button>
  );
}

export default ThemeToggle; 