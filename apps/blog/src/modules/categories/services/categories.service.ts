import type { IApiResponse } from '@repo/lib/api/api-response.types';
import type { ICategory } from '@repo/lib/modules/taxonomy/types/taxonomy.types';

import { apiClient } from '@/lib/api/api-client';

const ONE_DAY_IN_SECONDS = 60 * 60 * 24;

export async function fetchCategories(): Promise<ICategory[]> {
  const response = await apiClient.get<IApiResponse<ICategory[]>>('/blog/categories', {
    next: { revalidate: ONE_DAY_IN_SECONDS },
  });

  return response.data;
}
