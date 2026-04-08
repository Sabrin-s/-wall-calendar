"use client";
import { useEffect, useRef, useState } from "react";
import { MONTHS } from "../lib/constants";
import { shortDate, daysBetween, fromKey } from "../lib/utils";

function noteTitle(activeNoteKey, year, month, rangeStart, rangeEnd) {
  if (!activeNoteKey) return `Notes — ${MONTHS[month]} ${year}`;
  if (activeNoteKey.startsWith("month::")) return `${MONTHS[month]} ${year} — Monthly Notes`;
  if (activeNoteKey.startsWith("day::")) {
    const key = activeNoteKey.replace("day::", "");
    return `Note for ${shortDate(key)}`;
  }
  if (activeNoteKey.startsWith("range::")) {
    const [, s, e] = activeNoteKey.split("::");
    const days = daysBetween(s, e);
    return `${shortDate(s)} → ${shortDate(e)} (${days} day${days !== 1 ? "s" : ""})`;
  }
  return "Notes";
}

export default function NotesPanel({
  activeNoteKey,
  getNote, setNote, deleteNote,
  year, month,
  rangeStart, rangeEnd,
  theme,
  onClearSelection,
}) {
  const [draft, setDraft] = useState("");
  const [saved, setSaved] = useState(false);
  const textareaRef = useRef(null);
  const prevKeyRef = useRef(null);

  // Load note when key changes
  useEffect(() => {
    if (prevKeyRef.current !== activeNoteKey) {
      setDraft(getNote(activeNoteKey));
      setSaved(false);
      prevKeyRef.current = activeNoteKey;
    }
  }, [activeNoteKey, getNote]);

  const handleSave = () => {
    if (draft.trim()) {
      setNote(activeNoteKey, draft);
    } else {
      deleteNote(activeNoteKey);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  const handleKeyDown = (e) => {
    // Ctrl/Cmd+Enter to save
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }
  };

  const title = noteTitle(activeNoteKey, year, month, rangeStart, rangeEnd);
  const isRange = activeNoteKey?.startsWith("range::");
  const isDay   = activeNoteKey?.startsWith("day::");
  const charCount = draft.length;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "20px 22px",
        background: theme.muted,
        borderTop: `1px solid ${theme.gridLine}`,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 14,
          gap: 8,
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 13,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: theme.ink,
              opacity: 0.45,
            }}
          >
            {isRange ? "Range Note" : isDay ? "Day Note" : "Monthly Memo"}
          </p>
          <p
            style={{
              margin: "3px 0 0",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 16,
              fontStyle: "italic",
              color: theme.ink,
              lineHeight: 1.3,
            }}
          >
            {title}
          </p>
        </div>

        {(rangeStart || (isDay && activeNoteKey)) && (
          <button
            onClick={onClearSelection}
            style={{
              background: "none",
              border: `1px solid ${theme.gridLine}`,
              borderRadius: 6,
              padding: "4px 10px",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 12,
              color: theme.ink,
              opacity: 0.55,
              cursor: "pointer",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            ✕ Clear
          </button>
        )}
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={draft}
        onChange={(e) => { setDraft(e.target.value); setSaved(false); }}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        placeholder={
          isRange
            ? "Notes for this date range…"
            : isDay
            ? "Jot something for this day…"
            : `Anything to remember about ${MONTHS[month]}…`
        }
        style={{
          flex: 1,
          resize: "none",
          background: theme.surface,
          border: `1px solid ${theme.gridLine}`,
          borderRadius: 8,
          padding: "14px 16px",
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 15,
          lineHeight: 1.7,
          color: theme.ink,
          caretColor: theme.accent,
          outline: "none",
          minHeight: 80,
          transition: "border-color 0.15s",
        }}
        onFocus={(e) => { e.target.style.borderColor = theme.accent; }}
        onBlurCapture={(e) => { e.target.style.borderColor = theme.gridLine; }}
      />

      {/* Footer row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 12,
            color: theme.ink,
            opacity: 0.35,
            fontStyle: "italic",
          }}
        >
          {charCount > 0 ? `${charCount} chars · ⌘↵ to save` : "Auto-saves on blur"}
        </span>

        <button
          onClick={handleSave}
          style={{
            background: saved ? theme.muted : theme.accent,
            color: saved ? theme.ink : theme.surface,
            border: "none",
            borderRadius: 20,
            padding: "6px 18px",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 13,
            letterSpacing: "0.5px",
            cursor: "pointer",
            transition: "background 0.2s, color 0.2s",
            opacity: saved ? 0.7 : 1,
          }}
        >
          {saved ? "Saved ✓" : "Save"}
        </button>
      </div>
    </div>
  );
}
