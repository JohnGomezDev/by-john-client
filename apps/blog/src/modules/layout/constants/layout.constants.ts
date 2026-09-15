import { ROUTES } from '@/lib/constants/routes.constants';

export const SITE_NAME = 'byJohn';
export const SITE_FULL_NAME = 'byJohn Blog';

export const SITE_DESCRIPTION =
  'Experiencias, ideas y aprendizajes desde el código hasta las tendencias que están redefiniendo la tecnología.';

export interface INavLink {
  label: string;
  href: string;
}

export type TSocialLinkId = 'facebook' | 'instagram' | 'x' | 'linkedin' | 'whatsapp' | 'copy';

export interface ISocialLink {
  id: TSocialLinkId;
  label: string;
  href?: string;
}

/** Placeholder hrefs until routes / profiles are defined. */
export const SOCIAL_LINKS: readonly ISocialLink[] = [
  { id: 'facebook', label: 'Facebook', href: '#' },
  { id: 'instagram', label: 'Instagram', href: '#' },
  { id: 'x', label: 'X', href: '#' },
  { id: 'linkedin', label: 'LinkedIn', href: '#' },
] as const;

export const FOOTER_LEGAL_LINKS: readonly INavLink[] = [
  { label: 'Política de Privacidad', href: ROUTES.privacyPolicy },
  { label: 'Términos', href: ROUTES.termsOfUse },
  { label: 'Contacto', href: '#' },
] as const;
