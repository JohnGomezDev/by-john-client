'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { adminPostKeys } from '../constants/post.query-keys';
import { deletePost } from '../services/posts.service';

import type { IDeletePostResult } from '../types/admin.types';

export function useDeletePost(): ReturnType<typeof useMutation<IDeletePostResult, Error, string>> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: (_data, id) => {
      void queryClient.invalidateQueries({ queryKey: adminPostKeys.lists() });
      queryClient.removeQueries({ queryKey: adminPostKeys.detail(id) });
    },
  });
}
