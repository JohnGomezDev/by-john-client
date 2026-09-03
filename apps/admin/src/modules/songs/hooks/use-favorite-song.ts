'use client';

import { useQuery } from '@tanstack/react-query';

import { songKeys } from '../constants/songs.query-keys';
import { fetchFavoriteSong } from '../services/songs.service';
import type { ISong } from '../types/songs.types';

export function useFavoriteSong(): ReturnType<typeof useQuery<ISong | null>> {
  return useQuery({
    queryKey: songKeys.favorite(),
    queryFn: fetchFavoriteSong,
    staleTime: 1000 * 60 * 5,
  });
}
