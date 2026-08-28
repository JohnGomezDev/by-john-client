import type { IPost } from '../types/admin.types';
import { PostDetailActionsCard } from './PostDetailActionsCard';
import { PostDetailAuthorCard } from './PostDetailAuthorCard';
import { PostDetailStatusCard } from './PostDetailStatusCard';
import { PostDetailTaxonomyCard } from './PostDetailTaxonomyCard';

interface IPostDetailSidebarProps {
  post: IPost;
}

export function PostDetailSidebar({ post }: IPostDetailSidebarProps): React.JSX.Element {
  return (
    <aside className="flex w-full shrink-0 flex-col gap-4 lg:h-full lg:w-80 lg:overflow-y-auto lg:pr-1">
      <PostDetailStatusCard post={post} />
      <PostDetailAuthorCard post={post} />
      <PostDetailTaxonomyCard post={post} />
      <PostDetailActionsCard post={post} />
    </aside>
  );
}
