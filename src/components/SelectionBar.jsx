"use client";
import { shortDate, daysBetween } from "../lib/utils";
import { MONTHS, US_HOLIDAYS } from "../lib/constants";

export default function SelectionBar({ rangeStart, rangeEnd, selecting, theme, onClear }) {
  if (!rangeStart && !selecting) return null;

  const renderContent = () => {
    if (selecting) {
      return (
        <span
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 13,
            fontStyle: "italic",
            color: theme.accent,
            animation: "pulse 1.4s ease-in-out infinite",
          }}
        >
          ↗ Click a second date to set your range
        </span>
      );
    }

    if (rangeStart && rangeEnd) {
      const days = daysBetween(rangeStart, rangeEnd);
      return (
        <span
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 13,
            color: theme.ink,
            opacity: 0.75,
          }}
        >
          <strong style={{ color: theme.accent, opacity: 1 }}>{shortDate(rangeStart)}</strong>
          {" → "}
          <strong style={{ color: theme.accent, opacity: 1 }}>{shortDate(rangeEnd)}</strong>
          {" — "}
          {days} day{days !== 1 ? "s" : ""} selected
        </span>
      );
    }

    if (rangeStart) {
      return (
        <span
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 13,
            color: theme.ink,
            opacity: 0.75,
          }}
        >
          <strong style={{ color: theme.accent, opacity: 1 }}>{shortDate(rangeStart)}</strong>
          {" selected"}
        </span>
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "7px 24px",
        background: theme.muted,
        borderBottom: `1px solid ${theme.gridLine}`,
        minHeight: 36,
        gap: 8,
      }}
    >
      <div>{renderContent()}</div>
      {(rangeStart || rangeEnd) && (
        <button
          onClick={onClear}
          style={{
            background: "none",
            border: "none",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 12,
            color: theme.ink,
            opacity: 0.45,
            cursor: "pointer",
            padding: "2px 6px",
          }}
        >
          Clear ✕
        </button>
      )}
    </div>
  );
}
