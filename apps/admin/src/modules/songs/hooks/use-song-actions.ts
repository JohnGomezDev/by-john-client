'use client';

import { getApiErrorMessage } from '@repo/lib/utils/get-api-error-message';
import { toast } from '@repo/ui/components/ui/sonner';

import { useSaveFavoriteSong } from './use-save-favorite-song';

interface IUseSongActionsOptions {
  trackId: string;
}

export function useSongActions({ trackId }: IUseSongActionsOptions): {
  handleSaveFavorite: () => void;
  isSavingFavorite: boolean;
} {
  const { mutate: saveFavoriteSong, isPending: isSavingFavorite } = useSaveFavoriteSong();

  const handleSaveFavorite = (): void => {
    saveFavoriteSong(
      { trackId },
      {
        onSuccess: ({ message }) => {
          toast.success(message);
        },
        onError: (error) => {
          toast.error(getApiErrorMessage(error, 'Ocurrió un error al guardar la canción favorita.'));
        },
      },
    );
  };

  return {
    handleSaveFavorite,
    isSavingFavorite,
  };
}
