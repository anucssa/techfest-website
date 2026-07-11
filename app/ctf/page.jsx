import Icon from '@/components/Icon';
import Countdown from '@/components/Countdown';
import { site, venues, asset } from '@/lib/data';

export const metadata = {
  title: 'BushBash CTF',
  description:
    'A beginner-friendly, team-based 48-hour capture-the-flag competition — 31 July to 2 August 2026 at ANU, with a live scoreboard and prizes.',
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
            Team-based competitive puzzle solving, vulnerability analysis and software exploitation. Find the flag,
            submit it, climb the live scoreboard — no experience required.
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
          <Countdown target="2026-07-31T17:00:00+10:00" label="until flags drop" />
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
              <li className="flex gap-3"><Icon name="clock" className="h-5 w-5 shrink-0 text-brand-blue" /> 48 hours: Fri 5pm launch → Sun 5:30pm finale &amp; prizes</li>
              <li className="flex gap-3"><Icon name="pin" className="h-5 w-5 shrink-0 text-brand-blue" /> In person at Melville Hall, ANU (play online too)</li>
              <li className="flex gap-3"><Icon name="trophy" className="h-5 w-5 shrink-0 text-brand-blue" /> Prizes at the Sunday closing ceremony, with pizza dinner</li>
              <li className="flex gap-3"><Icon name="flag" className="h-5 w-5 shrink-0 text-brand-blue" /> Beginner friendly and team based — challenges worth 100–500 points</li>
            </ul>
          </div>
          <div className="card p-6">
            <h2 className="text-lg font-extrabold text-ink dark:text-white">Links</h2>
            <div className="mt-4 flex flex-col gap-2">
              <a className="btn-trail text-sm" href={site.ctf.playUrl} target="_blank" rel="noopener noreferrer">
                bushbash.cssa.club <Icon name="external" className="h-4 w-4" />
              </a>
              <a className="btn-ghost text-sm" href={site.ctf.ctftimeUrl} target="_blank" rel="noopener noreferrer">
                ctftime.org/ctf/1639 <Icon name="external" className="h-4 w-4" />
              </a>
              <a className="btn-ghost text-sm" href={asset("/calendar/ctf-launch.ics")} download>
                <Icon name="calendar" className="h-4 w-4" /> Add launch to calendar
              </a>
            </div>
            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
              Team registration, a live scoreboard embed, and a countdown will land on this page as the event
              approaches.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
