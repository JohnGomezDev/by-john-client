import { ListPageHeader } from '@/modules/common/components/ListPageHeader';

import { MOCK_FAVORITE_SONG, MOCK_SONG_SEARCH_RESULTS } from '../constants/songs-mock.constants';
import { FavoriteSongCard } from './FavoriteSongCard';
import { SongsSearchForm } from './SongsSearchForm';
import { SongsSearchResults } from './SongsSearchResults';

export function SongsPageContainer(): React.JSX.Element {
  return (
    <div className="space-y-8">
      <ListPageHeader title="Canciones" />

      <section className="space-y-3">
        <h2 className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
          Canción favorita del momento
        </h2>
        <FavoriteSongCard song={MOCK_FAVORITE_SONG} />
      </section>

      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Buscar canciones</h2>
          <p className="mt-1 text-sm text-slate-500">
            Encuentra pistas por título, artista o álbum.
          </p>
        </div>
        <SongsSearchForm />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">Canciones encontradas</h2>
        <SongsSearchResults results={MOCK_SONG_SEARCH_RESULTS} />
      </section>
    </div>
  );
}
