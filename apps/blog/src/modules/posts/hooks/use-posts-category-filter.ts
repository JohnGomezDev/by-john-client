'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { buildUrl } from '../utils/posts-url.utils';

export function usePostsCategoryFilter(): {
  categorySlug: string | undefined;
  setCategorySlug: (slug: string | undefined) => void;
} {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categorySlug = searchParams.get('categorySlug')?.trim() || undefined;

  const setCategorySlug = (slug: string | undefined): void => {
    const nextParams = new URLSearchParams(searchParams.toString());

    if (slug) {
      nextParams.set('categorySlug', slug);
    } else {
      nextParams.delete('categorySlug');
    }

    nextParams.delete('page');

    router.replace(buildUrl(pathname, nextParams), { scroll: false });
  };

  return {
    categorySlug,
    setCategorySlug,
  };
}
