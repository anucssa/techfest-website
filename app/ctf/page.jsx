import Link from 'next/link';
import Icon from '@/components/Icon';
import Countdown from '@/components/Countdown';
import LiveScoreboard from '@/components/LiveScoreboard';
import { site, venues, asset, absUrl } from '@/lib/data';

const description =
  'A beginner-friendly, team-based 48-hour Jeopardy-style capture-the-flag — 5pm 31 July to 5pm 2 August 2026 AEST, in person at ANU and online, with a live scoreboard and prizes.';

export const metadata = {
  title: 'BushBash CTF',
  description,
  openGraph: {
    type: 'website',
    url: absUrl('/ctf/'),
    siteName: site.name,
    title: `BushBash CTF · ${site.name} 2026`,
    description,
    images: [{ url: absUrl('/images/og-ctf.png'), width: 1200, height: 630, alt: 'BushBash CTF — 48 hours, 31 July to 2 August 2026, ANU and online' }],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: `BushBash CTF · ${site.name} 2026`,
    images: [absUrl('/images/og-ctf.png')],
  },
};

const categories = [
  ['OSINT', 'Open-Source Intelligence'],
  ['rev', 'Reverse Engineering'],
  ['pwn', 'Binary Exploitation'],
  ['web', 'Web Exploitation'],
  ['crypto', 'Cryptography'],
  ['misc', 'Miscellaneous'],
];

