'use client';

import Image from 'next/image';
import type { ISong } from '@repo/lib/modules/songs/types/songs.types';
import {
  formatDurationFromMs,
  formatSongArtists,
} from '@repo/lib/modules/songs/utils/song-data.utils';

import { useFavoriteSong } from '@/modules/songs/hooks/use-favorite-song';

const WAVEFORM_BARS = [
  28, 44, 36, 62, 48, 78, 54, 70, 42, 88, 60, 74, 38, 66, 52, 80, 46, 58, 34, 72,
  50, 84, 40, 68, 56, 76, 32, 64,
] as const;

const PLAYER_SHELL_CLASS =
  'flex h-full min-h-[280px] flex-col gap-5 rounded-xl border border-border bg-surface p-5 sm:min-h-[300px] sm:p-6';

function AlbumCover({
  song,
}: {
  song: ISong;
}): React.JSX.Element {
  return (
    <div className="relative size-14 shrink-0 overflow-hidden rounded-xl sm:size-16">
      <Image
        src={song.albumCoverUrl}
        alt={`Portada de ${song.albumName}`}
        width={64}
        height={64}
        className="size-full object-cover"
        sizes="64px"
      />
    </div>
  );
}

function AlbumCoverPlaceholder(): React.JSX.Element {
  return (
    <div
      className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-accent/25 via-surface-elevated to-sky-500/15 sm:size-16"
      aria-hidden="true"
    >
      <span className="absolute inset-[18%] rounded-full border border-accent/20" />
      <span className="absolute inset-[32%] rounded-full border border-accent/15" />
      <span className="absolute size-2.5 rounded-full bg-accent/80" />
    </div>
  );
}

