import type { ICategory } from '@repo/lib/modules/taxonomy/types/taxonomy.types';

export interface ICreateCategoryPayload {
  name: string;
  slug: string;
}

export interface IUpdateCategoryPayload {
  name?: string;
  slug?: string;
}

export interface ICreateCategoryResult {
  category: ICategory;
  message: string;
}

export interface IUpdateCategoryResult {
  category: ICategory;
  message: string;
}

export interface IDeleteCategoryResult {
  message: string;
}