export default function CtfPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `BushBash CTF — ${site.name} 2026`,
    startDate: '2026-07-31T17:00:00+10:00',
    endDate: '2026-08-02T17:30:00+10:00',
    location: { '@type': 'Place', name: venues.melville.name, address: venues.melville.address },
    organizer: { '@type': 'Organization', name: site.organiser, url: 'https://cssa.club' },
    isAccessibleForFree: true,
    url: `${site.url}/ctf/`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-ink text-white">
        <div className="container-site flex flex-col gap-8 py-16 sm:py-24">
          <p className="font-mono text-sm font-bold uppercase tracking-[0.25em] text-brand-yellow">
            48-hour capture the flag · launches 5pm Friday 31 July
          </p>
          <h1 className="text-5xl font-black tracking-tight sm:text-7xl">
            BushBash <span className="trail-text-bright">CTF</span>
          </h1>
          <p className="max-w-2xl text-xl text-slate-300">
            Team-based competitive puzzle solving, vulnerability analysis and software exploitation, Jeopardy-style.
            Find the flag, submit it, climb the live scoreboard — no experience required. Play in person at Melville
            Hall or online from anywhere: students from other universities and institutions are welcome.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={site.ctf.playUrl} target="_blank" rel="noopener noreferrer" className="btn-trail text-xl !px-8 !py-4">
              <Icon name="flag" className="h-6 w-6" /> PLAY THE CTF
            </a>
            <a href={site.ctf.ctftimeUrl} target="_blank" rel="noopener noreferrer"
              className="btn border-2 border-white/30 text-lg font-bold text-white hover:border-white/70">
              CTFtime listing <Icon name="external" className="h-4 w-4" />
            </a>
          </div>
          <Countdown target="2026-07-31T17:00:00+10:00" label="until flags drop"
            doneLabel="Flags are live — the CTF is on right now!" />
        </div>
      </section>

      {/* ---------- LIVE SCOREBOARD ---------- */}
      <section id="scoreboard" className="container-site scroll-mt-20 pt-14 sm:pt-20">
        <h2 className="h-section">Live scoreboard</h2>
        <div className="mt-6">
          <LiveScoreboard limit={10} />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={site.ctf.playUrl} target="_blank" rel="noopener noreferrer" className="btn-trail text-lg !px-8 !py-4">
            <Icon name="flag" className="h-5 w-5" /> Play the CTF
          </a>
          <a href={site.ctf.scoreboardUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-lg !px-8 !py-4">
            <Icon name="trophy" className="h-5 w-5" /> Open full scoreboard
          </a>
        </div>
      </section>

      <div className="container-site grid gap-10 py-14 lg:grid-cols-[2fr,1fr] sm:py-20">
        <div className="space-y-10">
          <section>
            <h2 className="h-section">What is a capture the flag?</h2>
            <div className="mt-4 space-y-4 text-lg text-slate-600 dark:text-slate-300">
              <p>
                A CTF is a competitive puzzle-solving, vulnerability-analysis and software-exploitation challenge.
                Teams work through challenges across different categories, hunting for a &ldquo;flag&rdquo; — a
                predefined string of text hidden inside a set of files or a live application — and submit it to the
                scoreboard for points.
              </p>
              <p>
                Challenges are designed to be engaging, educational and fun, with clear direction, minimal guesswork,
                and an appropriate level of difficulty. The goal is to share core cybersecurity knowledge with
                everyone who plays — so we can all learn to write software that isn&apos;t as vulnerable as these
                challenges will most certainly be.
              </p>
              <p>
                Following February&apos;s Disorientation CTF — over 130 players from four universities and fifty-plus
                challenges — BushBash tightens the format to an action-packed 48 hours with a bigger focus on
                in-person play, plus brain-break activities like GeoGuessr and Wikipedia racing.
              </p>
              <p>
                Under the hood, BushBash runs on the <strong>noCTF</strong> platform created by the team at Down
                Under CTF, with challenges hosted on Kubernetes using <strong>kCTF</strong> — all on Google Cloud
                infrastructure. Quality over quantity is the priority this time (and yes, there will be infra pixel
                art).
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold text-ink dark:text-white">Finale &amp; prize ceremony</h2>
            <div className="card mt-5 flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
              <span className="inline-flex w-fit rounded-xl bg-trail-soft p-3 text-ink dark:text-white">
                <Icon name="trophy" className="h-7 w-7" />
              </span>
              <p className="text-slate-600 dark:text-slate-300">
                Flags close at <strong className="text-ink dark:text-white">5pm Sunday 2 August</strong>. From{' '}
                <strong className="text-ink dark:text-white">5:00–5:30pm</strong>,{' '}
                <strong className="text-ink dark:text-white">Kylie McDevitt (CEO)</strong> and{' '}
                <strong className="text-ink dark:text-white">Silvio Cesare (CTO)</strong> of{' '}
                <a href="https://www.infosectcbr.com.au" target="_blank" rel="noopener noreferrer" className="font-semibold text-sign-blue hover:underline dark:text-brand-blue">InfoSect</a>{' '}
                co-present the closing ceremony, prizes and award certificates in Melville Hall — followed by pizza
                dinner.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold text-ink dark:text-white">Challenge categories</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {categories.map(([tag, name]) => (
                <li key={tag} className="card flex items-center gap-4 p-4">
                  <span className="rounded-lg bg-ink px-3 py-1.5 font-mono text-sm font-bold text-brand-green dark:bg-white/10">
                    {tag}
                  </span>
                  <span className="font-semibold text-ink dark:text-white">{name}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="card p-6">
            <h2 className="text-lg font-extrabold text-ink dark:text-white">Fast facts</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex gap-3"><Icon name="clock" className="h-5 w-5 shrink-0 text-brand-blue" /> 48 hours: Fri 5pm launch → Sun 5pm flags close (AEST)</li>
              <li className="flex gap-3"><Icon name="pin" className="h-5 w-5 shrink-0 text-brand-blue" /> In person at Melville Hall, ANU — or play online from any university</li>
              <li className="flex gap-3"><Icon name="trophy" className="h-5 w-5 shrink-0 text-brand-blue" /> Prize ceremony Sun 5–5:30pm, presented by InfoSect&apos;s Kylie McDevitt &amp; Silvio Cesare, with pizza dinner</li>
              <li className="flex gap-3"><Icon name="flag" className="h-5 w-5 shrink-0 text-brand-blue" /> Beginner friendly, team based, Jeopardy-style — challenges worth 100–500 points</li>
            </ul>
          </div>
          <div className="card p-6">
            <h2 className="text-lg font-extrabold text-ink dark:text-white">Links</h2>
            <div className="mt-4 flex flex-col gap-2">
              <a className="btn-trail text-sm" href={site.ctf.playUrl} target="_blank" rel="noopener noreferrer">
                bushbash.cssa.club <Icon name="external" className="h-4 w-4" />
              </a>
              <a className="btn-ghost text-sm" href={site.ctf.scoreboardUrl} target="_blank" rel="noopener noreferrer">
                <Icon name="trophy" className="h-4 w-4" /> Live scoreboard
              </a>
              <a className="btn-ghost text-sm" href={site.ctf.ctftimeUrl} target="_blank" rel="noopener noreferrer">
                ctftime.org/ctf/1639 <Icon name="external" className="h-4 w-4" />
              </a>
              <a className="btn-ghost text-sm" href={asset("/calendar/ctf-launch.ics")} download>
                <Icon name="calendar" className="h-4 w-4" /> Add launch to calendar
              </a>
            </div>
            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
              Playing from off campus? See{' '}
              <Link href="/remote/" className="font-semibold text-sign-blue hover:underline dark:text-brand-blue">
                remote participation
              </Link>{' '}
              for how online play works.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
