// Central data access. Components import from here so the JSON layout
// can evolve without touching every page.
import site from '@/data/site.json';
import schedule from '@/data/schedule.json';
import venues from '@/data/venues.json';
import speakers from '@/data/speakers.json';
import sponsors from '@/data/sponsors.json';

export { site, schedule, venues, speakers, sponsors };

// Base path the site is served under (e.g. "/techfest-website" on GitHub Pages,
// "" on a root domain like techfest.cssa.club). Set via NEXT_PUBLIC_BASE_PATH.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Turns a public/ asset path into a correct, root-absolute URL for the current
// deployment. Raw <img>/<a> tags to files in public/ do NOT get Next's basePath
// automatically (only next/link and next/image do), so every such reference must
// go through this. External URLs are returned untouched.
//   asset('/downloads/x.pdf')  ->  '/techfest-website/downloads/x.pdf'  (or '/downloads/x.pdf' at root)
export function asset(path) {
  if (!path) return path;
  if (/^(https?:)?\/\//.test(path) || path.startsWith('mailto:') || path.startsWith('data:')) return path;
  return `${BASE_PATH}/${path.replace(/^\/+/, '')}`;
}

// Absolute public base URL of THIS deployment (origin + any sub-path), no trailing slash.
// Defaults to the canonical domain in site.json. Override with NEXT_PUBLIC_SITE_URL when the
// build is served somewhere else (e.g. https://anucssa.github.io/techfest-website on GitHub
// Pages) so Open Graph / JSON-LD URLs point at a host that actually resolves — otherwise link
// previews break because scrapers can't fetch the image.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || site.url).replace(/\/+$/, '');

// Absolute https:// URL for a public asset or route. Required by metadata (OG/Twitter image)
// and JSON-LD, which must use full URLs, not root-relative paths.
export function absUrl(path = '/') {
  return `${SITE_URL}/${String(path).replace(/^\/+/, '')}`;
}

export function allEvents() {
  return schedule.days.flatMap((day) =>
    day.events.map((e) => ({ ...e, day: day.label, date: day.date, dayId: day.id }))
  );
}

export function eventBySlug(slug) {
  return allEvents().find((e) => e.slug === slug) || null;
}

export function venueOf(event) {
  return venues[event.venue] || null;
}

// "10:00" on "2026-07-31" -> ISO string with Canberra offset (AEST in winter)
export function toISO(date, time) {
  return `${date}T${time}:00+10:00`;
}

export function formatTime(t) {
  const [h, m] = t.split(':').map(Number);
  const suffix = h >= 12 ? 'pm' : 'am';
  const hr = ((h + 11) % 12) + 1;
  return m ? `${hr}:${String(m).padStart(2, '0')}${suffix}` : `${hr}${suffix}`;
}
