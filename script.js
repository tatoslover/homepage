/* ============================================================
   SAMUEL LOVE — SAFARI HOMEPAGE
   script.js
   ============================================================ */

"use strict";

/* ── 1. QUOTES ───────────────────────────────────────────────
   Daily rotation: index = dayOfYear % quotes.length
   So the quote is stable all day and changes at midnight.
   ──────────────────────────────────────────────────────────── */
const QUOTES = [
  {
    text: "You have power over your mind — not outside events. Realise this, and you will find strength.",
    author: "Marcus Aurelius",
  },
  {
    text: "Waste no more time arguing what a good man should be. Be one.",
    author: "Marcus Aurelius",
  },
  {
    text: "The impediment to action advances action. What stands in the way becomes the way.",
    author: "Marcus Aurelius",
  },
  {
    text: "Very little is needed to make a happy life; it is all within yourself, in your way of thinking.",
    author: "Marcus Aurelius",
  },
  {
    text: "He who fears death will never do anything worthy of a living man.",
    author: "Seneca",
  },
  {
    text: "We suffer more in imagination than in reality.",
    author: "Seneca",
  },
  {
    text: "Luck is what happens when preparation meets opportunity.",
    author: "Seneca",
  },
  {
    text: "Omnia aliena sunt, tempus tantum nostrum est. — All things are alien; time alone is ours.",
    author: "Seneca",
  },
  {
    text: "Make the best use of what is in your power, and take the rest as it happens.",
    author: "Epictetus",
  },
  {
    text: "It's not what happens to you, but how you react to it that matters.",
    author: "Epictetus",
  },
  {
    text: "No man is free who is not master of himself.",
    author: "Epictetus",
  },
  {
    text: "First say to yourself what you would be; and then do what you have to do.",
    author: "Epictetus",
  },
  {
    text: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
  },
  {
    text: "Three things cannot be long hidden: the sun, the moon, and the truth.",
    author: "The Buddha",
  },
  {
    text: "Peace comes from within. Do not seek it without.",
    author: "The Buddha",
  },
  {
    text: "You yourself, as much as anybody in the entire universe, deserve your love and affection.",
    author: "The Buddha",
  },
  {
    text: "Do not dwell in the past, do not dream of the future — concentrate the mind on the present moment.",
    author: "The Buddha",
  },
  {
    text: "Before enlightenment, chop wood, carry water. After enlightenment, chop wood, carry water.",
    author: "Zen Proverb",
  },
  {
    text: "The quieter you become, the more you are able to hear.",
    author: "Rumi",
  },
  {
    text: "Wherever you are, be all there.",
    author: "Jim Elliot",
  },
  {
    text: "A man who dares to waste one hour of time has not discovered the value of life.",
    author: "Charles Darwin",
  },
  {
    text: "The journey of a thousand miles begins with one step.",
    author: "Lao Tzu",
  },
  {
    text: "Knowing others is wisdom; knowing yourself is enlightenment.",
    author: "Lao Tzu",
  },
  {
    text: "He who learns but does not think is lost. He who thinks but does not learn is in great danger.",
    author: "Confucius",
  },
  {
    text: "An unexamined life is not worth living.",
    author: "Socrates",
  },
  {
    text: "Wonder is the beginning of wisdom.",
    author: "Socrates",
  },
  {
    text: "The roots of education are bitter, but the fruit is sweet.",
    author: "Aristotle",
  },
  {
    text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Aristotle",
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
  },
  {
    text: "Real knowledge is to know the extent of one's ignorance.",
    author: "Confucius",
  },
  {
    text: "Difficulties strengthen the mind, as labour does the body.",
    author: "Seneca",
  },
  {
    text: "The mind that is not baffled is not employed. The impeded stream is the one that sings.",
    author: "Wendell Berry",
  },
  {
    text: "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
    author: "Benjamin Franklin",
  },
  {
    text: "Education is not filling a bucket, but lighting a fire.",
    author: "W.B. Yeats",
  },
  {
    text: "The more I read, the more I acquire, the more certain I am that I know nothing.",
    author: "Voltaire",
  },
  {
    text: "To know that you do not know is the beginning of knowing.",
    author: "Jiddu Krishnamurti",
  },
  {
    text: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    author: "Mahatma Gandhi",
  },
  {
    text: "The wisest are the most annoyed at the loss of time.",
    author: "Dante Alighieri",
  },
  {
    text: "Be a lamp, or a lifeboat, or a ladder. Help someone's soul heal.",
    author: "Rumi",
  },
  {
    text: "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.",
    author: "Rumi",
  },
  {
    text: "Stars are not seen by sunshine.",
    author: "Robert Bailey Thomas",
  },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
  },
  {
    text: "Begin at once to live, and count each separate day as a separate life.",
    author: "Seneca",
  },
  {
    text: "Accept the things to which fate binds you, and love the people with whom fate brings you together.",
    author: "Marcus Aurelius",
  },
  {
    text: "You could leave life right now. Let that determine what you do and say and think.",
    author: "Marcus Aurelius",
  },
  {
    text: "The obstacle is the path.",
    author: "Zen Proverb",
  },
  {
    text: "Fall down seven times, stand up eight.",
    author: "Japanese Proverb",
  },
  {
    text: "Even the darkest night will end and the sun will rise.",
    author: "Victor Hugo",
  },
  {
    text: "Not all those who wander are lost.",
    author: "J.R.R. Tolkien",
  },
  {
    text: "I am not afraid of storms, for I am learning how to sail my ship.",
    author: "Louisa May Alcott",
  },
];

