'use client';

import { useState } from 'react';
import {
  useForm,
  type SubmitHandler,
  type UseFormRegisterReturn,
} from 'react-hook-form';

import type { ISongsSearchFormValues } from '../types/songs-search-form.types';

export function useSongsSearchForm(): {
  queryField: UseFormRegisterReturn<'query'>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  submittedQuery: string;
  errors: {
    query?: { message?: string };
  };
} {
  const [submittedQuery, setSubmittedQuery] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISongsSearchFormValues>({
    defaultValues: {
      query: '',
    },
  });

  const onSubmit: SubmitHandler<ISongsSearchFormValues> = (data): void => {
    setSubmittedQuery(data.query.trim());
  };

  return {
    queryField: register('query', {
      required: 'El término de búsqueda es obligatorio',
      validate: (value) =>
        value.trim().length > 0 || 'El término de búsqueda es obligatorio',
    }),
    onSubmit: handleSubmit(onSubmit),
    submittedQuery,
    errors,
  };
}
