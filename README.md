# Bush Week Tech Fest 2026 — Event Website

The official site for the ANU CSSA Bush Week Tech Fest (31 July – 2 August 2026), built to run at
**techfest.cssa.club** or on university hosting.

Built with **Next.js + React + Tailwind CSS**, exported as a fully **static site** (plain HTML/CSS/JS —
no server required). Aileron, the official brand typeface, is self-hosted via Fontsource. The colour
system is derived from the Canva brand gradient: `#ffbb34` → `#67acf1` → `#3add41`.

---

## Quick start

```bash
npm install      # once
npm run dev      # local preview at http://localhost:3000
npm run build    # production build → static site in out/
```

Everything in `out/` after a build is the deployable website.

---

## How the site is organised (the 30-second version)

**All event content lives in `data/*.json`. You should almost never need to touch a component to
update the site.**

| File | Controls |
|---|---|
| `data/site.json` | Names, dates, description, CTF links, registration mode, socials, contacts, downloads, footer logos, disclaimer |
| `data/schedule.json` | The entire programme. Each entry automatically becomes a schedule row, a page at `/events/<slug>/`, and a downloadable `.ics` calendar file |
| `data/venues.json` | Venue names, addresses, map coordinates, Google Maps links, parking pins |
| `data/speakers.json` | Tech Talks speaker list (photos, abstracts, LinkedIn, slides, recordings) |
| `data/sponsors.json` | Sponsor wall (name, URL, logo path) |

Pages live in `app/`, reusable UI in `components/`, and `scripts/generate-ics.mjs` regenerates the
calendar files automatically before every build.

---

## Common tasks

### Update the Event Brief or Speaker Brief PDF
Replace the file, keeping the same name:
- `public/downloads/BWTF-Event-Brief.pdf`
- `public/downloads/BWTF-Speaker-Brief.pdf`

The download buttons never change, so links you've already shared keep working.

### Add or change an event
Edit `data/schedule.json` — copy an existing event object and adjust. Fields:
`slug` (URL), `title`, `icon` (one of `mic flag bbq film trophy drinks`), `start`/`end` (24h),
`venue` (a key from `venues.json`), `includes` (badge text), `blurb`, and `links`.

When a **Humanitix or Rubric listing** goes live, paste its URL into that event's
`links.humanitix` or `links.rubric` — a registration button appears on the event page automatically.

### Add a Tech Talks speaker
1. Copy the `template` object in `data/speakers.json` into the `speakers` array and fill it in.
2. Drop a square photo into `public/images/speakers/`.
3. Later, set `slides` / `recording` to add download buttons — no other changes needed.

### Add a sponsor
1. Add `{ "name": ..., "url": ..., "logo": "/sponsors/<file>.png" }` to `data/sponsors.json`.
2. Drop the logo PNG into `public/sponsors/` with that filename.
   (Until the PNG exists, the tile shows the sponsor's name as text — nothing breaks.)

**Expected logo filenames for the current sponsor list** (drop your PNGs in `public/sponsors/`):
`jane-street.png`, `imc.png`, `citadel-securities.png`, `atlassian.png`, `optiver.png`,
`infosect.png`, `bsides-canberra.png`, `tanto.png`, `ntt-data.png`.

### Swap the registration form
In `data/site.json` → `registration`:
- `"mode": "link"` shows a big button to `linkUrl` (currently the CSSA Linktree).
- `"mode": "embed"` embeds `embedUrl` in an iframe — paste a Google Form's embed URL
  (Form → Send → `<>` → copy the `src`), or a Humanitix/Rubric embed URL, and it just works.

### Footer logos (ANU / School of Computing)
Official ANU and SoCo logos are **not** bundled (they're the university's trademarks — get the
approved files from your ANU contact). Drop them at `public/images/anu-logo.png` and
`public/images/soco-logo.png`; until then the footer shows styled text links.

---

## ⚠️ Before launch — verify these

1. **Map coordinates** in `data/venues.json` are close approximations. Open each venue in Google
   Maps, right-click the exact spot → copy lat/lng → paste into the JSON. The two **parking**
   entries (Baldessin, Willows) especially need confirming against current ANU parking rules.
2. **Social links** — Discord, Instagram and Facebook currently point at the Linktree; replace with
   direct URLs in `data/site.json`.
3. **OG preview** — after deploying, paste the URL into a Discord/Slack message or
   [opengraph.xyz](https://www.opengraph.xyz) to confirm the rich link preview renders.

---

## Deployment

The build is static, so any of these work:

**Cloudflare Pages (recommended for cssa.club):** connect the repo, build command `npm run build`,
output directory `out`. Then add `techfest.cssa.club` as a custom domain (Cloudflare will guide the
CNAME setup since cssa.club is likely already on Cloudflare).

**GitHub Pages:** the included workflow (`.github/workflows/deploy.yml`) deploys on every push to
`main`. Set repo Settings → Pages → Source: *GitHub Actions*. For a custom domain, add
`techfest.cssa.club` in the Pages settings and create a CNAME record. If you serve from
`username.github.io/<repo>` instead, uncomment the `NEXT_PUBLIC_BASE_PATH` line in the workflow.

**Vercel:** import the repo; zero config needed.

**University hosting:** run `npm run build` and hand the ANU web team the contents of `out/` — it's
plain files, no runtime needed. If they host it under a sub-path, build with
`NEXT_PUBLIC_BASE_PATH=/that/path npm run build`.

After changing content, redeploy (push to `main` if using CI, or re-run the build and re-upload).

---

## Extending the site (planned features)

The architecture anticipates the roadmap items:

- **Speaker slides & recordings** — fields already exist per speaker; buttons appear when set.
- **CTF scoreboard embed / countdown** — the CTF page (`app/ctf/page.jsx`) has a sidebar card
  reserved for this; an iframe to the noCTF scoreboard drops straight in.
- **Live announcements / photo gallery / sponsor spotlights** — follow the established pattern:
  create `data/announcements.json`, a component that maps over it, and mount it on a page.
- **Admin CMS** — because all content is JSON, a git-based CMS (Decap CMS, TinaCMS, or even
  GitHub's web editor) can be pointed at `data/` with no restructuring.

---

## Accessibility & quality checklist (already built in)

- Semantic landmarks, skip-to-content link, visible focus rings, `aria` labels on interactive maps
  and toggles, `prefers-reduced-motion` respected.
- Dark mode (system-aware with a manual toggle, no flash on load).
- schema.org `Festival`/`Event` JSON-LD on every page, Open Graph + Twitter cards, sitemap,
  robots.txt, web manifest, favicon and Apple touch icon.
- `.ics` calendar files for every event plus the whole festival.
- Fully responsive from ~360 px up; no external font/CDN dependencies except OpenStreetMap tiles
  for the interactive map.
