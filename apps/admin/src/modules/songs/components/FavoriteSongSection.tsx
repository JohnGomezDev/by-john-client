'use client';

import { getApiErrorMessage } from '@repo/lib/utils/get-api-error-message';

import { useFavoriteSong } from '../hooks/use-favorite-song';
import { FavoriteSongCard } from './FavoriteSongCard';

export function FavoriteSongSection(): React.JSX.Element {
  const { data: song, isLoading, isError, error } = useFavoriteSong();

  const renderContent = (): React.JSX.Element => {
    if (isLoading) {
      return <p className="text-sm text-slate-500">Cargando canción favorita...</p>;
    }

    if (isError) {
      return (
        <p className="text-sm text-destructive">
          {getApiErrorMessage(error, 'No se pudo cargar la canción favorita.')}
        </p>
      );
    }

    if (!song) {
      return (
        <div className="rounded-xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center">
          <p className="text-sm text-slate-500">Aún no hay ninguna canción favorita guardada.</p>
        </div>
      );
    }

    return <FavoriteSongCard song={song} />;
  };

  return (
    <section className="space-y-3">
      <h2 className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
        Canción favorita del momento
      </h2>
      {renderContent()}
    </section>
  );
}
