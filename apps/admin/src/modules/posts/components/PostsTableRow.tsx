'use client';

import { useRouter } from 'next/navigation';

import { ROUTES } from '@/lib/constants/routes.constants';

import type { IPostListItem } from '../types/admin.types';
import { formatAuthorName, formatCategoryName, formatPostDate, formatPublishedDate } from '../utils/post-list.utils';
import { PostStatusBadge } from './PostStatusBadge';

interface IPostsTableRowProps {
  post: IPostListItem;
}

export function PostsTableRow({ post }: IPostsTableRowProps): React.JSX.Element {
  const router = useRouter();

  const handleRowClick = (): void => {
    router.push(ROUTES.admin.posts.detail(post.id));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTableRowElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      router.push(ROUTES.admin.posts.detail(post.id));
    }
  };

  return (
    <tr
      tabIndex={0}
      onClick={handleRowClick}
      onKeyDown={handleKeyDown}
      className="cursor-pointer border-b border-slate-100 transition-colors hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none"
    >
      <td className="w-64 max-w-64 px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
        <span className="line-clamp-2 break-words" title={post.title}>
          {post.title}
        </span>
      </td>
      <td className="px-4 py-4 sm:px-6">
        <PostStatusBadge published={post.published} />
      </td>
      <td className="hidden px-4 py-4 text-sm text-slate-600 md:table-cell md:px-6">
        {formatCategoryName(post.category)}
      </td>
      <td className="hidden px-4 py-4 text-sm text-slate-600 sm:table-cell sm:px-6">
        {formatAuthorName(post.admin)}
      </td>
      <td className="px-4 py-4 text-sm whitespace-nowrap text-slate-600 sm:px-6">
        {formatPublishedDate(post.publishedAt)}
      </td>
      <td className="hidden px-4 py-4 text-sm whitespace-nowrap text-slate-600 md:table-cell md:px-6">
        {formatPostDate(post.updatedAt)}
      </td>
    </tr>
  );
}
