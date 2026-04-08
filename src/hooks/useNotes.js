"use client";
import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "wall-calendar-notes-v1";

/**
 * Persists notes to localStorage keyed by date/range strings.
 * Shape: { [noteKey: string]: string }
 */
export function useNotes() {
  const [notes, setNotes] = useState({});
  const [hydrated, setHydrated] = useState(false);

  // Load on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setNotes(JSON.parse(raw));
    } catch {
      // ignore parse errors
    }
    setHydrated(true);
  }, []);

  // Persist on every change
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {
      // ignore quota errors
    }
  }, [notes, hydrated]);

  const setNote = useCallback((key, value) => {
    setNotes((prev) => ({ ...prev, [key]: value }));
  }, []);

  const deleteNote = useCallback((key) => {
    setNotes((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const getNote = useCallback((key) => notes[key] ?? "", [notes]);

  const hasNote = useCallback((key) => Boolean(notes[key]?.trim()), [notes]);

  return { notes, setNote, deleteNote, getNote, hasNote, hydrated };
}
