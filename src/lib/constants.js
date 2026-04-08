export const MONTHS = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

export const DAYS_LONG = [
  "Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday",
];

export const DAYS_SHORT = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// Unsplash photos keyed by month index (0=Jan)
export const MONTH_IMAGES = {
  0:  {
    url: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=900&q=80",
    credit: "Filip Mroz",
    label: "January — Stillness",
  },
  1:  {
    url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=900&q=80",
    credit: "Annie Spratt",
    label: "February — Crimson",
  },
  2:  {
    url: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=900&q=80",
    credit: "Aaron Burden",
    label: "March — Blossoms",
  },
  3:  {
    url: "https://images.unsplash.com/photo-1490750967868-88df5691cc46?w=900&q=80",
    credit: "Annie Spratt",
    label: "April — Fields",
  },
  4:  {
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80",
    credit: "Ales Krivec",
    label: "May — Garden",
  },
  5:  {
    url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80",
    credit: "Ales Krivec",
    label: "June — Peaks",
  },
  6:  {
    url: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=900&q=80",
    credit: "Shifaaz Shamoon",
    label: "July — Waters",
  },
  7:  {
    url: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=900&q=80",
    credit: "Jared Erondu",
    label: "August — Heat",
  },
  8:  {
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80",
    credit: "Ales Krivec",
    label: "September — Harvest",
  },
  9:  {
    url: "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?w=900&q=80",
    credit: "James Wheeler",
    label: "October — Fire",
  },
  10: {
    url: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=900&q=80",
    credit: "Jonatan Pie",
    label: "November — Mist",
  },
  11: {
    url: "https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=900&q=80",
    credit: "Aaron Burden",
    label: "December — Snow",
  },
};

// US holidays: "M-D" → name
export const US_HOLIDAYS = {
  "1-1":   "New Year's Day",
  "1-15":  "MLK Jr. Day",
  "2-14":  "Valentine's Day",
  "2-19":  "Presidents' Day",
  "3-17":  "St. Patrick's Day",
  "4-22":  "Earth Day",
  "5-27":  "Memorial Day",
  "6-19":  "Juneteenth",
  "7-4":   "Independence Day",
  "9-2":   "Labor Day",
  "10-14": "Columbus Day",
  "10-31": "Halloween",
  "11-11": "Veterans Day",
  "11-28": "Thanksgiving",
  "12-25": "Christmas Day",
  "12-31": "New Year's Eve",
};

export const THEMES = {
  parchment: {
    name: "Parchment",
    emoji: "🍂",
    bg: "#f4ede0",
    surface: "#fdf8f0",
    ink: "#2d1f0e",
    accent: "#b85c2c",
    muted: "#e8dcc8",
    gridLine: "#d4c4a8",
    weekendColor: "#9b4520",
    surfaceAlpha: "rgba(253,248,240,0.92)",
  },
  obsidian: {
    name: "Obsidian",
    emoji: "🌑",
    bg: "#0d0f14",
    surface: "#161921",
    ink: "#e8eaf2",
    accent: "#6eb5ff",
    muted: "#1e2230",
    gridLine: "#2a2f3f",
    weekendColor: "#6eb5ff",
    surfaceAlpha: "rgba(22,25,33,0.92)",
  },
  sage: {
    name: "Sage",
    emoji: "🌿",
    bg: "#1a2420",
    surface: "#1f2e29",
    ink: "#d4e8d8",
    accent: "#5dbf78",
    muted: "#263830",
    gridLine: "#304840",
    weekendColor: "#5dbf78",
    surfaceAlpha: "rgba(31,46,41,0.92)",
  },
  blush: {
    name: "Blush",
    emoji: "🌸",
    bg: "#f8edf0",
    surface: "#fff5f7",
    ink: "#3a1525",
    accent: "#c94472",
    muted: "#f0d8e0",
    gridLine: "#e4c0cc",
    weekendColor: "#a8305c",
    surfaceAlpha: "rgba(255,245,247,0.92)",
  },
};
