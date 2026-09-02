import type { IApiResponse } from '@repo/lib/api/api-response.types';
import type { ITag } from '@repo/lib/modules/taxonomy/types/taxonomy.types';

import { apiClient } from '@/lib/api/api-client';

import type {
  ICreateTagPayload,
  ICreateTagResult,
  IDeleteTagResult,
  IUpdateTagPayload,
  IUpdateTagResult,
} from '../types/tags.types';

export async function createTag(payload: ICreateTagPayload): Promise<ICreateTagResult> {
  const { data } = await apiClient.post<IApiResponse<ITag>>('/admin/blog/tags', payload);

  return { tag: data.data, message: data.message };
}

export async function updateTag(id: string, payload: IUpdateTagPayload): Promise<IUpdateTagResult> {
  const { data } = await apiClient.patch<IApiResponse<ITag>>(`/admin/blog/tags/${id}`, payload);

  return { tag: data.data, message: data.message };
}

export async function deleteTag(id: string): Promise<IDeleteTagResult> {
  const { data } = await apiClient.delete<IApiResponse<null>>(`/admin/blog/tags/${id}`);

  return { message: data.message };
}
