export const taxonomyKeys = {
  all: () => ['taxonomy'] as const,
  categories: () => [...taxonomyKeys.all(), 'categories'] as const,
  tags: () => [...taxonomyKeys.all(), 'tags'] as const,
};
