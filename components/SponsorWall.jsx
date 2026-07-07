import { sponsors, asset } from '@/lib/data';

// Responsive sponsor grid. Each tile links out to the sponsor's website.
// Tiles use a white surface in both themes so every logo variant stays legible.
// If a logo PNG hasn't been dropped into public/sponsors/ yet, the browser
// shows the alt text (the sponsor's name) in its place — nothing breaks.
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
            className="card flex h-28 items-center justify-center bg-white p-5 text-center font-bold text-ink transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/20 dark:bg-white"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(s.logo)}
              alt={s.name}
              loading="lazy"
              className="max-h-14 w-auto max-w-full object-contain"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
