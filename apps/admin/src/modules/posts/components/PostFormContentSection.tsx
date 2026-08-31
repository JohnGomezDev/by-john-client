'use client';

import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { Card, CardContent } from '@repo/ui/components/ui/card';
import { Label } from '@repo/ui/components/ui/label';

import type { IPostFormValues } from '../types/post-form.types';
import { PostFormMdxEditorLazy } from './PostFormMdxEditorLazy';

interface IPostFormContentSectionProps {
  control: Control<IPostFormValues>;
}

export function PostFormContentSection({
  control,
}: IPostFormContentSectionProps): React.JSX.Element {
  return (
    <Card className="border-slate-200 py-0 shadow-sm">
      <CardContent className="space-y-3 px-5 py-6 sm:px-8">
        <Label className="text-sm font-semibold text-slate-900">Contenido</Label>
        <Controller
          name="content"
          control={control}
          render={({ field: { onChange, value } }) => (
            <PostFormMdxEditorLazy defaultValue={value} onChange={onChange} />
          )}
        />
      </CardContent>
    </Card>
  );
}
