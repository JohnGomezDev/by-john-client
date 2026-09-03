'use client';

import { getApiErrorMessage } from '@repo/lib/utils/get-api-error-message';
import { toast } from '@repo/ui/components/ui/sonner';

import { useDeleteTag } from './use-delete-tag';

interface IUseTagActionsOptions {
  tagId: string;
}

export function useTagActions({ tagId }: IUseTagActionsOptions): {
  handleDelete: () => void;
  isDeleting: boolean;
} {
  const { mutate: deleteTag, isPending: isDeleting } = useDeleteTag();

  const handleDelete = (): void => {
    deleteTag(tagId, {
      onSuccess: ({ message }) => {
        toast.success(message);
      },
      onError: (error) => {
        toast.error(getApiErrorMessage(error, 'Ocurrió un error al eliminar el tag.'));
      },
    });
  };

  return {
    handleDelete,
    isDeleting,
  };
}
