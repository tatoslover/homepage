# Homepage Development Plan — v2.0+

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
- Glass morphism design, 6 themes, live NZ clock and weather, UC academic calendar, daily quotes, quick links, radial theme switcher

### ✅ v1.1 — Quote System Overhaul (Completed)
- Zen theme added, quotes migrated to YAML, theme-aware random quotes

### ✅ v1.2 — Link Manager (Completed)
- Searchable collapsible link browser, 4 categories, 30+ links

### ✅ v1.3 — Data Migration to YAML (Completed)
- Links migrated from `links.js` to `data/links.yaml`, calendar migrated to `data/calendar.yaml`

### ✅ v1.4 — Dictionary Feature (Completed)
- Inline dictionary via Free Dictionary API, spelling suggestions via Datamuse, `Option+D` shortcut

### ✅ v1.5 — Branding & Polish (Completed)
- SL monogram SVG favicon, dynamic per-theme page titles, consistent theme-switcher button styling, CSS/doc cleanup

### ✅ v1.6 — Layout Refinements (Completed)
- Split header into separate info (clock/date/weather) and greeting (message/quote) cards
- Resized clock to medium scale; date and weather now similar size
- Section headings centred; Links toggle moved inline with search input
- Quote text centred; Discworld quotes attributed with book titles

### ✅ v1.7 — Links Simplification (Completed)
- Flattened `links.yaml` from 4 categories to a single deduplicated list (34 links)
- Simplified `loadLinksFromYAML()` and `renderAllLinks()` accordingly
- Revised quotes to better fit study and general motivation goals

### ✅ v1.8 — Calendar Revision (Completed)
- Updated `calendar.yaml` with full 2026 MTchLgn programme: assignments, placements, NZ public holidays
- Progress bar spans Jan–Dec 2026; past events visible via scroll; auto-scrolls to first upcoming
- Two-column layout: Assignments left, Key Dates right (with icons)

### ✅ v1.9 — Smooth Transitions (Completed)
- Links expand/collapse with `max-height` CSS transition
- Dictionary results fade in on each search
- Quote crossfades on theme switch
- Calendar events stagger-fade on load
- All animations respect `prefers-reduced-motion`

### ✅ v1.10 — Two-Column Desktop Layout (Completed)
- CSS Grid at ≥900px: `col-left` and `col-right` flex column wrappers
- Equal-height cards via `flex: 1` on column children
- Calendar spans full width below

### ✅ v2.0 — Todo Widget + Timer + Polish (Completed)
- Daily task list (localStorage, keyed by NZ date, auto-resets each day) in left column
- Countdown timer with 25/10/5m presets in right column
- Greeting/quote card moved to right column; Links moved to left column
- Links expanded height capped to ~5 items with scroll

---

## Post v2.0 Ideas

- **More quote themes** — expand each theme beyond current count
- **RSS feed** — pull in a feed (e.g. Hacker News, NZ news)
- **Custom theme creator**
- **NZSL, Te Reo, Mandarin dictionaries**

---

## Development Guidelines

- Keep functions focused and single-purpose
- One feature per commit with descriptive message
- Push regularly to GitHub
- Update this plan as priorities shift

---

**Last Updated**: March 2026 (v2.0 complete)
**Maintainer**: Samuel Love
**Repository**: https://github.com/tatoslover/homepage
