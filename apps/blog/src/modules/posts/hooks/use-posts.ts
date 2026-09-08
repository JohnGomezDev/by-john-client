'use client';

import { useQuery } from '@tanstack/react-query';

import { postKeys } from '../constants/posts.query-keys';
import { fetchPosts } from '../services/posts.service';
import type { IPostsListParams, IPostsListResponse } from '../types/posts.types';

export function usePosts(
  params: IPostsListParams = {},
): ReturnType<typeof useQuery<IPostsListResponse>> {
  return useQuery({
    queryKey: postKeys.list(params),
    queryFn: () => fetchPosts(params),
    staleTime: 1000 * 60 * 5,
  });
}
