'use client';

import { useSearchParams } from 'next/navigation';

import { usePosts } from '../hooks/use-posts';
import { usePostsCategoryFilter } from '../hooks/use-posts-category-filter';
import { usePostsPagination } from '../hooks/use-posts-pagination';
import { PostsList } from './PostsList';
import { PostsListEmpty, PostsListError } from './PostsListEmpty';
import { PostsListPagination } from './PostsListPagination';
import { PostsListSkeleton } from './PostsListSkeleton';
import { PostsListStatus } from './PostsListStatus';
import { PostsSidebar } from './PostsSidebar';

export function PostsListContainer(): React.JSX.Element {
  const searchParams = useSearchParams();
  const search = searchParams.get('search')?.trim() || undefined;
  const { categorySlug } = usePostsCategoryFilter();
  const {
    page,
    goToPage,
    goToPreviousPage,
    goToNextPage,
    getPageRange,
    getVisiblePages,
    isPreviousDisabled,
    isNextDisabled,
  } = usePostsPagination();

  const { data, isLoading, isError, isFetching } = usePosts({
    page,
    search,
    categorySlug,
  });

  const renderFeed = (): React.JSX.Element => {
    if (isLoading) {
      return <PostsListSkeleton />;
    }

    if (isError) {
      return <PostsListError />;
    }

    if (!data?.items.length) {
      return <PostsListEmpty search={search} categorySlug={categorySlug} />;
    }

    return (
      <>
        <PostsList posts={data.items} />
        <PostsListPagination
          meta={data.meta}
          isLoading={isFetching}
          onPreviousPage={goToPreviousPage}
          onNextPage={goToNextPage}
          onGoToPage={goToPage}
          getPageRange={getPageRange}
          getVisiblePages={getVisiblePages}
          isPreviousDisabled={isPreviousDisabled}
          isNextDisabled={isNextDisabled}
        />
      </>
    );
  };

  return (
    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)] lg:items-start lg:gap-8">
      <PostsSidebar />

      <section className="flex min-w-0 flex-col gap-4" aria-label="Listado de artículos">
        <PostsListStatus
          totalItems={data?.meta.totalItems ?? 0}
          categorySlug={categorySlug}
          search={search}
        />
        {renderFeed()}
      </section>
    </div>
  );
}
