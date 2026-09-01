'use client';

import { useAdminPost } from '../hooks/use-admin-post';
import { mapPostToFormValues } from '../utils/post-form.utils';
import { PostForm } from './PostForm';

interface IEditPostContainerProps {
  postId: string;
}

export function EditPostContainer({ postId }: IEditPostContainerProps): React.JSX.Element {
  const { data: post, isLoading, isError } = useAdminPost(postId);

  if (isLoading) {
    return <p className="text-sm text-slate-500">Cargando post...</p>;
  }

  if (isError || !post) {
    return <p className="text-sm text-destructive">No se pudo cargar el post.</p>;
  }

  return <PostForm postId={postId} defaultValues={mapPostToFormValues(post)} />;
}
