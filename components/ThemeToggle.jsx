'use client';
import { useEffect, useState } from 'react';
import Icon from './Icon';

export default function ThemeToggle() {
  const [dark, setDark] = useState(null);
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDark(stored ? stored === 'dark' : prefers);
  }, []);
  useEffect(() => {
    if (dark === null) return;
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);
  return (
    <button
      type="button"
      onClick={() => setDark((d) => !d)}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-white/10"
    >
      <Icon name={dark ? 'sun' : 'moon'} />
    </button>
  );
}
