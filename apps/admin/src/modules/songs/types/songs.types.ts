export interface ISongSearchArtist {
  id: number;
  name: string;
  link: string;
}

export interface ISongSearchAlbum {
  id: number;
  title: string;
  cover: string;
}

export interface ISongSearchResult {
  id: number;
  title: string;
  artist: ISongSearchArtist;
  album: ISongSearchAlbum;
  link: string;
  preview: string | null;
  duration: number;
}

export interface ISongArtist {
  id: string;
  name: string;
  url: string;
}

export interface ISong {
  id: number;
  trackId: string;
  trackName: string;
  artists: ISongArtist[];
  albumId: string;
  albumName: string;
  albumCoverUrl: string;
  url: string;
  previewUrl: string | null;
  durationMs: number;
  createdAt: string;
  updatedAt: string;
}

export interface ISaveFavoriteSongPayload {
  trackId: string;
}

export interface ISaveFavoriteSongResult {
  song: ISong;
  message: string;
}
