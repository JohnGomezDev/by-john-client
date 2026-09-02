import type { IApiResponse } from '@repo/lib/api/api-response.types';
import type { ICategory } from '@repo/lib/modules/taxonomy/types/taxonomy.types';

import { apiClient } from '@/lib/api/api-client';

import type {
  ICreateCategoryPayload,
  ICreateCategoryResult,
  IDeleteCategoryResult,
  IUpdateCategoryPayload,
  IUpdateCategoryResult,
} from '../types/categories.types';

export async function createCategory(
  payload: ICreateCategoryPayload,
): Promise<ICreateCategoryResult> {
  const { data } = await apiClient.post<IApiResponse<ICategory>>(
    '/admin/blog/categories',
    payload,
  );

  return { category: data.data, message: data.message };
}

export async function updateCategory(
  id: string,
  payload: IUpdateCategoryPayload,
): Promise<IUpdateCategoryResult> {
  const { data } = await apiClient.patch<IApiResponse<ICategory>>(
    `/admin/blog/categories/${id}`,
    payload,
  );

  return { category: data.data, message: data.message };
}

export async function deleteCategory(id: string): Promise<IDeleteCategoryResult> {
  const { data } = await apiClient.delete<IApiResponse<null>>(`/admin/blog/categories/${id}`);

  return { message: data.message };
}
