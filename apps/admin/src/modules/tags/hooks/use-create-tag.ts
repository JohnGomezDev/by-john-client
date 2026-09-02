'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taxonomyKeys } from '@repo/lib/modules/taxonomy/constants/taxonomy.query-keys';

import { createTag } from '../services/tags.service';
import type { ICreateTagPayload, ICreateTagResult } from '../types/tags.types';

export function useCreateTag(): ReturnType<
  typeof useMutation<ICreateTagResult, Error, ICreateTagPayload>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTag,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: taxonomyKeys.tags() });
    },
  });
}
