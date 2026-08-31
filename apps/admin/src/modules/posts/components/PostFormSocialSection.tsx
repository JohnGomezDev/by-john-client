import type { UseFormRegisterReturn } from 'react-hook-form';

import { Card, CardContent } from '@repo/ui/components/ui/card';
import { Input } from '@repo/ui/components/ui/input';
import { Label } from '@repo/ui/components/ui/label';

interface IPostFormSocialSectionProps {
  ogImageUrlField: UseFormRegisterReturn<'ogImageUrl'>;
}

export function PostFormSocialSection({
  ogImageUrlField,
}: IPostFormSocialSectionProps): React.JSX.Element {
  return (
    <Card className="border-slate-200 py-0 shadow-sm">
      <CardContent className="space-y-6 px-5 py-6 sm:px-8">
        <h2 className="text-base font-semibold text-slate-900">Redes sociales (OG)</h2>

        <div className="space-y-2">
          <Label htmlFor="ogImageUrl" className="text-sm font-medium text-slate-700">
            Imagen destacada
          </Label>
          <Input
            id="ogImageUrl"
            type="url"
            placeholder="https://ejemplo.com/imagen.jpg"
            {...ogImageUrlField}
          />
        </div>
      </CardContent>
    </Card>
  );
}
