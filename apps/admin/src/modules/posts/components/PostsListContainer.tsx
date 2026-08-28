'use client';

import { useAdminPosts } from '../hooks/use-admin-posts';
import { usePostsPagination } from '../hooks/use-posts-pagination';
import { usePostsSearchForm } from '../hooks/use-posts-search-form';
import { PostsListHeader } from './PostsListHeader';
import { PostsListPagination } from './PostsListPagination';
import { PostsListToolbar } from './PostsListToolbar';
import { PostsTable } from './PostsTable';

export function PostsListContainer(): React.JSX.Element {
  const { searchField, debouncedSearch } = usePostsSearchForm();
  const {
    page,
    goToPreviousPage,
    goToNextPage,
    getPageRange,
    isPreviousDisabled,
    isNextDisabled,
  } = usePostsPagination(debouncedSearch);
  const { data, isLoading, isError, isFetching } = useAdminPosts({
    page,
    search: debouncedSearch || undefined,
  });

  const renderContent = (): React.JSX.Element => {
    if (isLoading) {
      return <p className="text-sm text-slate-500">Cargando posts...</p>;
    }

    if (isError) {
      return <p className="text-sm text-destructive">No se pudieron cargar los posts.</p>;
    }

    if (!data?.items.length) {
      return (
        <div className="rounded-xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center">
          <p className="text-sm text-slate-500">
            {debouncedSearch
              ? 'No se encontraron posts para tu búsqueda.'
              : 'Aún no hay posts publicados.'}
          </p>
        </div>
      );
    }

    return (
      <>
        <PostsTable posts={data.items} />
        <PostsListPagination
          meta={data.meta}
          isLoading={isFetching}
          onPreviousPage={goToPreviousPage}
          onNextPage={goToNextPage}
          getPageRange={getPageRange}
          isPreviousDisabled={isPreviousDisabled}
          isNextDisabled={isNextDisabled}
        />
      </>
    );
  };

  return (
    <div className="space-y-6">
      <PostsListHeader>
        <PostsListToolbar searchField={searchField} />
      </PostsListHeader>

      {renderContent()}
    </div>
  );
}
