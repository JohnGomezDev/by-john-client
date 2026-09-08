'use client';

import { useQuery } from '@tanstack/react-query';

import type { IFetchClient } from '../../../api/fetch-client';

import { taxonomyKeys } from '../constants/taxonomy.query-keys';
import { fetchCategories } from '../services/taxonomy.service';
import type { ICategory } from '../types/taxonomy.types';

export function useCategories(
  fetchClient: IFetchClient,
): ReturnType<typeof useQuery<ICategory[]>> {
  return useQuery({
    queryKey: taxonomyKeys.categories(),
    queryFn: () => fetchCategories(fetchClient),
    staleTime: 1000 * 60 * 5,
  });
}
