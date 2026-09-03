'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { songKeys } from '../constants/songs.query-keys';
import { saveFavoriteSong } from '../services/songs.service';
import type { ISaveFavoriteSongPayload, ISaveFavoriteSongResult } from '../types/songs.types';

export function useSaveFavoriteSong(): ReturnType<
  typeof useMutation<ISaveFavoriteSongResult, Error, ISaveFavoriteSongPayload>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveFavoriteSong,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: songKeys.favorite() });
    },
  });
}
