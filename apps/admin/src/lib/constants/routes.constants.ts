export const ROUTES = {
  login: '/login',
  admin: {
    dashboard: '/dashboard',
    posts: {
      list: '/posts',
      detail: (id: string) => `/posts/${id}`,
    },
    categorias: '/categorias',
    canciones: '/canciones',
  },
} as const;
