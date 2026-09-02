'use client';

import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react';

import { ROUTES } from '@/lib/constants/routes.constants';
import { Button } from '@repo/ui/components/ui/button';
import type { ICategory } from '@repo/lib/modules/taxonomy/types/taxonomy.types';

interface ICategoriesTableRowProps {
  category: ICategory;
}

export function CategoriesTableRow({ category }: ICategoriesTableRowProps): React.JSX.Element {
  return (
    <tr className="border-b border-slate-100 transition-colors hover:bg-slate-50">
      <td className="px-4 py-4 align-top sm:px-6">
        <p className="text-sm font-medium text-slate-900">{category.name}</p>
      </td>
      <td className="px-4 py-4 pr-6 align-top whitespace-nowrap sm:px-6 sm:pr-8">
        <div className="flex items-center justify-end gap-2">
          <Button
            asChild
            variant="outline"
            size="icon-sm"
            className="shrink-0 cursor-pointer border-blue-600 bg-white text-blue-600 hover:bg-blue-50"
          >
            <Link href={ROUTES.admin.categorias.edit(category.id)} aria-label="Editar categoría">
              <Pencil aria-hidden="true" className="size-4" />
            </Link>
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="icon-sm"
            className="shrink-0 cursor-pointer"
            aria-label="Eliminar categoría"
          >
            <Trash2 aria-hidden="true" className="size-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
}
