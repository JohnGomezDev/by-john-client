export const songKeys = {
  all: () => ['admin', 'songs'] as const,
  favorite: () => [...songKeys.all(), 'favorite'] as const,
  searches: () => [...songKeys.all(), 'search'] as const,
  search: (query: string) => [...songKeys.searches(), query] as const,
};
