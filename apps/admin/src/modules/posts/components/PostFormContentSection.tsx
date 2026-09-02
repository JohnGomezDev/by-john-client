'use client';

import type { Control, RegisterOptions } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { Card, CardContent } from '@repo/ui/components/ui/card';
import { Label } from '@repo/ui/components/ui/label';

import type { IPostFormValues } from '../types/post-form.types';
import { PostFormMdxEditorLazy } from './PostFormMdxEditorLazy';
import { RequiredFieldIndicator } from '@/modules/common/components/RequiredFieldIndicator';

interface IPostFormContentSectionProps {
  control: Control<IPostFormValues>;
  contentRules: RegisterOptions<IPostFormValues, 'content'>;
  contentError?: string;
}

export function PostFormContentSection({
  control,
  contentRules,
  contentError,
}: IPostFormContentSectionProps): React.JSX.Element {
  return (
    <Card className="border-slate-200 py-0 shadow-sm">
      <CardContent className="space-y-3 px-5 py-6 sm:px-8">
        <Label className="text-sm font-semibold text-slate-900">
          Contenido
          <RequiredFieldIndicator />
        </Label>
        <Controller
          name="content"
          control={control}
          rules={contentRules}
          render={({ field: { onChange, value } }) => (
            <PostFormMdxEditorLazy defaultValue={value} onChange={onChange} />
          )}
        />
        {contentError && <p className="text-sm text-destructive">{contentError}</p>}
      </CardContent>
    </Card>
  );
}
