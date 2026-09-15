'use client';

import { getApiErrorMessage } from '@repo/lib/utils/get-api-error-message';
import { toast } from '@repo/ui/components/ui/sonner';

import { useDeleteCategory } from './use-delete-category';

interface IUseCategoryActionsOptions {
  categoryId: string;
}

export function useCategoryActions({ categoryId }: IUseCategoryActionsOptions): {
  handleDelete: () => void;
  isDeleting: boolean;
} {
  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();

  const handleDelete = (): void => {
    deleteCategory(categoryId, {
      onSuccess: ({ message }) => {
        toast.success(message);
      },
      onError: (error) => {
        toast.error(getApiErrorMessage(error, 'Ocurrió un error al eliminar la categoría.'));
      },
    });
  };

  return {
    handleDelete,
    isDeleting,
  };
}
