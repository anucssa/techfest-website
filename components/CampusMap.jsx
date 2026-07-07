'use client';
// Interactive campus map (Leaflet + OpenStreetMap — no API key required).
// Venue and parking pins come from data/venues.json; a dashed arrow points
// from campus toward the Canberra CBD for the movie & networking nights.
import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import venues from '@/data/venues.json';

const PIN_COLORS = { venue: '#1d5fa8', parking: '#f5c518', direction: '#1e7a3c' };

export default function CampusMap() {
  const ref = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import('leaflet')).default;
      if (cancelled || mapRef.current || !ref.current) return;

      const map = L.map(ref.current, { scrollWheelZoom: false });
      mapRef.current = map;
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const pin = (color, letter) =>
        L.divIcon({
          className: '',
          iconSize: [30, 40],
          iconAnchor: [15, 38],
          popupAnchor: [0, -34],
          html: `<svg width="30" height="40" viewBox="0 0 30 40" aria-hidden="true">
              <path d="M15 39C15 39 28 24 28 14A13 13 0 1 0 2 14C2 24 15 39 15 39Z" fill="${color}" stroke="white" stroke-width="2"/>
              <text x="15" y="19" text-anchor="middle" font-family="Aileron,Arial" font-weight="800" font-size="12" fill="white">${letter}</text>
            </svg>`,
        });

      // Car-park sign: yellow rounded square with a bold "P", on a short post.
      const parkingIcon = () =>
        L.divIcon({
          className: '',
          iconSize: [28, 38],
          iconAnchor: [14, 36],
          popupAnchor: [0, -32],
          html: `<svg width="28" height="38" viewBox="0 0 28 38" aria-hidden="true">
              <rect x="12.5" y="24" width="3" height="12" rx="1.5" fill="#141230"/>
              <rect x="1" y="1" width="26" height="26" rx="6" fill="#f5c518" stroke="white" stroke-width="2"/>
              <text x="14" y="20" text-anchor="middle" font-family="Aileron,Arial" font-weight="800" font-size="16" fill="#141230">P</text>
            </svg>`,
        });

      const bounds = [];
      let cbd = null;
      const entries = Object.entries(venues).filter(([k]) => !k.startsWith('_'));
      for (const [key, v] of entries) {
        const letter = v.kind === 'direction' ? '→' : v.shortName[0];
        const icon = v.kind === 'parking' ? parkingIcon() : pin(PIN_COLORS[v.kind] || '#1d5fa8', letter);
        const marker = L.marker([v.lat, v.lng], { icon })
          .addTo(map)
          .bindPopup(
            `<strong>${v.name}</strong><br/>${v.address}<br/>` +
            `<a href="${v.gmaps}" target="_blank" rel="noopener noreferrer">Open in Google Maps →</a>`
          );
        if (v.kind !== 'direction') bounds.push([v.lat, v.lng]);
        if (key === 'cbd') cbd = v;
        marker.getElement()?.setAttribute('aria-label', v.name);
      }

      // Dashed "to the city" arrow from Melville Hall toward the CBD.
      const m = venues.melville;
      if (cbd && m) {
        L.polyline([[m.lat, m.lng], [cbd.lat, cbd.lng]], {
          color: '#1e7a3c', weight: 4, dashArray: '8 10', opacity: 0.9,
        }).addTo(map).bindPopup('Movie Night & Networking Drinks are in the city — a short walk or bus ride.');
      }

      map.fitBounds(bounds, { padding: [36, 36] });
    })();
    return () => { cancelled = true; mapRef.current?.remove(); mapRef.current = null; };
  }, []);

  return (
    <figure>
      <div ref={ref} role="region" aria-label="Interactive campus map showing festival venues and parking"
        className="h-[420px] w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm dark:border-white/10 sm:h-[520px]" />
      <figcaption className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-600 dark:text-slate-300">
        <span><span className="mr-1 inline-block h-3 w-3 rounded-full align-[-1px]" style={{ background: '#1d5fa8' }} /> Festival venues</span>
        <span><span className="mr-1 inline-flex h-3.5 w-3.5 items-center justify-center rounded-[3px] align-[-2px] text-[9px] font-extrabold leading-none text-ink" style={{ background: '#f5c518' }}>P</span> Public parking (ticketed)</span>
        <span><span className="mr-1 inline-block h-3 w-3 rounded-full align-[-1px]" style={{ background: '#1e7a3c' }} /> Toward Canberra CBD</span>
      </figcaption>
    </figure>
  );
}
