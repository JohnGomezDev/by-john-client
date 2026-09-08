'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import type { IPaginationMeta } from '../types/posts.types';
import { buildUrl, parsePage } from '../utils/posts-url.utils';

interface IPageRange {
  startItem: number;
  endItem: number;
}

export function usePostsPagination(): {
  page: number;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
  getPageRange: (meta: IPaginationMeta) => IPageRange;
  isPreviousDisabled: (meta: IPaginationMeta, isLoading?: boolean) => boolean;
  isNextDisabled: (meta: IPaginationMeta, isLoading?: boolean) => boolean;
} {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parsePage(searchParams.get('page'));

  const setPage = (nextPage: number): void => {
    const nextParams = new URLSearchParams(searchParams.toString());

    if (nextPage > 1) {
      nextParams.set('page', String(nextPage));
    } else {
      nextParams.delete('page');
    }

    router.replace(buildUrl(pathname, nextParams), { scroll: false });
  };

  const goToPreviousPage = (): void => {
    setPage(Math.max(1, page - 1));
  };

  const goToNextPage = (): void => {
    setPage(page + 1);
  };

  const getPageRange = (meta: IPaginationMeta): IPageRange => {
    const { currentPage, totalItems, itemsPerPage } = meta;

    if (totalItems === 0) {
      return { startItem: 0, endItem: 0 };
    }

    return {
      startItem: (currentPage - 1) * itemsPerPage + 1,
      endItem: Math.min(currentPage * itemsPerPage, totalItems),
    };
  };

  const isPreviousDisabled = (meta: IPaginationMeta, isLoading = false): boolean => {
    return meta.currentPage <= 1 || isLoading;
  };

  const isNextDisabled = (meta: IPaginationMeta, isLoading = false): boolean => {
    return meta.currentPage >= meta.totalPages || isLoading;
  };

  return {
    page,
    goToPreviousPage,
    goToNextPage,
    getPageRange,
    isPreviousDisabled,
    isNextDisabled,
  };
}
