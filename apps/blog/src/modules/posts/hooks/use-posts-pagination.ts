'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import type { IPaginationMeta } from '../types/posts.types';
import { buildUrl, getVisiblePages, parsePage, type TPaginationItem } from '../utils/posts-url.utils';

interface IPageRange {
  startItem: number;
  endItem: number;
}

export function usePostsPagination(): {
  page: number;
  goToPage: (nextPage: number) => void;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
  getPageRange: (meta: IPaginationMeta) => IPageRange;
  getVisiblePages: (meta: IPaginationMeta) => TPaginationItem[];
  isPreviousDisabled: (meta: IPaginationMeta, isLoading?: boolean) => boolean;
  isNextDisabled: (meta: IPaginationMeta, isLoading?: boolean) => boolean;
} {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parsePage(searchParams.get('page'));

  const goToPage = (nextPage: number): void => {
    const safePage = Math.max(1, nextPage);
    const nextParams = new URLSearchParams(searchParams.toString());

    if (safePage > 1) {
      nextParams.set('page', String(safePage));
    } else {
      nextParams.delete('page');
    }

    router.replace(buildUrl(pathname, nextParams), { scroll: false });
  };

  const goToPreviousPage = (): void => {
    goToPage(page - 1);
  };

  const goToNextPage = (): void => {
    goToPage(page + 1);
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
    goToPage,
    goToPreviousPage,
    goToNextPage,
    getPageRange,
    getVisiblePages: (meta) => getVisiblePages(meta.currentPage, meta.totalPages),
    isPreviousDisabled,
    isNextDisabled,
  };
}
