/* ============================================================
   SAMUEL LOVE — SAFARI HOMEPAGE
   script.js
   ============================================================ */

"use strict";

/* ── 1. QUOTES ───────────────────────────────────────────────
   Theme-aware quotes loaded from data/quotes.yaml
   Quotes change randomly on page load and when switching themes
   ──────────────────────────────────────────────────────────── */
let THEME_QUOTES = {}; // Will be populated from data/quotes.yaml

/* Load quotes from YAML file */
async function loadQuotesFromYAML() {
  try {
    const response = await fetch("data/quotes.yaml");
    const yamlText = await response.text();
    const data = jsyaml.load(yamlText);

    if (data && data.themes) {
      THEME_QUOTES = data.themes;
    } else {
      console.warn("Invalid quotes.yaml structure");
    }
  } catch (error) {
    console.error("Failed to load quotes:", error);
    // Fallback quotes if YAML fails to load
    THEME_QUOTES = {
      zen: [
        {
          text: "You have power over your mind — not outside events. Realise this, and you will find strength.",
          author: "Marcus Aurelius",
        },
      ],
    };
  }
}

/* ── 1b. LINKS ───────────────────────────────────────────────
   Categorized links loaded from data/links.yaml
   ──────────────────────────────────────────────────────────── */
let LINKS = {}; // Will be populated from data/links.yaml

/* Load links from YAML file */
async function loadLinksFromYAML() {
  try {
    const response = await fetch("data/links.yaml");
    const yamlText = await response.text();
    const data = jsyaml.load(yamlText);

    if (data && data.categories) {
      // Convert to old format for compatibility
      LINKS = {};
      Object.keys(data.categories).forEach((key) => {
        LINKS[key] = data.categories[key].links;
      });
    } else {
      console.warn("Invalid links.yaml structure");
    }
  } catch (error) {
    console.error("Failed to load links:", error);
    // Fallback to empty if YAML fails to load
    LINKS = {};
  }
}

/* ── 1c. CALENDAR ────────────────────────────────────────────
   Academic calendar loaded from data/calendar.yaml
   ──────────────────────────────────────────────────────────── */
let UC_MILESTONES = []; // Will be populated from data/calendar.yaml
let UC_ASSIGNMENTS = []; // Will be populated from data/calendar.yaml
let UC_PERIODS = []; // Will be populated from data/calendar.yaml
let UC_CALENDAR = []; // Merged and sorted calendar

/* Load calendar from YAML file */
async function loadCalendarFromYAML() {
  try {
    const response = await fetch("data/calendar.yaml");
    const yamlText = await response.text();
    const data = jsyaml.load(yamlText);

    if (data && data.milestones && data.assignments && data.periods) {
      UC_MILESTONES = data.milestones;
      UC_ASSIGNMENTS = data.assignments;
      UC_PERIODS = data.periods;

      // Merge and sort calendar events
      UC_CALENDAR = [...UC_MILESTONES, ...UC_ASSIGNMENTS].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );
    } else {
      console.warn("Invalid calendar.yaml structure");
    }
  } catch (error) {
    console.error("Failed to load calendar:", error);
    // Fallback to empty if YAML fails to load
    UC_MILESTONES = [];
    UC_ASSIGNMENTS = [];
    UC_PERIODS = [];
    UC_CALENDAR = [];
  }
}

/* ── 2. THEME DEFINITIONS ────────────────────────────────────
   Maps data-theme attribute values to display labels.
   ──────────────────────────────────────────────────────────── */
const THEMES = [
  "discworld",
  "lotr",
  "expanse",
  "harrypotter",
  "stormlight",
  "zen",
];

/* ── 3. NZ TIMEZONE HELPERS ──────────────────────────────────
   Christchurch uses Pacific/Auckland (NZST UTC+12 / NZDT UTC+13).
   We use Intl.DateTimeFormat to get the local parts safely.
   ──────────────────────────────────────────────────────────── */
