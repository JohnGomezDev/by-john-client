import type { Metadata } from 'next';
import { Ubuntu_Condensed, Ubuntu_Sans } from 'next/font/google';

import { Providers } from '@/lib/providers/Providers';
import { BlogFooter } from '@/modules/layout/components/BlogFooter';
import { BlogHeader } from '@/modules/layout/components/BlogHeader';

import './globals.css';

const ubuntuSans = Ubuntu_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-ubuntu-sans',
  display: 'swap',
});

const ubuntuCondensed = Ubuntu_Condensed({
  weight: '400',
  subsets: ['latin', 'latin-ext'],
  variable: '--font-ubuntu-condensed',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'byJohn Blog',
    template: '%s · byJohn Blog',
  },
  description:
    'Artículos sobre desarrollo de software, tecnología y buenas prácticas de ingeniería.',
  authors: [{ name: 'John Gomez' }],
  creator: 'John Gomez',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'byJohn Blog',
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="es">
      <body className={`${ubuntuSans.variable} ${ubuntuCondensed.variable} antialiased`}>
        <Providers>
          <div className="flex min-h-dvh flex-col">
            <BlogHeader />
            <main className="flex-1">{children}</main>
            <BlogFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
