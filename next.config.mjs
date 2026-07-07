/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: the site builds to plain HTML/CSS/JS in `out/`
  // and can be hosted anywhere (GitHub Pages, Cloudflare Pages, ANU web space).
  output: 'export',
  // Required for static export (no image optimisation server).
  images: { unoptimized: true },
  // Folder-style URLs (/ctf/ instead of /ctf) — plays nicely with GitHub Pages.
  trailingSlash: true,
  // If you host under a sub-path (e.g. university.edu/cssa/techfest),
  // set NEXT_PUBLIC_BASE_PATH=/cssa/techfest when building.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
};
export default nextConfig;
