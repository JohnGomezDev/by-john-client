import type { ISongSearchResult } from '../types/songs.types';
import { SongSearchResultItem } from './SongSearchResultItem';

interface ISongsSearchResultsProps {
  results: ISongSearchResult[];
}

export function SongsSearchResults({
  results,
}: ISongsSearchResultsProps): React.JSX.Element {
  return (
    <ul className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {results.map((result) => (
        <SongSearchResultItem key={result.id} result={result} />
      ))}
    </ul>
  );
}
