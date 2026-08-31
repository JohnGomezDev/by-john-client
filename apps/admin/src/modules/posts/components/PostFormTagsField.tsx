'use client';

import { X } from 'lucide-react';
import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { cn } from '@repo/ui/lib/utils';

import type { IPostFormTagOption } from '../constants/post-form-options.constants';
import type { IPostFormValues } from '../types/post-form.types';

interface IPostFormTagsFieldProps {
  control: Control<IPostFormValues>;
  options: IPostFormTagOption[];
}

export function PostFormTagsField({
  control,
  options,
}: IPostFormTagsFieldProps): React.JSX.Element {
  return (
    <Controller
      name="tagIds"
      control={control}
      render={({ field }) => {
        const selectedIds = field.value ?? [];

        const toggleTag = (tagId: string): void => {
          if (selectedIds.includes(tagId)) {
            field.onChange(selectedIds.filter((id) => id !== tagId));
            return;
          }

          field.onChange([...selectedIds, tagId]);
        };

        const selectedTags = options.filter((option) => selectedIds.includes(option.id));
        const availableTags = options.filter((option) => !selectedIds.includes(option.id));

        return (
          <div className="space-y-3">
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => toggleTag(tag.id)}
                    className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-200"
                  >
                    {tag.name}
                    <X aria-hidden="true" className="size-3" />
                  </button>
                ))}
              </div>
            )}

            <div className="rounded-md border border-input bg-white p-2">
              {availableTags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleTag(tag.id)}
                      className={cn(
                        'cursor-pointer rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700',
                      )}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="px-2 py-1 text-sm text-slate-400">Todas las etiquetas seleccionadas</p>
              )}
            </div>

            <p className="text-xs text-slate-500">Haz clic para agregar o quitar etiquetas</p>
          </div>
        );
      }}
    />
  );
}
