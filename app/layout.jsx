import './globals.css';
// Aileron — the official brand typeface, self-hosted via Fontsource.
import '@fontsource/aileron/400.css';
import '@fontsource/aileron/600.css';
import '@fontsource/aileron/700.css';
import '@fontsource/aileron/800.css'; // heaviest weight — 'black' (900) falls back to this
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { site } from '@/lib/data';

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} 2026 · ANU CSSA`, template: `%s · ${site.name} 2026` },
  description: site.description,
  applicationName: site.name,
  keywords: ['ANU', 'CSSA', 'Bush Week', 'Tech Fest', 'CTF', 'BushBash', 'cybersecurity', 'computer science', 'Canberra'],
  icons: {
    icon: '/images/favicon.png',
    apple: '/images/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    url: site.url,
    siteName: site.name,
    title: `${site.name} 2026`,
    description: site.description,
    images: [{ url: '/images/og.png', width: 1200, height: 630, alt: 'Bush Week Tech Fest 2026 — 31 July to 2 August, ANU' }],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} 2026`,
    description: site.description,
    images: ['/images/og.png'],
  },
};

export const viewport = { themeColor: '#67acf1' };

// Applies the saved/system theme before first paint to avoid a flash.
const themeInit = `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en-AU" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
