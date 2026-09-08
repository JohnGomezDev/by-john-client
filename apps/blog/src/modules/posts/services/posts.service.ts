import type { IApiResponse } from '@repo/lib/api/api-response.types';

import { apiClient } from '@/lib/api/api-client';

import type { IPostDetail, IPostsListParams, IPostsListResponse } from '../types/posts.types';
import { buildPostsListPath } from '../utils/posts-list.utils';

const ONE_HOUR_IN_SECONDS = 60 * 60;

export async function fetchPosts(
  params: IPostsListParams = {},
): Promise<IPostsListResponse> {
  const response = await apiClient.get<IApiResponse<IPostsListResponse>>(buildPostsListPath(params));

  return response.data;
}

export async function fetchPostBySlug(slug: string): Promise<IPostDetail> {
  const response = await apiClient.get<IApiResponse<IPostDetail>>(`/blog/posts/${slug}`, {
    next: { revalidate: ONE_HOUR_IN_SECONDS },
  });

  return response.data;
}
