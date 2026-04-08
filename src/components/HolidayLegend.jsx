"use client";
import { US_HOLIDAYS } from "../lib/constants";

export default function HolidayLegend({ month, theme }) {
  const thisMonth = Object.entries(US_HOLIDAYS).filter(
    ([k]) => parseInt(k.split("-")[0], 10) === month + 1
  );

  if (thisMonth.length === 0) return null;

  return (
    <div
      style={{
        marginTop: 10,
        display: "flex",
        flexWrap: "wrap",
        gap: "6px 14px",
      }}
    >
      {thisMonth.map(([k, name]) => {
        const day = k.split("-")[1];
        return (
          <div
            key={k}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 11,
              color: theme.ink,
              opacity: 0.5,
            }}
          >
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: theme.accent,
                flexShrink: 0,
              }}
            />
            {name} <span style={{ opacity: 0.6 }}>({day})</span>
          </div>
        );
      })}
    </div>
  );
}
