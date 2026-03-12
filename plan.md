# Homepage Development Plan — v1.x → v2.0

## Overview

This document outlines the iterative development plan to evolve the Safari homepage from v1.0 to v2.0. The approach is to work through incremental v1.x releases, testing and refining each feature before moving to the next, culminating in a polished v2.0 release.

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
**Released**: January 2025

**Features**:
- Clean, minimal homepage with glass morphism design
- 5 themes (Discworld, LOTR, The Expanse, Harry Potter, Stormlight Archive)
- Live NZ clock and weather widget
- UC academic calendar with countdown
- Daily rotating quotes (philosophical/stoic)
- Quick Links section (UC Learn, Portfolio)
- Radial theme switcher (hover/tap to open)

---

### ✅ v1.1 — Quote System Overhaul (Completed)

**Goals**:
1. Add Zen theme (underwater/deep blue aesthetic)
2. Convert quotes to YAML format
3. Implement theme-aware quote system
4. Quotes change randomly on load
5. Quotes change when switching themes

**Implementation**:
- [x] Create `quotes.yaml` with theme-specific quotes
- [x] Add Zen theme color palette to CSS
- [x] Add Zen theme button (🌊) to theme switcher
- [x] Add background image (`serene.jpg`)
- [x] Include js-yaml library via CDN
- [x] Refactor quote loading system in `script.js`
- [x] Update `THEMES` array and `THEME_EMOJIS`
- [ ] Test all themes and quote switching
- [ ] Verify quote randomization on page load

**Quote Collections**:
- Harry Potter: 8 Dumbledore quotes
- LOTR: 8 quotes (Gandalf, Galadriel, Sam, etc.)
- Stormlight: 8 Brandon Sanderson quotes
- Discworld: 8 Terry Pratchett quotes
- The Expanse: 8 quotes (Holden, Miller, Amos, etc.)
- Zen: 20 philosophical quotes (Aurelius, Seneca, Buddha, etc.)

**Testing Checklist**:
- [ ] All 6 themes display correctly
- [ ] Quotes load from YAML
- [ ] Quotes change when switching themes
- [ ] Quotes are random on page reload (within theme)
- [ ] Zen theme has underwater aesthetic
- [ ] Theme switcher radial menu includes all 6 buttons
- [ ] No console errors

---

### ✅ v1.2 — Link Manager (Completed)

**Goals**:
1. Add missing links from `ideas.md`
2. Build searchable modal link manager
3. Replace Quick Links section with link manager trigger
4. Organize links into 4 categories

**New Links to Add**:
- ASB Login: https://online.asb.co.nz/auth/?fm=header:login
- Zed Dashboard: https://dashboard.zed.dev/account
- UC Parking Permits: https://canterbury-epermits.orikan.tech/ssp/u/permits
- GitHub: https://github.com (move from coding section)

**Link Categories** (new organization):
1. **Mitchelton & Personal**
   - ASB Login
   - UC Parking Permits
   - Family/personal items

2. **Projects & Development**
   - GitHub
   - Zed Dashboard
   - Portfolio (tatoslover.github.io)
   - Vercel
   - DevDocs, MDN, Stack Overflow, etc.

3. **Teaching Resources**
   - UC Learn (keep in modal + potentially as shortcut)
   - UC Library
   - TKI, NZCER, Education Counts
   - Connected Learning
   - Te Ara

4. **Finance & Tools**
   - ASB Login
   - 1Password
   - iCloud Drive
   - Notion
   - Zotero

**Implementation**:
- Add missing links to `links.js` temporarily
- Design link manager modal:
  - Glass morphism overlay
  - Search input (filters as you type)
  - Category tabs
  - Link grid with tags
  - Keyboard accessible (Escape to close, Tab navigation)
- Replace Quick Links section with trigger button
- Style modal to match existing aesthetic

**Design Notes**:
- Modal uses same glass background as cards
- Links displayed in grid (3-4 columns on desktop, 1-2 on mobile)
- Each link shows label + tag (if present)
- Hover states for links
- Search filters across all categories in real-time
- Click outside or Escape to close

---

### ✅ v1.3 — Data Migration to YAML (Completed)

**Goals**:
1. Convert `links.js` → `links.yaml`
2. Update link manager to load from YAML
3. Maintain data consistency
4. Remove dependency on JavaScript data structures

**Implementation**:
- Create `links.yaml` with new category structure:
  ```yaml
  categories:
    mitchelton:
      name: "Mitchelton & Personal"
      links:
        - label: "ASB Login"
          url: "https://online.asb.co.nz/auth/?fm=header:login"
          tag: "Finance"
    # ... etc
  ```
- Update `script.js` to load links from YAML
- Test link manager with YAML data
- Remove `links.js` file
- Update documentation

**Benefits**:
- Easier to maintain (YAML is more readable)
- Consistent data format (matches `quotes.yaml`)
- Non-technical users can edit more easily
- Separation of data from logic

---

### ✅ v1.4 — Dictionary Feature (Completed)

**Goals**:
1. Add inline dictionary widget
2. Integrate Free Dictionary API
3. Display definitions in glass-style card
4. Keyboard shortcuts

**Implementation**:
- Add dictionary icon/trigger (top-right near clock, or bottom-left)
- Click/tap to reveal input field
- As-you-type or Enter to search
- Fetch from: `https://api.dictionaryapi.dev/api/v2/entries/en/{word}`
- Display results in overlay:
  - Word + phonetic
  - Part of speech
  - Definition(s)
  - Example usage (if available)
