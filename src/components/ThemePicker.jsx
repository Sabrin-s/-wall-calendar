"use client";
import { THEMES } from "../lib/constants";

export default function ThemePicker({ themeKey, setTheme, theme }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 11,
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: theme.ink,
          opacity: 0.4,
        }}
      >
        Theme
      </span>
      {Object.entries(THEMES).map(([key, t]) => (
        <button
          key={key}
          title={t.name}
          onClick={() => setTheme(key)}
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: t.accent,
            border: themeKey === key
              ? `3px solid ${theme.ink}`
              : "3px solid transparent",
            cursor: "pointer",
            outline: "none",
            transition: "transform 0.15s, border 0.15s",
            transform: themeKey === key ? "scale(1.15)" : "scale(1)",
            flexShrink: 0,
          }}
          aria-label={`Switch to ${t.name} theme`}
          aria-pressed={themeKey === key}
        />
      ))}
    </div>
  );
}
