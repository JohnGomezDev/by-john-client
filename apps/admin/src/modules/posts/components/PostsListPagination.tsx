'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@repo/ui/components/ui/button';

import type { IPaginationMeta } from '../types/admin.types';

interface IPostsListPaginationProps {
  meta: IPaginationMeta;
  isLoading?: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
  getPageRange: (meta: IPaginationMeta) => { startItem: number; endItem: number };
  isPreviousDisabled: (meta: IPaginationMeta, isLoading?: boolean) => boolean;
  isNextDisabled: (meta: IPaginationMeta, isLoading?: boolean) => boolean;
}

export function PostsListPagination({
  meta,
  isLoading = false,
  onPreviousPage,
  onNextPage,
  getPageRange,
  isPreviousDisabled,
  isNextDisabled,
}: IPostsListPaginationProps): React.JSX.Element {
  const { startItem, endItem } = getPageRange(meta);
  const { currentPage, totalPages, totalItems } = meta;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-500">
        Mostrando {startItem}–{endItem} de {totalItems} posts
      </p>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          className="cursor-pointer"
          variant="outline"
          size="icon"
          disabled={isPreviousDisabled(meta, isLoading)}
          onClick={onPreviousPage}
          aria-label="Página anterior"
        >
          <ChevronLeft className="size-4" />
        </Button>
        <span className="min-w-24 text-center text-sm text-slate-600">
          Página {currentPage} de {totalPages}
        </span>
        <Button
          type="button"
          className="cursor-pointer"
          variant="outline"
          size="icon"
          disabled={isNextDisabled(meta, isLoading)}
          onClick={onNextPage}
          aria-label="Página siguiente"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
