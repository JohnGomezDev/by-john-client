import { ROUTES } from '@/lib/constants/routes.constants';

import { buildCategoryHref } from '@/modules/layout/utils/footer.utils';

import type { IPostAuthor, IPostDetail, IPostDetailTag } from '../types/posts.types';

export function formatPostDate(value: string | null | undefined): string {
  if (!value) {
    return 'Sin fecha';
  }

  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value));
}

export function getAuthorFullName(admin: IPostAuthor): string {
  return `${admin.name} ${admin.lastName}`.trim();
}

export function getPostCanonicalUrl(slug: string): string {
  return `${process.env.NEXT_PUBLIC_SITE_URL}${ROUTES.detail(slug)}`;
}

export function getCategoryBadgeClass(slug: string | undefined): string {
  switch (slug) {
    case 'tecnologia-e-ia':
      return 'bg-secondary/40 text-secondary-foreground';
    case 'diseno-de-producto':
      return 'bg-muted text-neutral/80';
    case 'arquitectura-frontend':
      return 'bg-primary/10 text-primary';
    case 'experiencia-de-usuario':
      return 'bg-primary/5 text-primary/80';
    default:
      return 'bg-secondary/40 text-secondary-foreground';
  }
}

const TAG_BADGE_CLASSES = [
  'bg-secondary/40 text-secondary-foreground',
  'bg-tertiary/50 text-primary',
  'bg-primary/10 text-primary',
  'bg-muted text-neutral/80',
] as const;

export function getTagBadgeClass(tag: IPostDetailTag, index: number): string {
  return TAG_BADGE_CLASSES[index % TAG_BADGE_CLASSES.length]!;
}

export interface IPostShareUrls {
  facebook: string;
  x: string;
  linkedin: string;
  whatsapp: string;
}

export function buildPostShareUrls(url: string, title: string): IPostShareUrls {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    x: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
  };
}

export function buildPostBreadcrumbItems(post: IPostDetail): Array<{
  name: string;
  href: string;
}> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

  return [
    { name: 'Inicio', href: `${siteUrl}${ROUTES.home}` },
    {
      name: post.category.name,
      href: `${siteUrl}${buildCategoryHref(post.category.slug)}`,
    },
    { name: post.title, href: getPostCanonicalUrl(post.slug) },
  ];
}
