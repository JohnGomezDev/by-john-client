import { Tag } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@repo/ui/lib/utils';

import { ROUTES } from '@/lib/constants/routes.constants';

import type { IPostDetailTag } from '../types/posts.types';
import { getTagBadgeClass } from '../utils/post-detail.utils';

interface IPostDetailTagsProps {
  tags: IPostDetailTag[];
}

function buildTagHref(name: string): string {
  const params = new URLSearchParams({ search: name });
  return `${ROUTES.home}?${params.toString()}`;
}

export function PostDetailTags({ tags }: IPostDetailTagsProps): React.JSX.Element | null {
  if (tags.length === 0) {
    return null;
  }

  return (
    <section className="mt-6 sm:mt-8" aria-labelledby="post-related-tags">
      <h2
        id="post-related-tags"
        className="mb-3 flex items-center gap-2 text-xs font-bold tracking-wide text-neutral/70 uppercase"
      >
        <Tag className="size-3.5 shrink-0" aria-hidden />
        Temas relacionados / Etiquetas
      </h2>

      <ul className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <li key={tag.slug}>
            <Link
              href={buildTagHref(tag.name)}
              className={cn(
                'inline-flex rounded-full px-3 py-1 text-xs font-medium transition-opacity hover:opacity-85 sm:text-sm',
                getTagBadgeClass(tag, index),
              )}
            >
              #{tag.name.replace(/\s+/g, '')}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
