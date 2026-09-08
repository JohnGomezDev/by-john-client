import type { IApiResponse } from '../../../api/api-response.types';
import type { IFetchClient } from '../../../api/fetch-client';

import type { ICategory, ITag } from '../types/taxonomy.types';

export async function fetchCategories(fetchClient: IFetchClient): Promise<ICategory[]> {
  const response = await fetchClient.get<IApiResponse<ICategory[]>>('/blog/categories');

  return response.data;
}

export async function fetchTags(fetchClient: IFetchClient): Promise<ITag[]> {
  const response = await fetchClient.get<IApiResponse<ITag[]>>('/blog/tags');

  return response.data;
}
