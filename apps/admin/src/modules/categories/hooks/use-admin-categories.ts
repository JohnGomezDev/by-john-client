'use client';

import { useQuery } from '@tanstack/react-query';
import type { ICategory } from '@repo/lib/modules/taxonomy/types/taxonomy.types';
import { taxonomyKeys } from '@repo/lib/modules/taxonomy/constants/taxonomy.query-keys';

import { fetchCategories } from '../services/categories.service';

export function useAdminCategories(): ReturnType<typeof useQuery<ICategory[]>> {
  return useQuery({
    queryKey: taxonomyKeys.categories(),
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5,
  });
}
