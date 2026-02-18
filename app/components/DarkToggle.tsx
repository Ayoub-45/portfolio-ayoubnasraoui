"use client";

import { createContext, useContext, useEffect, useState } from "react";

// ─── Theme Context ───────────────────────────────────────────────────────────

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
}>({ theme: "light", toggle: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

// ─── Provider ────────────────────────────────────────────────────────────────
// Wrap your root layout's <body> with this.

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  // On mount: read saved preference or system preference
  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ─── Toggle Button ───────────────────────────────────────────────────────────
// Drop this anywhere — e.g. inside your <Navbar />.

export default function DarkModeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        width: 44,
        height: 24,
        borderRadius: 999,
        border: "1.5px solid var(--border)",
        background: isDark ? "var(--accent)" : "var(--bg)",
        cursor: "pointer",
        transition: "background 0.25s, border-color 0.25s",
        flexShrink: 0,
        padding: 0,
      }}
    >
      {/* Sliding knob */}
      <span
        style={{
          position: "absolute",
          top: 2,
          left: isDark ? 20 : 2,
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: isDark ? "#fff" : "var(--accent)",
          boxShadow: "0 1px 4px rgba(0,0,0,0.18)",
          transition: "left 0.25s cubic-bezier(.4,0,.2,1), background 0.25s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Icon inside knob */}
        {isDark ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  );
}

function SunIcon() {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--accent)"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}