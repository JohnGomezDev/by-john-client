'use client';

import { Button } from '@repo/ui/components/ui/button';

import { ROUTES } from '@/lib/constants/routes.constants';
import { FormPageHeader } from '@/modules/common/components/FormPageHeader';

import { useTagForm } from '../hooks/use-tag-form';
import type { ITagFormValues } from '../types/tag-form.types';
import { TagFormNameSection } from './TagFormNameSection';

interface ITagFormProps {
  tagId?: string;
  defaultValues?: ITagFormValues;
}

export function TagForm({ tagId, defaultValues }: ITagFormProps): React.JSX.Element {
  const { nameField, slugField, onSubmit, isPending, isEditMode, isDirty, errors } = useTagForm({
    tagId,
    defaultValues,
  });

  const isSubmitDisabled = isPending || (isEditMode && !isDirty);

  return (
    <div className="space-y-6">
      <FormPageHeader
        title={isEditMode ? 'Editar tag' : 'Crear tag'}
        backHref={ROUTES.admin.tags.list}
        backAriaLabel="Volver al listado de tags"
      />

      <form onSubmit={onSubmit} className="space-y-6">
        <TagFormNameSection
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
