import { User } from 'lucide-react';

import type { ISong } from '../types/songs.types';
import { formatDurationFromMs, formatSongArtists } from '../utils/song-data.utils';
import { SongCover } from './SongCover';
import { SongPlayButton } from './SongPlayButton';

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

        <SongPlayButton previewUrl={song.previewUrl} trackName={song.trackName} size="lg" />
      </div>
    </article>
  );
}
