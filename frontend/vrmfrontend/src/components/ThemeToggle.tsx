import { useEffect, useState } from "react";

function getInitialTheme() {
  // 1) saved preference
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") return saved;

  // 2) OS preference
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement; // <html>
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-md border  px-3 py-2 shadow-sm  hover:ring-2 hover:ring-[hsl(var(--ring))] hover:ring-offset-2 " 
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
    >
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
