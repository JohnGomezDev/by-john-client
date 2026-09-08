'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import {
  useForm,
  type SubmitHandler,
  type UseFormHandleSubmit,
  type UseFormRegisterReturn,
} from 'react-hook-form';

import { buildUrl } from '../utils/posts-url.utils';

export interface IPostsSearchFormValues {
  search: string;
}

export function usePostsSearchForm(): {
  searchField: UseFormRegisterReturn<'search'>;
  onSubmit: ReturnType<UseFormHandleSubmit<IPostsSearchFormValues>>;
  search: string | undefined;
} {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlSearch = searchParams.get('search') ?? '';

  const { register, handleSubmit, setValue } = useForm<IPostsSearchFormValues>({
    defaultValues: {
      search: urlSearch,
    },
  });

  useEffect(() => {
    setValue('search', urlSearch);
  }, [urlSearch, setValue]);

  const submitSearch: SubmitHandler<IPostsSearchFormValues> = (data): void => {
    const nextSearch = data.search.trim();
    const nextParams = new URLSearchParams(searchParams.toString());

    if (nextSearch) {
      nextParams.set('search', nextSearch);
    } else {
      nextParams.delete('search');
    }

    nextParams.delete('page');

    router.replace(buildUrl(pathname, nextParams), { scroll: false });
  };

  return {
    searchField: register('search'),
    onSubmit: handleSubmit(submitSearch),
    search: urlSearch || undefined,
  };
}
