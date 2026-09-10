export const SITE_NAME = 'byJohn';
export const SITE_FULL_NAME = 'byJohn Blog';

export const SITE_DESCRIPTION =
  'Publicación editorial dedicada a la intersección del diseño, la ingeniería de software y la cultura digital contemporánea.';

export interface INavLink {
  label: string;
  href: string;
}

export interface ISocialLink {
  id: 'facebook' | 'instagram' | 'x' | 'linkedin';
  label: string;
  href: string;
}

/** Placeholder hrefs until routes / profiles are defined. */
export const SOCIAL_LINKS: readonly ISocialLink[] = [
  { id: 'facebook', label: 'Facebook', href: '#' },
  { id: 'instagram', label: 'Instagram', href: '#' },
  { id: 'x', label: 'X', href: '#' },
  { id: 'linkedin', label: 'LinkedIn', href: '#' },
] as const;

export const FOOTER_CATEGORIES: readonly INavLink[] = [
  { label: 'Tecnología e IA', href: '#' },
  { label: 'Diseño de Producto', href: '#' },
  { label: 'Arquitectura Frontend', href: '#' },
  { label: 'Liderazgo & Cultura', href: '#' },
  { label: 'Experiencia de Usuario', href: '#' },
] as const;

export const FOOTER_LEGAL_LINKS: readonly INavLink[] = [
  { label: 'Política de Privacidad', href: '#' },
  { label: 'Términos', href: '#' },
  { label: 'Contacto', href: '#' },
] as const;
