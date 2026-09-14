'use client';

import { cn } from '@repo/ui/lib/utils';

import {
  MOCK_POST_CATEGORIES,
  MOCK_POST_CATEGORIES_TOTAL,
} from '../constants/posts.constants';
import { usePostsCategoryFilter } from '../hooks/use-posts-category-filter';

export function PostsCategoriesNav(): React.JSX.Element {
  const { categorySlug, setCategorySlug } = usePostsCategoryFilter();
  const isAllActive = !categorySlug;

  return (
    <section className="rounded-xl border border-border bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-xs font-semibold tracking-[0.12em] text-neutral uppercase">
          Categorías temáticas
        </h2>
        <span className="text-xs text-neutral/55">Total {MOCK_POST_CATEGORIES_TOTAL}</span>
      </div>

      <nav aria-label="Categorías">
        <ul className="flex flex-col gap-1.5">
          <li>
            <button
              type="button"
              onClick={() => setCategorySlug(undefined)}
              className={cn(
                'group flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors',
                isAllActive
                  ? 'bg-secondary font-medium text-secondary-foreground'
                  : 'text-neutral/75 hover:bg-muted',
              )}
              aria-current={isAllActive ? 'true' : undefined}
            >
              <span>Todas</span>
              <span
                className={cn(
                  'inline-flex min-w-7 items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold transition-colors',
                  isAllActive
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-neutral/70 group-hover:bg-tertiary/70 group-hover:text-tertiary-foreground',
                )}
              >
                {MOCK_POST_CATEGORIES_TOTAL}
              </span>
            </button>
          </li>

          {MOCK_POST_CATEGORIES.map((category) => {
            const isActive = categorySlug === category.slug;

            return (
              <li key={category.slug}>
                <button
                  type="button"
                  onClick={() => setCategorySlug(category.slug)}
                  className={cn(
                    'group flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors',
                    isActive
                      ? 'bg-secondary font-medium text-secondary-foreground'
                      : 'text-neutral/75 hover:bg-muted',
                  )}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        'size-1.5 shrink-0 rounded-full',
                        isActive ? 'bg-secondary-foreground' : 'bg-neutral/35',
                      )}
                      aria-hidden
                    />
                    {category.name}
                  </span>
                  <span
                    className={cn(
                      'inline-flex min-w-7 items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-neutral/70 group-hover:bg-tertiary/70 group-hover:text-tertiary-foreground',
                    )}
                  >
                    {category.count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </section>
  );
}
