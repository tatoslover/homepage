# Samuel's Safari Homepage

A hand-crafted personal start page, designed to open every time a new Safari window or tab is launched. Built with plain HTML, CSS, and vanilla JavaScript — no frameworks, no build step.

## Features

- **Live clock & date** — current time and date in the NZ timezone (Pacific/Auckland)
- **Weather** — current conditions for Christchurch from [Open-Meteo](https://open-meteo.com/) (free, no API key), cached for 30 minutes
- **Daily quote** — theme-aware random quotes loaded from YAML, crossfade on theme switch
- **Link browser** — collapsible, searchable list of frequently visited sites (`Option+L`)
- **Dictionary** — inline definitions via Free Dictionary API with Datamuse spelling suggestions (`Option+D`)
- **Calendar** — calendar-year progress bar plus two upcoming-events lists: relationship anniversaries ("Samdee", generated at runtime) and NZ public holidays ("Key Dates"); the next of each is also surfaced under the clock
- **Theme switcher** — six visual themes inspired by favourite books and series:
  - 🐢 Discworld
  - 💍 The Lord of the Rings
  - 🚀 The Expanse
  - ⚡ Harry Potter
  - 🌩️ The Stormlight Archive
  - 🌊 Zen

## Structure

| File/Directory | Purpose |
|---|---|
| `index.html` | Page structure and markup |
| `style.css` | All styling, themes, and responsive layout |
| `script.js` | All logic: clock, weather, quotes, links, dictionary, calendar |
| `data/quotes.yaml` | Theme-aware quote collections |
| `data/links.yaml` | Flat list of curated links |
| `data/calendar.yaml` | NZ public holidays (relationship anniversaries are generated in `script.js`) |
| `assets/` | Background images for each theme and SVG favicon |

## Usage

Because this is a fully local, dependency-free page, setup is as simple as:

1. Clone or download the repository
2. In Safari, go to **Settings → General → Homepage** and set it to the full path of `index.html`
   (e.g. `file:///Users/yourname/Code/homepage/index.html`)
3. Open a new window — done!

## Notes

- The weather widget uses the Open-Meteo API and requires an internet connection to update. It falls back to cached data when offline.
- The page is intentionally kept as a **local file** and is not deployed publicly, keeping it fast and private.
- Quotes and links are loaded via `js-yaml` from a CDN — the page degrades gracefully if unavailable.

---

*Designed & built by Samuel Love*
