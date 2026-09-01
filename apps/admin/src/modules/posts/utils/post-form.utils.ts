import type { ICreatePostPayload, IPost, IUpdatePostPayload } from '../types/admin.types';
import type { IPostFormValues } from '../types/post-form.types';

export function mapFormToPayload(data: IPostFormValues): ICreatePostPayload {
  const payload: ICreatePostPayload = {
    title: data.title,
    slug: data.slug,
    content: data.content,
    categoryId: data.categoryId,
    tagIds: data.tagIds,
  };

  if (data.excerpt) {
    payload.excerpt = data.excerpt;
  }

  if (data.metaTitle) {
    payload.metaTitle = data.metaTitle;
  }

  if (data.metaDescription) {
    payload.metaDescription = data.metaDescription;
  }

  if (data.ogImageUrl) {
    payload.ogImageUrl = data.ogImageUrl;
  }

  return payload;
}

export function mapPostToFormValues(post: IPost): IPostFormValues {
  return {
    title: post.title,
    slug: post.slug,
    content: post.content,
    excerpt: post.excerpt ?? '',
    categoryId: post.category.id,
    tagIds: post.tags.map((tag) => tag.id),
    metaTitle: post.metaTitle ?? '',
    metaDescription: post.metaDescription ?? '',
    ogImageUrl: post.ogImageUrl ?? '',
  };
}

export function mapDirtyFieldsToUpdatePayload(
  data: IPostFormValues,
  dirtyFields: Partial<Record<keyof IPostFormValues, boolean>>,
): IUpdatePostPayload {
  const payload: IUpdatePostPayload = {};

  if (dirtyFields.title) {
    payload.title = data.title;
  }

  if (dirtyFields.slug) {
    payload.slug = data.slug;
  }

  if (dirtyFields.content) {
    payload.content = data.content;
  }

  if (dirtyFields.excerpt) {
    payload.excerpt = data.excerpt;
  }

  if (dirtyFields.categoryId) {
    payload.categoryId = data.categoryId;
  }

  if (dirtyFields.tagIds) {
    payload.tagIds = data.tagIds;
  }

  if (dirtyFields.metaTitle) {
    payload.metaTitle = data.metaTitle || null;
  }

  if (dirtyFields.metaDescription) {
    payload.metaDescription = data.metaDescription || null;
  }

  if (dirtyFields.ogImageUrl) {
    payload.ogImageUrl = data.ogImageUrl || null;
  }

  return payload;
}