const NZ_LOCALE = "en-NZ";
const NZ_TIMEZONE = "Pacific/Auckland";

/**
 * Returns an object with NZ date/time parts.
 * @returns {{ hour: number, minute: number, second: number,
 *             dayOfYear: number, weekday: string, dateStr: string }}
 */
function getNZTimeParts() {
  const now = new Date();

  // Pull individual parts via Intl for guaranteed NZ local time
  const fmt = (opts) =>
    new Intl.DateTimeFormat(NZ_LOCALE, {
      timeZone: NZ_TIMEZONE,
      ...opts,
    }).formatToParts(now);

  const timeParts = fmt({
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const dateParts = fmt({
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const get = (parts, type) => {
    const found = parts.find((p) => p.type === type);
    return found ? found.value : "";
  };

  const hour = parseInt(get(timeParts, "hour"), 10);
  const minute = parseInt(get(timeParts, "minute"), 10);
  const second = parseInt(get(timeParts, "second"), 10);

  // Build a human-readable date string
  const weekday = get(dateParts, "weekday");
  const day = get(dateParts, "day");
  const month = get(dateParts, "month");
  const year = get(dateParts, "year");
  const dateStr = `${weekday}, ${day} ${month} ${year}`;

  // Day-of-year in NZ local time (for daily quote stability)
  const nzDateStr = new Intl.DateTimeFormat("en-CA", {
    timeZone: NZ_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now); // "YYYY-MM-DD"
  const [y, m, d] = nzDateStr.split("-").map(Number);
  const startOfYear = new Date(`${y}-01-01`);
  const localDate = new Date(
    `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
  );
  const dayOfYear = Math.floor((localDate - startOfYear) / 86_400_000);

  return { hour, minute, second, dayOfYear, dateStr };
}

/* ── 4. GREETING ─────────────────────────────────────────────
   Returns a time-of-day greeting string.
   Buckets: night (0–4), morning (5–11), afternoon (12–16),
            evening (17–20), night (21–23).
   ──────────────────────────────────────────────────────────── */
function getGreeting(hour) {
  if (hour >= 5 && hour < 12) return "Good morning, Samuel.";
  if (hour >= 12 && hour < 17) return "Good afternoon, Samuel.";
  if (hour >= 17 && hour < 21) return "Good evening, Samuel.";
  return "Still up, Samuel?";
}

/* ── 5. CLOCK TICK ───────────────────────────────────────────
   Updates the clock, date, and greeting every second.
   The greeting is only re-rendered when the hour changes to
   avoid unnecessary DOM writes.
   ──────────────────────────────────────────────────────────── */
const clockEl = document.getElementById("clock");
const dateEl = document.getElementById("date-display");
const greetingEl = document.getElementById("greeting");

let _lastHour = -1;

function pad(n) {
  return String(n).padStart(2, "0");
}

function tickClock() {
  const { hour, minute, second, dateStr } = getNZTimeParts();

  // Update clock
  clockEl.textContent = `${pad(hour)}:${pad(minute)}:${pad(second)}`;
  clockEl.setAttribute(
    "datetime",
    `${pad(hour)}:${pad(minute)}:${pad(second)}`,
  );

  // Update date (no need to re-set every second but cheap enough)
  dateEl.textContent = dateStr;

  // Update greeting only when hour changes
  if (hour !== _lastHour) {
    greetingEl.textContent = getGreeting(hour);
    _lastHour = hour;
  }
}

/* ── 6. DAILY QUOTE ──────────────────────────────────────────
   Index is seeded by dayOfYear so it never changes mid-day.
   ──────────────────────────────────────────────────────────── */
function setQuoteForTheme(themeName) {
  // Get current theme's quotes
  const themeQuotes = THEME_QUOTES[themeName] || THEME_QUOTES["zen"] || [];

  if (themeQuotes.length === 0) {
    console.warn("No quotes available for theme:", themeName);
    return;
  }

  // Pick a random quote from the theme's collection
  const randomIndex = Math.floor(Math.random() * themeQuotes.length);
  const quote = themeQuotes[randomIndex];

  document.getElementById("daily-quote").textContent = `"${quote.text}"`;
  document.getElementById("quote-author").textContent = `— ${quote.author}`;
}

/* ── 7. THEME SWITCHER ───────────────────────────────────────
   Applies the theme by setting data-theme on <html>.
   Persists choice in localStorage under 'sl-theme'.
   ──────────────────────────────────────────────────────────── */
const STORAGE_KEY = "sl-theme";

const THEME_EMOJIS = {
  discworld: "🐢",
  lotr: "💍",
  expanse: "🚀",
  harrypotter: "⚡",
  stormlight: "🌩️",
  zen: "🌊",
};

const THEME_TITLES = {
  discworld: "L-Space Portal — Samuel Love",
  lotr: "The Shire — Samuel Love",
  expanse: "Rocinante Dashboard — Samuel Love",
  harrypotter: "Hogwarts Start — Samuel Love",
  stormlight: "Roshar Command — Samuel Love",
  zen: "Mindful Start — Samuel Love",
};

function applyTheme(theme) {
  if (!THEMES.includes(theme)) theme = "zen";
  document.documentElement.setAttribute("data-theme", theme);

  // Update trigger emoji to reflect the active theme
  const trigger = document.querySelector(".theme-trigger");
  if (trigger) trigger.textContent = THEME_EMOJIS[theme] || "🎨";

  // Update active state on buttons
  document.querySelectorAll(".theme-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.theme === theme);
    btn.setAttribute(
      "aria-pressed",
      btn.dataset.theme === theme ? "true" : "false",
    );
  });

  // Update page title
  document.title = THEME_TITLES[theme] || "Samuel Love";

  // Update quote for the new theme
  setQuoteForTheme(theme);

  // Persist
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch (_) {
    // localStorage may be unavailable in some contexts — fail silently
  }
}

function loadSavedTheme() {
  let saved = "zen";
  try {
    saved = localStorage.getItem(STORAGE_KEY) || "zen";
    // Migrate old "default" theme to "discworld"
    if (saved === "default") {
      saved = "discworld";
      localStorage.setItem(STORAGE_KEY, "discworld");
    }
  } catch (_) {}
  return saved;
}

function initThemeSwitcher() {
  const switcher = document.querySelector(".theme-switcher");
  const trigger = document.querySelector(".theme-trigger");

  // Theme option buttons — apply theme and close the wheel
  document.querySelectorAll(".theme-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      applyTheme(btn.dataset.theme);
      if (switcher) switcher.classList.remove("is-open");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
    });
  });

  // Trigger toggles the wheel (handles touch where CSS :hover doesn't fire)
  if (trigger && switcher) {
    trigger.addEventListener("click", () => {
      const isOpen = switcher.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // Close when clicking or tapping outside the switcher
  document.addEventListener("click", (e) => {
    if (switcher && !switcher.contains(e.target)) {
      switcher.classList.remove("is-open");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
    }
  });
}

/* ── 8. LINK RENDERING ───────────────────────────────────────
   Reads from LINKS (defined in links.js) and populates
   each <ul> with rendered anchor tags.
   Favicons are fetched from Google's favicon service with a
   graceful fallback to a generic globe emoji.
   ──────────────────────────────────────────────────────────── */

/**
 * Returns a favicon URL for the given page URL.
 * Uses Google's public S2 favicon service (works offline once cached).
 */
function faviconURL(pageURL) {
  try {
    const origin = new URL(pageURL).origin;
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(origin)}&sz=32`;
  } catch (_) {
    return "";
  }
}

/**
 * Builds and returns an <li> element for a single link entry.
 * @param {{ label: string, url: string, tag: string|null }} entry
 */
function buildLinkItem(entry) {
  const li = document.createElement("li");
  li.className = "link-item";

  const a = document.createElement("a");
  a.href = entry.url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.setAttribute("aria-label", entry.label);

  // Favicon — resolved to either an <img> or a fallback <span>
  const fav = faviconURL(entry.url);
  let iconEl;

  if (fav) {
    const img = document.createElement("img");
    img.className = "link-favicon";
    img.alt = "";
    img.setAttribute("aria-hidden", "true");
    img.width = 18;
    img.height = 18;
    img.src = fav;
    img.onerror = () => {
      // Replace broken favicon with a subtle text fallback
      const span = document.createElement("span");
      span.className = "link-favicon";
      span.textContent = "🌐";
      span.setAttribute("aria-hidden", "true");
      img.replaceWith(span);
    };
    iconEl = img;
  } else {
    const span = document.createElement("span");
    span.className = "link-favicon";
    span.textContent = "🌐";
    span.setAttribute("aria-hidden", "true");
    iconEl = span;
  }

  // Label
  const label = document.createElement("span");
  label.className = "link-label";
  label.textContent = entry.label;

  a.appendChild(iconEl);
  a.appendChild(label);

  // Optional tag badge
  if (entry.tag) {
    const tag = document.createElement("span");
    tag.className = "link-tag";
    tag.textContent = entry.tag;
    a.appendChild(tag);
  }

  li.appendChild(a);
  return li;
}

/**
 * Populates a <ul> with link items.
 * @param {string} listId  — the element's id
 * @param {Array}  entries — array of link entry objects
 */
function renderLinkSection(listId, entries) {
  const ul = document.getElementById(listId);
  if (!ul) return;

  const fragment = document.createDocumentFragment();
  entries.forEach((entry) => fragment.appendChild(buildLinkItem(entry)));
  ul.appendChild(fragment);
}

function renderAllLinks() {
  if (typeof LINKS === "undefined") {
    console.warn("links.js not loaded — LINKS is undefined.");
    return;
  }
  renderLinkSection("study-links", LINKS.study || []);
  renderLinkSection("coding-links", LINKS.coding || []);
  renderLinkSection("philosophy-links", LINKS.philosophy || []);
  renderLinkSection("tools-links", LINKS.tools || []);
}

/* ── 9. WEATHER ──────────────────────────────────────────────
   Fetches current conditions from Open-Meteo (free, no key).
   Christchurch: -43.532, 172.637  |  timezone: Pacific/Auckland
   Results are cached in localStorage for 30 minutes.
   ──────────────────────────────────────────────────────────── */
const WMO_WEATHER = {
  0: { icon: "☀️", desc: "Clear" },
  1: { icon: "🌤️", desc: "Mostly clear" },
  2: { icon: "⛅", desc: "Partly cloudy" },
  3: { icon: "☁️", desc: "Overcast" },
  45: { icon: "🌫️", desc: "Foggy" },
  48: { icon: "🌫️", desc: "Freezing fog" },
  51: { icon: "🌦️", desc: "Light drizzle" },
  53: { icon: "🌦️", desc: "Drizzle" },
  55: { icon: "🌧️", desc: "Heavy drizzle" },
  61: { icon: "🌧️", desc: "Light rain" },
  63: { icon: "🌧️", desc: "Rain" },
  65: { icon: "🌧️", desc: "Heavy rain" },
  71: { icon: "🌨️", desc: "Light snow" },
  73: { icon: "🌨️", desc: "Snow" },
  75: { icon: "❄️", desc: "Heavy snow" },
  77: { icon: "🌨️", desc: "Snow grains" },
  80: { icon: "🌦️", desc: "Showers" },
  81: { icon: "🌧️", desc: "Rain showers" },
  82: { icon: "⛈️", desc: "Heavy showers" },
  85: { icon: "🌨️", desc: "Snow showers" },
  86: { icon: "❄️", desc: "Heavy snow showers" },
  95: { icon: "⛈️", desc: "Thunderstorm" },
  96: { icon: "⛈️", desc: "Thunderstorm" },
  99: { icon: "⛈️", desc: "Thunderstorm" },
};

const WEATHER_CACHE_KEY = "sl-weather";
const WEATHER_CACHE_TTL = 30 * 60 * 1000; // 30 minutes

async function fetchWeather() {
  // Return cached data if still fresh
  try {
    const raw = localStorage.getItem(WEATHER_CACHE_KEY);
    if (raw) {
      const { ts, data } = JSON.parse(raw);
      if (Date.now() - ts < WEATHER_CACHE_TTL) return data;
    }
  } catch (_) {}

  const url =
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=-43.532&longitude=172.637" +
    "&current=temperature_2m,weathercode,windspeed_10m" +
    "&timezone=Pacific%2FAuckland";

  try {
    const res = await fetch(url);
    const json = await res.json();
    const data = {
      temp: Math.round(json.current.temperature_2m),
      code: json.current.weathercode,
      wind: Math.round(json.current.windspeed_10m),
    };
    localStorage.setItem(
      WEATHER_CACHE_KEY,
      JSON.stringify({ ts: Date.now(), data }),
    );
    return data;
  } catch (_) {
    return null;
  }
}

function renderWeather(data) {
  const el = document.getElementById("weather-inline");
  if (!el) return;
  if (!data) return; // leave hidden

  const wmo = WMO_WEATHER[data.code] ?? { icon: "🌡️", desc: "Weather" };
  document.getElementById("weather-icon").textContent = wmo.icon;
  document.getElementById("weather-temp").textContent = `${data.temp}°C`;
  document.getElementById("weather-desc").textContent = wmo.desc;
  el.removeAttribute("hidden");
}

/* ── 10. ACADEMIC CALENDAR ───────────────────────────────────
   Calendar data loaded from data/calendar.yaml
   MTL year runs Semester 1 (Feb) through S2 exams (Nov).
   UC_MILESTONES, UC_ASSIGNMENTS, UC_PERIODS, and UC_CALENDAR
   are populated by loadCalendarFromYAML() on page init.
   ──────────────────────────────────────────────────────────── */

// Progress bar spans the full MTL programme
const MTL_START = new Date("2026-01-26T00:00:00");
const MTL_END = new Date("2027-01-17T23:59:59");

/**
 * Returns the UC_PERIODS entry that contains the given date, or null.
 * @param {Date} nzDate — date object in NZ local time
 */
function getCurrentPeriod(nzDate) {
  for (const period of UC_PERIODS) {
    const start = new Date(period.start + "T00:00:00");
    const end = new Date(period.end + "T23:59:59");
    if (nzDate >= start && nzDate <= end) return period;
  }
  return null;
}

/**
 * Returns 0–100 progress through the MTL academic year.
 * @param {Date} nzDate
 */
function getYearProgress(nzDate) {
  if (nzDate <= MTL_START) return 0;
  if (nzDate >= MTL_END) return 100;
  const total = MTL_END - MTL_START;
  const elapsed = nzDate - MTL_START;
  return Math.round((elapsed / total) * 100);
}

/**
 * Builds and injects the calendar section:
 *  - Phase badge (current period name)
 *  - Animated progress bar (% through MTL programme Jan 2026 → Jan 2027)
 *  - Event chips: always the next 8 upcoming events from today,
 *    plus any from the last 2 days — so assignment deadlines are
 *    always visible regardless of how far away they are.
 *    Assignments show a weight badge; placements get a dashed border.
 */
function renderCalendar() {
  // Get today's date in NZ local time as a plain YYYY-MM-DD string
  const nzDateStr = new Intl.DateTimeFormat("en-CA", {
    timeZone: NZ_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  // Midnight NZ local time today (for diff calculations)
  const today = new Date(nzDateStr + "T00:00:00");
  const todayMs = today.getTime();

  // ── Phase badge ──────────────────────────────────────────
  const period = getCurrentPeriod(today);
  const badge = document.getElementById("cal-phase-badge");
  if (badge) badge.textContent = period ? period.label : "MTL 2026";

  // ── Progress bar ─────────────────────────────────────────
  const pct = getYearProgress(today);
  const fill = document.getElementById("cal-progress-fill");
  if (fill) {
    fill.setAttribute("aria-valuenow", pct);
    // Double rAF ensures 0% is painted before transition fires
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fill.style.width = `${pct}%`;
      });
    });
  }

  // ── Event chips ──────────────────────────────────────────
  // Collect: everything from 2 days ago onward, sorted by date.
  // Then take the first 8 upcoming + any in the trailing 2-day window.
  const cutoffMs = todayMs - 2 * 86_400_000;

  const future = UC_CALENDAR.filter(
    (ev) => new Date(ev.date + "T00:00:00").getTime() >= todayMs,
  ).slice(0, 8);

  const recent = UC_CALENDAR.filter((ev) => {
    const t = new Date(ev.date + "T00:00:00").getTime();
    return t >= cutoffMs && t < todayMs;
  });

  // Merge recent + next-8, re-sort, deduplicate by date+label
  const seen = new Set();
  const visible = [...recent, ...future]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .filter((ev) => {
      const key = ev.date + ev.label;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

  const ul = document.getElementById("cal-events");
  if (!ul) return;
  ul.innerHTML = "";

  visible.forEach((ev) => {
    const evDate = new Date(ev.date + "T00:00:00");
    const diffDay = Math.round((evDate.getTime() - todayMs) / 86_400_000);

    let countdown;
    if (diffDay === 0) countdown = "Today";
    else if (diffDay === 1) countdown = "Tomorrow";
    else if (diffDay === -1) countdown = "Yesterday";
    else if (diffDay < 0) countdown = `${Math.abs(diffDay)}d ago`;
    else countdown = `in ${diffDay}d`;

    const isAssignment = ev.type === "assignment";
    const isPlacement = ev.type === "placement";
    const isToday = diffDay === 0;
    const isSoon = diffDay > 0 && diffDay <= 5;
    const isPast = diffDay < 0;

    const classes = ["cal-event"];
    if (isToday) classes.push("is-today");
    else if (isSoon) classes.push("is-soon");
    if (isPast) classes.push("is-past");
    if (isAssignment) classes.push("is-assignment");
    if (isPlacement) classes.push("is-placement");

    // Always include year so 2026 dates are unambiguous
    const dateLabel = evDate.toLocaleDateString("en-NZ", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const weightTag =
      isAssignment && ev.weight
        ? `<span class="cal-event-weight">${ev.weight}</span>`
        : "";

    const li = document.createElement("li");
    li.className = classes.join(" ");
    li.innerHTML =
      `<span class="cal-event-icon" aria-hidden="true">${ev.icon}</span>` +
      `<span class="cal-event-body">` +
      `<span class="cal-event-label">${ev.label}</span>` +
      `<span class="cal-event-date">${dateLabel} <span class="cal-event-countdown">(${countdown})</span></span>` +
      `</span>` +
      weightTag;

    ul.appendChild(li);
  });
}

/* ── 10. DICTIONARY ──────────────────────────────────────────
   Free Dictionary API integration
   API: https://api.dictionaryapi.dev/api/v2/entries/en/{word}
   ──────────────────────────────────────────────────────────── */

function initDictionary() {
  const input = document.getElementById("dictionary-input");
  const searchBtn = document.getElementById("dictionary-search-btn");
  const resultsContainer = document.getElementById("dictionary-results");

  if (!input || !searchBtn || !resultsContainer) return;

  // Search on button click
  searchBtn.addEventListener("click", () => {
    const word = input.value.trim();
    if (word) {
      searchWord(word);
    }
  });

  // Search on Enter key
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const word = input.value.trim();
      if (word) {
        searchWord(word);
      }
    }
  });

  // Global keyboard shortcut: Option+D to focus dictionary
  document.addEventListener("keydown", (e) => {
    if (e.altKey && e.code === "KeyD") {
      e.preventDefault();
      input.focus();
    }
  });
}

async function searchWord(word) {
  const resultsContainer = document.getElementById("dictionary-results");
  if (!resultsContainer) return;

  // Show loading state
  resultsContainer.removeAttribute("hidden");
  resultsContainer.innerHTML = `
    <div class="dictionary-loading">
      Looking up "${word}"...
    </div>
  `;

  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`,
    );

    if (!response.ok) {
      throw new Error("Word not found");
    }

    const data = await response.json();
    renderDefinition(data[0]);
  } catch (error) {
    // Word not found - try to get spelling suggestions
    await getSuggestions(word);
  }
}

async function getSuggestions(word) {
  const resultsContainer = document.getElementById("dictionary-results");
  if (!resultsContainer) return;

  try {
    // Use Datamuse API for spell-check suggestions
    const response = await fetch(
      `https://api.datamuse.com/words?sp=${encodeURIComponent(word)}&max=5`,
    );

    if (!response.ok) {
      throw new Error("Suggestions not available");
    }

    const suggestions = await response.json();

    if (suggestions.length > 0) {
      // Show suggestions
      let html = `
        <div class="dictionary-error">
          Word not found. Did you mean:
        </div>
        <div class="dictionary-suggestions">
      `;

      suggestions.forEach((suggestion) => {
        html += `
          <button class="dictionary-suggestion-btn" data-word="${suggestion.word}">
            ${suggestion.word}
          </button>
        `;
      });

      html += `</div>`;
      resultsContainer.innerHTML = html;

      // Add click handlers to suggestion buttons
      document.querySelectorAll(".dictionary-suggestion-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const suggestedWord = btn.dataset.word;
          document.getElementById("dictionary-input").value = suggestedWord;
          searchWord(suggestedWord);
        });
      });
    } else {
      // No suggestions available
      resultsContainer.innerHTML = `
        <div class="dictionary-error">
          Word not found. Please try another word.
        </div>
      `;
    }
  } catch (error) {
    resultsContainer.innerHTML = `
      <div class="dictionary-error">
        Word not found. Please try another word.
      </div>
    `;
  }
}

