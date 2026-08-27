'use client';

import { useQuery } from '@tanstack/react-query';

import { adminPostKeys } from '../constants/post.query-keys';
import { fetchAdminPosts } from '../services/posts.service';
import type { IAdminPostsListParams, IPostsListResponse } from '../types/admin.types';

export function useAdminPosts(
  params: IAdminPostsListParams = {},
): ReturnType<typeof useQuery<IPostsListResponse>> {
  return useQuery({
    queryKey: adminPostKeys.list(params),
    queryFn: () => fetchAdminPosts(params),
    staleTime: 1000 * 60 * 5,
  });
}
