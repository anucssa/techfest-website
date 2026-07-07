'use client';
import Link from 'next/link';
import { useState } from 'react';
import Icon from './Icon';
import ThemeToggle from './ThemeToggle';

const nav = [
  { href: '/#schedule', label: 'Schedule' },
  { href: '/tech-talks/', label: 'Tech Talks' },
  { href: '/ctf/', label: 'BushBash CTF' },
  { href: '/#map', label: 'Map & Parking' },
  { href: '/#sponsors', label: 'Sponsors' },
  { href: '/#contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur dark:border-white/10 dark:bg-ink/85">
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-extrabold tracking-tight text-ink dark:text-white">
          <span className="inline-block h-3.5 w-3.5 rounded-full bg-trail" aria-hidden="true" />
          Bush Week <span className="trail-text">Tech Fest</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-ink dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white">
              {n.label}
            </Link>
          ))}
          <Link href="/#register" className="btn-trail ml-2 !px-4 !py-2 text-sm">Register</Link>
          <ThemeToggle />
        </nav>
        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}
            onClick={() => setOpen((o) => !o)} className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-white/10">
            <Icon name={open ? 'x' : 'menu'} className="h-6 w-6" />
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Mobile" className="border-t border-slate-200 bg-white px-4 pb-4 pt-2 dark:border-white/10 dark:bg-ink lg:hidden">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10">
              {n.label}
            </Link>
          ))}
          <Link href="/#register" onClick={() => setOpen(false)} className="btn-trail mt-2 w-full">Register</Link>
        </nav>
      )}
    </header>
  );
}
