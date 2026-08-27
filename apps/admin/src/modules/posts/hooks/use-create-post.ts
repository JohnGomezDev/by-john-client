'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { adminPostKeys } from '../constants/post.query-keys';
import { createPost } from '../services/admin.service';
import type { ICreatePostPayload, IPost } from '../types/admin.types';

export function useCreatePost(): ReturnType<
  typeof useMutation<IPost, Error, ICreatePostPayload>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminPostKeys.lists() });
    },
  });
}
