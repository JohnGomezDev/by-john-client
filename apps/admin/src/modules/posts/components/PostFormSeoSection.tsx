import type { UseFormRegisterReturn } from 'react-hook-form';

import { Card, CardContent } from '@repo/ui/components/ui/card';
import { Input } from '@repo/ui/components/ui/input';
import { Label } from '@repo/ui/components/ui/label';
import { Textarea } from '@repo/ui/components/ui/textarea';

interface IPostFormSeoSectionProps {
  metaTitleField: UseFormRegisterReturn<'metaTitle'>;
  metaDescriptionField: UseFormRegisterReturn<'metaDescription'>;
  metaTitleError?: string;
  metaDescriptionError?: string;
}

export function PostFormSeoSection({
  metaTitleField,
  metaDescriptionField,
  metaTitleError,
  metaDescriptionError,
}: IPostFormSeoSectionProps): React.JSX.Element {
  return (
    <Card className="border-slate-200 py-0 shadow-sm">
      <CardContent className="space-y-6 px-5 py-6 sm:px-8">
        <h2 className="text-base font-semibold text-slate-900">Ajustes de SEO</h2>

        <div className="space-y-2">
          <Label htmlFor="metaTitle" className="text-sm font-medium text-slate-700">
            Meta título
          </Label>
          <Input
            id="metaTitle"
            placeholder="Por defecto es el título del post"
            aria-invalid={metaTitleError ? true : undefined}
            {...metaTitleField}
          />
          {metaTitleError && <p className="text-sm text-destructive">{metaTitleError}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="metaDescription" className="text-sm font-medium text-slate-700">
            Meta descripción
          </Label>
          <Textarea
            id="metaDescription"
            rows={3}
            placeholder="Por defecto es el resumen (extracto)"
            aria-invalid={metaDescriptionError ? true : undefined}
            {...metaDescriptionField}
          />
          {metaDescriptionError && (
            <p className="text-sm text-destructive">{metaDescriptionError}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
