// Generates one .ics file per event (plus a whole-festival file) from
// data/schedule.json into public/calendar/. Runs automatically before
// every build (see the "prebuild" script in package.json).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const schedule = JSON.parse(readFileSync(join(root, 'data/schedule.json'), 'utf8'));
const venues = JSON.parse(readFileSync(join(root, 'data/venues.json'), 'utf8'));
const site = JSON.parse(readFileSync(join(root, 'data/site.json'), 'utf8'));

const outDir = join(root, 'public/calendar');
mkdirSync(outDir, { recursive: true });

const dt = (date, time) => `${date.replaceAll('-', '')}T${time.replace(':', '')}00`;
const esc = (s) => String(s || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');

function vevent(e, day) {
  const v = venues[e.venue] || {};
  return [
    'BEGIN:VEVENT',
    `UID:${e.slug}@techfest.cssa.club`,
    `DTSTAMP:${dt(day.date, e.start)}Z`,
    `DTSTART;TZID=Australia/Canberra:${dt(day.date, e.start)}`,
    `DTEND;TZID=Australia/Canberra:${dt(day.date, e.end)}`,
    `SUMMARY:${esc(`${e.title} — ${site.name}`)}`,
    `DESCRIPTION:${esc(`${e.blurb} ${site.url}/events/${e.slug}/`)}`,
    `LOCATION:${esc(v.address || v.name || '')}`,
    `URL:${site.url}/events/${e.slug}/`,
    'END:VEVENT',
  ].join('\r\n');
}

const wrap = (body) =>
  ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//ANU CSSA//BushWeekTechFest//EN', body, 'END:VCALENDAR'].join('\r\n');

const all = [];
for (const day of schedule.days) {
  for (const e of day.events) {
    const v = vevent(e, day);
    all.push(v);
    writeFileSync(join(outDir, `${e.slug}.ics`), wrap(v));
  }
}
writeFileSync(join(outDir, 'bush-week-tech-fest.ics'), wrap(all.join('\r\n')));
console.log(`Wrote ${all.length + 1} calendar files to public/calendar/`);
