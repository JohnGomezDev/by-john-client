import type { IAdminPostsListParams } from '../types/admin.types';

export const adminPostKeys = {
  all: () => ['admin', 'posts'] as const,
  lists: () => [...adminPostKeys.all(), 'list'] as const,
  list: (params: IAdminPostsListParams) => [...adminPostKeys.lists(), params] as const,
  detail: (id: string) => [...adminPostKeys.all(), id] as const,
};
