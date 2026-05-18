import { useEffect } from "react";

import useLocalStorage from "./useLocalStorage";
import useToggle from "./useToggle";

export default function useTheme() {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  const { value: isDark, toggle: toggleTheme } = useToggle(theme === "dark");

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");

      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");

      setTheme("light");
    }
  }, [isDark, setTheme]);

  return {
    isDark,
    toggleTheme,
  };
}
