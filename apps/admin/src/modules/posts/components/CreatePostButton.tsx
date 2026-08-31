'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';

import { ROUTES } from '@/lib/constants/routes.constants';
import { Button } from '@repo/ui/components/ui/button';

export function CreatePostButton(): React.JSX.Element {
  return (
    <Button asChild className="h-10 shrink-0 cursor-pointer bg-blue-600 hover:bg-blue-700">
      <Link href={ROUTES.admin.posts.create}>
        <Plus aria-hidden="true" className="size-4" />
        Crear post
      </Link>
    </Button>
  );
}