/* ── 2. THEME DEFINITIONS ────────────────────────────────────
   Maps data-theme attribute values to display labels.
   ──────────────────────────────────────────────────────────── */
const THEMES = ["default", "lotr", "expanse", "harrypotter", "stormlight"];

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
function setDailyQuote() {
  const { dayOfYear } = getNZTimeParts();
  const quote = QUOTES[dayOfYear % QUOTES.length];

  document.getElementById("daily-quote").textContent = `"${quote.text}"`;
  document.getElementById("quote-author").textContent = `— ${quote.author}`;
}

/* ── 7. THEME SWITCHER ───────────────────────────────────────
   Applies the theme by setting data-theme on <html>.
   Persists choice in localStorage under 'sl-theme'.
   ──────────────────────────────────────────────────────────── */
const STORAGE_KEY = "sl-theme";

const THEME_EMOJIS = {
  default: "🐢",
  lotr: "💍",
  expanse: "🚀",
  harrypotter: "⚡",
  stormlight: "🌩️",
};

function applyTheme(theme) {
  if (!THEMES.includes(theme)) theme = "default";
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

  // Persist
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch (_) {
    // localStorage may be unavailable in some contexts — fail silently
  }
}

function loadSavedTheme() {
  let saved = "default";
  try {
    saved = localStorage.getItem(STORAGE_KEY) || "default";
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
   Source: UC Key University Dates (canterbury.ac.nz) +
           Universities NZ 2025 Semester Dates PDF.
   MTL year runs Semester 1 (Feb) through S2 exams (Nov).
   ──────────────────────────────────────────────────────────── */

// Individual events shown as chips in the calendar strip
// ── UC Academic milestones ────────────────────────────────
// Source: UC Key University Dates 2026 (canterbury.ac.nz)
const UC_MILESTONES = [
  // ── 2025 (general context, auto-expire as dates pass) ──
  { date: "2025-06-20", label: "S1 Exams end", icon: "✅", type: "semester" },
  { date: "2025-06-20", label: "Matariki", icon: "🌟", type: "holiday" },
  {
    date: "2025-06-23",
    label: "Mid-year break begins",
    icon: "☕",
    type: "break",
  },
  {
    date: "2025-07-14",
    label: "Semester 2 begins",
    icon: "📚",
    type: "semester",
  },
  {
    date: "2025-08-18",
    label: "S2 mid-sem break begins",
    icon: "☕",
    type: "break",
  },
  {
    date: "2025-09-01",
    label: "S2 lectures resume",
    icon: "📚",
    type: "semester",
  },
  {
    date: "2025-10-13",
    label: "S2 study break begins",
    icon: "📖",
    type: "study",
  },
  { date: "2025-10-27", label: "Labour Day", icon: "🎉", type: "holiday" },
  { date: "2025-10-27", label: "S2 Exams begin", icon: "📝", type: "exam" },
  { date: "2025-11-14", label: "S2 Exams end", icon: "✅", type: "semester" },

  // ── 2026 programme ──
  {
    date: "2026-01-26",
    label: "MTL programme begins",
    icon: "🎓",
    type: "semester",
  },
  {
    date: "2026-02-16",
    label: "S1 lectures start",
    icon: "📚",
    type: "semester",
  },
  {
    date: "2026-03-27",
    label: "S1 mid-sem break begins",
    icon: "☕",
    type: "break",
  },
  { date: "2026-04-03", label: "Good Friday", icon: "🎖️", type: "holiday" },
  {
    date: "2026-04-20",
    label: "S1 lectures resume",
    icon: "📚",
    type: "semester",
  },
  { date: "2026-04-27", label: "ANZAC Day", icon: "🎖️", type: "holiday" },
  {
    date: "2026-05-29",
    label: "S1 lectures end",
    icon: "📚",
    type: "semester",
  },
  { date: "2026-06-01", label: "King's Birthday", icon: "🎉", type: "holiday" },
  {
    date: "2026-06-02",
    label: "S1 study break begins",
    icon: "📖",
    type: "study",
  },
  { date: "2026-06-08", label: "S1 Exams begin", icon: "📝", type: "exam" },
  { date: "2026-06-20", label: "S1 Exams end", icon: "✅", type: "semester" },
  {
    date: "2026-06-21",
    label: "Mid-year break begins",
    icon: "☕",
    type: "break",
  },
  { date: "2026-07-10", label: "Matariki", icon: "🌟", type: "holiday" },
  {
    date: "2026-07-13",
    label: "Semester 2 begins",
    icon: "📚",
    type: "semester",
  },
  {
    date: "2026-08-21",
    label: "S2 mid-sem break begins",
    icon: "☕",
    type: "break",
  },
  {
    date: "2026-09-07",
    label: "S2 lectures resume",
    icon: "📚",
    type: "semester",
  },
  {
    date: "2026-10-16",
    label: "S2 lectures end",
    icon: "📚",
    type: "semester",
  },
  {
    date: "2026-10-19",
    label: "S2 study break begins",
    icon: "📖",
    type: "study",
  },
  { date: "2026-10-26", label: "Labour Day", icon: "🎉", type: "holiday" },
  { date: "2026-10-27", label: "S2 Exams begin", icon: "📝", type: "exam" },
  { date: "2026-11-07", label: "S2 Exams end", icon: "✅", type: "semester" },
  {
    date: "2026-11-09",
    label: "Research Project begins",
    icon: "🔬",
    type: "semester",
  },
  {
    date: "2026-11-13",
    label: "Canterbury Show Day",
    icon: "🎉",
    type: "holiday",
  },
  {
    date: "2027-01-17",
    label: "Programme complete",
    icon: "🎓",
    type: "semester",
  },
];

// ── Assignment due dates ──────────────────────────────────
// Source: course table provided by Samuel Love.
// type:"assignment" → shows weight badge; type:"placement" → dashed border.
const UC_ASSIGNMENTS = [
  // ── Semester 1 2026 ──
  {
    date: "2026-03-13",
    label: "TEPI413 Assessment 1",
    icon: "📋",
    type: "assignment",
    weight: "40%",
  },
  {
    date: "2026-03-20",
    label: "TEPI416 Quiz 1",
    icon: "📋",
    type: "assignment",
    weight: "25%",
  },
  {
    date: "2026-03-23",
    label: "TECS433 Assignment 1",
    icon: "📋",
    type: "assignment",
    weight: "60%",
  },
  {
    date: "2026-03-30",
    label: "TECS436 Assignment 1",
    icon: "📋",
    type: "assignment",
    weight: null,
  },
  {
    date: "2026-03-30",
    label: "TEPP413 Placement begins",
    icon: "🏫",
    type: "placement",
    weight: null,
  },
  {
    date: "2026-05-29",
    label: "TEPP413 Portfolio",
    icon: "📋",
    type: "assignment",
    weight: null,
  },
  {
    date: "2026-06-08",
    label: "TECS433 Assignment 2",
    icon: "📋",
    type: "assignment",
    weight: "40%",
  },
  {
    date: "2026-06-12",
    label: "TECS436 Assignment 2",
    icon: "📋",
    type: "assignment",
    weight: null,
  },
  {
    date: "2026-06-15",
    label: "TEPI413 Assessment 2",
    icon: "📋",
    type: "assignment",
    weight: "60%",
  },
  {
    date: "2026-06-18",
    label: "TEPI415 Assignment 1",
    icon: "📋",
    type: "assignment",
    weight: "50%",
  },

  // ── Semester 2 2026 ──
  {
    date: "2026-07-06",
    label: "TECS435 Assignment 1",
    icon: "📋",
    type: "assignment",
    weight: "50%",
  },
  {
    date: "2026-07-17",
    label: "TEPI416 Quiz 2",
    icon: "📋",
    type: "assignment",
    weight: "25%",
  },
  {
    date: "2026-07-31",
    label: "TECS434 Assignment 1",
    icon: "📋",
    type: "assignment",
    weight: null,
  },
  {
    date: "2026-08-03",
    label: "TEPP414 Placement begins",
    icon: "🏫",
    type: "placement",
    weight: null,
  },
  {
    date: "2026-10-09",
    label: "TEPI416 Quiz 3",
    icon: "📋",
    type: "assignment",
    weight: "25%",
  },
  {
    date: "2026-10-12",
    label: "TEPI415 Assignment 2",
    icon: "📋",
    type: "assignment",
    weight: "50%",
  },
  {
    date: "2026-10-23",
    label: "TECS435 Assignment 2",
    icon: "📋",
    type: "assignment",
    weight: "50%",
  },
  {
    date: "2026-11-03",
    label: "TEPI416 Quiz 4",
    icon: "📋",
    type: "assignment",
    weight: "25%",
  },
];

// Merged + sorted master list used by renderCalendar()
const UC_CALENDAR = [...UC_MILESTONES, ...UC_ASSIGNMENTS].sort(
  (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
);

// Named periods used for the phase badge and progress bar bounds
const UC_PERIODS = [
  // 2025
  { label: "Semester 1 2025", start: "2025-02-24", end: "2025-06-01" },
  { label: "S1 Study Break", start: "2025-06-02", end: "2025-06-08" },
  { label: "S1 Exams", start: "2025-06-09", end: "2025-06-20" },
  { label: "Mid-year Break", start: "2025-06-21", end: "2025-07-13" },
  { label: "Semester 2 2025", start: "2025-07-14", end: "2025-10-12" },
  { label: "S2 Study Break", start: "2025-10-13", end: "2025-10-26" },
  { label: "S2 Exams", start: "2025-10-27", end: "2025-11-14" },
  // pre-programme gap
  { label: "Before Programme", start: "2025-11-15", end: "2026-01-25" },
  // 2026
  { label: "Semester 1", start: "2026-01-26", end: "2026-06-07" },
  { label: "S1 Study Break", start: "2026-06-02", end: "2026-06-07" },
  { label: "S1 Exams", start: "2026-06-08", end: "2026-06-20" },
  { label: "Mid-year Break", start: "2026-06-21", end: "2026-07-12" },
  { label: "Semester 2", start: "2026-07-13", end: "2026-10-18" },
  { label: "S2 Study Break", start: "2026-10-19", end: "2026-10-26" },
  { label: "S2 Exams", start: "2026-10-27", end: "2026-11-07" },
  { label: "Research Project", start: "2026-11-09", end: "2027-01-17" },
];

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

/* ── 11. INITIALISE ──────────────────────────────────────────
   Run everything once the DOM is ready.
   ──────────────────────────────────────────────────────────── */
function init() {
  // Apply persisted or default theme immediately to prevent flash
  applyTheme(loadSavedTheme());

  // Wire up theme buttons
  initThemeSwitcher();

  // Set today's quote
  setDailyQuote();

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
