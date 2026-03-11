/* ============================================================
   SAMUEL LOVE — SAFARI HOMEPAGE
   links.js  —  Curated link data (v1.2)
   ============================================================
   Reorganized into 4 main categories:
   - mitchelton: Personal & family links
   - projects: Development & coding projects
   - teaching: Educational resources
   - finance: Financial & productivity tools

   Each entry shape:
   {
     label : string        — display name
     url   : string        — full URL
     tag   : string|null   — optional short badge (e.g. "NZ", "UC")
   }
   ============================================================ */

const LINKS = {
  /* ── MITCHELTON & PERSONAL ───────────────────────────────── */
  mitchelton: [
    {
      label: "ASB Login",
      url: "https://online.asb.co.nz/auth/?fm=header:login",
      tag: "Finance",
    },
    {
      label: "UC Parking Permits",
      url: "https://canterbury-epermits.orikan.tech/ssp/u/permits",
      tag: "UC",
    },
    {
      label: "UC Learn (Moodle)",
      url: "https://learn.canterbury.ac.nz/my/",
      tag: "UC",
    },
    {
      label: "iCloud Drive",
      url: "https://www.icloud.com/iclouddrive/",
      tag: "Apple",
    },
    {
      label: "1Password",
      url: "https://my.1password.com/",
      tag: null,
    },
  ],

  /* ── PROJECTS & DEVELOPMENT ──────────────────────────────── */
  projects: [
    {
      label: "GitHub",
      url: "https://github.com",
      tag: null,
    },
    {
      label: "Zed Dashboard",
      url: "https://dashboard.zed.dev/account",
      tag: "IDE",
    },
    {
      label: "My Portfolio",
      url: "https://tatoslover.github.io",
      tag: null,
    },
    {
      label: "Vercel",
      url: "https://vercel.com/dashboard",
      tag: null,
    },
    {
      label: "MDN Web Docs",
      url: "https://developer.mozilla.org/",
      tag: null,
    },
    {
      label: "DevDocs",
      url: "https://devdocs.io/",
      tag: null,
    },
    {
      label: "Stack Overflow",
      url: "https://stackoverflow.com/",
      tag: null,
    },
    {
      label: "Can I Use",
      url: "https://caniuse.com/",
      tag: "CSS",
    },
    {
      label: "CSS Tricks",
      url: "https://css-tricks.com/",
      tag: "CSS",
    },
    {
      label: "Excalidraw",
      url: "https://excalidraw.com/",
      tag: "Draw",
    },
    {
      label: "Regex101",
      url: "https://regex101.com/",
      tag: "Util",
    },
    {
      label: "CodePen",
      url: "https://codepen.io/",
      tag: null,
    },
  ],

  /* ── TEACHING RESOURCES ──────────────────────────────────── */
  teaching: [
    {
      label: "UC Learn (Moodle)",
      url: "https://learn.canterbury.ac.nz/my/",
      tag: "UC",
    },
    {
      label: "UC Library",
      url: "https://library.canterbury.ac.nz/",
      tag: "UC",
    },
    {
      label: "Google Scholar",
      url: "https://scholar.google.com/",
      tag: null,
    },
    {
      label: "JSTOR",
      url: "https://www.jstor.org/",
      tag: null,
    },
    {
      label: "TKI — Te Kete Ipurangi",
      url: "https://www.tki.org.nz/",
      tag: "NZ",
    },
    {
      label: "Education Counts",
      url: "https://www.educationcounts.govt.nz/",
      tag: "NZ",
    },
    {
      label: "Te Ara — NZ Encyclopedia",
      url: "https://teara.govt.nz/",
      tag: "NZ",
    },
    {
      label: "Connected Learning",
      url: "https://nzcurriculum.tki.org.nz/",
      tag: "NZ",
    },
    {
      label: "NZCER",
      url: "https://www.nzcer.org.nz/",
      tag: "NZ",
    },
    {
      label: "OpenAlex",
      url: "https://openalex.org/",
      tag: "Open",
    },
  ],

  /* ── FINANCE & TOOLS ──────────────────────────────────────── */
  finance: [
    {
      label: "ASB Login",
      url: "https://online.asb.co.nz/auth/?fm=header:login",
      tag: "Finance",
    },
    {
      label: "Notion",
      url: "https://www.notion.so/",
      tag: null,
    },
    {
      label: "Zotero",
      url: "https://www.zotero.org/",
      tag: "Refs",
    },
    {
      label: "Smallpdf",
      url: "https://smallpdf.com/",
      tag: "PDF",
    },
    {
      label: "iLovePDF",
      url: "https://www.ilovepdf.com/",
      tag: "PDF",
    },
    {
      label: "DeepL Translate",
      url: "https://www.deepl.com/translator",
      tag: null,
    },
    {
      label: "ChatGPT",
      url: "https://chat.openai.com/",
      tag: "AI",
    },
    {
      label: "Claude",
      url: "https://claude.ai/",
      tag: "AI",
    },
    {
      label: "Calendly",
      url: "https://calendly.com/",
      tag: null,
    },
    {
      label: "1Password",
      url: "https://my.1password.com/",
      tag: null,
    },
  ],
};
