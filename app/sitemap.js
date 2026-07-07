import { site, allEvents } from '@/lib/data';
export default function sitemap() {
  const pages = ['', 'tech-talks/', 'ctf/', ...allEvents().map((e) => `events/${e.slug}/`)];
  return pages.map((p) => ({ url: `${site.url}/${p}`, lastModified: new Date() }));
}
