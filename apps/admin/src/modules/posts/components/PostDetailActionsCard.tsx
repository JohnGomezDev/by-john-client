'use client';

import Link from 'next/link';

import { ROUTES } from '@/lib/constants/routes.constants';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@repo/ui/components/ui/alert-dialog';
import { Button } from '@repo/ui/components/ui/button';
import { Card, CardContent } from '@repo/ui/components/ui/card';
import { cn } from '@repo/ui/lib/utils';

import { usePostActions } from '../hooks/use-post-actions';
import type { IPost } from '../types/admin.types';

interface IPostDetailActionsCardProps {
  post: IPost;
}

export function PostDetailActionsCard({ post }: IPostDetailActionsCardProps): React.JSX.Element {
  const { handleDelete, isDeleting } = usePostActions({ postId: post.id });
  const isPublished = post.published;

  return (
    <Card className="border-slate-200 py-0 shadow-sm">
      <CardContent className="flex flex-col gap-3 px-5 py-5">
        <Button
          asChild
          className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700"
        >
          <Link href={ROUTES.admin.posts.edit(post.id)}>Editar post</Link>
        </Button>

        <Button
          type="button"
          className={cn(
            'w-full cursor-pointer',
            isPublished
              ? 'border-blue-600 bg-white text-blue-600 hover:bg-blue-50'
              : 'bg-green-600 text-white hover:bg-green-700',
          )}
          variant={isPublished ? 'outline' : 'default'}
        >
          {isPublished ? 'Despublicar' : 'Publicar'}
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              disabled={isDeleting}
              className="w-full cursor-pointer bg-red-700 text-white hover:bg-red-800"
            >
              {isDeleting ? 'Eliminando...' : 'Eliminar'}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Eliminar este post?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Se eliminará permanentemente el post
                &quot;{post.title}&quot;.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                disabled={isDeleting}
                className="bg-red-700 text-white hover:bg-red-800"
                onClick={(event) => {
                  event.preventDefault();
                  handleDelete();
                }}
              >
                {isDeleting ? 'Eliminando...' : 'Eliminar'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
