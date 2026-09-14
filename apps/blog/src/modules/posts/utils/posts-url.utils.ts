import type { IPostsListParams } from '../types/posts.types';

export type TPaginationItem = number | 'ellipsis';

export function parsePage(value: string | null): number {
  const page = Number(value);

  return Number.isInteger(page) && page >= 1 ? page : 1;
}

export function buildUrl(pathname: string, params: URLSearchParams): string {
  const query = params.toString();

  return query ? `${pathname}?${query}` : pathname;
}

function getSearchParamValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

/** Normalizes App Router searchParams into the same shape used by postKeys.list / usePosts. */
export function parsePostsListSearchParams(
  searchParams: Record<string, string | string[] | undefined>,
): IPostsListParams {
  const page = parsePage(getSearchParamValue(searchParams.page) ?? null);
  const search = getSearchParamValue(searchParams.search)?.trim() || undefined;
  const categorySlug = getSearchParamValue(searchParams.categorySlug)?.trim() || undefined;

  const params: IPostsListParams = { page };

  if (search) {
    params.search = search;
  }

  if (categorySlug) {
    params.categorySlug = categorySlug;
  }

  return params;
}

export function getVisiblePages(currentPage: number, totalPages: number): TPaginationItem[] {
  if (totalPages <= 0) {
    return [];
  }

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set<number>();
  pages.add(1);
  pages.add(totalPages);

  for (let page = currentPage - 1; page <= currentPage + 1; page += 1) {
    if (page >= 1 && page <= totalPages) {
      pages.add(page);
    }
  }

  const sorted = Array.from(pages).sort((a, b) => a - b);
  const items: TPaginationItem[] = [];

  for (let index = 0; index < sorted.length; index += 1) {
    const page = sorted[index]!;
    const previous = sorted[index - 1];

    if (previous !== undefined && page - previous > 1) {
      items.push('ellipsis');
    }

    items.push(page);
  }

  return items;
}
