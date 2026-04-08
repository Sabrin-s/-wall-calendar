"use client";
import DayCell from "./DayCell";
import { toKey, holidayKey, todayKey } from "../lib/utils";
import { DAYS_SHORT, US_HOLIDAYS } from "../lib/constants";

export default function CalendarGrid({
  year, month, cells,
  getDayState, setHoverKey,
  handleDayClick, theme,
  showHolidays, hasNote,
}) {
  const today = todayKey();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {/* Day-of-week headers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          marginBottom: 4,
        }}
      >
        {DAYS_SHORT.map((d, i) => {
          const isWknd = i === 0 || i === 6;
          return (
            <div
              key={d}
              style={{
                textAlign: "center",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 11,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: isWknd ? theme.weekendColor : theme.ink,
                opacity: isWknd ? 0.75 : 0.4,
                paddingBottom: 8,
              }}
            >
              {d}
            </div>
          );
        })}
      </div>

      {/* Day cells */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "1px 0",
        }}
      >
        {cells.map((day, idx) => {
          if (!day) return <div key={`empty-${idx}`} />;

          const key        = toKey(year, month, day);
          const state      = getDayState(day);
          const isToday    = key === today;
          const col        = idx % 7;
          const isWeekend  = col === 0 || col === 6;
          const hKey       = holidayKey(month, day);
          const isHoliday  = showHolidays && Boolean(US_HOLIDAYS[hKey]);
          const hName      = isHoliday ? US_HOLIDAYS[hKey] : null;
          const noteExists = hasNote(`day::${key}`);

          return (
            <DayCell
              key={day}
              day={day}
              state={state}
              isToday={isToday}
              isWeekend={isWeekend}
              isHoliday={isHoliday}
              holidayName={hName}
              hasNote={noteExists}
              theme={theme}
              onMouseEnter={() => setHoverKey(key)}
              onMouseLeave={() => setHoverKey(null)}
              onClick={() => handleDayClick(day)}
            />
          );
        })}
      </div>
    </div>
  );
}
