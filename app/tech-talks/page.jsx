import Link from 'next/link';
import Icon from '@/components/Icon';
import EventActions from '@/components/EventActions';
import { site, speakers, eventBySlug, venues, formatTime, asset, absUrl } from '@/lib/data';

export const metadata = {
  title: 'Tech Talks Conference',
  description:
    'A day of computing and cybersecurity talks from industry and academic speakers — Friday 31 July 2026, 10am–4pm, Birch Building Innovation Space, ANU.',
  openGraph: {
    type: 'website',
    url: absUrl('/tech-talks/'),
    siteName: site.name,
    title: `Tech Talks Conference · ${site.name} 2026`,
    description:
      'A day of computing and cybersecurity talks from industry and academic speakers — Friday 31 July 2026, 10am–4pm, Birch Building Innovation Space, ANU.',
    images: [{ url: absUrl('/images/og-tech-talks.png'), width: 1200, height: 630, alt: 'Tech Talks Conference — Friday 31 July 2026, ANU' }],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Tech Talks Conference · ${site.name} 2026`,
    images: [absUrl('/images/og-tech-talks.png')],
  },
};

// "11:45" + "12:00" -> "11:45am – 12:00pm"
const timeRange = (a, b) => `${formatTime(a)} – ${formatTime(b)}`;

/* The join button for the remotely-delivered CommBank panel. Data-driven:
   inactive until the link is pasted into site.json → remote.commbankCallUrl. */
function VideoCallButton() {
  const url = site.remote?.commbankCallUrl;
  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="btn-trail text-sm">
        <Icon name="external" className="h-4 w-4" /> Register to join the video call
      </a>
    );
  }
  return (
    <span aria-disabled="true" className="btn-ghost cursor-default text-sm !font-semibold opacity-60">
      <Icon name="clock" className="h-4 w-4" /> Video call link coming soon
    </span>
  );
}

function SpeakerLinks({ s }) {
  return (
    <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold">
      {s.linkedin ? <a className="inline-flex items-center gap-1 text-sign-blue hover:underline dark:text-brand-blue" href={s.linkedin} target="_blank" rel="noopener noreferrer"><Icon name="linkedin" className="h-4 w-4" />LinkedIn</a> : null}
      {s.website ? <a className="inline-flex items-center gap-1 text-sign-blue hover:underline dark:text-brand-blue" href={s.website} target="_blank" rel="noopener noreferrer"><Icon name="globe" className="h-4 w-4" />Website</a> : null}
      {s.slides ? <a className="inline-flex items-center gap-1 text-sign-blue hover:underline dark:text-brand-blue" href={asset(s.slides)}><Icon name="download" className="h-4 w-4" />Slides</a> : null}
      {s.recording ? <a className="inline-flex items-center gap-1 text-sign-blue hover:underline dark:text-brand-blue" href={asset(s.recording)}><Icon name="film" className="h-4 w-4" />Recording</a> : null}
    </p>
  );
}

function Bio({ label, text }) {
  if (!text) return null;
  return (
    <details className="group mt-3 rounded-xl bg-slate-50 dark:bg-white/5">
      <summary className="flex cursor-pointer list-none items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-ink marker:hidden hover:bg-slate-100 dark:text-white dark:hover:bg-white/10 [&::-webkit-details-marker]:hidden">
        <Icon name="arrow" className="h-4 w-4 transition-transform group-open:rotate-90" />
        {label}
      </summary>
      <div className="space-y-3 px-4 pb-4 pt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {String(text).split(/\n{2,}/).map((para, i) => <p key={i}>{para}</p>)}
      </div>
    </details>
  );
}

function BreakRow({ b }) {
  return (
    <li className="rounded-2xl border-2 border-dashed border-brand-blue/40 bg-trail-soft p-5">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <p className="inline-flex items-center gap-2 text-lg font-extrabold text-ink dark:text-white">
          <Icon name={b.icon || 'clock'} className="h-5 w-5 text-brand-blue" /> {b.title}
        </p>
        <p className="font-mono text-sm font-bold text-slate-600 dark:text-slate-300">{timeRange(b.time, b.end)}</p>
      </div>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{b.note}</p>
    </li>
  );
}

function PanelistCard({ p }) {
  return (
    <li className="rounded-xl border border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center gap-3">
        {p.photo ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={asset(p.photo)} alt={`Portrait of ${p.name}`} className="h-14 w-14 shrink-0 rounded-full object-cover" />
        ) : (
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-trail-soft font-extrabold text-ink dark:text-white">
            {p.name[0]}
          </span>
        )}
        <div className="min-w-0">
          <p className="font-extrabold leading-tight text-ink dark:text-white">{p.name}</p>
          <p className="mt-0.5 text-xs font-semibold leading-snug text-slate-500 dark:text-slate-400">{p.role}</p>
          <p className="mt-0.5 flex gap-3 text-xs font-semibold">
            {p.linkedin ? <a className="text-sign-blue hover:underline dark:text-brand-blue" href={p.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a> : null}
            {p.website ? <a className="text-sign-blue hover:underline dark:text-brand-blue" href={p.website} target="_blank" rel="noopener noreferrer">Website</a> : null}
          </p>
        </div>
      </div>
      {p.bio ? <p className="mt-2.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300">{p.bio}</p> : null}
    </li>
  );
}

function PanelRow({ s }) {
  return (
    <li className="card overflow-hidden">
      <div className="border-b border-slate-200 bg-trail-soft px-6 py-2.5 dark:border-white/10">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink dark:text-white">Panel session</p>
      </div>
      <div className="p-6">
        <p className="font-mono text-sm font-semibold text-slate-500 dark:text-slate-400">
          {s.time ? `${formatTime(s.time)} · ` : ''}{s.slot}
        </p>
        <h3 className="text-xl font-extrabold text-ink dark:text-white">{s.talkTitle}</h3>
        <p className="mt-1 font-semibold">
          {s.company ? (
            <a href={s.companyUrl} target="_blank" rel="noopener noreferrer" className="text-sign-blue hover:underline dark:text-brand-blue">
              {s.company}
            </a>
          ) : null}
        </p>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{s.abstract}</p>
        {s.videoCallJoin ? (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <VideoCallButton />
            <Link href="/remote/" className="text-sm font-bold text-sign-blue hover:underline dark:text-brand-blue">
              About remote participation →
            </Link>
          </div>
        ) : null}
        {s.panelists?.length ? (
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {s.panelists.map((p) => <PanelistCard key={p.name} p={p} />)}
          </ul>
        ) : null}
        <SpeakerLinks s={s} />
      </div>
    </li>
  );
}

function SpeakerRow({ s }) {
  return (
    <li className="card flex flex-col gap-4 p-6 sm:flex-row">
      {s.photo ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={asset(s.photo)} alt={`Portrait of ${s.name}`} className="h-24 w-24 shrink-0 rounded-2xl object-cover" />
      ) : null}
      <div className="min-w-0 flex-1">
        <p className="font-mono text-sm font-semibold text-slate-500 dark:text-slate-400">
          {s.time ? `${formatTime(s.time)} · ` : ''}{s.slot}
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
        <Bio label="About the speaker" text={s.bio} />
        <SpeakerLinks s={s} />
      </div>
    </li>
  );
}

export default function TechTalks() {
  const event = eventBySlug('tech-talks');
  const venue = venues[event.venue];
  const list = speakers.speakers;

  // Interleave talks and breaks into one programme, ordered by start time.
  const items = [
    ...list.map((s) => ({ kind: s.panel ? 'panel' : 'talk', time: s.time, data: s })),
    ...(speakers.breaks || []).map((b) => ({ kind: 'break', time: b.time, data: b })),
  ].sort((a, b) => a.time.localeCompare(b.time));

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
            <h2 className="h-section">Programme</h2>
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
                {items.map((it) =>
                  it.kind === 'break' ? (
                    <BreakRow key={`break-${it.time}`} b={it.data} />
                  ) : it.kind === 'panel' ? (
                    <PanelRow key={it.data.talkTitle} s={it.data} />
                  ) : (
                    <SpeakerRow key={it.data.talkTitle} s={it.data} />
                  )
                )}
              </ol>
            )}
          </div>

          <aside className="space-y-6">
            <div className="card p-6">
              <h2 className="text-lg font-extrabold text-ink dark:text-white">Day at a glance</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex gap-3"><Icon name="clock" className="h-5 w-5 shrink-0 text-brand-blue" /><dd>{formatTime(event.start)} – {formatTime(event.end)}, talks in 25 and 50 minute slots (incl. Q&amp;A)</dd></div>
                <div className="flex gap-3"><Icon name="pin" className="h-5 w-5 shrink-0 text-brand-blue" /><dd>{venue.name}</dd></div>
                <div className="flex gap-3"><Icon name="bbq" className="h-5 w-5 shrink-0 text-brand-blue" /><dd><strong>Morning Tea 11:45am–12pm</strong> and <strong>Lunch 1–1:45pm</strong> provided — indicate dietary requirements when registering on Humanitix</dd></div>
                <div className="flex gap-3"><Icon name="flag" className="h-5 w-5 shrink-0 text-brand-blue" /><dd>Followed by the BushBash CTF launch at 5pm in Melville Hall</dd></div>
              </dl>
            </div>
            <div className="card p-6">
              <h2 className="text-lg font-extrabold text-ink dark:text-white">Joining remotely?</h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                The CommBank panel is delivered by video call, and the BushBash CTF can be played online from
                anywhere. See what remote participation looks like.
              </p>
              <Link href="/remote/" className="btn-primary mt-4 w-full text-sm">
                <Icon name="globe" className="h-4 w-4" /> Remote participation
              </Link>
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
