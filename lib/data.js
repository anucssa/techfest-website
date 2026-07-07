// Central data access. Components import from here so the JSON layout
// can evolve without touching every page.
import site from '@/data/site.json';
import schedule from '@/data/schedule.json';
import venues from '@/data/venues.json';
import speakers from '@/data/speakers.json';
import sponsors from '@/data/sponsors.json';

export { site, schedule, venues, speakers, sponsors };

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
