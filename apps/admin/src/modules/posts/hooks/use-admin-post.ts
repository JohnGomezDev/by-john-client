'use client';

import { useQuery } from '@tanstack/react-query';

import { adminPostKeys } from '../constants/post.query-keys';
import { fetchAdminPostById } from '../services/posts.service';
import type { IPost } from '../types/admin.types';

export function useAdminPost(id: string): ReturnType<typeof useQuery<IPost>> {
  return useQuery({
    queryKey: adminPostKeys.detail(id),
    queryFn: () => fetchAdminPostById(id),
    staleTime: 1000 * 60 * 10,
    enabled: Boolean(id),
  });
}
