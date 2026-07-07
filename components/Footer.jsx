import Icon from './Icon';
import { site, asset } from '@/lib/data';

export default function Footer() {
  return (
    <footer id="contact" className="mt-20 border-t border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-ink-soft">
      <div className="container-site grid gap-10 py-12 md:grid-cols-3">
        <div>
          <h2 className="text-lg font-extrabold text-ink dark:text-white">Contact</h2>
          <ul className="mt-4 space-y-5">
            {site.contacts.map((c) => (
              <li key={c.email}>
                <p className="font-bold text-ink dark:text-white">{c.name}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">{c.role}</p>
                <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  <a className="inline-flex items-center gap-1 font-semibold text-sign-blue hover:underline dark:text-brand-blue" href={`mailto:${c.email}`}>
                    <Icon name="mail" className="h-4 w-4" /> {c.email}
                  </a>
                  <a className="inline-flex items-center gap-1 font-semibold text-sign-blue hover:underline dark:text-brand-blue"
                    href={c.linkedin} target="_blank" rel="noopener noreferrer">
                    <Icon name="linkedin" className="h-4 w-4" /> LinkedIn
                  </a>
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-extrabold text-ink dark:text-white">CSSA socials</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-200/70 dark:text-slate-200 dark:hover:bg-white/10">
                  <Icon name={s.icon} className="h-4 w-4" /> {s.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 inline-block rounded-xl bg-white p-2 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset('/images/linktree-qr.svg')} alt="QR code linking to the CSSA Linktree" className="h-28 w-28" />
          </div>
        </div>
        <div>
          <h2 className="text-lg font-extrabold text-ink dark:text-white">Presented with</h2>
          <ul className="mt-4 space-y-3">
            {site.footerLogos.map((l) => (
              <li key={l.name}>
                <a href={l.url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-bold text-ink hover:underline dark:text-white">
                  {l.image?.includes('cssa-banner') ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={asset(l.image)} alt={`${l.name} logo`} className="h-9 w-auto rounded bg-white p-1" />
                  ) : (
                    <span className="rounded-lg border-2 border-current px-3 py-1 text-sm">{l.name}</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{site.disclaimer}</p>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
        © {new Date().getFullYear()} ANU CSSA · Bush Week Tech Fest
      </div>
    </footer>
  );
}
