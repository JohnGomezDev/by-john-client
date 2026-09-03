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

import type { ITagFormValues } from '../types/tag-form.types';
import { mapDirtyFieldsToUpdatePayload, mapFormToPayload } from '../utils/tag-form.utils';
import { useCreateTag } from './use-create-tag';
import { useUpdateTag } from './use-update-tag';

const emptyDefaultValues: ITagFormValues = {
  name: '',
  slug: '',
};

interface IUseTagFormOptions {
  tagId?: string;
  defaultValues?: ITagFormValues;
}

export function useTagForm({ tagId, defaultValues }: IUseTagFormOptions = {}): {
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
  const isEditMode = Boolean(tagId);
  const { mutate: createTag, isPending: isCreating } = useCreateTag();
  const { mutate: updateTag, isPending: isUpdating } = useUpdateTag();
  const isPending = isEditMode ? isUpdating : isCreating;

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<ITagFormValues>({
    defaultValues: defaultValues ?? emptyDefaultValues,
  });

  const onSubmit: SubmitHandler<ITagFormValues> = (data): void => {
    if (isEditMode && tagId) {
      const payload = mapDirtyFieldsToUpdatePayload(
        data,
        dirtyFields as Partial<Record<keyof ITagFormValues, boolean>>,
      );

      if (Object.keys(payload).length === 0) {
        return;
      }

      updateTag(
        { id: tagId, payload },
        {
          onSuccess: ({ message }) => {
            toast.success(message);
            router.push(ROUTES.admin.tags.list);
          },
          onError: (error) => {
            toast.error(getApiErrorMessage(error, 'Ocurrió un error al actualizar el tag.'));
          },
        },
      );

      return;
    }

    createTag(mapFormToPayload(data), {
      onSuccess: ({ message }) => {
        toast.success(message);
        router.push(ROUTES.admin.tags.list);
      },
      onError: (error) => {
        toast.error(getApiErrorMessage(error, 'Ocurrió un error al crear el tag.'));
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
