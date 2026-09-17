import { ROUTES } from '@/lib/constants/routes.constants';

export const SITE_NAME = 'byJohn';
export const SITE_FULL_NAME = 'byJohn Blog';

export const SITE_DESCRIPTION =
  'Experiencias, ideas y aprendizajes desde el código hasta las tendencias que están redefiniendo la tecnología.';

export interface INavLink {
  label: string;
  href: string;
}

export const FOOTER_LEGAL_LINKS: readonly INavLink[] = [
  { label: 'Política de Privacidad', href: ROUTES.privacyPolicy },
  { label: 'Términos de uso', href: ROUTES.termsOfUse }
] as const;
