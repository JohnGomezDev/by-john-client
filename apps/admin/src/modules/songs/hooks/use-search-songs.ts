'use client';

import { useQuery } from '@tanstack/react-query';

import { songKeys } from '../constants/songs.query-keys';
import { searchSongs } from '../services/songs.service';
import type { ISongSearchResult } from '../types/songs.types';

export function useSearchSongs(query: string): ReturnType<typeof useQuery<ISongSearchResult[]>> {
  const trimmedQuery = query.trim();

  return useQuery({
    queryKey: songKeys.search(trimmedQuery),
    queryFn: () => searchSongs(trimmedQuery),
    staleTime: 1000 * 60 * 5,
    enabled: trimmedQuery.length > 0,
  });
}
