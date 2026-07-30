'use client';
// Live top-N scoreboard for the BushBash CTF, read straight from the noCTF API
// (site.json → ctf.apiUrl). The API only allows browser reads once the noCTF
// server's ALLOWED_ORIGINS includes this site's hostname, so every state here
// fails closed: on any error the card degrades to a link to the real scoreboard
// rather than a broken table.
//
// noCTF specifics this code relies on:
//   GET  /site/config                      — public, ungated; start/end epoch seconds
//   GET  /scoreboard/divisions/:id         — 403 until start time; entries carry
//                                            team_id but NO team name
//   POST /teams/query {ids: [...]}         — resolves ids to names
import { useEffect, useState } from 'react';
import Icon from './Icon';
import { site } from '@/lib/data';

const POLL_MS = 60_000;

export default function LiveScoreboard({ limit = 10 }) {
  const api = (site.ctf.apiUrl || '').replace(/\/+$/, '');
  const [state, setState] = useState({ status: 'loading' });

  useEffect(() => {
    if (!api) {
      setState({ status: 'error' });
      return;
    }
    let timer;
    let cancelled = false;

    const load = async () => {
      try {
        const cfgRes = await fetch(`${api}/site/config`);
        if (!cfgRes.ok) throw new Error(`config ${cfgRes.status}`);
        const cfg = (await cfgRes.json())?.data;
        const start = cfg.start_time_s * 1000;
        const end = cfg.end_time_s * 1000;
        const now = Date.now();

        if (now < start) {
          if (!cancelled) {
            setState({ status: 'pre', start });
            // Re-check just after the gate opens (or on the normal poll beat).
            timer = setTimeout(load, Math.min(start - now + 2000, POLL_MS));
          }
          return;
        }

        const division = cfg.default_division_id ?? site.ctf.divisionId ?? 1;
        const sbRes = await fetch(`${api}/scoreboard/divisions/${division}?page=1&page_size=${limit}`);
        if (!sbRes.ok) throw new Error(`scoreboard ${sbRes.status}`);
        const sb = (await sbRes.json())?.data;
        const entries = (sb?.entries || []).filter((e) => !e.hidden).slice(0, limit);

        // Second round-trip: the scoreboard has team_ids only, never names.
        const names = {};
        if (entries.length) {
          const teamRes = await fetch(`${api}/teams/query`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids: entries.map((e) => e.team_id) }),
          });
          if (teamRes.ok) {
            for (const t of (await teamRes.json())?.data?.entries || []) names[t.id] = t.name;
          }
        }

        if (cancelled) return;
        setState({
          status: now >= end ? 'final' : 'live',
          rows: entries.map((e) => ({
            rank: e.rank,
            teamId: e.team_id,
            name: names[e.team_id] || `Team #${e.team_id}`,
            score: e.score,
            solves: Array.isArray(e.solves) ? e.solves.length : null,
          })),
          total: sb?.total ?? entries.length,
          updatedAt: new Date(),
        });
        if (now < end) timer = setTimeout(load, POLL_MS);
      } catch {
        if (!cancelled) setState({ status: 'error' });
      }
    };

    load();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [api, limit]);

  if (state.status === 'loading') {
    return (
      <div className="card p-6 text-sm font-semibold text-slate-500 dark:text-slate-400" role="status">
        Connecting to the scoreboard…
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div className="card flex flex-col items-start gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-slate-600 dark:text-slate-300">
          Live scores can&apos;t be shown here right now — the full scoreboard is one click away.
        </p>
        <a href={site.ctf.scoreboardUrl || site.ctf.playUrl} target="_blank" rel="noopener noreferrer" className="btn-primary shrink-0 text-sm">
          <Icon name="trophy" className="h-4 w-4" /> View live scoreboard
        </a>
      </div>
    );
  }

  if (state.status === 'pre') {
    return (
      <div className="card flex items-center gap-4 p-6">
        <Icon name="clock" className="h-8 w-8 shrink-0 text-brand-blue" />
        <p className="text-slate-600 dark:text-slate-300">
          The scoreboard goes live when flags drop —{' '}
          <strong className="text-ink dark:text-white">
            {new Date(state.start).toLocaleString('en-AU', {
              timeZone: site.timezone,
              weekday: 'long',
              hour: 'numeric',
              minute: '2-digit',
            })}
          </strong>
          . Top {limit} teams will appear here automatically.
        </p>
      </div>
    );
  }

  const live = state.status === 'live';
  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-5 py-3 dark:border-white/10">
        <p className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink dark:text-white">
          {live ? (
            <>
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-green" />
              </span>
              Live · top {state.rows.length} of {state.total} teams
            </>
          ) : (
            <>
              <Icon name="trophy" className="h-4 w-4 text-brand-yellow" /> Final standings
            </>
          )}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {live ? 'Updates every minute · ' : ''}as at{' '}
          {state.updatedAt.toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit' })}
        </p>
      </div>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <th scope="col" className="px-5 py-2.5 font-semibold">#</th>
            <th scope="col" className="px-2 py-2.5 font-semibold">Team</th>
            <th scope="col" className="px-2 py-2.5 text-right font-semibold">Solves</th>
            <th scope="col" className="px-5 py-2.5 text-right font-semibold">Score</th>
          </tr>
        </thead>
        <tbody>
          {state.rows.map((r) => (
            <tr key={r.teamId} className="border-t border-slate-100 dark:border-white/5">
              <td className="px-5 py-2.5 font-mono font-bold text-slate-500 dark:text-slate-400">{r.rank}</td>
              <td className="max-w-0 truncate px-2 py-2.5 font-bold text-ink dark:text-white" style={{ width: '60%' }}>
                {r.name}
              </td>
              <td className="px-2 py-2.5 text-right tabular-nums text-slate-600 dark:text-slate-300">
                {r.solves ?? '—'}
              </td>
              <td className="px-5 py-2.5 text-right font-mono font-bold tabular-nums text-ink dark:text-white">
                {r.score}
              </td>
            </tr>
          ))}
          {state.rows.length === 0 ? (
            <tr className="border-t border-slate-100 dark:border-white/5">
              <td colSpan={4} className="px-5 py-4 text-slate-500 dark:text-slate-400">
                No solves yet — the board is wide open.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
