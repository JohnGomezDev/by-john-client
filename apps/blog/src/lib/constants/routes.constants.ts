export const ROUTES = {
  home: '/posts',
  detail: (slug: string) => `/posts/${slug}`,
} as const;
