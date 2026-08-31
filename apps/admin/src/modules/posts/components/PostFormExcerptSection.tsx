import type { UseFormRegisterReturn } from 'react-hook-form';

import { Card, CardContent } from '@repo/ui/components/ui/card';
import { Label } from '@repo/ui/components/ui/label';
import { Textarea } from '@repo/ui/components/ui/textarea';

interface IPostFormExcerptSectionProps {
  excerptField: UseFormRegisterReturn<'excerpt'>;
  excerptError?: string;
}

export function PostFormExcerptSection({
  excerptField,
  excerptError,
}: IPostFormExcerptSectionProps): React.JSX.Element {
  return (
    <Card className="border-slate-200 py-0 shadow-sm">
      <CardContent className="space-y-3 px-5 py-6 sm:px-8">
        <Label htmlFor="excerpt" className="text-sm font-semibold text-slate-900">
          Extracto / Resumen
        </Label>
        <Textarea
          id="excerpt"
          rows={4}
          placeholder="Una breve descripción del post para listas y resultados de búsqueda..."
          aria-invalid={excerptError ? true : undefined}
          {...excerptField}
        />
        {excerptError && <p className="text-sm text-destructive">{excerptError}</p>}
      </CardContent>
    </Card>
  );
}
