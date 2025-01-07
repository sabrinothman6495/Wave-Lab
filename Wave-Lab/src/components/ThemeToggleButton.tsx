import React from "react";
import { useTheme } from "./ThemeContext";

const ThemeToggleButton: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="theme-toggle-btn">
      {isDarkMode ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggleButton;

