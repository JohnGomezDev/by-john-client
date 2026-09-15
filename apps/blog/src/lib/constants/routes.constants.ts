export const ROUTES = {
  home: '/posts',
  detail: (slug: string) => `/posts/${slug}`,
  privacyPolicy: '/politica-de-privacidad',
} as const;
