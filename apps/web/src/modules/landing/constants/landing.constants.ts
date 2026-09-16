import type { ISocialLink } from '@repo/modules/layout/types/layout.types';

export const SITE_NAME = 'byJohn';

/** Shared vertical rhythm between landing sections (mobile-first). */
export const SECTION_CLASS =
  'mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24';

export interface INavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: readonly INavLink[] = [
  { label: 'Proyectos', href: '#projects' },
  { label: 'Stack', href: '#stack' },
  { label: 'Sobre mí', href: '#about' },
  { label: 'Blog', href: '#blog' },
] as const;

export interface ITechStackCategory {
  /** Object key shown in the code editor. */
  key: string;
  /** Human-readable category label (accessibility / SEO). */
  label: string;
  technologies: readonly string[];
}

export interface ITechStackSnippet {
  fileName: string;
  /** Comment shown above the const (supports typing animation). */
  comment: string;
  variableName: string;
  /** Fictional TS type annotation rendered next to the variable. */
  typeAnnotation: string;
  categories: readonly ITechStackCategory[];
}

export const TECH_STACK: ITechStackSnippet = {
  fileName: 'stack.ts',
  comment:
    '// Texto de prueba: stack que uso para construir productos sólidos y mantenibles.',
  variableName: 'stack',
  typeAnnotation: 'Record<string, string[]>',
  categories: [
    {
      key: 'frontend',
      label: 'Frontend',
      technologies: ['React', 'Next.js', 'Tailwind'],
    },
    {
      key: 'backend',
      label: 'Backend',
      technologies: ['Node.js', 'Nest.js', 'Laravel'],
    },
    {
      key: 'databases',
      label: 'Bases de datos',
      technologies: ['MySQL', 'PostgreSQL', 'MongoDB'],
    },
    {
      key: 'infra',
      label: 'Infraestructura',
      technologies: ['Docker', 'Git'],
    },
  ],
};

/** Profile links shared with SocialLinks (GitHub is opted-in via `showGithub`). */
export const SOCIAL_LINKS: readonly ISocialLink[] = [
  { id: 'facebook', label: 'Facebook', href: '#' },
  { id: 'instagram', label: 'Instagram', href: '#' },
  { id: 'x', label: 'X', href: '#' },
  { id: 'linkedin', label: 'LinkedIn', href: '#' },
] as const;

/** Placeholder until the real GitHub profile URL is set. */
export const GITHUB_HREF = '#';

/** Número de WhatsApp con código de país, sin espacios ni guiones. */
export const WHATSAPP_NUMBER = '1234567890';
export const WHATSAPP_MESSAGE =
  'Hola! Vi tu portafolio y me gustaría hablar sobre un proyecto. ¿Tienes disponibilidad?';
