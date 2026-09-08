import type { IPostsListParams } from '../types/posts.types';

export function buildPostsListPath(params: IPostsListParams = {}): string {
  const searchParams = new URLSearchParams();

  if (params.page !== undefined) {
    searchParams.set('page', String(params.page));
  }

  if (params.limit !== undefined) {
    searchParams.set('limit', String(params.limit));
  }

  if (params.search) {
    searchParams.set('search', params.search);
  }

  if (params.categorySlug) {
    searchParams.set('categorySlug', params.categorySlug);
  }

  const query = searchParams.toString();

  return query ? `/blog/posts?${query}` : '/blog/posts';
}
