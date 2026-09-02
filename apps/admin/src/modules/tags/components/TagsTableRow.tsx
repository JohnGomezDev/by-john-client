'use client';

import { Pencil, Trash2 } from 'lucide-react';

import { Button } from '@repo/ui/components/ui/button';
import type { ITag } from '@repo/lib/modules/taxonomy/types/taxonomy.types';

interface ITagsTableRowProps {
  tag: ITag;
}

export function TagsTableRow({ tag }: ITagsTableRowProps): React.JSX.Element {
  return (
    <tr className="border-b border-slate-100 transition-colors hover:bg-slate-50">
      <td className="px-4 py-4 align-top sm:px-6">
        <p className="text-sm font-medium text-slate-900">{tag.name}</p>
      </td>
      <td className="px-4 py-4 pr-6 align-top whitespace-nowrap sm:px-6 sm:pr-8">
        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            className="shrink-0 cursor-pointer border-blue-600 bg-white text-blue-600 hover:bg-blue-50"
            aria-label="Editar tag"
          >
            <Pencil aria-hidden="true" className="size-4" />
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="icon-sm"
            className="shrink-0 cursor-pointer"
            aria-label="Eliminar tag"
          >
            <Trash2 aria-hidden="true" className="size-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
}
