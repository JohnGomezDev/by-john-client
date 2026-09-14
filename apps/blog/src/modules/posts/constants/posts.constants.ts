export interface IMockPostCategory {
  name: string;
  slug: string;
  count: number;
}

export const MOCK_POST_CATEGORIES: readonly IMockPostCategory[] = [
  { name: 'Tecnología e IA', slug: 'tecnologia-e-ia', count: 8 },
  { name: 'Diseño de Producto', slug: 'diseno-de-producto', count: 6 },
  { name: 'Arquitectura Frontend', slug: 'arquitectura-frontend', count: 5 },
  { name: 'Liderazgo & Cultura', slug: 'liderazgo-cultura', count: 3 },
  { name: 'Experiencia de Usuario', slug: 'experiencia-de-usuario', count: 2 },
] as const;

export const MOCK_POST_CATEGORIES_TOTAL = MOCK_POST_CATEGORIES.reduce(
  (sum, category) => sum + category.count,
  0,
);
