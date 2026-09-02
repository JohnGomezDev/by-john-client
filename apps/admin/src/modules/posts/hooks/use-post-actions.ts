'use client';

import { getApiErrorMessage } from '@repo/lib/utils/get-api-error-message';
import { toast } from '@repo/ui/components/ui/sonner';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/lib/constants/routes.constants';

import { useDeletePost } from './use-delete-post';

interface IUsePostActionsOptions {
  postId: string;
}

export function usePostActions({ postId }: IUsePostActionsOptions): {
  handleDelete: () => void;
  isDeleting: boolean;
} {
  const router = useRouter();
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();

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

  return {
    handleDelete,
    isDeleting,
  };
}
