"use client";
import { useState, useEffect } from "react";
import { THEMES } from "../lib/constants";

const STORAGE_KEY = "wall-calendar-theme-v1";

export function useTheme() {
  const [themeKey, setThemeKey] = useState("parchment");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && THEMES[saved]) setThemeKey(saved);
    } catch {}
  }, []);

  const setTheme = (key) => {
    setThemeKey(key);
    try { localStorage.setItem(STORAGE_KEY, key); } catch {}
  };

  return { themeKey, theme: THEMES[themeKey], setTheme };
}
