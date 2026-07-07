'use client';
import { useEffect, useState } from 'react';

export default function Countdown({ target, label = 'until the festival' }) {
  const [t, setT] = useState(null);
  useEffect(() => {
    const tick = () => {
      const diff = new Date(target).getTime() - Date.now();
      if (diff <= 0) return setT({ done: true });
      const d = Math.floor(diff / 864e5);
      const h = Math.floor((diff % 864e5) / 36e5);
      const m = Math.floor((diff % 36e5) / 6e4);
      const s = Math.floor((diff % 6e4) / 1e3);
      setT({ d, h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!t) return <div className="h-16" aria-hidden="true" />;
  if (t.done) return <p className="text-lg font-extrabold">The festival is on now — see you there!</p>;

  const cell = (v, u) => (
    <div className="flex flex-col items-center rounded-xl bg-white/15 px-3 py-2 backdrop-blur-sm">
      <span className="font-mono text-2xl font-bold tabular-nums sm:text-3xl">{String(v).padStart(2, '0')}</span>
      <span className="text-[11px] font-semibold uppercase tracking-widest opacity-90">{u}</span>
    </div>
  );
  return (
    <div role="timer" aria-label={`Countdown ${label}`} className="flex items-center gap-2 sm:gap-3">
      {cell(t.d, 'days')}{cell(t.h, 'hrs')}{cell(t.m, 'min')}{cell(t.s, 'sec')}
      <span className="ml-1 hidden text-sm font-semibold opacity-90 sm:block">{label}</span>
    </div>
  );
}