function renderDefinition(data) {
  const resultsContainer = document.getElementById("dictionary-results");
  if (!resultsContainer) return;

  const word = data.word || "";
  const phonetic = data.phonetic || "";
  const meanings = data.meanings || [];

  let html = `
    <div class="dictionary-word">${word}</div>
  `;

  if (phonetic) {
    html += `<div class="dictionary-phonetic">${phonetic}</div>`;
  }

  meanings.forEach((meaning) => {
    const partOfSpeech = meaning.partOfSpeech || "";
    const definitions = meaning.definitions || [];

    html += `<div class="dictionary-meaning">`;
    if (partOfSpeech) {
      html += `<div class="dictionary-pos">${partOfSpeech}</div>`;
    }

    if (definitions.length > 0) {
      html += `<ul class="dictionary-definitions">`;
      definitions.slice(0, 3).forEach((def) => {
        html += `<li class="dictionary-definition">`;
        html += def.definition || "";
        if (def.example) {
          html += `<div class="dictionary-example">"${def.example}"</div>`;
        }
        html += `</li>`;
      });
      html += `</ul>`;
    }

    html += `</div>`;
  });

  resultsContainer.innerHTML = html;
}

/* ── 11. LINK BROWSER ────────────────────────────────────────
   Collapsible, searchable alphabetical link list
   ──────────────────────────────────────────────────────────── */

