'use client';

import {
  useForm,
  type Control,
  type SubmitHandler,
  type UseFormRegisterReturn,
} from 'react-hook-form';

import type { IPostFormValues } from '../types/post-form.types';

export function usePostForm(): {
  titleField: UseFormRegisterReturn<'title'>;
  slugField: UseFormRegisterReturn<'slug'>;
  excerptField: UseFormRegisterReturn<'excerpt'>;
  categoryIdField: UseFormRegisterReturn<'categoryId'>;
  metaTitleField: UseFormRegisterReturn<'metaTitle'>;
  metaDescriptionField: UseFormRegisterReturn<'metaDescription'>;
  ogImageUrlField: UseFormRegisterReturn<'ogImageUrl'>;
  control: Control<IPostFormValues>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errors: {
    title?: { message?: string };
    slug?: { message?: string };
    excerpt?: { message?: string };
    metaTitle?: { message?: string };
    metaDescription?: { message?: string };
  };
} {
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
    console.log(data);
  };

  return {
    titleField: register('title', {
      maxLength: { value: 255, message: 'Máximo 255 caracteres' },
    }),
    slugField: register('slug', {
      maxLength: { value: 255, message: 'Máximo 255 caracteres' },
    }),
    excerptField: register('excerpt', {
      maxLength: { value: 160, message: 'Máximo 160 caracteres' },
    }),
    categoryIdField: register('categoryId'),
    metaTitleField: register('metaTitle', {
      maxLength: { value: 255, message: 'Máximo 255 caracteres' },
    }),
    metaDescriptionField: register('metaDescription', {
      maxLength: { value: 255, message: 'Máximo 255 caracteres' },
    }),
    ogImageUrlField: register('ogImageUrl'),
    control,
    onSubmit: handleSubmit(onSubmit),
    errors,
  };
}
