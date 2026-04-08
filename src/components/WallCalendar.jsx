"use client";
import { useState, useEffect, useCallback } from "react";
import { useCalendar }    from "../hooks/useCalendar";
import { useNotes }       from "../hooks/useNotes";
import { useTheme }       from "../hooks/useTheme";
import HeroImage          from "./HeroImage";
import CalendarGrid       from "./CalendarGrid";
import NotesPanel         from "./NotesPanel";
import ThemePicker        from "./ThemePicker";
import SelectionBar       from "./SelectionBar";
import HolidayLegend      from "./HolidayLegend";
import { MONTHS }         from "../lib/constants";

const BINDING_HOLES = 3;

export default function WallCalendar() {
  const today       = new Date();
  const { themeKey, theme, setTheme } = useTheme();
  const { getNote, setNote, deleteNote, hasNote } = useNotes();
  const [showHolidays, setShowHolidays] = useState(true);
  const [flipKey, setFlipKey]           = useState(0);
  const [flipDir, setFlipDir]           = useState("next");

  const {
    year, month, cells,
    rangeStart, rangeEnd, selecting,
    hoverKey, setHoverKey,
    getDayState, activeNoteKey,
    handleDayClick, clearSelection,
    goNextMonth, goPrevMonth, goToday,
  } = useCalendar(today.getFullYear(), today.getMonth());

  const handleNext = useCallback(() => {
    setFlipDir("next"); setFlipKey((k) => k + 1); goNextMonth();
  }, [goNextMonth]);

  const handlePrev = useCallback(() => {
    setFlipDir("prev"); setFlipKey((k) => k + 1); goPrevMonth();
  }, [goPrevMonth]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === "TEXTAREA") return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft")  handlePrev();
      if (e.key === "Escape")     clearSelection();
      if (e.key === "t" || e.key === "T") goToday();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleNext, handlePrev, clearSelection, goToday]);

  const cardStyle = {
    width: "100%",
    maxWidth: 1020,
    background: theme.surface,
    borderRadius: 16,
    boxShadow: `0 16px 70px rgba(0,0,0,0.2), 0 2px 10px rgba(0,0,0,0.1)`,
    border: `1px solid ${theme.gridLine}`,
    overflow: "hidden",
    transition: "background 0.35s ease, border-color 0.35s ease",
    animation: `calFlip${flipDir} 0.35s cubic-bezier(.4,0,.2,1) both`,
  };

  return (
    <>
      {/* Global styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes calFlipnext {
          from { transform: perspective(1400px) rotateX(-10deg) translateY(10px); opacity: 0; }
          to   { transform: perspective(1400px) rotateX(0deg)   translateY(0);    opacity: 1; }
        }
        @keyframes calFlipprev {
          from { transform: perspective(1400px) rotateX(10deg)  translateY(-8px); opacity: 0; }
          to   { transform: perspective(1400px) rotateX(0deg)   translateY(0);    opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }

        .day-btn:hover > div:first-child {
          transform: scale(1.12);
          filter: brightness(1.08);
        }
        .nav-btn:hover { opacity: 0.6 !important; }
        .control-btn:hover { opacity: 0.7 !important; }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: rgba(128,128,128,0.25); border-radius: 4px; }

        @media (max-width: 680px) {
          .calendar-layout { flex-direction: column !important; }
          .hero-panel { width: 100% !important; height: 240px !important; }
          .right-panel { min-height: 0 !important; }
        }
      `}</style>

      {/* Page wrapper */}
      <div
        style={{
          minHeight: "100vh",
          background: theme.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "28px 16px",
          transition: "background 0.35s ease",
          fontFamily: "'Cormorant Garamond', Georgia, serif",
        }}
      >
        {/* Card */}
        <div key={flipKey} style={cardStyle}>

          {/* ── TOP BAR: binding holes + controls ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 22px",
              borderBottom: `1px solid ${theme.gridLine}`,
              background: theme.surface,
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            {/* Binding holes */}
            <div style={{ display: "flex", gap: 24 }}>
              {Array.from({ length: BINDING_HOLES }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 16, height: 16, borderRadius: "50%",
                    background: theme.bg,
                    border: `2px solid ${theme.gridLine}`,
                    boxShadow: `inset 0 1px 4px rgba(0,0,0,0.2)`,
                  }}
                />
              ))}
            </div>

            {/* Right controls */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <ThemePicker themeKey={themeKey} setTheme={setTheme} theme={theme} />

              <button
                onClick={() => setShowHolidays((v) => !v)}
                className="control-btn"
                style={{
                  padding: "4px 12px",
                  borderRadius: 20,
                  border: `1px solid ${theme.gridLine}`,
                  background: showHolidays ? theme.accent : "transparent",
                  color: showHolidays ? theme.surface : theme.ink,
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 12,
                  letterSpacing: "1px",
                  cursor: "pointer",
                  opacity: 0.9,
                  transition: "all 0.2s",
                }}
              >
                Holidays
              </button>

              <button
                onClick={goToday}
                className="control-btn"
                style={{
                  padding: "4px 12px",
                  borderRadius: 20,
                  border: `1px solid ${theme.gridLine}`,
                  background: "transparent",
                  color: theme.ink,
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 12,
                  letterSpacing: "1px",
                  cursor: "pointer",
                  opacity: 0.6,
                  transition: "opacity 0.15s",
                }}
              >
                Today
              </button>
            </div>
          </div>

          {/* ── MAIN LAYOUT ── */}
          <div
            className="calendar-layout"
            style={{ display: "flex", minHeight: 520 }}
          >
            {/* Hero image panel */}
            <div
              className="hero-panel"
              style={{ width: 300, flexShrink: 0 }}
            >
              <HeroImage month={month} year={year} theme={theme} />
            </div>

            {/* Right panel */}
            <div
              className="right-panel"
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                borderLeft: `1px solid ${theme.gridLine}`,
                minWidth: 0,
              }}
            >
              {/* Month navigation */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 24px",
                  borderBottom: `1px solid ${theme.gridLine}`,
                }}
              >
                <button
                  onClick={handlePrev}
                  className="nav-btn"
                  aria-label="Previous month"
                  style={{
                    width: 38, height: 38, borderRadius: "50%",
                    background: theme.muted,
                    border: `1px solid ${theme.gridLine}`,
                    color: theme.ink, fontSize: 20,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", opacity: 0.85,
                    transition: "opacity 0.15s",
                    fontFamily: "Georgia, serif",
                  }}
                >
                  ‹
                </button>

                <div style={{ textAlign: "center" }}>
                  <h2
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: "clamp(20px, 2.5vw, 26px)",
                      fontWeight: 700,
                      color: theme.ink,
                      letterSpacing: "-0.3px",
                    }}
                  >
                    {MONTHS[month]} {year}
                  </h2>
                </div>

                <button
                  onClick={handleNext}
                  className="nav-btn"
                  aria-label="Next month"
                  style={{
                    width: 38, height: 38, borderRadius: "50%",
                    background: theme.muted,
                    border: `1px solid ${theme.gridLine}`,
                    color: theme.ink, fontSize: 20,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", opacity: 0.85,
                    transition: "opacity 0.15s",
                    fontFamily: "Georgia, serif",
                  }}
                >
                  ›
                </button>
              </div>

              {/* Selection status bar */}
              <SelectionBar
                rangeStart={rangeStart}
                rangeEnd={rangeEnd}
                selecting={selecting}
                theme={theme}
                onClear={clearSelection}
              />

              {/* Calendar grid */}
              <div style={{ padding: "14px 22px 10px", flex: 1 }}>
                <CalendarGrid
                  year={year}
                  month={month}
                  cells={cells}
                  getDayState={getDayState}
                  setHoverKey={setHoverKey}
                  handleDayClick={handleDayClick}
                  theme={theme}
                  showHolidays={showHolidays}
                  hasNote={hasNote}
                />

                {/* Holiday legend */}
                {showHolidays && (
                  <HolidayLegend month={month} theme={theme} />
                )}
              </div>

              {/* Notes section */}
              <NotesPanel
                activeNoteKey={activeNoteKey}
                getNote={getNote}
                setNote={setNote}
                deleteNote={deleteNote}
                year={year}
                month={month}
                rangeStart={rangeStart}
                rangeEnd={rangeEnd}
                theme={theme}
                onClearSelection={clearSelection}
              />
            </div>
          </div>

          {/* ── FOOTER ── */}
          <div
            style={{
              borderTop: `1px solid ${theme.gridLine}`,
              padding: "8px 22px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: theme.surface,
              flexWrap: "wrap",
              gap: 6,
            }}
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 11,
                color: theme.ink,
                opacity: 0.35,
                letterSpacing: "0.5px",
              }}
            >
              {today.toLocaleDateString("en-US", {
                weekday: "long", year: "numeric", month: "long", day: "numeric",
              })}
            </span>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 11,
                color: theme.ink,
                opacity: 0.3,
                fontStyle: "italic",
              }}
            >
              ← → navigate · T jump to today · Esc clear
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
