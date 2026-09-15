import type { Metadata } from 'next';

import { ROUTES } from '@/lib/constants/routes.constants';
import { SITE_FULL_NAME } from '@/modules/layout/constants/layout.constants';
import { PrivacyPolicyContent } from '@/modules/legal/components/PrivacyPolicyContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;
const pageUrl = `${siteUrl}${ROUTES.privacyPolicy}`;
const title = 'Política de Privacidad';
const description = `Política de privacidad de ${SITE_FULL_NAME}. Información sobre el tratamiento de datos personales de los visitantes del blog.`;

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

export default function PrivacyPolicyPage(): React.JSX.Element {
  return <PrivacyPolicyContent />;
}
