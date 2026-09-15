import type { Metadata } from 'next';

import { ROUTES } from '@/lib/constants/routes.constants';
import { SITE_FULL_NAME } from '@/modules/layout/constants/layout.constants';
import { TermsOfUseContent } from '@/modules/legal/components/TermsOfUseContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;
const pageUrl = `${siteUrl}${ROUTES.termsOfUse}`;
const title = 'Términos de Uso y Aviso Legal';
const description = `Términos de uso y aviso legal de ${SITE_FULL_NAME}. Condiciones de uso del contenido, ejemplos de código y limitación de responsabilidad.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: 'website',
    title,
    description,
    url: pageUrl,
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary',
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export default function TermsOfUsePage(): React.JSX.Element {
  return <TermsOfUseContent />;
}
