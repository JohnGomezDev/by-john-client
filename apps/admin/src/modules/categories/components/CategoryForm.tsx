'use client';

import { Button } from '@repo/ui/components/ui/button';

import { useCategoryForm } from '../hooks/use-category-form';
import type { ICategoryFormValues } from '../types/category-form.types';
import { CategoryFormHeader } from './CategoryFormHeader';
import { CategoryFormNameSection } from './CategoryFormNameSection';

interface ICategoryFormProps {
  categoryId?: string;
  defaultValues?: ICategoryFormValues;
}

export function CategoryForm({ categoryId, defaultValues }: ICategoryFormProps): React.JSX.Element {
  const { nameField, slugField, onSubmit, isPending, isEditMode, isDirty, errors } = useCategoryForm({
    categoryId,
    defaultValues,
  });

  const isSubmitDisabled = isPending || (isEditMode && !isDirty);

  return (
    <div className="space-y-6">
      <CategoryFormHeader title={isEditMode ? 'Editar categoría' : 'Crear categoría'} />

      <form onSubmit={onSubmit} className="space-y-6">
        <CategoryFormNameSection
          nameField={nameField}
          slugField={slugField}
          nameError={errors.name?.message}
          slugError={errors.slug?.message}
        />

        <div className="flex justify-end pb-2">
          <Button
            type="submit"
            disabled={isSubmitDisabled}
            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 sm:w-auto"
          >
            {isPending ? 'Guardando...' : isEditMode ? 'Guardar cambios' : 'Guardar'}
          </Button>
        </div>
      </form>
    </div>
  );
}
