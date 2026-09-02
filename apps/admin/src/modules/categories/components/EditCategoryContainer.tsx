'use client';

import { useCategories } from '@repo/lib/modules/taxonomy/hooks/use-categories';

import { apiClient } from '@/lib/api/api-client';
import { mapCategoryToFormValues } from '../utils/category-form.utils';
import { CategoryForm } from './CategoryForm';

interface IEditCategoryContainerProps {
  categoryId: string;
}

export function EditCategoryContainer({
  categoryId,
}: IEditCategoryContainerProps): React.JSX.Element {
  const { data: categories, isLoading, isError } = useCategories(apiClient);
  const category = categories?.find((item) => item.id === categoryId);

  if (isLoading) {
    return <p className="text-sm text-slate-500">Cargando categoría...</p>;
  }

  if (isError) {
    return <p className="text-sm text-destructive">No se pudo cargar la categoría.</p>;
  }

  if (!category) {
    return <p className="text-sm text-destructive">Categoría no encontrada.</p>;
  }

  return (
    <CategoryForm categoryId={categoryId} defaultValues={mapCategoryToFormValues(category)} />
  );
}
