export const tagKeys = {
  all: () => ['admin', 'tags'] as const,
  lists: () => [...tagKeys.all(), 'list'] as const,
};
