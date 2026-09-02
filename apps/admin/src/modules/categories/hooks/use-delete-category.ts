'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taxonomyKeys } from '@repo/lib/modules/taxonomy/constants/taxonomy.query-keys';

import { deleteCategory } from '../services/categories.service';
import type { IDeleteCategoryResult } from '../types/categories.types';

export function useDeleteCategory(): ReturnType<
  typeof useMutation<IDeleteCategoryResult, Error, string>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: taxonomyKeys.categories() });
    },
  });
}
