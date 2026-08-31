'use client';

import { useQuery } from '@tanstack/react-query';
import type { AxiosInstance } from 'axios';

import { taxonomyKeys } from '../constants/taxonomy.query-keys';
import { fetchCategories } from '../services/taxonomy.service';
import type { ICategory } from '../types/taxonomy.types';

export function useCategories(
  apiClient: AxiosInstance,
): ReturnType<typeof useQuery<ICategory[]>> {
  return useQuery({
    queryKey: taxonomyKeys.categories(),
    queryFn: () => fetchCategories(apiClient),
    staleTime: 1000 * 60 * 5,
  });
}
