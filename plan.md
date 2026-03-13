# Homepage Development Plan — v1.x → v2.0

## Overview

Iterative development from v1.0 to v2.0. Each version adds one major feature or improvement, tested before moving on.

---

## Development Philosophy

- **Iterative approach**: Each version adds one major feature or improvement
- **Test as we go**: Verify functionality before moving to next version
- **Maintain stability**: Keep the homepage usable throughout development
- **Preserve performance**: Fast load times, local-first approach
- **Clean commits**: Each version gets its own commit and optional tag

---

## Version Roadmap

### ✅ v1.0 — Foundation (Completed)
- Glass morphism design, 5 themes, live NZ clock and weather, UC academic calendar, daily quotes, quick links, radial theme switcher

### ✅ v1.1 — Quote System Overhaul (Completed)
- Zen theme added, quotes migrated to YAML, theme-aware random quotes

### ✅ v1.2 — Link Manager (Completed)
- Searchable collapsible link browser, 4 categories, 30+ links

### ✅ v1.3 — Data Migration to YAML (Completed)
- Links migrated from `links.js` to `links.yaml`, calendar migrated to `calendar.yaml`

### ✅ v1.4 — Dictionary Feature (Completed)
- Inline dictionary via Free Dictionary API, spelling suggestions via Datamuse, `Option+D` shortcut

### ✅ v1.5 — Branding & Polish (Completed)
- SL monogram SVG favicon, dynamic per-theme page titles, consistent theme-switcher button styling, CSS/doc cleanup

### ✅ v1.6 — Layout Refinements (Completed)
- Split header into separate info (clock/date/weather) and greeting (message/quote) cards
- Resized clock to medium scale; date and weather now similar size, weather stacked under date
- Section headings centred and enlarged; emojis removed from Dictionary and Calendar titles
- Links toggle moved inline with search input
- Quote text centred; Discworld quotes attributed with book titles

### 🚧 v1.7 — Links Simplification (In Progress)
- Flattened `links.yaml` from 4 categories to a single deduplicated list (34 links)
- Simplified `loadLinksFromYAML()` and `renderAllLinks()` accordingly
- Removed dead code: `renderLinkSection`, old `renderAllLinks`, `buildLinkItem`, `faviconURL`
- Revised quotes to better fit study and general motivation goals
- Revised links to more personal use cases
- Revised theme titles
---

### 📋 v1.8 — Calendar Revision
**Goal**: Keep the academic calendar accurate and useful.

**Implementation**:
- Update `calendar.yaml` with new semester dates, assignments, and placements as they're confirmed
- Review and update `MTL_START` / `MTL_END` constants in `script.js` if the programme span changes
- Consider adding more granular event types or icons as needed

---

### 📋 v1.9 — Smooth Transitions
**Goal**: Add CSS animations to make interactions feel polished.

**Implementation**:
- Links list: animate expand/collapse (max-height transition instead of `hidden` toggle)
- Dictionary results: fade in when results appear
- Quote change on theme switch: crossfade between old and new quote
- Calendar events: staggered fade-in on load

**Notes**:
- Pure CSS where possible; JS only needed for the hidden → visible transition trick
- Respect `prefers-reduced-motion` (already have a media query in CSS — extend it)

---

### 📋 v1.10 — Two-Column Desktop Layout
**Goal**: Reorganise the page into a two-column grid on wide screens.

**Proposed layout**:
```
┌─────────────────┬─────────────────┐
│   Info block    │   Links         │
│   (clock etc.)  │                 │
├─────────────────┤                 │
│   Greeting      ├─────────────────┤
│   (quote etc.)  │   Dictionary    │
└─────────────────┴─────────────────┘
│         Academic Calendar         │
└───────────────────────────────────┘
```

**Implementation**:
- Use CSS Grid on `.page-wrapper` at a breakpoint (~900px+)
- Left column: `info-block` + `greeting-block` (stacked)
- Right column: `link-browser` + `dictionary-section` (stacked)
- Calendar: `grid-column: 1 / -1` (full width below)
- Mobile: single column as now (no change below breakpoint)

**Notes**:
- Grid approach is cleaner than flexbox for this layout
- Consider whether to-do widget (v2.0) goes in left or right column

---

### 📋 v2.0 — To-Do Widget + Release
**Goal**: Add a lightweight daily task list, then release as v2.0.

**To-Do Widget**:
- Simple list of tasks persisted to `localStorage`
- Add task (Enter to submit), tick off, delete
- Tasks reset daily (keyed by NZ date string)
- Fits naturally in the left column below the greeting card
- No external dependencies — pure JS + CSS

**Release checklist**:
- [ ] All features implemented and tested
- [ ] No console errors
- [ ] Mobile fully responsive
- [ ] README updated
- [ ] CHANGELOG created
- [ ] Git tag: `git tag -a v2.0 -m "Version 2.0"`
- [ ] GitHub release with notes

---

## Post v2.0 Ideas

- **More quote themes** — expand each theme beyond current count
- **Pomodoro timer** — 25/5 focus timer widget
- **Universal search shortcut** — `Option+/` to open browser search
- **RSS feed** — pull in a feed (e.g. Hacker News, NZ news)
- **Custom theme creator**

---

## Development Guidelines

- Keep functions focused and single-purpose
- One feature per commit with descriptive message
- Push regularly to GitHub
- Update this plan as priorities shift

---

**Last Updated**: March 2026 (v1.7 in progress)
**Maintainer**: Samuel Love
**Repository**: https://github.com/tatoslover/homepage
