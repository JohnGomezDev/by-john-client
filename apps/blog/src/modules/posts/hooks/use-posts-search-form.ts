'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import {
  useForm,
  type SubmitHandler,
  type UseFormHandleSubmit,
  type UseFormRegisterReturn,
  type UseFormWatch,
} from 'react-hook-form';

import { buildUrl } from '../utils/posts-url.utils';

export interface IPostsSearchFormValues {
  search: string;
}

export function usePostsSearchForm(): {
  searchField: UseFormRegisterReturn<'search'>;
  onSubmit: ReturnType<UseFormHandleSubmit<IPostsSearchFormValues>>;
  clearSearch: () => void;
  watch: UseFormWatch<IPostsSearchFormValues>;
  search: string | undefined;
} {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlSearch = searchParams.get('search') ?? '';

  const { register, handleSubmit, setValue, watch } = useForm<IPostsSearchFormValues>({
    defaultValues: {
      search: urlSearch,
    },
  });

  useEffect(() => {
    setValue('search', urlSearch);
  }, [urlSearch, setValue]);

  const applySearch = (rawSearch: string): void => {
    const nextSearch = rawSearch.trim();
    const nextParams = new URLSearchParams(searchParams.toString());

    if (nextSearch) {
      nextParams.set('search', nextSearch);
    } else {
      nextParams.delete('search');
    }

    nextParams.delete('page');

    router.replace(buildUrl(pathname, nextParams), { scroll: false });
  };

  const submitSearch: SubmitHandler<IPostsSearchFormValues> = (data): void => {
    applySearch(data.search);
  };

  const clearSearch = (): void => {
    setValue('search', '');
    applySearch('');
  };

  return {
    searchField: register('search'),
    onSubmit: handleSubmit(submitSearch),
    clearSearch,
    watch,
    search: urlSearch || undefined,
  };
}
