import { useEffect, useState } from "react";

export function useTheme() {
  // Initialize with a neutral state to avoid SSR mismatch
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // 1. Check Local Storage
    const savedTheme = localStorage.getItem("vrmm-theme") as "light" | "dark" | null;
    
    // 2. Check System Preference
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // Determine initial theme: Saved > System > Default (Light)
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("vrmm-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return { theme, setTheme, toggleTheme };
}