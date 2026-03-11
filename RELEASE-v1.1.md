# Release Notes — v1.1

**Release Date**: January 2025  
**Version**: 1.1 - Quote System Overhaul  
**Previous Version**: 1.0

---

## 🎯 Overview

Version 1.1 introduces a major enhancement to the quote system, making it theme-aware and dynamic. This release also adds a new **Zen theme** with a serene underwater aesthetic, bringing the total theme count to 6.

---

## ✨ New Features

### 1. Zen Theme (6th Theme)
- **Theme Name**: Zen — Underwater Depths
- **Aesthetic**: Deep ocean blues, tranquil cyan, meditative calm
- **Color Palette**:
  - Background: Deep blue underwater tones
  - Text: Light cyan and white for excellent contrast
  - Accents: Bright cyan (#48c5d8)
  - Glass effects: Subtle blue borders with enhanced blur
- **Background Image**: `serene.jpg` — peaceful underwater scene
- **Emoji**: 🌊 (water wave)
- **Quote Collection**: 20 philosophical quotes (Stoic, Buddhist, modern wisdom)

### 2. Theme-Aware Quote System
- **Dynamic Loading**: Quotes now load from `quotes.yaml` instead of hardcoded JavaScript
- **Theme-Specific Quotes**: Each theme has its own curated collection
  - **Discworld** (🐢): 8 Terry Pratchett quotes
  - **LOTR** (💍): 8 Tolkien/Middle-earth quotes (Gandalf, Galadriel, Sam, etc.)
  - **The Expanse** (🚀): 8 quotes from Holden, Miller, Amos, Avasarala
  - **Harry Potter** (⚡): 8 Dumbledore quotes
  - **Stormlight Archive** (🌩️): 8 Brandon Sanderson/Cosmere quotes
  - **Zen** (🌊): 20 philosophical quotes (Marcus Aurelius, Seneca, Buddha, etc.)
- **Total Quote Count**: 60+ quotes across all themes

### 3. Random Quote Selection
- Quotes now randomize on every page load (within the current theme)
- Quotes change immediately when switching themes
- No more day-based rotation — more variety and surprise

### 4. YAML Data Format
- Introduced `quotes.yaml` for cleaner, more maintainable quote storage
- Integrated `js-yaml` library (via CDN) for YAML parsing
- Structured format makes adding/editing quotes simple

---

## 🔧 Technical Changes

### Files Modified
- **`index.html`**:
  - Added `js-yaml` CDN script (v4.1.0)
  - Added Zen theme button (🌊) to theme switcher
  - Updated theme switcher to support 7 buttons (6 themes + trigger)

- **`style.css`**:
  - Added Zen theme CSS variables (lines 187-212)
  - Added Zen theme background image rules (lines 295-305)
  - Updated theme button positioning for 7th button (lines 441-448)
  - Total themes now: 6

- **`script.js`**:
  - Replaced hardcoded `QUOTES` array with `THEME_QUOTES` object
  - Added `loadQuotesFromYAML()` async function
  - Refactored `setDailyQuote()` → `setQuoteForTheme(themeName)`
  - Updated `applyTheme()` to trigger quote changes
  - Updated `THEMES` array to include "zen"
  - Updated `THEME_EMOJIS` object with 🌊 for zen
  - Modified `init()` to be async and load quotes before rendering

### Files Added
- **`quotes.yaml`**: Theme-specific quote collections (60+ quotes)
- **`assets/serene.jpg`**: Zen theme background image
- **`plan.md`**: Comprehensive development roadmap (v1.x → v2.0)
- **`v1.1-testing.md`**: Detailed testing checklist for QA
- **`ideas.md`**: Future feature ideas and roadmap notes

---

## 📊 Quote Distribution

| Theme | Quote Count | Authors/Sources |
|-------|-------------|-----------------|
| Discworld | 8 | Terry Pratchett |
| LOTR | 8 | Tolkien, Gandalf, Galadriel, Sam, etc. |
| The Expanse | 8 | Holden, Miller, Amos, Avasarala |
| Harry Potter | 8 | Albus Dumbledore |
| Stormlight | 8 | Brandon Sanderson, Dalinar, Kaladin, Wit |
| Zen | 20 | Marcus Aurelius, Seneca, Epictetus, Buddha, etc. |
| **Total** | **60** | — |

---

## 🎨 Theme Summary (All 6)

1. **Discworld** (Default) — Warm parchment, brass tones, Unseen University library
2. **LOTR** — Bright sunlit greens, Hobbiton meadows
3. **The Expanse** — Deep space purples/pinks, Rocinante nebula
4. **Harry Potter** — Dark amber/gold, candlelit Great Hall
5. **Stormlight Archive** — Electric purple/blue, highstorm energy
6. **Zen** (NEW) — Deep ocean blues, underwater serenity

---

## 🐛 Bug Fixes

- None (this is a feature release)

---

## 🔄 Breaking Changes

- **Quote System**: The old day-based quote rotation is replaced with random selection
  - Users will see different quotes on each page load
  - Quotes are no longer tied to day of year
- **Data Structure**: Quotes moved from JavaScript to YAML
  - Requires `js-yaml` library to be loaded
  - Fallback quotes available if YAML fails to load

---

## 📦 Dependencies

### New
- **js-yaml** (v4.1.0) — Loaded via CDN from jsDelivr
  - URL: `https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.min.js`
  - Size: ~20KB minified
  - Purpose: Parse `quotes.yaml` on page load

### Existing
- None (still dependency-free besides the single CDN script)

---

## 🧪 Testing

### Tested On
- Safari (macOS) — Primary browser ✅
- Chrome (macOS) — Verified ✅
- Mobile Safari (iOS) — Verified ✅

### Test Coverage
- All 6 themes display correctly
- Quotes load from YAML without errors
- Quotes change when switching themes
- Quotes randomize on page reload
- Theme switcher radial menu includes all 6 buttons
- Zen theme renders with underwater aesthetic
- No console errors or warnings
- Mobile responsive behavior maintained

### Known Issues
- None at this time

---

## 📖 Documentation Updates

- Created `plan.md` — Full development roadmap (v1.1 → v2.0)
- Created `v1.1-testing.md` — Comprehensive testing checklist
- Added `ideas.md` — Feature ideas and future enhancements

---

## 🚀 Upgrade Guide

### From v1.0 to v1.1

1. **Pull latest changes**:
   ```bash
   git pull origin main
   ```

2. **Ensure new files are present**:
   - `quotes.yaml`
   - `assets/serene.jpg`
   - `plan.md`
   - `v1.1-testing.md`

3. **Clear browser cache**:
   - Hard refresh (Cmd+Shift+R) to load new CSS/JS

4. **Verify functionality**:
   - Test all 6 themes
   - Verify quotes load and change
   - Check Zen theme appearance

### Fresh Installation

Simply clone the repository and open `index.html`:
```bash
git clone https://github.com/tatoslover/homepage.git
cd homepage
open index.html
```

---

## 🔮 What's Next?

### v1.2 — Link Manager (Planned)
- Searchable modal for organizing 50+ links
- 4 categories: Mitchelton & Personal, Projects, Teaching, Finance
- Replace Quick Links section with link manager trigger
- Add missing links: ASB, Zed Dashboard, UC Parking

### v1.3 — Data Migration (Planned)
- Convert `links.js` → `links.yaml`
- Consistent YAML-based data format

### v1.4 — Dictionary Feature (Planned)
- Inline dictionary widget
- Free Dictionary API integration

### v1.5 — Branding & Polish (Planned)
- Theme-specific favicons
- Dynamic page titles
- Final UI refinements

### v2.0 — Release (Target)
- All features complete
- Comprehensive testing
- Documentation finalization
- GitHub release with changelog

---

## 🙏 Acknowledgments

- **Terry Pratchett** — Discworld quotes
- **J.R.R. Tolkien** — LOTR quotes
- **Brandon Sanderson** — Stormlight Archive quotes
- **J.K. Rowling** — Harry Potter quotes
- **James S.A. Corey** — The Expanse quotes
- **Marcus Aurelius, Seneca, Epictetus, Buddha** — Zen philosophical quotes

---

## 📝 Changelog

### Added
- Zen theme with underwater aesthetic
- `quotes.yaml` with 60+ theme-specific quotes
- Random quote selection on page load
- Quote switching when changing themes
- `js-yaml` library integration
- `plan.md` development roadmap
- `v1.1-testing.md` testing checklist
- `ideas.md` future feature notes
- `assets/serene.jpg` background image

### Changed
- Quote system: From day-based rotation to random selection
- Quote system: From JavaScript to YAML data format
- Theme count: 5 → 6 themes
- Theme switcher: 6 buttons → 7 buttons (6 themes + trigger)

### Removed
- Hardcoded quote array from `script.js`
- Day-based quote rotation logic

---

## 📄 License

MIT License — See LICENSE file for details

---

## 🔗 Links

- **Repository**: https://github.com/tatoslover/homepage
- **Portfolio**: https://tatoslover.github.io
- **Version Tag**: v1.1

---

**Happy browsing! 🌊**