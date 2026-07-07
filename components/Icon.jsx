// One tiny inline icon set (stroke style) so the site ships zero icon deps.
const paths = {
  mic: 'M12 3a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3Zm-6 8a6 6 0 0 0 12 0M12 17v4m-3 0h6',
  flag: 'M5 21V4m0 1h12l-2.5 3.5L17 12H5',
  bbq: 'M4 10h16a8 8 0 0 1-16 0Zm4 8-1 3m10-3 1 3M9 3v3m3-4v4m3-3v3',
  film: 'M4 5h16v14H4zM4 9h16M4 15h16M8 5v14M16 5v14',
  trophy: 'M8 4h8v5a4 4 0 0 1-8 0V4Zm-4 1h4v3a4 4 0 0 1-4-3Zm16 0h-4v3a4 4 0 0 0 4-3ZM12 13v4m-4 4h8m-4-4v0',
  drinks: 'M6 3h12l-5 8v7m-3 3h6m-8-14h10',
  pin: 'M12 21s-7-6.1-7-11a7 7 0 1 1 14 0c0 4.9-7 11-7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  calendar: 'M7 3v3m10-3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z',
  download: 'M12 3v12m0 0 4-4m-4 4-4-4M5 21h14',
  share: 'M8.7 10.7 15.3 7.3m-6.6 6 6.6 3.4M6 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0-14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
  external: 'M14 4h6v6m0-6L10 14M9 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-3',
  arrow: 'M5 12h14m0 0-5-5m5 5-5 5',
  clock: 'M12 8v4l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  mail: 'M4 6h16v12H4zM4 7l8 6 8-6',
  linkedin: 'M6 9v9M6 5.5v.01M10 18v-5a3 3 0 0 1 6 0v5m-6-9v2',
  link: 'M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1m2 4a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1',
  discord: 'M8 12h.01M16 12h.01M5 17c-1-6 1-10 2-11 2-1 3-1 3-1l.5 1.5h3L14 4s1 0 3 1c1 1 3 5 2 11 0 0-2 2-4 2l-1-2m-4 0-1 2c-2 0-4-2-4-2',
  instagram: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 12.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM17 7v.01',
  facebook: 'M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8Z',
  github: 'M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1-.3-3.4 1.3a12 12 0 0 0-6.2 0C6.6 2.8 5.6 3.1 5.6 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.2 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-9-9h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z',
  parking: 'M6 4h7a5 5 0 0 1 0 10H9v6H6V4Zm3 3v4h4a2 2 0 0 0 0-4H9Z',
  moon: 'M21 12.8A8.5 8.5 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z',
  sun: 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-15v2m0 16v2M4 12H2m20 0h-2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5',
  menu: 'M4 6h16M4 12h16M4 18h16',
  x: 'M6 6l12 12M18 6 6 18',
};
export default function Icon({ name, className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d={paths[name] || paths.link} />
    </svg>
  );
}
