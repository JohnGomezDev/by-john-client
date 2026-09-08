'use client';

import { useCategories } from '@repo/lib/modules/taxonomy/hooks/use-categories';

import { publicFetchClient } from '@/lib/api/public-fetch-client';
import { mapCategoryToFormValues } from '../utils/category-form.utils';
import { CategoryForm } from './CategoryForm';

interface IEditCategoryContainerProps {
  categoryId: string;
}

export function EditCategoryContainer({
  categoryId,
}: IEditCategoryContainerProps): React.JSX.Element {
  const { data: categories, isLoading, isError } = useCategories(publicFetchClient);
  const category = categories?.find((item) => item.id === categoryId);

  if (isLoading) {
    return <p className="text-sm text-neutral/65">Cargando categoría...</p>;
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
