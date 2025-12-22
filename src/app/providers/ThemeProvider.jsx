"use client";
import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";

const ThemeContext = createContext({ theme: "light", setTheme: () => {} });

export function ThemeProvider({ defaultTheme = "light", children }) {
  const [theme, setThemeState] = useState(defaultTheme);
  const [mounted, setMounted] = useState(false);

  const applyThemeClass = useCallback((t) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.classList.remove("theme-light", "theme-dark", "theme-glass");
    root.classList.add(`theme-${t}`);
  }, []);

  useEffect(() => {
    let initial = defaultTheme;
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark" || stored === "glass") initial = stored;
    } catch {}
    setThemeState(initial);
    setMounted(true);
    applyThemeClass(initial);
  }, [applyThemeClass, defaultTheme]);

  const setTheme = useCallback((t) => {
    if (t !== "light" && t !== "dark" && t !== "glass") return;
    try { localStorage.setItem("theme", t); } catch {}
    setThemeState(t);
    applyThemeClass(t);
  }, [applyThemeClass]);

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  if (!mounted) return children;
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
