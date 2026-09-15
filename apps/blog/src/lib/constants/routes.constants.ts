export const ROUTES = {
  home: '/posts',
  detail: (slug: string) => `/posts/${slug}`,
  privacyPolicy: '/politica-de-privacidad',
  termsOfUse: '/terminos-de-uso',
} as const;
