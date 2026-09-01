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

import type { ICreatePostPayload } from '../types/admin.types';
import type { IPostFormValues } from '../types/post-form.types';
import { useCreatePost } from './use-create-post';

function mapFormToPayload(data: IPostFormValues): ICreatePostPayload {
  const payload: ICreatePostPayload = {
    title: data.title,
    slug: data.slug,
    content: data.content,
    categoryId: data.categoryId,
    tagIds: data.tagIds,
  };

  if (data.excerpt) {
    payload.excerpt = data.excerpt;
  }

  if (data.metaTitle) {
    payload.metaTitle = data.metaTitle;
  }

  if (data.metaDescription) {
    payload.metaDescription = data.metaDescription;
  }

  if (data.ogImageUrl) {
    payload.ogImageUrl = data.ogImageUrl;
  }

  return payload;
}

const contentRules: RegisterOptions<IPostFormValues, 'content'> = {
  validate: (value) => value.trim().length > 0 || 'El contenido es obligatorio',
};

const tagIdsRules: RegisterOptions<IPostFormValues, 'tagIds'> = {
  validate: (value) => (value?.length ?? 0) > 0 || 'Selecciona al menos una etiqueta',
};

export function usePostForm(): {
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
  const { mutate: createPost, isPending } = useCreatePost();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostFormValues>({
    defaultValues: {
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      categoryId: '',
      tagIds: [],
      metaTitle: '',
      metaDescription: '',
      ogImageUrl: '',
    },
  });

  const onSubmit: SubmitHandler<IPostFormValues> = (data): void => {
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
    errors,
  };
}
