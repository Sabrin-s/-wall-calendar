"use client";
import { useState, useCallback, useMemo } from "react";
import {
  toKey, isBetween, compareKeys, daysInMonth, firstWeekdayOfMonth,
} from "../lib/utils";

/**
 * Manages month navigation, date-range selection, and hover state.
 */
export function useCalendar(initialYear, initialMonth) {
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [rangeStart, setRangeStart] = useState(null);   // key or null
  const [rangeEnd, setRangeEnd] = useState(null);         // key or null
  const [selecting, setSelecting] = useState(false);     // awaiting end click
  const [hoverKey, setHoverKey] = useState(null);

  // Navigate months with optional flip direction
  const goNextMonth = useCallback(() => {
    setRangeStart(null); setRangeEnd(null); setSelecting(false);
    if (month === 11) { setMonth(0); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
  }, [month]);

  const goPrevMonth = useCallback(() => {
    setRangeStart(null); setRangeEnd(null); setSelecting(false);
    if (month === 0) { setMonth(11); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
  }, [month]);

  const goToday = useCallback(() => {
    const n = new Date();
    setYear(n.getFullYear()); setMonth(n.getMonth());
    setRangeStart(null); setRangeEnd(null); setSelecting(false);
  }, []);

  // Handle day click: two-click range selection
  const handleDayClick = useCallback((day) => {
    const key = toKey(year, month, day);

    if (!selecting) {
      // First click — set start, begin range
      setRangeStart(key);
      setRangeEnd(null);
      setSelecting(true);
    } else {
      // Second click — finalise range
      if (key === rangeStart) {
        // Clicking same day: single-day selection, not a range
        setRangeEnd(null);
        setSelecting(false);
        return;
      }
      // Ensure start <= end
      if (compareKeys(key, rangeStart) < 0) {
        setRangeEnd(rangeStart);
        setRangeStart(key);
      } else {
        setRangeEnd(key);
      }
      setSelecting(false);
    }
  }, [selecting, rangeStart, year, month]);

  const clearSelection = useCallback(() => {
    setRangeStart(null); setRangeEnd(null); setSelecting(false);
  }, []);

  // Derive day state for rendering
  const getDayState = useCallback((day) => {
    const key = toKey(year, month, day);
    if (key === rangeStart && !rangeEnd) return "single";
    if (key === rangeStart)              return "start";
    if (key === rangeEnd)               return "end";
    if (rangeStart && rangeEnd && isBetween(key, rangeStart, rangeEnd)) return "between";

    // Live hover preview while selecting
    if (selecting && rangeStart && hoverKey) {
      const previewStart = compareKeys(hoverKey, rangeStart) < 0 ? hoverKey : rangeStart;
      const previewEnd   = compareKeys(hoverKey, rangeStart) < 0 ? rangeStart : hoverKey;
      if (key === previewStart) return "previewStart";
      if (key === previewEnd)   return "previewEnd";
      if (isBetween(key, previewStart, previewEnd)) return "previewBetween";
    }

    return "default";
  }, [year, month, rangeStart, rangeEnd, selecting, hoverKey]);

  // The active note key — range, single day, or month
  const activeNoteKey = useMemo(() => {
    if (rangeStart && rangeEnd) return `range::${rangeStart}::${rangeEnd}`;
    if (rangeStart)             return `day::${rangeStart}`;
    return `month::${year}-${month + 1}`;
  }, [rangeStart, rangeEnd, year, month]);

  // Calendar cells (nulls = empty leading cells)
  const cells = useMemo(() => {
    const total = daysInMonth(year, month);
    const offset = firstWeekdayOfMonth(year, month);
    const arr = Array(offset).fill(null);
    for (let d = 1; d <= total; d++) arr.push(d);
    return arr;
  }, [year, month]);

  return {
    year, month, cells,
    rangeStart, rangeEnd, selecting,
    hoverKey, setHoverKey,
    getDayState, activeNoteKey,
    handleDayClick, clearSelection,
    goNextMonth, goPrevMonth, goToday,
  };
}
