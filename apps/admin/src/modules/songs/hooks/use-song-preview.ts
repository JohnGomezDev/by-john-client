'use client';

import { useSyncExternalStore } from 'react';

import {
  getPreviewPlayerServerState,
  getPreviewPlayerState,
  subscribePreviewPlayer,
  toggleSongPreview,
} from '../utils/song-preview-player';

export function useSongPreview(previewUrl: string | null): {
  isPlaying: boolean;
  canPlay: boolean;
  toggle: () => void;
} {
  const state = useSyncExternalStore(
    subscribePreviewPlayer,
    getPreviewPlayerState,
    getPreviewPlayerServerState,
  );

  const canPlay = Boolean(previewUrl);
  const isPlaying = canPlay && state.url === previewUrl && state.isPlaying;

  const toggle = (): void => {
    if (!previewUrl) {
      return;
    }

    toggleSongPreview(previewUrl);
  };

  return { isPlaying, canPlay, toggle };
}
