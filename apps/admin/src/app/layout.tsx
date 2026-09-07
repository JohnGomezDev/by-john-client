import type { Metadata } from 'next';
import { Ubuntu_Condensed, Ubuntu_Sans } from 'next/font/google';

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

export const metadata: Metadata = {
  title: 'Admin',
};

interface IRootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IRootLayoutProps): React.JSX.Element {
  return (
    <html lang="es">
      <body className={`${ubuntuSans.variable} ${ubuntuCondensed.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
