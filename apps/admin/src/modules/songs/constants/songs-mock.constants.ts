import type { ISong, ISongSearchResult } from '../types/songs.types';

export const MOCK_FAVORITE_SONG: ISong = {
  id: 1,
  trackId: '3135556',
  trackName: 'Neon Echoes',
  artists: [
    {
      id: '13',
      name: 'Synthetic Void',
      url: 'https://www.deezer.com/artist/13',
    },
  ],
  albumId: '302127',
  albumName: 'Lumina Wave',
  albumCoverUrl:
    'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop',
  url: 'https://www.deezer.com/track/3135556',
  previewUrl: 'https://cdns-preview-d.dzcdn.net/stream/preview.mp3',
  durationMs: 228000,
  createdAt: '2026-08-12T10:00:00.000Z',
  updatedAt: '2026-09-01T18:30:00.000Z',
};

export const MOCK_SONG_SEARCH_RESULTS: ISongSearchResult[] = [
  {
    id: 8842101,
    title: 'Nightfall Vibes (Lo-Fi Dreams)',
    artist: {
      id: 101,
      name: 'Warm Sunset Beats',
      link: 'https://www.deezer.com/artist/101',
    },
    album: {
      id: 501,
      title: 'Midnight Lounge',
      cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&h=200&fit=crop',
    },
    link: 'https://www.deezer.com/track/8842101',
    preview: 'https://cdns-preview-d.dzcdn.net/stream/preview.mp3',
    duration: 165,
  },
  {
    id: 8842102,
    title: 'Acoustic Horizon',
    artist: {
      id: 102,
      name: 'Luna & The Pines',
      link: 'https://www.deezer.com/artist/102',
    },
    album: {
      id: 502,
      title: 'Wooden Rooms',
      cover: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=200&h=200&fit=crop',
    },
    link: 'https://www.deezer.com/track/8842102',
    preview: 'https://cdns-preview-d.dzcdn.net/stream/preview.mp3',
    duration: 248,
  },
  {
    id: 3135556,
    title: 'Neon Echoes',
    artist: {
      id: 13,
      name: 'Synthetic Void',
      link: 'https://www.deezer.com/artist/13',
    },
    album: {
      id: 302127,
      title: 'Lumina Wave',
      cover: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=200&h=200&fit=crop',
    },
    link: 'https://www.deezer.com/track/3135556',
    preview: 'https://cdns-preview-d.dzcdn.net/stream/preview.mp3',
    duration: 228,
  },
  {
    id: 8842103,
    title: 'Digital Pulse',
    artist: {
      id: 103,
      name: 'Neon Arcade',
      link: 'https://www.deezer.com/artist/103',
    },
    album: {
      id: 503,
      title: 'Chrome Nights',
      cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop',
    },
    link: 'https://www.deezer.com/track/8842103',
    preview: null,
    duration: 193,
  },
];
