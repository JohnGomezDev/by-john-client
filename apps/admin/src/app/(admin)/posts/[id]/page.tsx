import { PostDetailContainer } from '@/modules/posts/components/PostDetailContainer';

interface IPostDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostDetailPage({
  params,
}: IPostDetailPageProps): Promise<React.JSX.Element> {
  const { id } = await params;

  return <PostDetailContainer postId={id} />;
}
