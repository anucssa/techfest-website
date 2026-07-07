import Icon from '@/components/Icon';
import EventActions from '@/components/EventActions';
import { site, speakers, eventBySlug, venues, formatTime, asset } from '@/lib/data';

export const metadata = {
  title: 'Tech Talks Conference',
  description:
    'A day of computing and cybersecurity talks from industry and academic speakers — Friday 31 July 2026, 10am–4pm, Birch Building Innovation Space, ANU.',
};

export default function TechTalks() {
  const event = eventBySlug('tech-talks');
  const venue = venues[event.venue];
  const list = speakers.speakers;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `Tech Talks Conference — ${site.name} 2026`,
    startDate: '2026-07-31T10:00:00+10:00',
    endDate: '2026-07-31T16:00:00+10:00',
    location: { '@type': 'Place', name: venue.name, address: venue.address },
    organizer: { '@type': 'Organization', name: site.organiser, url: 'https://cssa.club' },
    isAccessibleForFree: true,
    url: `${site.url}/tech-talks/`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-trail on-gradient">
        <div className="container-site py-16 sm:py-20">
          <p className="font-mono text-sm font-bold uppercase tracking-[0.25em]">Friday 31 July · 10am–4pm · {venue.shortName}</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">Tech Talks Conference</h1>
          <p className="mt-4 max-w-2xl text-xl font-semibold">
            Accessible computing and cybersecurity talks drawn from speakers&apos; real experience in industry and
            academia — just before the 5pm launch of the BushBash CTF.
          </p>
        </div>
      </section>

      <div className="container-site py-12 sm:py-16">
        <EventActions event={event} venue={venue} />

        <div className="mt-12 grid gap-10 lg:grid-cols-[2fr,1fr]">
          <div>
            <h2 className="h-section">Speakers</h2>
            {list.length === 0 ? (
              <div className="card mt-6 p-8 text-center">
                <Icon name="mic" className="mx-auto h-10 w-10 text-brand-blue" />
                <p className="mt-4 text-lg font-bold text-ink dark:text-white">Speakers announced soon</p>
                <p className="mx-auto mt-2 max-w-md text-slate-600 dark:text-slate-300">
                  The speaker line-up is being finalised. Want to give a talk? Read the{' '}
                  <a href={asset("/downloads/BWTF-Speaker-Brief.pdf")} className="font-semibold text-sign-blue underline dark:text-brand-blue">
                    Speaker Brief
                  </a>{' '}
                  and get in touch at{' '}
                  <a href={`mailto:${site.contacts[0].email}`} className="font-semibold text-sign-blue underline dark:text-brand-blue">
                    {site.contacts[0].email}
                  </a>.
                </p>
              </div>
            ) : (
              <ol className="mt-6 space-y-5">
                {list.map((s) => (
                  <li key={s.name} className="card flex flex-col gap-4 p-6 sm:flex-row">
                    {s.photo ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={asset(s.photo)} alt={`Portrait of ${s.name}`} className="h-24 w-24 shrink-0 rounded-2xl object-cover" />
                    ) : null}
                    <div className="min-w-0">
                      <p className="font-mono text-sm font-semibold text-slate-500 dark:text-slate-400">
                        {s.time ? `${s.time} · ` : ''}{s.slot}
                      </p>
                      <h3 className="text-xl font-extrabold text-ink dark:text-white">{s.talkTitle}</h3>
                      <p className="mt-1 font-semibold">
                        {s.name}
                        {s.company ? (
                          <>
                            {' · '}
                            <a href={s.companyUrl} target="_blank" rel="noopener noreferrer" className="text-sign-blue hover:underline dark:text-brand-blue">
                              {s.company}
                            </a>
                          </>
                        ) : null}
                      </p>
                      <p className="mt-2 text-slate-600 dark:text-slate-300">{s.abstract}</p>
                      <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold">
                        {s.linkedin ? <a className="inline-flex items-center gap-1 text-sign-blue hover:underline dark:text-brand-blue" href={s.linkedin} target="_blank" rel="noopener noreferrer"><Icon name="linkedin" className="h-4 w-4" />LinkedIn</a> : null}
                        {s.website ? <a className="inline-flex items-center gap-1 text-sign-blue hover:underline dark:text-brand-blue" href={s.website} target="_blank" rel="noopener noreferrer"><Icon name="globe" className="h-4 w-4" />Website</a> : null}
                        {s.slides ? <a className="inline-flex items-center gap-1 text-sign-blue hover:underline dark:text-brand-blue" href={asset(s.slides)}><Icon name="download" className="h-4 w-4" />Slides</a> : null}
                        {s.recording ? <a className="inline-flex items-center gap-1 text-sign-blue hover:underline dark:text-brand-blue" href={asset(s.recording)}><Icon name="film" className="h-4 w-4" />Recording</a> : null}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>

          <aside className="space-y-6">
            <div className="card p-6">
              <h2 className="text-lg font-extrabold text-ink dark:text-white">Day at a glance</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex gap-3"><Icon name="clock" className="h-5 w-5 shrink-0 text-brand-blue" /><dd>{formatTime(event.start)} – {formatTime(event.end)}, talks in 25 and 50 minute slots (incl. Q&amp;A)</dd></div>
                <div className="flex gap-3"><Icon name="pin" className="h-5 w-5 shrink-0 text-brand-blue" /><dd>{venue.name}</dd></div>
                <div className="flex gap-3"><Icon name="bbq" className="h-5 w-5 shrink-0 text-brand-blue" /><dd>Light refreshments provided throughout the day</dd></div>
                <div className="flex gap-3"><Icon name="flag" className="h-5 w-5 shrink-0 text-brand-blue" /><dd>Followed by the BushBash CTF launch at 5pm in Melville Hall</dd></div>
              </dl>
            </div>
            <div className="card p-6">
              <h2 className="text-lg font-extrabold text-ink dark:text-white">Talk themes</h2>
              <ul className="mt-4 list-inside space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <li>Ideas talks — the current landscape of tech and cyber, and the computing skills that outlast AI</li>
                <li>Technical talks — emerging skills in computing, pen-testing and zero-day research; secure coding in the age of vibe coding</li>
                <li>Story talks — cyberattack true crime, incident response, and post-incident review</li>
              </ul>
              <a href={asset("/downloads/BWTF-Speaker-Brief.pdf")} download className="btn-primary mt-5 w-full text-sm">
                <Icon name="download" className="h-4 w-4" /> Speaker Brief (PDF)
              </a>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
