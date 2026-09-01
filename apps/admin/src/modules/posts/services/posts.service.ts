import type { IApiResponse } from '@repo/lib/api/api-response.types';

import { apiClient } from '@/lib/api/api-client';

import type {
  IAdminPostsListParams,
  ICreatePostPayload,
  ICreatePostResult,
  IPost,
  IPostsListResponse,
  IUpdatePostPayload,
} from '../types/admin.types';

export async function fetchAdminPosts(
  params: IAdminPostsListParams = {},
): Promise<IPostsListResponse> {
  const { data } = await apiClient.get<IApiResponse<IPostsListResponse>>('/admin/posts', {
    params,
  });

  return data.data;
}

export async function fetchAdminPostById(id: string): Promise<IPost> {
  const { data } = await apiClient.get<IApiResponse<IPost>>(`/admin/posts/${id}`);

  return data.data;
}

export async function createPost(payload: ICreatePostPayload): Promise<ICreatePostResult> {
  const { data } = await apiClient.post<IApiResponse<IPost>>('/admin/posts', payload);

  return { post: data.data, message: data.message };
}

export async function updatePost(id: string, payload: IUpdatePostPayload): Promise<IPost> {
  const { data } = await apiClient.patch<IApiResponse<IPost>>(`/admin/posts/${id}`, payload);

  return data.data;
}

export async function deletePost(id: string): Promise<void> {
  await apiClient.delete(`/admin/posts/${id}`);
}

export async function publishPost(id: string): Promise<IPost> {
  const { data } = await apiClient.patch<IApiResponse<IPost>>(`/admin/posts/${id}/publish`);

  return data.data;
}

export async function unpublishPost(id: string): Promise<IPost> {
  const { data } = await apiClient.patch<IApiResponse<IPost>>(`/admin/posts/${id}/unpublish`);

  return data.data;
}
