'use client';

import { useCategories } from '@repo/lib/modules/taxonomy/hooks/use-categories';

import { apiClient } from '@/lib/api/api-client';
import { ROUTES } from '@/lib/constants/routes.constants';
import { ListPageHeader } from '@/modules/common/components/ListPageHeader';
import { ListPageToolbar } from '@/modules/common/components/ListPageToolbar';

import { CategoriesTable } from './CategoriesTable';

export function CategoriesListContainer(): React.JSX.Element {
  const { data, isLoading, isError } = useCategories(apiClient);

  const renderContent = (): React.JSX.Element => {
    if (isLoading) {
      return <p className="text-sm text-slate-500">Cargando categorías...</p>;
    }

    if (isError) {
      return <p className="text-sm text-destructive">No se pudieron cargar las categorías.</p>;
    }

    if (!data?.length) {
      return (
        <div className="rounded-xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center">
          <p className="text-sm text-slate-500">Aún no hay categorías registradas.</p>
        </div>
      );
    }

    return <CategoriesTable categories={data} />;
  };

  return (
    <div className="space-y-6">
      <ListPageHeader title="Categorías">
        <ListPageToolbar
          createHref={ROUTES.admin.categorias.create}
          createLabel="Crear categoría"
        />
      </ListPageHeader>

      {renderContent()}
    </div>
  );
}
