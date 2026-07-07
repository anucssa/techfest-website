# Extending the Tech Fest Website — Maintainer's Guide

A practical guide for anyone who inherits this site: how it's built, where things live,
and exact recipes for the changes you're most likely to make. For quick content edits,
the [README](README.md) covers the basics; this guide goes deeper.

---

## 1. The mental model (read this first)

The site is a **static, data-driven Next.js app**:

```
data/*.json  ──►  lib/data.js  ──►  app/ pages + components/  ──►  npm run build  ──►  out/ (plain HTML/CSS/JS)
     │
     └──►  scripts/generate-ics.mjs  ──►  public/calendar/*.ics
```

Three rules fall out of this:

1. **Content lives in `data/`, never in components.** If you're editing a `.jsx` file to
   change a date, a venue, or a link — stop, it belongs in a JSON file.
2. **Everything is generated at build time.** There is no server and no database. After any
   content change, rebuild (or push, if CI deploys for you).
3. **One schedule entry = three artifacts.** Each object in `data/schedule.json`
   automatically becomes (a) a card in the home-page schedule, (b) a page at
   `/events/<slug>/`, and (c) a downloadable `.ics` calendar file. You never create those
   by hand.

---

## 2. Directory map

| Path | What it is | When you touch it |
|---|---|---|
| `data/site.json` | Site-wide facts: names, dates, CTF links, registration, socials, contacts, downloads, footer logos | Often |
| `data/schedule.json` | The entire programme (source of truth) | Often |
| `data/venues.json` | Map pins: venues, parking, direction markers | When locations change |
| `data/speakers.json` | Tech Talks line-up | As speakers confirm |
| `data/sponsors.json` | Sponsor wall | As sponsors sign |
| `lib/data.js` | The only import point for data + URL helpers (`asset`, `absUrl`) | Rarely |
| `app/` | Pages: `page.jsx` (home), `tech-talks/`, `ctf/`, `events/[slug]/`, plus layout, 404, SEO files | New pages / layout changes |
| `components/` | Reusable UI: Header, Footer, Schedule, CampusMap, Countdown, SponsorWall, EventActions, ShareButton, ThemeToggle, Icon | New UI |
| `app/globals.css` | Tailwind layers + the design-system component classes (buttons, cards, gradient text) | New shared styles |
| `tailwind.config.js` | Colour tokens, fonts, gradients, animations | New tokens |
| `scripts/generate-ics.mjs` | Builds every `.ics` file from the schedule (runs automatically via `prebuild`) | Rarely |
| `public/` | Static assets: images, sponsor logos, PDFs, generated calendars | Dropping in files |
| `.github/workflows/deploy.yml` | GitHub Pages deploy on push to `main` | Deployment changes |

---

## 3. The design system

### 3.1 Colour tokens (`tailwind.config.js`)

| Token | Value | Use |
|---|---|---|
| `brand-yellow / blue / green` | `#ffbb34 / #67acf1 / #3add41` | The official Canva-kit gradient colours. Bright — use on **dark** surfaces |
| `ink` / `ink-soft` | `#141230` / `#1e1b45` | The poster night-sky navy. Dark-mode page background / card background |
| `sign-green / yellow / blue` | `#1e7a3c / #f5c518 / #1d5fa8` | Road-sign palette. Darker — safe on **light** surfaces (links use `sign-blue` in light, `brand-blue` in dark) |
| `bg-trail` | yellow→blue→green radial | The signature hero gradient |
| `bg-trail-soft` | same at 16% opacity | Subtle tinted chips/icons |
| `bg-trail-deep` | darkened gradient | Sponsor tiles hosting white logos (WCAG-safe) |

### 3.2 Component classes (`app/globals.css`)

All buttons build on `.btn`. Pick by intent:

| Class | Looks like | Use for |
|---|---|---|
| `.btn-primary` | **Inverse** of the theme (dark button in light mode, light in dark) | Standard high-emphasis actions on normal page surfaces |
| `.btn-surface` | **Matches** the theme (light button in light mode, dark in dark) | Actions sitting on the bright `bg-trail` gradient (e.g. hero "Register now") |
| `.btn-ctf` | `.btn-surface` + brand-yellow ring and glow | THE stand-out button. Reserved for "Play the CTF" |
| `.btn-trail` | Brand gradient fill | Festive high-emphasis on dark/neutral surfaces |
| `.btn-ghost` | Outline only, inherits text colour | Secondary actions |

Other helpers:

- `.card` — bordered white / `ink-soft` panel, theme-aware.
- `.eyebrow`, `.h-section` — section label + heading pair.
- `.container-site` — page gutter (max-w-6xl).
- `.trail-text` — gradient text for **normal page backgrounds**. It swaps to darker stops
  in light mode so it stays readable on white.
- `.trail-text-bright` — gradient text for **always-dark (`bg-ink`) surfaces**. Always the
  bright stops. ⚠️ Using plain `.trail-text` on a `bg-ink` panel renders dark-on-dark in
  light mode — this was a real bug on the CTF page; don't reintroduce it.
- `.on-gradient` — put this on any section with `bg-trail`. It sets white text (+ soft
  shadow) in light mode and ink text in dark mode, and children inherit automatically.
  Every gradient hero must use it; never hard-code `text-ink` or `text-white` there.

### 3.3 Dark mode rules

Dark mode is **class-based** (`darkMode: 'class'`): an inline script in
`app/layout.jsx` applies the saved/system theme before first paint (no flash), and
`components/ThemeToggle.jsx` persists the choice to `localStorage.theme`.

