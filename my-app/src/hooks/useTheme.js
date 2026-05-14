import { useEffect } from "react";

import useLocalStorage from "./useLocalStorage";
import useToggle from "./useToggle";

export default function useTheme() {
  // Theme Persistence
  const [theme, setTheme] = useLocalStorage("theme", "light");

  // Boolean Theme State
  const [isDark, toggleTheme] = useToggle(theme === "dark");

  // Sync Theme
  useEffect(() => {
    const newTheme = isDark ? "dark" : "light";

    setTheme(newTheme);

    // Apply To HTML
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark, setTheme]);

  return {
    isDark,
    toggleTheme,
  };
}
