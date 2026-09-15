'use client';

import { getApiErrorMessage } from '@repo/lib/utils/get-api-error-message';
import { toast } from '@repo/ui/components/ui/sonner';
import { useRouter } from 'next/navigation';
import {
  useForm,
  type SubmitHandler,
  type UseFormRegisterReturn,
} from 'react-hook-form';

import { ROUTES } from '@/lib/constants/routes.constants';

import type { ICategoryFormValues } from '../types/category-form.types';
import { mapDirtyFieldsToUpdatePayload, mapFormToPayload } from '../utils/category-form.utils';
import { useCreateCategory } from './use-create-category';
import { useUpdateCategory } from './use-update-category';

const emptyDefaultValues: ICategoryFormValues = {
  name: '',
  slug: '',
};

interface IUseCategoryFormOptions {
  categoryId?: string;
  defaultValues?: ICategoryFormValues;
}

export function useCategoryForm({
  categoryId,
  defaultValues,
}: IUseCategoryFormOptions = {}): {
  nameField: UseFormRegisterReturn<'name'>;
  slugField: UseFormRegisterReturn<'slug'>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
  isEditMode: boolean;
  isDirty: boolean;
  errors: {
    name?: { message?: string };
    slug?: { message?: string };
  };
} {
  const router = useRouter();
  const isEditMode = Boolean(categoryId);
  const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();
  const isPending = isEditMode ? isUpdating : isCreating;

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<ICategoryFormValues>({
    defaultValues: defaultValues ?? emptyDefaultValues,
  });

  const onSubmit: SubmitHandler<ICategoryFormValues> = (data): void => {
    if (isEditMode && categoryId) {
      const payload = mapDirtyFieldsToUpdatePayload(
        data,
        dirtyFields as Partial<Record<keyof ICategoryFormValues, boolean>>,
      );

      if (Object.keys(payload).length === 0) {
        return;
      }

      updateCategory(
        { id: categoryId, payload },
        {
          onSuccess: ({ message }) => {
            toast.success(message);
            router.push(ROUTES.admin.categorias.list);
          },
          onError: (error) => {
            toast.error(getApiErrorMessage(error, 'Ocurrió un error al actualizar la categoría.'));
          },
        },
      );

      return;
    }

    createCategory(mapFormToPayload(data), {
      onSuccess: ({ message }) => {
        toast.success(message);
        router.push(ROUTES.admin.categorias.list);
      },
      onError: (error) => {
        toast.error(getApiErrorMessage(error, 'Ocurrió un error al crear la categoría.'));
      },
    });
  };

  return {
    nameField: register('name', {
      required: 'El nombre es obligatorio',
      maxLength: { value: 255, message: 'Máximo 255 caracteres' },
    }),
    slugField: register('slug', {
      required: 'El slug es obligatorio',
      maxLength: { value: 255, message: 'Máximo 255 caracteres' },
      pattern: {
        value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        message: 'Slug inválido — solo minúsculas, números y guiones',
      },
    }),
    onSubmit: handleSubmit(onSubmit),
    isPending,
    isEditMode,
    isDirty,
    errors,
  };
}
