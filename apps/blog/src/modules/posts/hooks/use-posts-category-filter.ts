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

  const categorySlug = searchParams.get('category')?.trim() || undefined;

  const setCategorySlug = (slug: string | undefined): void => {
    const nextParams = new URLSearchParams(searchParams.toString());

    if (slug) {
      nextParams.set('category', slug);
    } else {
      nextParams.delete('category');
    }

    nextParams.delete('page');

    router.replace(buildUrl(pathname, nextParams), { scroll: false });
  };

  return {
    categorySlug,
    setCategorySlug,
  };
}
