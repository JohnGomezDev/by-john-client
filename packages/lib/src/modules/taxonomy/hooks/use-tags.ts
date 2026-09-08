'use client';

import { useQuery } from '@tanstack/react-query';

import type { IFetchClient } from '../../../api/fetch-client';

import { taxonomyKeys } from '../constants/taxonomy.query-keys';
import { fetchTags } from '../services/taxonomy.service';
import type { ITag } from '../types/taxonomy.types';

export function useTags(fetchClient: IFetchClient): ReturnType<typeof useQuery<ITag[]>> {
  return useQuery({
    queryKey: taxonomyKeys.tags(),
    queryFn: () => fetchTags(fetchClient),
    staleTime: 1000 * 60 * 5,
  });
}
