export const ROUTES = {
  login: '/login',
  admin: {
    posts: {
      list: '/posts',
      create: '/posts/crear',
      detail: (id: string) => `/posts/${id}`,
    },
    categorias: '/categorias',
    canciones: '/canciones',
  },
} as const;
