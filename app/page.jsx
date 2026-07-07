import Link from 'next/link';
import Icon from '@/components/Icon';
import Countdown from '@/components/Countdown';
import Schedule from '@/components/Schedule';
import SponsorWall from '@/components/SponsorWall';
import CampusMap from '@/components/CampusMap';
import { site, asset, absUrl } from '@/lib/data';

// schema.org structured data → rich results & link previews for the festival.
const eventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Festival',
  name: `${site.name} 2026`,
  description: site.description,
  startDate: site.startDate,
  endDate: site.endDate,
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  location: {
    '@type': 'Place',
    name: 'Australian National University',
    address: { '@type': 'PostalAddress', addressLocality: 'Acton', addressRegion: 'ACT', postalCode: '2601', addressCountry: 'AU' },
  },
  organizer: { '@type': 'Organization', name: site.organiser, url: 'https://cssa.club' },
  image: [absUrl("/images/og.png")],
  url: site.url,
  isAccessibleForFree: true,
};

function Section({ id, eyebrow, title, children, lead }) {
  return (
    <section id={id} className="container-site scroll-mt-20 py-14 sm:py-20">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="h-section mt-2">{title}</h2>
      {lead ? <p className="mt-4 max-w-3xl text-lg text-slate-600 dark:text-slate-300">{lead}</p> : null}
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />

      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden bg-trail on-gradient">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_80%_110%,rgba(20,18,48,.28),transparent_70%)]" aria-hidden="true" />
        <div className="container-site relative flex flex-col gap-8 py-20 sm:py-28">
          <p className="animate-fade-up font-mono text-sm font-bold uppercase tracking-[0.25em]">
            ANU CSSA presents · Bush Week 2026
          </p>
          <h1 className="max-w-4xl animate-fade-up text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl" style={{ animationDelay: '.08s' }}>
            Bush Week<br />Tech Fest
          </h1>
          <p className="max-w-2xl animate-fade-up text-xl font-semibold sm:text-2xl" style={{ animationDelay: '.16s' }}>
            A student-led tech festival celebrating Computer Science and Cybersecurity —{' '}
            <strong>{site.dateDisplay}</strong>. {site.tagline}
          </p>
          <div className="flex animate-fade-up flex-wrap gap-3" style={{ animationDelay: '.24s' }}>
            <Link href="/#register" className="btn-surface text-lg">Register now</Link>
            <a href={site.ctf.playUrl} target="_blank" rel="noopener noreferrer" className="btn-ctf text-lg">
              <Icon name="flag" /> Play the CTF
            </a>
            <Link href="/#schedule" className="btn border-2 border-white/60 text-lg font-bold hover:bg-white/10 dark:border-ink/50 dark:hover:bg-ink/10">
              View schedule
            </Link>
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '.32s' }}>
            <Countdown target={site.startDate} />
          </div>
        </div>
      </section>

      {/* ---------- OVERVIEW ---------- */}
      <Section
        id="overview"
        eyebrow="The festival"
        title="Three days of computing, cyber, and community"
        lead="The ANU Computer Science Students' Association — the largest computing-related student society at ANU, with a history of over 30 years — is running its first ever Tech Fest during Bush Week: a 48-hour capture-the-flag competition, a day of Tech Talks with industry speakers, free BBQs, a movie night, and a networking and drinks night to cap it all off."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: 'mic', title: 'Tech Talks Conference', text: 'A full Friday of accessible computing and cybersecurity talks from industry and academic speakers — ideas talks, technical deep dives, and incident-response true crime.', href: '/tech-talks/' },
            { icon: 'flag', title: 'BushBash CTF', text: 'A beginner-friendly, team-based 48-hour CTF across OSINT, Rev, Pwn, Web, Crypto and Misc — with a live scoreboard and a serious prize pool.', href: '/ctf/' },
            { icon: 'bbq', title: 'Free BBQs', text: 'Free BBQ lunches on Fellows Oval on Saturday and Sunday, plus refreshments throughout the festival.', href: '/events/bbq-saturday/' },
            { icon: 'film', title: 'Movie Night', text: 'Saturday evening wind-down in the city after a full day of flags.', href: '/events/movie-night/' },
            { icon: 'drinks', title: 'Networking & Drinks', text: 'Meet speakers, sponsors, and the ANU computing and cyber community on Sunday night.', href: '/events/networking-drinks/' },
            { icon: 'trophy', title: 'Finale & Prizes', text: 'CTF closing ceremony with winner announcements, prizes, and pizza dinner on Sunday.', href: '/events/ctf-finale/' },
          ].map((c) => (
            <Link key={c.title} href={c.href} className="card group p-6 transition hover:-translate-y-0.5 hover:shadow-md">
              <span className="inline-flex rounded-xl bg-trail-soft p-3 text-ink dark:text-white">
                <Icon name={c.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-extrabold text-ink dark:text-white">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{c.text}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-sign-blue group-hover:gap-2 dark:text-brand-blue">
                Details <Icon name="arrow" className="h-4 w-4 transition-all" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* ---------- SCHEDULE ---------- */}
      <div className="bg-slate-50 dark:bg-ink-soft/50">
        <Section
          id="schedule"
          eyebrow="Programme"
          title="Event schedule"
          lead="Every event is free for students. Tap an event for full details, registration links, calendar files, and directions."
        >
          <Schedule />
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={asset("/calendar/bush-week-tech-fest.ics")} download className="btn-primary text-sm">
              <Icon name="calendar" className="h-4 w-4" /> Add the whole festival to your calendar
            </a>
          </div>
        </Section>
      </div>

      {/* ---------- CTF ---------- */}
      <section id="ctf" className="container-site scroll-mt-20 py-14 sm:py-20">
        <div className="overflow-hidden rounded-3xl bg-ink text-white shadow-xl">
          <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-[1.2fr,1fr]">
            <div>
              <p className="font-mono text-sm font-bold uppercase tracking-[0.25em] text-brand-yellow">48 hours · live scoreboard · prizes</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                BushBash <span className="trail-text-bright">CTF</span>
              </h2>
              <p className="mt-4 max-w-xl text-lg text-slate-300">
                A beginner-friendly, team-based capture-the-flag running from the Friday-night launch to the Sunday
                finale. Challenges across OSINT, Reverse Engineering, Binary Exploitation, Web, Crypto and Misc —
                built by CSSA, aiming for {site.ctf.targetParticipants} players.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={site.ctf.playUrl} target="_blank" rel="noopener noreferrer" className="btn-trail text-lg">
                  <Icon name="flag" /> Play the CTF — July 31st
                </a>
                <a href={site.ctf.ctftimeUrl} target="_blank" rel="noopener noreferrer" className="btn border-2 border-white/30 font-bold text-white hover:border-white/70">
                  CTFtime listing <Icon name="external" className="h-4 w-4" />
                </a>
                <Link href="/ctf/" className="btn border-2 border-white/30 font-bold text-white hover:border-white/70">
                  What&apos;s a CTF?
                </Link>
              </div>
            </div>
            <ul className="grid content-center gap-3 font-semibold">
              {['Beginner friendly — first CTF? Perfect.', 'Team based — bring friends or find a team on the day', 'Six categories, 100–500 points per challenge', 'Live scoreboard at bushbash.cssa.club', 'Brain-break games: GeoGuessr & Wikipedia racing'].map((t) => (
                <li key={t} className="flex items-start gap-3 rounded-xl bg-white/10 px-4 py-3">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-trail" aria-hidden="true" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- MAP ---------- */}
      <Section
        id="map"
        eyebrow="Getting there"
        title="Campus map & parking"
        lead="Tech Talks run in the Birch Building Innovation Space, the CTF lives in Melville Hall, and BBQs are on Fellows Oval. Movie night is at Dendy Cinemas in Civic, and the networking night is nearby in the city centre — follow the green dashed line. Public ticketed car parks are marked with a yellow P."
      >
        <CampusMap />
      </Section>

      {/* ---------- REGISTRATION ---------- */}
      <div className="bg-slate-50 dark:bg-ink-soft/50">
        <Section
          id="register"
          eyebrow="Join in"
          title="Registration"
          lead={site.registration.note}
        >
          {site.registration.mode === 'embed' && site.registration.embedUrl ? (
            <div className="card overflow-hidden">
              <iframe
                src={site.registration.embedUrl}
                title="Festival registration form"
                className="h-[720px] w-full"
                loading="lazy"
              />
            </div>
          ) : (
            <a href={site.registration.linkUrl} target="_blank" rel="noopener noreferrer" className="btn-trail text-lg">
              {site.registration.linkLabel} <Icon name="external" className="h-4 w-4" />
            </a>
          )}
        </Section>
      </div>

      {/* ---------- DOWNLOADS ---------- */}
      <Section
        id="downloads"
        eyebrow="Documents"
        title="Downloads"
        lead="The latest festival documents. These always point to the current version."
      >
        <div className="flex flex-wrap gap-3">
          {site.downloads.map((d) => (
            <a key={d.file} href={asset(d.file)} download className="btn-primary">
              <Icon name="download" className="h-5 w-5" /> {d.label}
            </a>
          ))}
        </div>
      </Section>

      {/* ---------- SPONSORS ---------- */}
      <div className="bg-slate-50 dark:bg-ink-soft/50">
        <Section
          id="sponsors"
          eyebrow="Thank you"
          title="CSSA sponsors"
          lead="The Tech Fest — and its prize pool — is made possible by the generous support of CSSA's industry sponsors."
        >
          <SponsorWall />
        </Section>
      </div>
    </>
  );
}
