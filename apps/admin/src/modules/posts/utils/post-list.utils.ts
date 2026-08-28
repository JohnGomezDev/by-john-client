export function formatPostDate(date: string | null): string {
  if (!date) {
    return '—';
  }

  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

export function formatAuthorName(
  admin: { name: string; lastName: string } | null,
): string {
  if (!admin) {
    return '—';
  }

  return `${admin.name} ${admin.lastName}`;
}

export function formatCategoryName(category: { name: string } | null): string {
  return category?.name ?? '—';
}
