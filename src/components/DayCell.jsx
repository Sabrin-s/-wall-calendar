"use client";

const STATE_STYLES = (theme) => ({
  single: {
    inner: { background: theme.accent, color: theme.surface, fontWeight: 700, borderColor: theme.accent },
    wrap:  { background: "transparent" },
  },
  start: {
    inner: { background: theme.accent, color: theme.surface, fontWeight: 700, borderColor: theme.accent },
    wrap:  { background: theme.muted, borderRadius: "50% 0 0 50%" },
  },
  end: {
    inner: { background: theme.accent, color: theme.surface, fontWeight: 700, borderColor: theme.accent },
    wrap:  { background: theme.muted, borderRadius: "0 50% 50% 0" },
  },
  between: {
    inner: { background: "transparent", color: theme.ink, fontWeight: 400, borderColor: "transparent" },
    wrap:  { background: theme.muted },
  },
  previewStart: {
    inner: { background: theme.accent + "99", color: theme.surface, fontWeight: 600, borderColor: "transparent" },
    wrap:  { background: theme.muted + "77", borderRadius: "50% 0 0 50%" },
  },
  previewEnd: {
    inner: { background: theme.accent + "99", color: theme.surface, fontWeight: 600, borderColor: "transparent" },
    wrap:  { background: theme.muted + "77", borderRadius: "0 50% 50% 0" },
  },
  previewBetween: {
    inner: { background: "transparent", color: theme.ink, fontWeight: 400, borderColor: "transparent" },
    wrap:  { background: theme.muted + "77" },
  },
  default: {
    inner: { background: "transparent", color: theme.ink, fontWeight: 400, borderColor: "transparent" },
    wrap:  { background: "transparent" },
  },
});

export default function DayCell({
  day,
  state,
  isToday,
  isWeekend,
  isHoliday,
  holidayName,
  hasNote,
  theme,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) {
  const styles = STATE_STYLES(theme);
  const s = styles[state] ?? styles.default;

  const isSelected = ["single","start","end","between"].includes(state);
  const isHighlighted = state !== "default";

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      title={isHoliday ? holidayName : undefined}
      style={{
        ...s.wrap,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3px 0",
        cursor: "pointer",
        userSelect: "none",
        transition: "background 0.1s",
      }}
    >
      {/* Day number circle */}
      <div
        style={{
          ...s.inner,
          width: 36,
          height: 36,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 16,
          border: isToday && !isSelected
            ? `2px solid ${theme.accent}`
            : "2px solid transparent",
          color: s.inner.color ?? (isWeekend ? theme.weekendColor : theme.ink),
          transition: "background 0.12s, transform 0.1s",
        }}
      >
        {day}
      </div>

      {/* Holiday dot */}
      {isHoliday && (
        <div
          style={{
            position: "absolute",
            bottom: 3,
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: theme.accent,
            opacity: 0.7,
          }}
        />
      )}

      {/* Note indicator */}
      {hasNote && !isHoliday && (
        <div
          style={{
            position: "absolute",
            bottom: 3,
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: theme.accent,
            opacity: 0.45,
          }}
        />
      )}
    </div>
  );
}
