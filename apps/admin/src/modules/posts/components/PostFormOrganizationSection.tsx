'use client';

import { useCategories } from '@repo/lib/modules/taxonomy/hooks/use-categories';
import { useTags } from '@repo/lib/modules/taxonomy/hooks/use-tags';
import { Card, CardContent } from '@repo/ui/components/ui/card';
import { Label } from '@repo/ui/components/ui/label';
import { cn } from '@repo/ui/lib/utils';
import type { Control, RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';

import { apiClient } from '@/lib/api/api-client';

import type { IPostFormValues } from '../types/post-form.types';
import { PostFormTagsField } from './PostFormTagsField';
import { RequiredFieldIndicator } from '@/modules/common/components/RequiredFieldIndicator';

interface IPostFormOrganizationSectionProps {
  categoryIdField: UseFormRegisterReturn<'categoryId'>;
  control: Control<IPostFormValues>;
  categoryIdError?: string;
  tagIdsRules: RegisterOptions<IPostFormValues, 'tagIds'>;
  tagIdsError?: string;
}

export function PostFormOrganizationSection({
  categoryIdField,
  control,
  categoryIdError,
  tagIdsRules,
  tagIdsError,
}: IPostFormOrganizationSectionProps): React.JSX.Element {
  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useCategories(apiClient);
  const { data: tags, isLoading: isLoadingTags, isError: isErrorTags } = useTags(apiClient);

  return (
    <Card className="border-slate-200 py-0 shadow-sm">
      <CardContent className="space-y-6 px-5 py-6 sm:px-8">
        <h2 className="text-base font-semibold text-slate-900">Organización</h2>

        <div className="space-y-2">
          <Label htmlFor="categoryId" className="text-sm font-medium text-slate-700">
            Categoría
            <RequiredFieldIndicator />
          </Label>
          {isErrorCategories ? (
            <p className="text-sm text-destructive">No se pudieron cargar las categorías.</p>
          ) : (
            <select
              id="categoryId"
              disabled={isLoadingCategories}
              aria-invalid={categoryIdError ? true : undefined}
              className={cn(
                'h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none transition-[color,box-shadow]',
                'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
                'disabled:cursor-not-allowed disabled:opacity-50',
              )}
              {...categoryIdField}
            >
              <option value="" disabled>
                {isLoadingCategories
                  ? 'Cargando categorías...'
                  : 'Seleccionar categoría... *'}
              </option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          )}
          {categoryIdError && <p className="text-sm text-destructive">{categoryIdError}</p>}
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-slate-700">
            Etiquetas
            <RequiredFieldIndicator />
          </Label>
          {isLoadingTags ? (
            <p className="text-sm text-slate-500">Cargando etiquetas...</p>
          ) : isErrorTags ? (
            <p className="text-sm text-destructive">No se pudieron cargar las etiquetas.</p>
          ) : (
            <PostFormTagsField control={control} options={tags ?? []} rules={tagIdsRules} />
          )}
          {tagIdsError && <p className="text-sm text-destructive">{tagIdsError}</p>}
        </div>
      </CardContent>
    </Card>
  );
}
