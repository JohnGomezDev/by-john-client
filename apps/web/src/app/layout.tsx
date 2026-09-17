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
    default: 'John Gomez · Desarrollador de Software Full-Stack',
    template: '%s · John-ish',
  },
  description:
    'Portafolio de John Gomez, desarrollador full-stack especializado en Next.js, TypeScript y arquitecturas de software escalables. Disponible para nuevos proyectos.',
  authors: [{ name: 'John Gomez', url: siteUrl }],
  creator: 'John Gomez',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'John-ish',
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
