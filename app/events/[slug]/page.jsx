import Link from 'next/link';
import { notFound } from 'next/navigation';
import Icon from '@/components/Icon';
import EventActions from '@/components/EventActions';
import { site, allEvents, eventBySlug, venues, formatTime, toISO } from '@/lib/data';

// One page per schedule entry, generated at build time from data/schedule.json.
export function generateStaticParams() {
  return allEvents().map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }) {
  const e = eventBySlug(params.slug);
  if (!e) return {};
  return {
    title: e.title,
    description: `${e.blurb} ${e.day}, ${formatTime(e.start)}–${formatTime(e.end)}, ${venues[e.venue].shortName}.`,
    openGraph: { title: `${e.title} · ${site.name} 2026`, description: e.blurb },
  };
}

export default function EventPage({ params }) {
  const e = eventBySlug(params.slug);
  if (!e) notFound();
  const v = venues[e.venue];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `${e.title} — ${site.name} 2026`,
    description: e.blurb,
    startDate: toISO(e.date, e.start),
    endDate: toISO(e.date, e.end),
    location: { '@type': 'Place', name: v.name, address: v.address },
    organizer: { '@type': 'Organization', name: site.organiser, url: 'https://cssa.club' },
    isAccessibleForFree: true,
    url: `${site.url}/events/${e.slug}/`,
    superEvent: { '@type': 'Festival', name: `${site.name} 2026`, url: site.url },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-trail text-ink">
        <div className="container-site py-14 sm:py-20">
          <nav aria-label="Breadcrumb" className="font-mono text-sm font-bold">
            <Link href="/#schedule" className="underline-offset-4 hover:underline">← Full schedule</Link>
          </nav>
          <p className="mt-6 font-mono text-sm font-bold uppercase tracking-[0.25em]">{e.day}</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-6xl">{e.title}</h1>
          <p className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-lg font-bold">
            <span className="inline-flex items-center gap-2"><Icon name="clock" /> {formatTime(e.start)} – {formatTime(e.end)}</span>
            <span className="inline-flex items-center gap-2"><Icon name="pin" /> {v.shortName}</span>
            {e.includes ? <span className="rounded-full bg-ink/15 px-3 py-1 text-sm">{e.includes}</span> : null}
          </p>
        </div>
      </section>

      <div className="container-site grid gap-10 py-12 sm:py-16 lg:grid-cols-[2fr,1fr]">
        <div>
          <p className="max-w-2xl text-xl leading-relaxed text-slate-700 dark:text-slate-200">{e.blurb}</p>
          <div className="mt-8">
            <EventActions event={e} venue={v} />
          </div>
          {e.page ? (
            <p className="mt-8">
              <Link href={e.page} className="inline-flex items-center gap-2 text-lg font-bold text-sign-blue hover:underline dark:text-brand-blue">
                More on the dedicated page <Icon name="arrow" className="h-5 w-5" />
              </Link>
            </p>
          ) : null}
        </div>
        <aside className="card h-fit p-6">
          <h2 className="text-lg font-extrabold text-ink dark:text-white">Venue</h2>
          <p className="mt-2 font-semibold">{v.name}</p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{v.address}</p>
          <a href={v.gmaps} target="_blank" rel="noopener noreferrer" className="btn-primary mt-4 w-full text-sm">
            <Icon name="pin" className="h-4 w-4" /> Open in Google Maps
          </a>
          <Link href="/#map" className="btn-ghost mt-2 w-full text-sm">Campus map &amp; parking</Link>
        </aside>
      </div>
    </>
  );
}
