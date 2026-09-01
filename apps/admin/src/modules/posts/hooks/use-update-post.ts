'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { adminPostKeys } from '../constants/post.query-keys';
import { updatePost } from '../services/posts.service';
import type { IUpdatePostPayload, IUpdatePostResult } from '../types/admin.types';

interface IUpdatePostVariables {
  id: string;
  payload: IUpdatePostPayload;
}

export function useUpdatePost(): ReturnType<
  typeof useMutation<IUpdatePostResult, Error, IUpdatePostVariables>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => updatePost(id, payload),
    onSuccess: ({ post }) => {
      void queryClient.invalidateQueries({ queryKey: adminPostKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: adminPostKeys.detail(post.id) });
    },
  });
}
