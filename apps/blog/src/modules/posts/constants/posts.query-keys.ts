import type { IPostsListParams } from '../types/posts.types';

export const postKeys = {
  all: () => ['posts'] as const,
  lists: () => [...postKeys.all(), 'list'] as const,
  list: (params: IPostsListParams) => [...postKeys.lists(), params] as const,
  detail: (slug: string) => [...postKeys.all(), 'detail', slug] as const,
};
