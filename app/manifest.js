import { site } from '@/lib/data';
export default function manifest() {
  return {
    name: `${site.name} 2026`,
    short_name: site.shortName,
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#141230',
    theme_color: '#67acf1',
    icons: [{ src: '/images/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  };
}
