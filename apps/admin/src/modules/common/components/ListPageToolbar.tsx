'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import type { UseFormRegisterReturn } from 'react-hook-form';

import { Button } from '@repo/ui/components/ui/button';

import { ListSearchForm } from './ListSearchForm';

interface IListPageToolbarProps {
  createHref: string;
  createLabel: string;
  searchField?: UseFormRegisterReturn<'search'>;
  searchPlaceholder?: string;
}

export function ListPageToolbar({
  createHref,
  createLabel,
  searchField,
  searchPlaceholder = 'Buscar...',
}: IListPageToolbarProps): React.JSX.Element {
  return (
    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
      {searchField ? (
        <ListSearchForm searchField={searchField} placeholder={searchPlaceholder} />
      ) : null}
      <Button asChild className="h-10 shrink-0 cursor-pointer bg-blue-600 hover:bg-blue-700">
        <Link href={createHref}>
          <Plus aria-hidden="true" className="size-4" />
          {createLabel}
        </Link>
      </Button>
    </div>
  );
}
