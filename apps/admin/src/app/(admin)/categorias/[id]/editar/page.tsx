import { EditCategoryContainer } from '@/modules/categories/components/EditCategoryContainer';

interface IEditCategoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCategoryPage({
  params,
}: IEditCategoryPageProps): Promise<React.JSX.Element> {
  const { id } = await params;

  return <EditCategoryContainer categoryId={id} />;
}
