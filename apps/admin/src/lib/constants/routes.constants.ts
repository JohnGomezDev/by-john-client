export const ROUTES = {
  login: '/login',
  admin: {
    posts: {
      list: '/posts',
      create: '/posts/crear',
      detail: (id: string) => `/posts/${id}`,
      edit: (id: string) => `/posts/${id}/editar`,
    },
    categorias: {
      list: '/categorias',
      create: '/categorias/crear',
      edit: (id: string) => `/categorias/${id}/editar`,
    },
    tags: {
      list: '/tags',
      create: '/tags/crear',
      edit: (id: string) => `/tags/${id}/editar`,
    },
    canciones: '/canciones',
  },
} as const;