function initLinkBrowser() {
  const toggle = document.getElementById("link-browser-toggle");
  const content = document.getElementById("link-browser-content");
  const searchInput = document.getElementById("link-browser-search");
  const listContainer = document.getElementById("link-list");

  if (!toggle || !content || !searchInput || !listContainer) return;

  // Toggle expand/collapse
  toggle.addEventListener("click", () => {
    const isExpanded = content.hasAttribute("hidden");
    if (isExpanded) {
      content.removeAttribute("hidden");
      toggle.setAttribute("aria-expanded", "true");
      renderAllLinks();
    } else {
      content.setAttribute("hidden", "");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  // Search functionality
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value;
    if (searchTerm) {
      // Auto-expand when searching
      content.removeAttribute("hidden");
      toggle.setAttribute("aria-expanded", "true");
    }
    renderAllLinks(searchTerm);
  });

  // Focus search on click
  searchInput.addEventListener("click", () => {
    if (content.hasAttribute("hidden")) {
      content.removeAttribute("hidden");
      toggle.setAttribute("aria-expanded", "true");
      renderAllLinks();
    }
  });

  // Global keyboard shortcut: Option+L to focus links search
  document.addEventListener("keydown", (e) => {
    if (e.altKey && e.code === "KeyL") {
      e.preventDefault();
      searchInput.focus();
      // Auto-expand if collapsed
      if (content.hasAttribute("hidden")) {
        content.removeAttribute("hidden");
        toggle.setAttribute("aria-expanded", "true");
        renderAllLinks();
      }
    }
  });
}

function renderAllLinks(searchTerm = "") {
  const listContainer = document.getElementById("link-list");
  if (!listContainer) return;

  // Flatten all links from all categories
  const allLinks = [];
  Object.values(LINKS).forEach((categoryLinks) => {
    allLinks.push(...categoryLinks);
  });

  // Remove duplicates based on URL
  const uniqueLinks = Array.from(
    new Map(allLinks.map((link) => [link.url, link])).values(),
  );

  // Sort alphabetically by label
  uniqueLinks.sort((a, b) => a.label.localeCompare(b.label));

  // Filter based on search term
  const filteredLinks = searchTerm
    ? uniqueLinks.filter(
        (link) =>
          link.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (link.tag &&
            link.tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    : uniqueLinks;

  // Clear container
  listContainer.innerHTML = "";

  // Show empty state if no results
  if (filteredLinks.length === 0) {
    const empty = document.createElement("div");
    empty.className = "link-list-empty";
    empty.textContent = searchTerm
      ? `No links found matching "${searchTerm}"`
      : "No links available";
    listContainer.appendChild(empty);
    return;
  }

  // Render links
  filteredLinks.forEach((link) => {
    const item = document.createElement("a");
    item.className = "link-item";
    item.href = link.url;
    item.target = "_blank";
    item.rel = "noopener noreferrer";

    const icon = document.createElement("span");
    icon.className = "link-item-icon";
    icon.textContent = "🔗";
    icon.setAttribute("aria-hidden", "true");

    const content = document.createElement("div");
    content.className = "link-item-content";

    const label = document.createElement("span");
    label.className = "link-item-label";
    label.textContent = link.label;

    content.appendChild(label);

    if (link.tag) {
      const tag = document.createElement("span");
      tag.className = "link-item-tag";
      tag.textContent = link.tag;
      content.appendChild(tag);
    }

    item.appendChild(icon);
    item.appendChild(content);
    listContainer.appendChild(item);
  });
}

/* ── 11. INITIALISE ──────────────────────────────────────────
   Run everything once the DOM is ready.
   ──────────────────────────────────────────────────────────── */
async function init() {
  // Load data from YAML files
  await loadQuotesFromYAML();
  await loadLinksFromYAML();
  await loadCalendarFromYAML();

  // Apply persisted or default theme immediately to prevent flash
  const savedTheme = loadSavedTheme();
  applyTheme(savedTheme);

  // Wire up theme buttons
  initThemeSwitcher();

  // Initialize link browser
  initLinkBrowser();

  // Initialize dictionary
  initDictionary();

  // Start the clock (tick immediately, then every second)
  tickClock();
  setInterval(tickClock, 1000);

  // Render academic calendar (synchronous — uses hardcoded data)
  renderCalendar();

  // Fetch weather async — updates DOM when the API responds
  fetchWeather().then(renderWeather);
}

// Guard: run after DOM is fully parsed
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
