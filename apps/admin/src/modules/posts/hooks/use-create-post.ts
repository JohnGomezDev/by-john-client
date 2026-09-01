'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { adminPostKeys } from '../constants/post.query-keys';
import { createPost } from '../services/posts.service';
import type { ICreatePostPayload, ICreatePostResult } from '../types/admin.types';

export function useCreatePost(): ReturnType<
  typeof useMutation<ICreatePostResult, Error, ICreatePostPayload>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminPostKeys.lists() });
    },
  });
}
