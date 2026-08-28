'use client';

import type { UseFormRegisterReturn } from 'react-hook-form';

import { CreatePostButton } from './CreatePostButton';
import { PostsSearchForm } from './PostsSearchForm';

interface IPostsListToolbarProps {
  searchField: UseFormRegisterReturn<'search'>;
}

export function PostsListToolbar({ searchField }: IPostsListToolbarProps): React.JSX.Element {
  return (
    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
      <PostsSearchForm searchField={searchField} />
      <CreatePostButton />
    </div>
  );
}
