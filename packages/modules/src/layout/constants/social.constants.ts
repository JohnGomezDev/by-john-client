import type { ISocialLink } from '../types/layout.types';

/** Shared profile links for web and blog chrome (header / footer). */
export const SOCIAL_LINKS: readonly ISocialLink[] = [
  { id: 'facebook', label: 'Facebook', href: '#' },
  { id: 'instagram', label: 'Instagram', href: '#' },
  { id: 'x', label: 'X', href: '#' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/john-alejandro-gómez-gonzález-6940451a5' },
] as const;
