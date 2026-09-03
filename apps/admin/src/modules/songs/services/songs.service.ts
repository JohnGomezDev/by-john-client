import type { IApiResponse } from '@repo/lib/api/api-response.types';

import { apiClient } from '@/lib/api/api-client';

import type {
  ISaveFavoriteSongPayload,
  ISaveFavoriteSongResult,
  ISong,
  ISongSearchResult,
} from '../types/songs.types';


export async function fetchFavoriteSong(): Promise<ISong | null> {
  const { data } = await apiClient.get<IApiResponse<ISong>>('/songs/favorite');

  return data.data;
}

export async function searchSongs(query: string): Promise<ISongSearchResult[]> {
  const { data } = await apiClient.get<IApiResponse<ISongSearchResult[]>>('/songs/search', {
    params: { query },
  });

  return data.data;
}

export async function saveFavoriteSong(
  payload: ISaveFavoriteSongPayload,
): Promise<ISaveFavoriteSongResult> {
  const { data } = await apiClient.post<IApiResponse<ISong>>('/songs/favorite', payload);

  return { song: data.data, message: data.message };
}
