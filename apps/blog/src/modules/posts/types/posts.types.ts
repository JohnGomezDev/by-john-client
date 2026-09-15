export interface IPostListCategory {
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
  category: IPostListCategory | null;
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

export interface IPostsListParams {
  page?: number;
  limit?: number;
  search?: string;
  categorySlug?: string;
}

export interface IPostDetailCategory {
  name: string;
  slug: string;
}

export interface IPostDetailTag {
  name: string;
  slug: string;
}

export interface IPostDetail {
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
  category: IPostDetailCategory;
  admin: IPostAuthor;
  tags: IPostDetailTag[];
}
