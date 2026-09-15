'use client';

import { useTags } from '@/modules/tags/hooks/use-tags';

import { mapTagToFormValues } from '../utils/tag-form.utils';
import { TagForm } from './TagForm';

interface IEditTagContainerProps {
  tagId: string;
}

export function EditTagContainer({ tagId }: IEditTagContainerProps): React.JSX.Element {
  const { data: tags, isLoading, isError } = useTags();
  const tag = tags?.find((item) => item.id === tagId);

  if (isLoading) {
    return <p className="text-sm text-neutral/65">Cargando tag...</p>;
  }

  if (isError) {
    return <p className="text-sm text-destructive">No se pudo cargar el tag.</p>;
  }

  if (!tag) {
    return <p className="text-sm text-destructive">Tag no encontrado.</p>;
  }

  return <TagForm tagId={tagId} defaultValues={mapTagToFormValues(tag)} />;
}
