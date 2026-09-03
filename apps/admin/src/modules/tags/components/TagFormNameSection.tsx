import type { UseFormRegisterReturn } from 'react-hook-form';

import { Card, CardContent } from '@repo/ui/components/ui/card';
import { Input } from '@repo/ui/components/ui/input';
import { Label } from '@repo/ui/components/ui/label';

import { RequiredFieldIndicator } from '@/modules/common/components/RequiredFieldIndicator';

interface ITagFormNameSectionProps {
  nameField: UseFormRegisterReturn<'name'>;
  slugField: UseFormRegisterReturn<'slug'>;
  nameError?: string;
  slugError?: string;
}

export function TagFormNameSection({
  nameField,
  slugField,
  nameError,
  slugError,
}: ITagFormNameSectionProps): React.JSX.Element {
  return (
    <Card className="border-slate-200 py-0 shadow-sm">
      <CardContent className="space-y-5 px-5 py-6 sm:px-8">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-slate-700">
            Nombre
            <RequiredFieldIndicator />
          </Label>
          <Input
            id="name"
            placeholder="Nombre del tag *"
            className="h-10"
            aria-invalid={nameError ? true : undefined}
            {...nameField}
          />
          {nameError && <p className="text-sm text-destructive">{nameError}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug" className="text-sm font-medium text-slate-700">
            Slug
            <RequiredFieldIndicator />
          </Label>
          <Input
            id="slug"
            placeholder="slug-del-tag *"
            className="h-10 font-mono"
            aria-invalid={slugError ? true : undefined}
            {...slugField}
          />
          {slugError && <p className="text-sm text-destructive">{slugError}</p>}
        </div>
      </CardContent>
    </Card>
  );
}
