import type { Control } from 'react-hook-form';
import type { UseFormRegisterReturn } from 'react-hook-form';

import { Card, CardContent } from '@repo/ui/components/ui/card';
import { Label } from '@repo/ui/components/ui/label';
import { cn } from '@repo/ui/lib/utils';

import {
  POST_FORM_CATEGORY_OPTIONS,
  POST_FORM_TAG_OPTIONS,
} from '../constants/post-form-options.constants';
import type { IPostFormValues } from '../types/post-form.types';
import { PostFormTagsField } from './PostFormTagsField';

interface IPostFormOrganizationSectionProps {
  categoryIdField: UseFormRegisterReturn<'categoryId'>;
  control: Control<IPostFormValues>;
}

export function PostFormOrganizationSection({
  categoryIdField,
  control,
}: IPostFormOrganizationSectionProps): React.JSX.Element {
  return (
    <Card className="border-slate-200 py-0 shadow-sm">
      <CardContent className="space-y-6 px-5 py-6 sm:px-8">
        <h2 className="text-base font-semibold text-slate-900">Organización</h2>

        <div className="space-y-2">
          <Label htmlFor="categoryId" className="text-sm font-medium text-slate-700">
            Categoría
          </Label>
          <select
            id="categoryId"
            className={cn(
              'h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none transition-[color,box-shadow]',
              'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
            )}
            {...categoryIdField}
          >
            <option value="" disabled>
              Seleccionar categoría...
            </option>
            {POST_FORM_CATEGORY_OPTIONS.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-slate-700">Etiquetas</Label>
          <PostFormTagsField control={control} options={POST_FORM_TAG_OPTIONS} />
        </div>
      </CardContent>
    </Card>
  );
}
