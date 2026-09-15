import { Sparkles } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@repo/ui/lib/utils';

import { buildCategoryHref } from '@/modules/layout/utils/footer.utils';

import type { IPostDetailCategory } from '../types/posts.types';
import { getCategoryBadgeClass } from '../utils/post-detail.utils';

interface IPostDetailCategoryBadgeProps {
  category: IPostDetailCategory;
}

export function PostDetailCategoryBadge({
  category,
}: IPostDetailCategoryBadgeProps): React.JSX.Element {
  return (
    <Link
      href={buildCategoryHref(category.slug)}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase transition-opacity hover:opacity-90',
        getCategoryBadgeClass(category.slug),
      )}
    >
      <Sparkles className="size-3.5 shrink-0" aria-hidden />
      {category.name}
    </Link>
  );
}
