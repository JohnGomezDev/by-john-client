'use client';

import { useAdminPost } from '../hooks/use-admin-post';
import { PostDetailContent } from './PostDetailContent';
import { PostDetailSidebar } from './PostDetailSidebar';

interface IPostDetailContainerProps {
  postId: string;
}

export function PostDetailContainer({ postId }: IPostDetailContainerProps): React.JSX.Element {
  const { data: post, isLoading, isError } = useAdminPost(postId);

  if (isLoading) {
    return <p className="text-sm text-slate-500">Cargando post...</p>;
  }

  if (isError || !post) {
    return <p className="text-sm text-destructive">No se pudo cargar el post.</p>;
  }

  return (
    <div className="flex flex-col gap-6 lg:h-[calc(100dvh-3rem)] lg:min-h-0 lg:flex-row lg:overflow-hidden">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col lg:overflow-hidden">
        <PostDetailContent post={post} />
      </div>

      <PostDetailSidebar post={post} />
    </div>
  );
}