When writing any new UI, follow this checklist:

1. Every colour utility needs a `dark:` counterpart (`text-slate-600 dark:text-slate-300`,
   `border-slate-200 dark:border-white/10`, …) **unless** the element sits on a surface
   that is the same in both themes (e.g. inside `bg-ink` panels or on `bg-trail` with
   `.on-gradient` handling it).
2. On `bg-trail` → use `.on-gradient`. On `bg-ink` → use `.trail-text-bright`, white text,
   and `white/N` opacity utilities.
3. Links: `text-sign-blue dark:text-brand-blue` (the established pattern everywhere).
4. Test both themes before shipping: the toggle is in the header; or in dev tools run
   `localStorage.theme = 'dark'` (or `'light'`) and reload. Delete the key to re-follow
   the system preference.

---

## 4. Recipes

### Add / edit an event
Edit `data/schedule.json`. Copy an existing object:

```jsonc
{
  "slug": "quiz-night",          // URL: /events/quiz-night/  + quiz-night.ics
  "title": "Quiz Night",
  "icon": "mic",                 // one of: mic flag bbq film trophy drinks (components/Icon.jsx)
  "start": "18:00", "end": "21:00",  // 24h, Canberra time
  "venue": "melville",           // a key from data/venues.json
  "includes": "Free pizza",      // badge text, "" to hide
  "blurb": "One or two sentences shown on the card and event page.",
  "page": "",                    // set e.g. "/ctf" to send Details clicks to a dedicated page
  "links": { "humanitix": "", "rubric": "" }  // paste a URL → a Register button appears
}
```

That's it — schedule card, event page, and calendar file all appear on the next build.

### Add a venue or parking pin
Add a keyed object to `data/venues.json`:

- `kind: "venue"` → blue teardrop pin (first letter of `shortName`).
- `kind: "parking"` → yellow **P** car-park sign icon.
- `kind: "direction"` → green pin, excluded from map auto-zoom; the key `cbd` is also the
  target of the dashed "to the city" line drawn from Melville Hall (see
  `components/CampusMap.jsx`).

⚠️ Coordinates in the file are close approximations. Before launch, right-click the exact
spot in Google Maps → copy lat/lng → paste in. Keep the `gmaps` search URL human-checkable.

### Add a speaker / sponsor / PDF
Covered step-by-step in the [README](README.md#common-tasks). Short version: fill in the
JSON, drop the asset into `public/`, done. Missing images degrade gracefully (text shows
instead) — nothing breaks.

### Add a whole new page
1. Create `app/<route>/page.jsx` (copy `app/tech-talks/page.jsx` as a template — it shows
   the metadata export, JSON-LD block, gradient hero and two-column body).
2. Add it to the `nav` array at the top of `components/Header.jsx`.
3. If it has a date, add JSON-LD (`@type: Event`) like the existing pages so link previews
   and Google stay rich.

### Add a new content collection (announcements, gallery, FAQ…)
Follow the established pattern:
1. Create `data/announcements.json` (include a `_readme` key explaining the fields).
2. Export it from `lib/data.js`.
3. Write a small component that maps over it (see `SponsorWall.jsx` for the minimal
   example) and mount it on a page.
This keeps the "content = JSON" contract intact, so a git-based CMS (Decap, Tina, or the
GitHub web editor) can manage everything in `data/` with zero restructuring.

### Embed the CTF scoreboard / registration form
- Scoreboard: the CTF page sidebar (`app/ctf/page.jsx`, "Links" card) reserves space — an
  `<iframe>` to the noCTF scoreboard drops straight in.
- Registration: in `data/site.json` set `registration.mode` to `"embed"` and paste the
  form's embed URL into `embedUrl`. Switch back to `"link"` any time.

---

## 5. Asset URLs — the one real gotcha

The site may be served from a sub-path (e.g. `anucssa.github.io/techfest-website`).
`next/link` handles this automatically, **raw `<img>`/`<a>` tags do not**. So:

- Any reference to a file in `public/` must go through `asset('/path')` from `lib/data.js`.
- Any absolute URL for SEO (Open Graph, JSON-LD) must use `absUrl('/path')`.
- Deployment sets `NEXT_PUBLIC_BASE_PATH` (sub-path) and `NEXT_PUBLIC_SITE_URL`
  (canonical origin) — see `.github/workflows/deploy.yml` and the README's deployment
  section.

If an image or download 404s on GitHub Pages but works locally, a missing `asset()` call
is almost always why.

---

## 6. Build, verify, deploy

```bash
npm run dev     # local preview (http://localhost:3000)
npm run ics     # regenerate calendar files only (also runs automatically pre-build)
npm run build   # static export → out/
```

Pre-launch checklist:

- [ ] Verify every pin in `data/venues.json` against Google Maps (they're approximations,
      including the three car parks and Dendy).
- [ ] Replace Linktree placeholders in `site.json → socials` with direct URLs.
- [ ] Check both themes on every page (header toggle) — especially anything on `bg-trail`
      or `bg-ink` surfaces.
- [ ] Paste the deployed URL into Discord/Slack to confirm the Open Graph card renders.
- [ ] Drop approved ANU / School of Computing logos into `public/images/` (see README).

Deploy targets (Cloudflare Pages, GitHub Pages, Vercel, university hosting) are detailed
in the [README](README.md#deployment).