function Waveform(): React.JSX.Element {
  return (
    <div
      className="flex h-10 items-end justify-between gap-0.5 sm:h-12"
      aria-hidden="true"
    >
      {WAVEFORM_BARS.map((height, index) => (
        <span
          key={index}
          className="w-full max-w-[5px] rounded-full bg-border"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}

function PlayerHeader({ statusLabel }: { statusLabel: string }): React.JSX.Element {
  return (
    <div className="flex items-center justify-between gap-3">
      <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
        Canción favorita del momento
      </p>
      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-accent">
        <span className="size-1.5 rounded-full bg-accent opacity-40" aria-hidden="true" />
        {statusLabel}
      </span>
    </div>
  );
}

interface IPlayerControlsProps {
  deezerUrl?: string;
}

function PlayerControls({ deezerUrl }: IPlayerControlsProps): React.JSX.Element {
  return (
    <div className="flex items-center gap-2.5 sm:gap-3">
      <button
        type="button"
        aria-label="Reproducir"
        disabled
        className="group relative flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-[0_0_0_1px_color-mix(in_srgb,var(--accent)_35%,transparent),0_8px_24px_-8px_color-mix(in_srgb,var(--accent)_55%,transparent)] transition-[opacity,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span
          className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/15 to-transparent opacity-80"
          aria-hidden="true"
        />
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="relative size-5 translate-x-0.5"
          aria-hidden="true"
        >
          <path d="M5 3l14 9-14 9V3z" />
        </svg>
      </button>

      {deezerUrl ? (
        <a
          href={deezerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex min-h-12 min-w-0 flex-1 items-center justify-between gap-3 rounded-xl border border-border bg-surface-elevated/60 px-3.5 py-2.5 transition-colors hover:border-accent/40 hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <span className="min-w-0 text-left">
            <span className="block truncate text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
              Escuchar canción completa
            </span>
            <span className="mt-0.5 block truncate font-mono text-[11px] text-muted-foreground">
              Abrir en Deezer
            </span>
          </span>
          <span
            className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-background/50 text-muted-foreground transition-colors group-hover:border-accent/35 group-hover:text-accent"
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" fill="none" className="size-3.5">
              <path
                d="M7 17 17 7M9 7h8v8"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </a>
      ) : (
        <div
          className="min-h-12 min-w-0 flex-1 rounded-xl border border-border/60 bg-muted/40"
          aria-hidden="true"
        />
      )}
    </div>
  );
}

function MusicPlayerSkeleton(): React.JSX.Element {
  return (
    <aside
      aria-label="Cargando canción favorita"
      aria-busy="true"
      className={PLAYER_SHELL_CLASS}
    >
      <PlayerHeader statusLabel="Cargando" />

      <div className="flex items-center gap-3.5 sm:gap-4">
        <div
          className="size-14 shrink-0 animate-pulse rounded-xl bg-muted sm:size-16 motion-reduce:animate-none"
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1 space-y-2">
          <div className="h-5 w-3/4 animate-pulse rounded bg-muted motion-reduce:animate-none" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-muted motion-reduce:animate-none" />
          <div className="h-3 w-2/5 animate-pulse rounded bg-muted motion-reduce:animate-none" />
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center">
        <Waveform />
      </div>

      <div className="flex flex-col gap-2">
        <div className="h-1 w-full overflow-hidden rounded-full bg-muted" aria-hidden="true" />
        <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
          <span>0:00</span>
          <span>—:—</span>
        </div>
      </div>

      <PlayerControls />
    </aside>
  );
}

interface IMusicPlayerFeedbackProps {
  title: string;
  message: string;
  onRetry?: () => void;
}

function MusicPlayerFeedback({
  title,
  message,
  onRetry,
}: IMusicPlayerFeedbackProps): React.JSX.Element {
  return (
    <aside aria-label={title} className={PLAYER_SHELL_CLASS}>
      <PlayerHeader statusLabel="Sin audio" />

      <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
        <AlbumCoverPlaceholder />
        <div className="space-y-1.5">
          <p className="font-display text-base font-bold text-foreground">{title}</p>
          <p className="max-w-[16rem] text-sm text-muted-foreground">{message}</p>
        </div>
        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="mt-1 rounded-full border border-border px-4 py-1.5 text-sm text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Reintentar
          </button>
        ) : null}
      </div>
    </aside>
  );
}

interface IMusicPlayerContentProps {
  song: ISong;
}

function MusicPlayerContent({ song }: IMusicPlayerContentProps): React.JSX.Element {
  const artistNames = formatSongArtists(song.artists);

  return (
    <aside
      aria-label={`Reproductor de música — ${song.trackName} de ${artistNames}`}
      className={PLAYER_SHELL_CLASS}
    >
      <PlayerHeader statusLabel="En pausa" />

      <div className="flex items-center gap-3.5 sm:gap-4">
        <AlbumCover song={song} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-base font-bold text-foreground sm:text-lg">
            {song.trackName}
          </p>
          <p className="mt-0.5 truncate text-sm text-muted-foreground">{artistNames}</p>
          <p className="mt-1 truncate font-mono text-[11px] text-muted-foreground/70">
            {song.albumName}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center">
        <Waveform />
      </div>

      <div className="flex flex-col gap-2">
        <div
          role="progressbar"
          aria-valuenow={0}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progreso de la canción"
          className="h-1 w-full overflow-hidden rounded-full bg-muted"
        >
          <div className="h-full w-0 rounded-full bg-accent" />
        </div>
        <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
          <span>0:00</span>
          <span>{formatDurationFromMs(song.durationMs)}</span>
        </div>
      </div>

      <PlayerControls deezerUrl={song.url} />
    </aside>
  );
}

export function MusicPlayerCard(): React.JSX.Element {
  const { data: song, isLoading, isError, refetch } = useFavoriteSong();

  if (isLoading) {
    return <MusicPlayerSkeleton />;
  }

  if (isError) {
    return (
      <MusicPlayerFeedback
        title="No se pudo cargar la canción"
        message="Hubo un problema al obtener la canción favorita actual. Inténtalo de nuevo."
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  if (!song) {
    return (
      <MusicPlayerFeedback
        title="Sin canción favorita"
        message="Aún no hay una canción guardada para mostrar aquí."
      />
    );
  }

  return <MusicPlayerContent song={song} />;
}
