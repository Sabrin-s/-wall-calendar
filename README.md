# Wall Calendar-Interactive Component

A wall calendar that feels like a real one.
Built for the Frontend Engineering Challenge.

## Run It

git clone https://github.com/Sabrin-s/-wall-calendar.git
cd wall-calendar && npm install && npm run dev
→ http://localhost:3000

## What I Built & Why

### Wall Calendar Aesthetic
The design leads with a full-width hero image 
paired with each month the same way a physical 
calendar uses photography to mark time. Binding 
holes, Cormorant Garamond serif type, and soft 
paper textures complete the feel.

### Date Range Selection
Two-click selection: first click sets start, 
second sets end. Hover preview shows the 
potential range before committing. 
Visual states: start circle, end circle, 
filled band in between, today ring.
Selection bar shows the range and day count.

### Notes
Three contexts because real planning needs them:
- Day note: "dentist at 3pm"
- Range note: "vacation, pack light"  
- Month note: general monthly memo
All saved to localStorage. Dot indicators 
on days that have notes.

### Responsive
Desktop: image + calendar side by side.
Mobile: stacks vertically, touch-friendly tap targets.

### Extras That Add Polish
- Page-flip perspective animation between months
- 4 themes: Parchment, Obsidian, Sage, Blush
- Keyboard shortcuts: ← → T Esc
- US holiday markers with per-month legend

## Tech
Next.js 14 · React 18 · CSS Modules
No UI library. No backend. No external state manager.
