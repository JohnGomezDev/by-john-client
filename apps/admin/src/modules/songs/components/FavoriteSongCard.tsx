import { Play, User } from 'lucide-react';

import { Button } from '@repo/ui/components/ui/button';

import type { ISong } from '../types/songs.types';
import { formatDurationFromMs, formatSongArtists } from '../utils/song-duration.utils';
import { SongCover } from './SongCover';

interface IFavoriteSongCardProps {
  song: ISong;
}

export function FavoriteSongCard({ song }: IFavoriteSongCardProps): React.JSX.Element {
  const artistNames = formatSongArtists(song.artists);
  const duration = formatDurationFromMs(song.durationMs);

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <SongCover src={song.albumCoverUrl} alt={`Portada de ${song.albumName}`} size="lg" />

        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            {song.trackName}
          </h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-600">
            <User aria-hidden="true" className="size-4 shrink-0" />
            <span className="truncate">{artistNames}</span>
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Álbum: {song.albumName} • Duración: {duration}
          </p>
        </div>

        <Button
          type="button"
          size="icon-lg"
          className="size-14 shrink-0 self-end rounded-full bg-blue-600 text-white hover:bg-blue-700 sm:size-16 sm:self-center"
          aria-label={`Reproducir ${song.trackName}`}
        >
          <Play aria-hidden="true" className="size-6 fill-current" />
        </Button>
      </div>
    </article>
  );
}
