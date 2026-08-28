'use client';

import { Search } from 'lucide-react';
import type { UseFormRegisterReturn } from 'react-hook-form';

import { Input } from '@repo/ui/components/ui/input';

interface IPostsSearchFormProps {
  searchField: UseFormRegisterReturn<'search'>;
}

export function PostsSearchForm({ searchField }: IPostsSearchFormProps): React.JSX.Element {
  return (
    <div className="relative w-full sm:max-w-xs md:max-w-sm">
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        type="search"
        placeholder="Buscar posts..."
        autoComplete="off"
        className="h-10 pl-10"
        {...searchField}
      />
    </div>
  );
}
