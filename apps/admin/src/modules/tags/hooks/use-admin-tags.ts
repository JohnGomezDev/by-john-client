'use client';

import { useQuery } from '@tanstack/react-query';
import type { ITag } from '@repo/lib/modules/taxonomy/types/taxonomy.types';
import { taxonomyKeys } from '@repo/lib/modules/taxonomy/constants/taxonomy.query-keys';

import { fetchTags } from '../services/tags.service';

export function useAdminTags(): ReturnType<typeof useQuery<ITag[]>> {
  return useQuery({
    queryKey: taxonomyKeys.tags(),
    queryFn: fetchTags,
    staleTime: 1000 * 60 * 5,
  });
}
