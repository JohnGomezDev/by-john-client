'use client';

import { Plus } from 'lucide-react';

import { Button } from '@repo/ui/components/ui/button';

export function CreatePostButton(): React.JSX.Element {
  return (
    <Button type="button" className="cursor-pointer h-10 shrink-0 bg-blue-600 hover:bg-blue-700">
      <Plus aria-hidden="true" className="size-4" />
      Crear post
    </Button>
  );
}
