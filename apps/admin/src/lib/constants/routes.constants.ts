export const ROUTES = {
  login: '/login',
  admin: {
    posts: {
      list: '/posts',
      detail: (id: string) => `/posts/${id}`,
    },
    categorias: '/categorias',
    canciones: '/canciones',
  },
} as const;
