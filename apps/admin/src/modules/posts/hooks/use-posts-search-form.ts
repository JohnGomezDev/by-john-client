'use client';

import { useDebounce } from '@repo/lib/modules/common/hooks/use-debounce';
import { useForm, type UseFormRegisterReturn } from 'react-hook-form';

export interface IPostsSearchFormValues {
  search: string;
}

export function usePostsSearchForm(): {
  searchField: UseFormRegisterReturn<'search'>;
  debouncedSearch: string;
} {
  const { register, watch } = useForm<IPostsSearchFormValues>({
    defaultValues: {
      search: '',
    },
  });

  const search = watch('search');
  const debouncedSearch = useDebounce(search.trim(), 400);

  return {
    searchField: register('search'),
    debouncedSearch,
  };
}
