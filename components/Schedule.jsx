import Link from 'next/link';
import Icon from './Icon';
import { schedule, venues, formatTime } from '@/lib/data';

// Road-sign styled schedule — a nod to the retro signage on the festival posters.
// Desktop: three-day timeline grid. Mobile: stacked cards.
export default function Schedule() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {schedule.days.map((day) => (
        <section key={day.id} aria-labelledby={`day-${day.id}`} className="flex flex-col gap-3">
          <h3 id={`day-${day.id}`}
            className="rounded-xl border-2 border-white/40 bg-sign-green px-4 py-2.5 text-center text-lg font-extrabold text-white shadow-md">
            {day.label}
          </h3>
          {day.events.map((e) => {
            const v = venues[e.venue];
            const href = e.page || `/events/${e.slug}/`;
            return (
              <article key={e.slug}
                className="card group flex flex-col gap-3 border-l-4 !border-l-sign-blue p-4 transition-shadow hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="rounded-lg bg-sign-blue/10 p-2 text-sign-blue dark:bg-brand-blue/15 dark:text-brand-blue">
                      <Icon name={e.icon} />
                    </span>
                    <div>
                      <h4 className="font-bold leading-tight text-ink dark:text-white">{e.title}</h4>
                      <p className="font-mono text-sm text-slate-600 dark:text-slate-300">
                        {formatTime(e.start)} – {formatTime(e.end)}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  <Icon name="pin" className="mr-1 inline h-4 w-4 align-[-2px]" />
                  {v.shortName}
                  {e.includes ? <span className="ml-2 rounded-full bg-brand-yellow/25 px-2 py-0.5 text-xs font-semibold text-amber-900 dark:text-brand-yellow">{e.includes}</span> : null}
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                  <Link href={href} className="btn-primary !px-3 !py-1.5 text-sm">Details</Link>
                  <a href={v.gmaps} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-3 !py-1.5 text-sm">
                    <Icon name="pin" className="h-4 w-4" /> Maps
                  </a>
                </div>
              </article>
            );
          })}
        </section>
      ))}
    </div>
  );
}
