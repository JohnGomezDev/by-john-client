'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taxonomyKeys } from '@repo/lib/modules/taxonomy/constants/taxonomy.query-keys';

import { updateCategory } from '../services/categories.service';
import type { IUpdateCategoryPayload, IUpdateCategoryResult } from '../types/categories.types';

interface IUpdateCategoryVariables {
  id: string;
  payload: IUpdateCategoryPayload;
}

export function useUpdateCategory(): ReturnType<
  typeof useMutation<IUpdateCategoryResult, Error, IUpdateCategoryVariables>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => updateCategory(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: taxonomyKeys.categories() });
    },
  });
}
