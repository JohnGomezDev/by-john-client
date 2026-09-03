import { Heart } from 'lucide-react';

import { Button } from '@repo/ui/components/ui/button';

import type { ISongSearchResult } from '../types/songs.types';
import { formatDurationFromSeconds } from '../utils/song-data.utils';
import { SongCover } from './SongCover';
import { SongPlayButton } from './SongPlayButton';

interface ISongSearchResultItemProps {
  result: ISongSearchResult;
}

export function SongSearchResultItem({
  result,
}: ISongSearchResultItemProps): React.JSX.Element {
  const duration = formatDurationFromSeconds(result.duration);

  return (
    <li className="border-b border-slate-100 last:border-b-0">
      <div className="flex items-start gap-3 px-4 py-4 sm:items-center sm:px-5">
        <SongCover src={result.album.cover} alt={`Portada de ${result.album.title}`} size="sm" />

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-900">{result.title}</p>
          <p className="mt-0.5 truncate text-sm text-slate-500">{result.artist.name}</p>
          <p className="mt-1 truncate text-xs text-slate-400">
            {result.album.title} • {duration} min
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <SongPlayButton previewUrl={result.preview} trackName={result.title} size="sm" />

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 cursor-pointer border-blue-600 bg-white text-blue-600 hover:bg-blue-50"
          >
            <Heart aria-hidden="true" className="size-3.5" />
            <span className="hidden sm:inline">Guardar</span>
          </Button>
        </div>
      </div>
    </li>
  );
}
