import type { ICategory } from '@repo/lib/modules/taxonomy/types/taxonomy.types';

import type { ICreateCategoryPayload, IUpdateCategoryPayload } from '../types/categories.types';
import type { ICategoryFormValues } from '../types/category-form.types';

export function mapFormToPayload(data: ICategoryFormValues): ICreateCategoryPayload {
  return {
    name: data.name.trim(),
    slug: data.slug.trim(),
  };
}

export function mapCategoryToFormValues(category: ICategory): ICategoryFormValues {
  return {
    name: category.name,
    slug: category.slug,
  };
}

export function mapDirtyFieldsToUpdatePayload(
  data: ICategoryFormValues,
  dirtyFields: Partial<Record<keyof ICategoryFormValues, boolean>>,
): IUpdateCategoryPayload {
  const payload: IUpdateCategoryPayload = {};

  if (dirtyFields.name) {
    payload.name = data.name.trim();
  }

  if (dirtyFields.slug) {
    payload.slug = data.slug.trim();
  }

  return payload;
}
