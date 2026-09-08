export const categoryKeys = {
  all: () => ['admin', 'categories'] as const,
  lists: () => [...categoryKeys.all(), 'list'] as const,
};
