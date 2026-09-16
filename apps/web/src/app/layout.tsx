import type { Metadata } from 'next';
import { Ubuntu_Condensed, Ubuntu_Sans } from 'next/font/google';

import { WebFooter } from '@/modules/landing/components/WebFooter';
import { WebHeader } from '@/modules/landing/components/WebHeader';
import { WhatsAppButton } from '@/modules/landing/components/WhatsAppButton';
import { Providers } from '@/lib/providers/Providers';

import '@/styles/globals.css';

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
    default: 'byJohn · John Gomez',
    template: '%s · byJohn',
  },
  description:
    'Portafolio de John Gomez, desarrollador de software. Proyectos, experiencia y trabajo en desarrollo web y tecnología.',
  authors: [{ name: 'John Gomez', url: siteUrl }],
  creator: 'John Gomez',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'byJohn',
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
            <WebHeader />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <WebFooter />
            <WhatsAppButton />
          </div>
        </Providers>
      </body>
    </html>
  );
}
