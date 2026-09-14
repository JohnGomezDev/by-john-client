import {
  MOCK_POST_CATEGORIES,
} from '../constants/posts.constants';

interface IPostsListStatusProps {
  totalItems: number;
  categorySlug?: string;
  search?: string;
}

function getShowingLabel(categorySlug?: string, search?: string): string {
  if (search) {
    return `Resultados para “${search}”`;
  }

  if (categorySlug) {
    const category = MOCK_POST_CATEGORIES.find((item) => item.slug === categorySlug);
    return category?.name ?? categorySlug;
  }

  return 'Todos los artículos';
}

export function PostsListStatus({
  totalItems,
  categorySlug,
  search,
}: IPostsListStatusProps): React.JSX.Element {
  return (
    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
      <p className="text-xs font-semibold tracking-[0.1em] text-neutral uppercase sm:text-sm">
        Mostrando:{' '}
        <span className="font-bold text-primary">{getShowingLabel(categorySlug, search)}</span>
      </p>
      <span className="inline-flex items-center rounded-full bg-tertiary px-2.5 py-1 text-xs font-semibold text-tertiary-foreground">
        {totalItems} {totalItems === 1 ? 'publicación' : 'publicaciones'}
      </span>
    </div>
  );
}
