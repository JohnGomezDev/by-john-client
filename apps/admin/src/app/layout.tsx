import type { Metadata } from 'next';

import { Providers } from '@/lib/providers/Providers';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Admin',
};

interface IRootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IRootLayoutProps): React.JSX.Element {
  return (
    <html lang="es">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