- Escape or click outside to close
- Optional: Keyboard shortcut (Cmd+K or Cmd+D)

**UX Considerations**:
- Minimal footprint when closed
- Smooth open/close animation
- Glass morphism styling for results card
- Mobile-friendly (large touch targets)
- Loading state while fetching
- Error handling (word not found)

**API Details**:
- **Free Dictionary API**: No key required
- Returns JSON with word data
- Example: `https://api.dictionaryapi.dev/api/v2/entries/en/hello`
- Fallback message if API is down or word not found

---

### 🚧 v1.5 — Branding & Polish (In Progress)

**Goals**:
1. Create theme-specific favicons
2. Implement dynamic favicon switching
3. Add dynamic page title (optional)
4. Final UI polish and refinements

**Favicon Implementation**:
- Design 6 favicons (one per theme):
  - Discworld: Turtle/Library icon
  - LOTR: Ring icon
  - Expanse: Rocket/Ship icon
  - Harry Potter: Lightning bolt
  - Stormlight: Storm/Glyph icon
  - Zen: Wave/Water icon
- Create 32x32 and 16x16 versions
- Store in `assets/favicons/`
- Update `script.js` to swap favicon on theme change:
  ```javascript
  function updateFavicon(theme) {
    const link = document.querySelector("link[rel~='icon']");
    link.href = `assets/favicons/${theme}.png`;
  }
  ```

**Dynamic Title (Optional)**:
- Update `<title>` tag when theme switches
- Theme-specific names:
  - Discworld: "L-Space Portal — Samuel Love"
  - LOTR: "The Shire — Samuel Love"
  - Expanse: "Rocinante Dashboard — Samuel Love"
  - Harry Potter: "Hogwarts Start — Samuel Love"
  - Stormlight: "Roshar Command — Samuel Love"
  - Zen: "Mindful Start — Samuel Love"
- Or keep consistent: "Samuel Love — {Theme} Homepage"

**Final Polish**:
- Accessibility audit (ARIA labels, keyboard nav, focus states)
- Mobile responsiveness check (all features work on phone)
- Performance audit (load times, minimize repaints)
- Cross-browser testing (Safari, Chrome, Firefox)
- Code cleanup (remove commented code, optimize)
- Documentation update

---

### 🎯 v2.0 — Release
**Target**: After all v1.x features tested

**Goals**:
1. Comprehensive testing across all features
2. Documentation update
3. CHANGELOG creation
4. GitHub release
5. Celebration! 🎉

**Pre-Release Checklist**:
- [ ] All v1.x features implemented and tested
- [ ] No console errors or warnings
- [ ] All themes display correctly with appropriate quotes
- [ ] Link manager works smoothly (search, categories, etc.)
- [ ] Dictionary feature functional
- [ ] Favicons switch with themes
- [ ] Mobile fully responsive
- [ ] Accessibility standards met
- [ ] README updated with all features
- [ ] CHANGELOG created (v1.0 → v2.0 summary)

**Release Process**:
1. Final commit: "Release v2.0"
2. Git tag: `git tag -a v2.0 -m "Version 2.0 - Feature Complete"`
3. Push to GitHub: `git push origin main --tags`
4. Create GitHub release with notes
5. Update README with version badge

**v2.0 Feature Summary**:
- 6 immersive themes with theme-specific quotes
- Quote system: 50+ quotes rotating by theme
- Link manager: Searchable, categorized, 50+ links
- Dictionary: Inline word lookup
- Calendar: UC academic milestones
- Weather: Live NZ weather widget
- Clock: Live NZ time
- Fast, private, local-first design

---

## Future Considerations (Post v2.0)

Ideas to explore after v2.0 is stable:

### v2.1 - Time-Based Enhancements
- Time-of-day greetings (Good morning/afternoon/evening)
- Special quotes for specific times (Gandalf "good morning" quote)
- Sunrise/sunset indicators

### v2.2 - Media Gallery (Optional)
- Private photo gallery section
- Family photos (privacy-aware)
- Album organization
- Slideshow mode

### v2.3 - Additional Integrations
- RSS feed reader
- Note-taking quick capture
- Bookmark sync (if desired)
- Todo list integration

### v3.0 - Advanced Features
- Custom theme creator
- Export/import settings
- Multiple homepage layouts
- Widget system (modular)

---

## Development Guidelines

### Code Quality
- Keep functions focused and single-purpose
- Comment complex logic
- Use meaningful variable names
- Maintain consistent indentation (2 spaces)

### Git Workflow
- One feature per commit
- Descriptive commit messages
- Tag version releases
- Push regularly to GitHub

### Testing Approach
- Test each feature in isolation
- Test cross-feature interactions
- Test on multiple devices (desktop, mobile, tablet)
- Test on multiple browsers

### Documentation
- Update README for user-facing changes
- Update this plan as priorities shift
- Comment code for future maintainability
- Keep CHANGELOG current

---

## Notes

- All changes maintain backward compatibility with v1.0 structure
- Local-first: No required external dependencies (except CDN for js-yaml)
- Privacy: No tracking, no analytics, no cookies
- Performance: Target < 500ms full page load
- Accessibility: WCAG 2.1 AA compliance goal

---

**Last Updated**: March 2026 (v1.5 in progress)
**Maintainer**: Samuel Love
**Repository**: https://github.com/tatoslover/homepage