"use client";
import { useState, useEffect } from "react";
import { MONTH_IMAGES, MONTHS } from "../lib/constants";

export default function HeroImage({ month, year, theme }) {
  const img = MONTH_IMAGES[month];
  const [loaded, setLoaded] = useState(false);
  const [prevSrc, setPrevSrc] = useState(null);

  useEffect(() => {
    setLoaded(false);
    setPrevSrc(img.url);
  }, [img.url]);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        height: "100%",
        minHeight: 0,
        background: theme.muted,
        flexShrink: 0,
      }}
    >
      {/* Photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img.url}
        alt={img.label}
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      />

      {/* Gradient overlay — fades into panel below on mobile, right on desktop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(
              to bottom,
              transparent 45%,
              ${theme.surfaceAlpha} 100%
            )
          `,
          pointerEvents: "none",
        }}
      />

      {/* Month label sitting over image */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "24px 28px 20px",
        }}
      >
        <p
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 700,
            color: theme.ink,
            lineHeight: 1.05,
            margin: 0,
            letterSpacing: "-0.5px",
          }}
        >
          {MONTHS[month]}
        </p>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 13,
            color: theme.ink,
            opacity: 0.55,
            margin: "4px 0 0",
            letterSpacing: "3px",
            textTransform: "uppercase",
          }}
        >
          {year}
        </p>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 12,
            fontStyle: "italic",
            color: theme.accent,
            margin: "6px 0 0",
            opacity: 0.9,
          }}
        >
          {img.label}
        </p>
      </div>

      {/* Photo credit */}
      <p
        style={{
          position: "absolute",
          top: 12,
          right: 14,
          margin: 0,
          fontSize: 10,
          color: "#fff",
          opacity: 0.45,
          fontFamily: "Georgia, serif",
          letterSpacing: "0.5px",
          textShadow: "0 1px 3px rgba(0,0,0,0.6)",
        }}
      >
        Photo: {img.credit} / Unsplash
      </p>
    </div>
  );
}
