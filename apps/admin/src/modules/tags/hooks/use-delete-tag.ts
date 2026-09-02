'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taxonomyKeys } from '@repo/lib/modules/taxonomy/constants/taxonomy.query-keys';

import { deleteTag } from '../services/tags.service';
import type { IDeleteTagResult } from '../types/tags.types';

export function useDeleteTag(): ReturnType<typeof useMutation<IDeleteTagResult, Error, string>> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTag(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: taxonomyKeys.tags() });
    },
  });
}
