'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { adminPostKeys } from '../constants/post.query-keys';
import { unpublishPost } from '../services/admin.service';
import type { IPost } from '../types/admin.types';

export function useUnpublishPost(): ReturnType<typeof useMutation<IPost, Error, string>> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => unpublishPost(id),
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: adminPostKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: adminPostKeys.detail(data.id) });
    },
  });
}
