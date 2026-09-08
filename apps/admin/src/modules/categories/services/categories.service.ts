import type { IApiResponse } from '@repo/lib/api/api-response.types';
import type { ICategory } from '@repo/lib/modules/taxonomy/types/taxonomy.types';

import { axiosClient } from '@/lib/api/axios-client';

import type {
  ICreateCategoryPayload,
  ICreateCategoryResult,
  IDeleteCategoryResult,
  IUpdateCategoryPayload,
  IUpdateCategoryResult,
} from '../types/categories.types';

export async function fetchCategories(): Promise<ICategory[]> {
  const { data } = await axiosClient.get<IApiResponse<ICategory[]>>('/blog/categories');

  return data.data;
}

export async function createCategory(
  payload: ICreateCategoryPayload,
): Promise<ICreateCategoryResult> {
  const { data } = await axiosClient.post<IApiResponse<ICategory>>(
    '/admin/blog/categories',
    payload,
  );

  return { category: data.data, message: data.message };
}

export async function updateCategory(
  id: string,
  payload: IUpdateCategoryPayload,
): Promise<IUpdateCategoryResult> {
  const { data } = await axiosClient.patch<IApiResponse<ICategory>>(
    `/admin/blog/categories/${id}`,
    payload,
  );

  return { category: data.data, message: data.message };
}

export async function deleteCategory(id: string): Promise<IDeleteCategoryResult> {
  const { data } = await axiosClient.delete<IApiResponse<null>>(`/admin/blog/categories/${id}`);

  return { message: data.message };
}
