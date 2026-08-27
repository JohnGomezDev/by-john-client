export interface IPostCategory {
  id: string;
  name: string;
  slug: string;
}

export interface IPostTag {
  id: string;
  name: string;
  slug: string;
}

export interface IPostAuthor {
  name: string;
  lastName: string;
}

export interface IPostListItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  published: boolean;
  publishedAt: string | null;
  updatedAt: string;
  category: IPostCategory | null;
  admin: IPostAuthor | null;
}

export interface IPaginationMeta {
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface IPostsListResponse {
  items: IPostListItem[];
  meta: IPaginationMeta;
}

export interface IPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  metaTitle: string | null;
  metaDescription: string | null;
  ogImageUrl: string | null;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  category: IPostCategory;
  admin: IPostAuthor;
  tags: IPostTag[];
}

export interface ICreatePostPayload {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  categoryId: string;
  tagIds?: string[];
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImageUrl?: string | null;
}

export interface IUpdatePostPayload {
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  categoryId?: string;
  tagIds?: string[];
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImageUrl?: string | null;
}

export interface IAdminPostsListParams {
  page?: number;
  limit?: number;
  search?: string;
}
