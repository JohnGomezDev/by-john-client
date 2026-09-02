'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taxonomyKeys } from '@repo/lib/modules/taxonomy/constants/taxonomy.query-keys';

import { updateTag } from '../services/tags.service';
import type { IUpdateTagPayload, IUpdateTagResult } from '../types/tags.types';

interface IUpdateTagVariables {
  id: string;
  payload: IUpdateTagPayload;
}

export function useUpdateTag(): ReturnType<
  typeof useMutation<IUpdateTagResult, Error, IUpdateTagVariables>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => updateTag(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: taxonomyKeys.tags() });
    },
  });
}
