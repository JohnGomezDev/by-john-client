import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { ROUTES } from '@/lib/constants/routes.constants';

interface ICategoryFormHeaderProps {
  title?: string;
}

export function CategoryFormHeader({
  title = 'Crear categoría',
}: ICategoryFormHeaderProps): React.JSX.Element {
  return (
    <div className="flex items-center gap-3">
      <Link
        href={ROUTES.admin.categorias.list}
        className="flex size-9 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50"
        aria-label="Volver al listado de categorías"
      >
        <ArrowLeft className="size-4" />
      </Link>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
    </div>
  );
}
