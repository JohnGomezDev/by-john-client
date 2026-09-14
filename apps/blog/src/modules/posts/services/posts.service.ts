import type { IApiResponse } from '@repo/lib/api/api-response.types';

import { apiClient } from '@/lib/api/api-client';

import type { IPostDetail, IPostsListParams, IPostsListResponse } from '../types/posts.types';
import { buildPostsListPath } from '../utils/posts-list.utils';
import { ONE_DAY_IN_SECONDS } from '@/lib/constants/stale.constants';

export async function fetchPosts(
  params: IPostsListParams = {},
): Promise<IPostsListResponse> {
  const response = await apiClient.get<IApiResponse<IPostsListResponse>>(
    buildPostsListPath(params),
    { next: { revalidate: ONE_DAY_IN_SECONDS } },
  );

  return response.data;
}

export async function fetchPostBySlug(slug: string): Promise<IPostDetail> {
  const response = await apiClient.get<IApiResponse<IPostDetail>>(`/blog/posts/${slug}`, {
    next: { revalidate: ONE_DAY_IN_SECONDS },
  });

  return response.data;
}
