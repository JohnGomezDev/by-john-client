'use client';

import { useEffect, useState } from 'react';

import type { IPaginationMeta } from '../types/admin.types';

interface IPageRange {
  startItem: number;
  endItem: number;
}

export function usePostsPagination(searchTerm: string): {
  page: number;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
  getPageRange: (meta: IPaginationMeta) => IPageRange;
  isPreviousDisabled: (meta: IPaginationMeta, isLoading?: boolean) => boolean;
  isNextDisabled: (meta: IPaginationMeta, isLoading?: boolean) => boolean;
} {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  const goToPreviousPage = (): void => {
    setPage((currentPage) => Math.max(1, currentPage - 1));
  };

  const goToNextPage = (): void => {
    setPage((currentPage) => currentPage + 1);
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
