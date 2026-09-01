import { EditPostContainer } from '@/modules/posts/components/EditPostContainer';

interface IEditPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({
  params,
}: IEditPostPageProps): Promise<React.JSX.Element> {
  const { id } = await params;

  return <EditPostContainer postId={id} />;
}
