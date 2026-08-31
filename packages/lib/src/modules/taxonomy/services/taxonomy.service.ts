import type { AxiosInstance } from 'axios';

import type { IApiResponse } from '../../../api/api-response.types';

import type { ICategory, ITag } from '../types/taxonomy.types';

export async function fetchCategories(apiClient: AxiosInstance): Promise<ICategory[]> {
  const { data } = await apiClient.get<IApiResponse<ICategory[]>>('/blog/categories');

  return data.data;
}

export async function fetchTags(apiClient: AxiosInstance): Promise<ITag[]> {
  const { data } = await apiClient.get<IApiResponse<ITag[]>>('/blog/tags');

  return data.data;
}
