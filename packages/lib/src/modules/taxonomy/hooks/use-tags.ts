'use client';

import { useQuery } from '@tanstack/react-query';
import type { AxiosInstance } from 'axios';

import { taxonomyKeys } from '../constants/taxonomy.query-keys';
import { fetchTags } from '../services/taxonomy.service';
import type { ITag } from '../types/taxonomy.types';

export function useTags(apiClient: AxiosInstance): ReturnType<typeof useQuery<ITag[]>> {
  return useQuery({
    queryKey: taxonomyKeys.tags(),
    queryFn: () => fetchTags(apiClient),
    staleTime: 1000 * 60 * 5,
  });
}
