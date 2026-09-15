import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

import { ROUTES } from '@/lib/constants/routes.constants';
import { buildCategoryHref } from '@/modules/layout/utils/footer.utils';

import type { IPostDetail } from '../types/posts.types';

interface IPostDetailBreadcrumbsProps {
  post: IPostDetail;
}

export function PostDetailBreadcrumbs({
  post,
}: IPostDetailBreadcrumbsProps): React.JSX.Element {
  return (
    <nav aria-label="Migajas de pan" className="mb-6 sm:mb-8">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-neutral/55 sm:text-sm">
        <li className="flex min-w-0 items-center gap-1.5">
          <Link
            href={ROUTES.home}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
          >
            <Home className="size-3.5 shrink-0" aria-hidden />
            <span>Inicio</span>
          </Link>
        </li>

        <li aria-hidden className="flex items-center text-neutral/35">
          <ChevronRight className="size-3.5" />
        </li>

        <li className="flex min-w-0 items-center">
          <Link
            href={buildCategoryHref(post.category.slug)}
            className="truncate transition-colors hover:text-primary"
          >
            {post.category.name}
          </Link>
        </li>

        <li aria-hidden className="flex items-center text-neutral/35">
          <ChevronRight className="size-3.5" />
        </li>

        <li className="min-w-0 truncate font-medium text-neutral/70" aria-current="page">
          {post.title}
        </li>
      </ol>
    </nav>
  );
}
