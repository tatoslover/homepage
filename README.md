# 🏠 Samuel's Safari Homepage

A hand-crafted personal start page, designed to open every time a new Safari window or tab is launched. Built with plain HTML, CSS, and vanilla JavaScript — no frameworks, no build step, no dependencies.

## Features

- **Live clock & date** — displays the current time and date in the NZ timezone
- **Weather** — pulls current conditions for Christchurch from the [Open-Meteo](https://open-meteo.com/) API (free, no API key required)
- **Daily quote** — a rotating selection of quotes from philosophers, authors, and thinkers, keyed to the day of the year
- **Academic calendar** — a progress bar and upcoming-events list tracking UC MTL milestones, placements, and assignment due dates
- **Quick links** — a small collection of frequently visited sites displayed as glassy card buttons
- **Theme switcher** — five visual themes inspired by favourite books and series:
  - 🐢 Discworld
  - 💍 The Lord of the Rings
  - 🚀 The Expanse
  - ⚡ Harry Potter
  - 🌩️ The Stormlight Archive

## Structure

| File | Purpose |
|---|---|
| `index.html` | Page structure and markup |
| `style.css` | All styling, themes, and responsive layout |
| `script.js` | Clock, quotes, weather, calendar logic |
| `links.js` | Curated link data |
| `assets/` | Background images for each theme |

## Usage

Because this is a fully local, dependency-free page, setup is as simple as:

1. Clone or download the repository
2. In Safari, go to **Settings → General → Homepage** and set it to the full path of `index.html`  
   (e.g. `file:///Users/yourname/Code/homepage/index.html`)
3. Open a new window — done!

## Notes

- The weather widget uses the Open-Meteo API, so it requires an internet connection to update. It caches the last result locally so it still shows something when offline.
- The page is intentionally kept as a **local file** and is not deployed publicly, which keeps it fast and private.

---

*Designed & built by Samuel Love*