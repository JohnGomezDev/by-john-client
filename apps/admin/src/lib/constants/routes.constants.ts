export const ROUTES = {
  login: '/login',
  admin: {
    posts: {
      list: '/posts',
      create: '/posts/crear',
      detail: (id: string) => `/posts/${id}`,
      edit: (id: string) => `/posts/${id}/editar`,
    },
    categorias: '/categorias',
    canciones: '/canciones',
  },
} as const;
