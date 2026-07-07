import { sponsors, asset } from '@/lib/data';

// Responsive sponsor grid. Each tile links out to the sponsor's website.
// Tiles use the deep-tone brand gradient (bg-trail-deep) so white / light
// transparent logos stay clearly visible; a soft drop-shadow lifts them off
// the lighter (amber) corner of the gradient. If a logo PNG is missing, the
// browser shows the alt text (the sponsor's name) in white — nothing breaks.
export default function SponsorWall() {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {sponsors.sponsors.map((s) => (
        <li key={s.name}>
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            title={s.name}
            className="flex h-28 items-center justify-center rounded-2xl border border-white/10 bg-trail-deep p-5 text-center font-bold text-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(s.logo)}
              alt={s.name}
              loading="lazy"
              className="max-h-14 w-auto max-w-full object-contain [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.35))]"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
