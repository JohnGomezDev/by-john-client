'use client';

import { useQuery } from '@tanstack/react-query';
import type { ICategory } from '@repo/lib/modules/taxonomy/types/taxonomy.types';

import { categoryKeys } from '../constants/categories.query-keys';
import { fetchCategories } from '../services/categories.service';

export function useCategories(): ReturnType<typeof useQuery<ICategory[]>> {
  return useQuery({
    queryKey: categoryKeys.lists(),
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5,
  });
}
