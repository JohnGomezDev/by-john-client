'use client';

import { getApiErrorMessage } from '@repo/lib/utils/get-api-error-message';
import { toast } from '@repo/ui/components/ui/sonner';
import { useRouter } from 'next/navigation';
import {
  useForm,
  type Control,
  type RegisterOptions,
  type SubmitHandler,
  type UseFormRegisterReturn,
} from 'react-hook-form';

import { ROUTES } from '@/lib/constants/routes.constants';

import type { IPostFormValues } from '../types/post-form.types';
import { mapDirtyFieldsToUpdatePayload, mapFormToPayload } from '../utils/post-form.utils';
import { useCreatePost } from './use-create-post';
import { useUpdatePost } from './use-update-post';

const emptyDefaultValues: IPostFormValues = {
  title: '',
  slug: '',
  content: '',
  excerpt: '',
  categoryId: '',
  tagIds: [],
  metaTitle: '',
  metaDescription: '',
  ogImageUrl: '',
};

const contentRules: RegisterOptions<IPostFormValues, 'content'> = {
  validate: (value) => value.trim().length > 0 || 'El contenido es obligatorio',
};

const tagIdsRules: RegisterOptions<IPostFormValues, 'tagIds'> = {
  validate: (value) => (value?.length ?? 0) > 0 || 'Selecciona al menos una etiqueta',
};

interface IUsePostFormOptions {
  postId?: string;
  defaultValues?: IPostFormValues;
}

export function usePostForm({
  postId,
  defaultValues,
}: IUsePostFormOptions = {}): {
  titleField: UseFormRegisterReturn<'title'>;
  slugField: UseFormRegisterReturn<'slug'>;
  excerptField: UseFormRegisterReturn<'excerpt'>;
  categoryIdField: UseFormRegisterReturn<'categoryId'>;
  metaTitleField: UseFormRegisterReturn<'metaTitle'>;
  metaDescriptionField: UseFormRegisterReturn<'metaDescription'>;
  ogImageUrlField: UseFormRegisterReturn<'ogImageUrl'>;
  control: Control<IPostFormValues>;
  contentRules: RegisterOptions<IPostFormValues, 'content'>;
  tagIdsRules: RegisterOptions<IPostFormValues, 'tagIds'>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
  isEditMode: boolean;
  isDirty: boolean;
  errors: {
    title?: { message?: string };
    slug?: { message?: string };
    excerpt?: { message?: string };
    content?: { message?: string };
    categoryId?: { message?: string };
    tagIds?: { message?: string };
    metaTitle?: { message?: string };
    metaDescription?: { message?: string };
  };
} {
  const router = useRouter();
  const isEditMode = Boolean(postId);
  const { mutate: createPost, isPending: isCreating } = useCreatePost();
  const { mutate: updatePost, isPending: isUpdating } = useUpdatePost();
  const isPending = isEditMode ? isUpdating : isCreating;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<IPostFormValues>({
    defaultValues: defaultValues ?? emptyDefaultValues,
  });

  const onSubmit: SubmitHandler<IPostFormValues> = (data): void => {
    if (isEditMode && postId) {
      const payload = mapDirtyFieldsToUpdatePayload(data, dirtyFields as Partial<Record<keyof IPostFormValues, boolean>>);

      if (Object.keys(payload).length === 0) {
        return;
      }

      updatePost(
        { id: postId, payload },
        {
          onSuccess: ({ message }) => {
            toast.success(message);
            router.push(ROUTES.admin.posts.detail(postId));
          },
          onError: (error) => {
            toast.error(getApiErrorMessage(error, 'Ocurrió un error al actualizar el post.'));
          },
        },
      );

      return;
    }

    createPost(mapFormToPayload(data), {
      onSuccess: ({ message }) => {
        toast.success(message);
        router.push(ROUTES.admin.posts.list);
      },
      onError: (error) => {
        toast.error(getApiErrorMessage(error, 'Ocurrió un error al crear el post.'));
      },
    });
  };

  return {
    titleField: register('title', {
      required: 'El título es obligatorio',
      maxLength: { value: 255, message: 'Máximo 255 caracteres' },
    }),
    slugField: register('slug', {
      required: 'El slug es obligatorio',
      maxLength: { value: 255, message: 'Máximo 255 caracteres' },
    }),
    excerptField: register('excerpt', {
      maxLength: { value: 160, message: 'Máximo 160 caracteres' },
    }),
    categoryIdField: register('categoryId', {
      required: 'La categoría es obligatoria',
    }),
    metaTitleField: register('metaTitle', {
      maxLength: { value: 255, message: 'Máximo 255 caracteres' },
    }),
    metaDescriptionField: register('metaDescription', {
      maxLength: { value: 255, message: 'Máximo 255 caracteres' },
    }),
    ogImageUrlField: register('ogImageUrl'),
    control,
    contentRules,
    tagIdsRules,
    onSubmit: handleSubmit(onSubmit),
    isPending,
    isEditMode,
    isDirty,
    errors,
  };
}
