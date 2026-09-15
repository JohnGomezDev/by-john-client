'use client';

import { getApiErrorMessage } from '@repo/lib/utils/get-api-error-message';
import { toast } from '@repo/ui/components/ui/sonner';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/lib/constants/routes.constants';

import { useDeletePost } from './use-delete-post';
import { usePublishPost } from './use-publish-post';
import { useUnpublishPost } from './use-unpublish-post';

interface IUsePostActionsOptions {
  postId: string;
}

export function usePostActions({ postId }: IUsePostActionsOptions): {
  handleDelete: () => void;
  handlePublish: () => void;
  handleUnpublish: () => void;
  isDeleting: boolean;
  isPublishing: boolean;
  isUnpublishing: boolean;
} {
  const router = useRouter();
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();
  const { mutate: publishPost, isPending: isPublishing } = usePublishPost();
  const { mutate: unpublishPost, isPending: isUnpublishing } = useUnpublishPost();

  const handleDelete = (): void => {
    deletePost(postId, {
      onSuccess: ({ message }) => {
        toast.success(message);
        router.push(ROUTES.admin.posts.list);
      },
      onError: (error) => {
        toast.error(getApiErrorMessage(error, 'Ocurrió un error al eliminar el post.'));
      },
    });
  };

  const handlePublish = (): void => {
    publishPost(postId, {
      onSuccess: ({ message }) => {
        toast.success(message);
      },
      onError: (error) => {
        toast.error(getApiErrorMessage(error, 'Ocurrió un error al publicar el post.'));
      },
    });
  };

  const handleUnpublish = (): void => {
    unpublishPost(postId, {
      onSuccess: ({ message }) => {
        toast.success(message);
      },
      onError: (error) => {
        toast.error(getApiErrorMessage(error, 'Ocurrió un error al despublicar el post.'));
      },
    });
  };

  return {
    handleDelete,
    handlePublish,
    handleUnpublish,
    isDeleting,
    isPublishing,
    isUnpublishing,
  };
}
