'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { adminPostKeys } from '../constants/post.query-keys';
import { unpublishPost } from '../services/posts.service';
import type { IUnpublishPostResult } from '../types/admin.types';

export function useUnpublishPost(): ReturnType<
  typeof useMutation<IUnpublishPostResult, Error, string>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => unpublishPost(id),
    onSuccess: ({ post }) => {
      void queryClient.invalidateQueries({ queryKey: adminPostKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: adminPostKeys.detail(post.id) });
    },
  });
}
