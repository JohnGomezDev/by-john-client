import type { ITag } from '@repo/lib/modules/taxonomy/types/taxonomy.types';

export interface ICreateTagPayload {
  name: string;
  slug: string;
}

export interface IUpdateTagPayload {
  name?: string;
  slug?: string;
}

export interface ICreateTagResult {
  tag: ITag;
  message: string;
}

export interface IUpdateTagResult {
  tag: ITag;
  message: string;
}

export interface IDeleteTagResult {
  message: string;
}
