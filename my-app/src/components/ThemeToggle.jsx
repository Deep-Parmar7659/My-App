import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="
        bg-gray-200 dark:bg-gray-700
        dark:text-white
        px-4 py-2 rounded-lg
        text-sm font-semibold
      "
    >
      {darkMode ? "🌞 Light" : "🌙 Dark"}
    </button>
  );
}
