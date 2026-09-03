import type { ITag } from '@repo/lib/modules/taxonomy/types/taxonomy.types';

import type { ITagFormValues } from '../types/tag-form.types';
import type { ICreateTagPayload, IUpdateTagPayload } from '../types/tags.types';

export function mapFormToPayload(data: ITagFormValues): ICreateTagPayload {
  return {
    name: data.name.trim(),
    slug: data.slug.trim(),
  };
}

export function mapTagToFormValues(tag: ITag): ITagFormValues {
  return {
    name: tag.name,
    slug: tag.slug,
  };
}

export function mapDirtyFieldsToUpdatePayload(
  data: ITagFormValues,
  dirtyFields: Partial<Record<keyof ITagFormValues, boolean>>,
): IUpdateTagPayload {
  const payload: IUpdateTagPayload = {};

  if (dirtyFields.name) {
    payload.name = data.name.trim();
  }

  if (dirtyFields.slug) {
    payload.slug = data.slug.trim();
  }

  return payload;
}
