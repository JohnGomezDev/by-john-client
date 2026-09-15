import { EditTagContainer } from '@/modules/tags/components/EditTagContainer';

interface IEditTagPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTagPage({
  params,
}: IEditTagPageProps): Promise<React.JSX.Element> {
  const { id } = await params;

  return <EditTagContainer tagId={id} />;
}
