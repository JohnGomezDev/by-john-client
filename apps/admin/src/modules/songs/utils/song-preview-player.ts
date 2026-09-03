type TPreviewPlayerListener = () => void;

interface IPreviewPlayerState {
  url: string | null;
  isPlaying: boolean;
}

let audio: HTMLAudioElement | null = null;
let state: IPreviewPlayerState = { url: null, isPlaying: false };
const listeners = new Set<TPreviewPlayerListener>();

function emit(): void {
  listeners.forEach((listener) => listener());
}

function setState(next: IPreviewPlayerState): void {
  state = next;
  emit();
}

function ensureAudio(): HTMLAudioElement {
  if (!audio) {
    audio = new Audio();
    audio.preload = 'none';
    audio.addEventListener('ended', () => {
      setState({ url: state.url, isPlaying: false });
    });
  }

  return audio;
}

export function subscribePreviewPlayer(listener: TPreviewPlayerListener): () => void {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function getPreviewPlayerState(): IPreviewPlayerState {
  return state;
}

export function getPreviewPlayerServerState(): IPreviewPlayerState {
  return { url: null, isPlaying: false };
}

export function toggleSongPreview(url: string): void {
  const player = ensureAudio();

  if (state.url === url) {
    if (state.isPlaying) {
      player.pause();
      setState({ url, isPlaying: false });
      return;
    }

    void player
      .play()
      .then(() => {
        setState({ url, isPlaying: true });
      })
      .catch(() => {
        setState({ url, isPlaying: false });
      });

    return;
  }

  player.pause();
  player.src = url;
  setState({ url, isPlaying: false });

  void player
    .play()
    .then(() => {
      setState({ url, isPlaying: true });
    })
    .catch(() => {
      setState({ url, isPlaying: false });
    });
}
