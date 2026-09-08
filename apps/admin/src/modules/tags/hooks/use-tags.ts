'use client';

import { useQuery } from '@tanstack/react-query';
import type { ITag } from '@repo/lib/modules/taxonomy/types/taxonomy.types';

import { tagKeys } from '../constants/tags.query-keys';
import { fetchTags } from '../services/tags.service';

export function useTags(): ReturnType<typeof useQuery<ITag[]>> {
  return useQuery({
    queryKey: tagKeys.lists(),
    queryFn: fetchTags,
    staleTime: 1000 * 60 * 5,
  });
}
