'use client';

import { Pause, Play } from 'lucide-react';

import { Button } from '@repo/ui/components/ui/button';
import { cn } from '@repo/ui/lib/utils';

import { useSongPreview } from '../hooks/use-song-preview';

interface ISongPlayButtonProps {
  previewUrl: string | null;
  trackName: string;
  size?: 'sm' | 'lg';
}

export function SongPlayButton({
  previewUrl,
  trackName,
  size = 'sm',
}: ISongPlayButtonProps): React.JSX.Element {
  const { isPlaying, canPlay, toggle } = useSongPreview(previewUrl);
  const Icon = isPlaying ? Pause : Play;

  const ariaLabel = !canPlay
    ? `Sin preview para ${trackName}`
    : isPlaying
      ? `Pausar ${trackName}`
      : `Reproducir ${trackName}`;

  if (size === 'lg') {
    return (
      <Button
        type="button"
        size="icon-lg"
        disabled={!canPlay}
        onClick={toggle}
        className={cn(
          'size-14 shrink-0 self-end rounded-full sm:size-16 sm:self-center',
          canPlay
            ? 'cursor-pointer bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-slate-300 text-white',
        )}
        aria-label={ariaLabel}
      >
        <Icon aria-hidden="true" className="size-6 fill-current" />
      </Button>
    );
  }

  return (
    <Button
      type="button"
      size="icon-sm"
      variant="outline"
      disabled={!canPlay}
      onClick={toggle}
      className={cn(
        'rounded-full border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100',
        canPlay ? 'cursor-pointer' : null,
      )}
      aria-label={ariaLabel}
    >
      <Icon aria-hidden="true" className="size-3.5 fill-current" />
    </Button>
  );
}
