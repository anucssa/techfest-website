import Link from 'next/link';
import Icon from '@/components/Icon';
import Countdown from '@/components/Countdown';
import { site, absUrl } from '@/lib/data';

const description =
  'How to join Bush Week Tech Fest from anywhere: watch the ANU-exclusive CommBank cyber panel by video call, and play the 48-hour BushBash CTF online.';

export const metadata = {
  title: 'Remote Participation',
  description,
  openGraph: {
    type: 'website',
    url: absUrl('/remote/'),
    siteName: site.name,
    title: `Remote Participation · ${site.name} 2026`,
    description,
    images: [{ url: absUrl('/images/og-remote.png'), width: 1200, height: 630, alt: 'Remote participation — Bush Week Tech Fest 2026' }],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Remote Participation · ${site.name} 2026`,
    images: [absUrl('/images/og-remote.png')],
  },
};

export default function RemotePage() {
  const call = site.remote || {};

  return (
    <>
      <section className="bg-trail on-gradient">
        <div className="container-site py-16 sm:py-20">
          <p className="font-mono text-sm font-bold uppercase tracking-[0.25em]">Can&apos;t make it to campus?</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">Remote Participation</h1>
          <p className="mt-4 max-w-2xl text-xl font-semibold">
            Two parts of Tech Fest are fully joinable from anywhere: the CommBank cyber panel by video call, and
            the 48-hour BushBash CTF online.
          </p>
        </div>
      </section>

      <div className="container-site grid gap-8 py-12 sm:py-16 lg:grid-cols-2">
        {/* ---------- CommBank panel video call ---------- */}
        <section className="card flex flex-col p-8">
          <span className="inline-flex w-fit rounded-xl bg-trail-soft p-3 text-ink dark:text-white">
            <Icon name="mic" className="h-6 w-6" />
          </span>
          <h2 className="mt-4 text-2xl font-extrabold text-ink dark:text-white">CommBank Panel — video call</h2>
          <p className="mt-1 font-mono text-sm font-bold text-slate-500 dark:text-slate-400">{call.commbankCallTime || 'Friday 31 July · 1:45pm – 2:35pm AEST'}</p>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            The ANU-exclusive <Link href="/tech-talks/" className="font-semibold text-sign-blue hover:underline dark:text-brand-blue">panel with three CommBank cybersecurity leaders</Link>,
            moderated by Professor Richard Buckland, is delivered remotely over a {call.commbankCallPlatform || 'CommBank video call'}.
            It screens live in the Birch Building for in-person attendees — and if you&apos;re not on campus, you can
            join the same call from home.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {call.commbankCallUrl ? (
              <a href={call.commbankCallUrl} target="_blank" rel="noopener noreferrer" className="btn-trail">
                <Icon name="external" className="h-4 w-4" /> Join the video call
              </a>
            ) : (
              <span aria-disabled="true" className="btn-ghost cursor-default !font-semibold opacity-60">
                <Icon name="clock" className="h-4 w-4" /> Video call link coming soon
              </span>
            )}
          </div>
          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            The join link will appear here (and on the Tech Talks page) once it&apos;s issued — check back before the
            session, or follow the CSSA Discord for the announcement.
          </p>
        </section>

        {/* ---------- CTF online ---------- */}
        <section className="card flex flex-col p-8">
          <span className="inline-flex w-fit rounded-xl bg-trail-soft p-3 text-ink dark:text-white">
            <Icon name="flag" className="h-6 w-6" />
          </span>
          <h2 className="mt-4 text-2xl font-extrabold text-ink dark:text-white">BushBash CTF — play online</h2>
          <p className="mt-1 font-mono text-sm font-bold text-slate-500 dark:text-slate-400">5pm Fri 31 July → 5pm Sun 2 August AEST · 48 hours</p>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            The whole competition runs on <a href={site.ctf.playUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-sign-blue hover:underline dark:text-brand-blue">bushbash.cssa.club</a>,
            so every challenge, the scoreboard, and flag submission work from anywhere. Students from other
            universities and institutions are welcome to register and play online — though if you can get to
            Melville Hall, in-person play (with BBQs, brain-break games and the prize ceremony) is where the fun is.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={site.ctf.playUrl} target="_blank" rel="noopener noreferrer" className="btn-trail">
              <Icon name="flag" className="h-4 w-4" /> Play the CTF
            </a>
            <a href={site.ctf.ctftimeUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              CTFtime listing <Icon name="external" className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-5">
            <Countdown target="2026-07-31T17:00:00+10:00" label="until flags drop" />
          </div>
        </section>
      </div>

      <div className="container-site pb-16">
        <div className="card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-ink dark:text-white">Everything else is in person</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              The rest of the talks, the BBQs, Movie Night and the Networking &amp; Drinks Night are on-campus or
              in the city — see the full schedule for venues, times and registration links.
            </p>
          </div>
          <Link href="/#schedule" className="btn-primary shrink-0 text-sm">
            <Icon name="calendar" className="h-4 w-4" /> Full schedule
          </Link>
        </div>
      </div>
    </>
  );
}
