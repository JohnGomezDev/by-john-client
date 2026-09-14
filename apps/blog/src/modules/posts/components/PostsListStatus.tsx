'use client';

import { useCategories } from '@/modules/categories/hooks/use-categories';

interface IPostsListStatusProps {
  totalItems: number;
  categorySlug?: string;
  search?: string;
}

export function PostsListStatus({
  totalItems,
  categorySlug,
  search,
}: IPostsListStatusProps): React.JSX.Element {
  const { data: categories = [] } = useCategories();

  const getShowingLabel = (): string => {
    if (search) {
      return `Resultados para “${search}”`;
    }

    if (categorySlug) {
      const category = categories.find((item) => item.slug === categorySlug);
      return category?.name ?? categorySlug;
    }

    return 'Todos los artículos';
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
      <p className="text-xs font-semibold tracking-[0.1em] text-neutral uppercase sm:text-sm">
        Mostrando:{' '}
        <span className="font-bold text-primary">{getShowingLabel()}</span>
      </p>
      <span className="inline-flex items-center rounded-full bg-tertiary px-2.5 py-1 text-xs font-semibold text-tertiary-foreground">
        {totalItems} {totalItems === 1 ? 'publicación' : 'publicaciones'}
      </span>
    </div>
  );
}
