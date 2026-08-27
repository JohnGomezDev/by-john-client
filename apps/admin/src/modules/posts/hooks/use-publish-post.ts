'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { adminPostKeys } from '../constants/post.query-keys';
import { publishPost } from '../services/admin.service';
import type { IPost } from '../types/admin.types';

export function usePublishPost(): ReturnType<typeof useMutation<IPost, Error, string>> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => publishPost(id),
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: adminPostKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: adminPostKeys.detail(data.id) });
    },
  });
}
