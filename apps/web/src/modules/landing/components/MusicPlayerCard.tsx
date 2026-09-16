'use client';

import { useState } from 'react';

const MOCK_TRACK = {
  trackName: 'Deep Focus Beats',
  artistName: 'Lo-Fi & Ambient',
  albumName: 'Focus Sessions Vol. 3',
  durationMs: 3 * 60 * 1000 + 45 * 1000,
};

const WAVEFORM_BARS = [
  28, 44, 36, 62, 48, 78, 54, 70, 42, 88, 60, 74, 38, 66, 52, 80, 46, 58, 34, 72,
  50, 84, 40, 68, 56, 76, 32, 64,
] as const;

function formatMs(ms: number): string {
  const totalSecs = Math.floor(ms / 1000);
  const mins = Math.floor(totalSecs / 60);
  const secs = totalSecs % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function AlbumCoverPlaceholder({ isPlaying }: { isPlaying: boolean }): React.JSX.Element {
  return (
    <div
      className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-accent/25 via-surface-elevated to-sky-500/15 sm:size-16"
      aria-hidden="true"
    >
      <span
        className={[
          'absolute inset-[18%] rounded-full border border-accent/20',
          isPlaying ? 'animate-[spin_8s_linear_infinite] motion-reduce:animate-none' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      />
      <span className="absolute inset-[32%] rounded-full border border-accent/15" />
      <span className="absolute size-2.5 rounded-full bg-accent/80" />
    </div>
  );
}

function Waveform({
  progress,
  isPlaying,
}: {
  progress: number;
  isPlaying: boolean;
}): React.JSX.Element {
  const activeIndex = Math.floor(progress * WAVEFORM_BARS.length);

  return (
    <div
      className="flex h-10 items-end justify-between gap-0.5 sm:h-12"
      aria-hidden="true"
    >
      {WAVEFORM_BARS.map((height, index) => {
        const isActive = index <= activeIndex;
        return (
          <span
            key={index}
            className={[
              'w-full max-w-[5px] rounded-full transition-colors duration-300',
              isActive ? 'bg-accent' : 'bg-border',
              isPlaying && isActive
                ? 'motion-safe:animate-pulse'
                : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={{ height: `${height}%` }}
          />
        );
      })}
    </div>
  );
}

interface IControlButtonProps {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}

function ControlButton({
  onClick,
  label,
  children,
}: IControlButtonProps): React.JSX.Element {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {children}
    </button>
  );
}

export function MusicPlayerCard(): React.JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress] = useState(0.38);

  const progressPercent = Math.round(progress * 100);
  const elapsed = Math.round(progress * MOCK_TRACK.durationMs);

  return (
    <aside
      aria-label="Reproductor de música — datos de prueba"
      className="flex h-full min-h-[280px] flex-col gap-5 rounded-xl border border-border bg-surface p-5 sm:min-h-[300px] sm:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
          Vibras actuales
        </p>
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-accent">
          <span
            className={[
              'size-1.5 rounded-full bg-accent',
              isPlaying
                ? 'animate-pulse shadow-[0_0_6px_var(--accent)]'
                : 'opacity-40',
            ].join(' ')}
            aria-hidden="true"
          />
          {isPlaying ? 'Reproduciendo' : 'En pausa'}
        </span>
      </div>

      <div className="flex items-center gap-3.5 sm:gap-4">
        <AlbumCoverPlaceholder isPlaying={isPlaying} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-base font-bold text-foreground sm:text-lg">
            {MOCK_TRACK.trackName}
          </p>
          <p className="mt-0.5 truncate text-sm text-muted-foreground">
            {MOCK_TRACK.artistName}
          </p>
          <p className="mt-1 truncate font-mono text-[11px] text-muted-foreground/70">
            {MOCK_TRACK.albumName}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center">
        <Waveform progress={progress} isPlaying={isPlaying} />
      </div>

      <div className="flex flex-col gap-2">
        <div
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progreso de la canción"
          className="h-1 w-full overflow-hidden rounded-full bg-muted"
        >
          <div
            className="h-full rounded-full bg-accent"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
          <span>{formatMs(elapsed)}</span>
          <span>{formatMs(MOCK_TRACK.durationMs)}</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 sm:gap-4">
        <ControlButton onClick={() => {}} label="Canción anterior">
          <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
            <path
              d="M19 20 9 12l10-8v16ZM5 4v16"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </ControlButton>

        <button
          type="button"
          aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
          onClick={() => setIsPlaying((prev) => !prev)}
          className="flex size-11 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4 translate-x-0.5"
              aria-hidden="true"
            >
              <path d="M5 3l14 9-14 9V3z" />
            </svg>
          )}
        </button>

        <ControlButton onClick={() => {}} label="Siguiente canción">
          <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
            <path
              d="M5 4l10 8-10 8V4ZM19 4v16"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </ControlButton>
      </div>
    </aside>
  );
}
