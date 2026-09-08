'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryKeys } from '../constants/categories.query-keys';

import { createCategory } from '../services/categories.service';
import type { ICreateCategoryPayload, ICreateCategoryResult } from '../types/categories.types';

export function useCreateCategory(): ReturnType<
  typeof useMutation<ICreateCategoryResult, Error, ICreateCategoryPayload>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
    },
  });
}
